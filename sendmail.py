import smtplibfrom email.mime.multipart import MIMEMultipartfrom email.mime.text import MIMETextimport sysrecepient = sys.argv[1]message = sys.argv[3]msg = MIMEMultipart('alternative')msg['Subject'] = sys.argv[2]msg['From'] = 'arwtestacct3@gmail.com'msg['To'] = recepientmsg.attach(MIMEText(message, 'html'))server = smtplib.SMTP('smtp.gmail.com', 587)server.ehlo()server.starttls()server.ehlo()server.login('arwtestacct3@gmail.com', 'Hackeroneacct9234')server.sendmail('arwtestacct3@gmail.com', recepient, msg.as_string())server.rset()server.quit()