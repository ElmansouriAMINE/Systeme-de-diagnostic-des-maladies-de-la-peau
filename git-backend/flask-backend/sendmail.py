from __future__ import print_function
from sre_parse import FLAGS
import httplib2
import os

# from apiclient import discovery
from googleapiclient import discovery
# from oauth2client import client
# from oauth2client import tools
from oauth2client.file import Storage

from oauth2client import client, tools, file

import base64
from email.mime.audio import MIMEAudio
from email.mime.base import MIMEBase
from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import mimetypes
import os

from apiclient import errors

# try:
# 	import argparse
# 	flags = argparse.ArgumentParser(parents=[tools.argparser]).parse_args()
# except ImportError:
# 	flags = None

# If modifying these scopes, delete your previously saved credentials
# at ~/.credentials/gmail-python-quickstart.json
SCOPES = 'https://mail.google.com/'
CLIENT_SECRET_FILE = 'secrets/mail_client_secret.json'
APPLICATION_NAME = 'diagnostic-maladie-peau'


def get_credentials():
    """Gets valid user credentials from storage.

    If nothing has been stored, or if the stored credentials are invalid,
    the OAuth2 flow is completed to obtain the new credentials.

    Returns:
        Credentials, the obtained credential.
    """
    home_dir = os.path.expanduser('~')
    credential_dir = os.path.join(home_dir, '.credentials')
    if not os.path.exists(credential_dir):
        os.makedirs(credential_dir)
    credential_path = os.path.join(credential_dir, 'gmail-python-quickstart.txt')

    store = file.Storage(credential_path)
    credentials = store.get()
    if not credentials or credentials.invalid:
        flow = client.OAuth2WebServerFlow(client_id="240065616959-bikofgqsbau3l4nh312ie6gb8j3kb77b.apps.googleusercontent.com", client_secret="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", scope=SCOPES)
        credentials = tools.run_flow(flow, store)
        print('Storing credentials to ' + credential_path)
    return credentials


def SendMessage(service, user_id, message):
	"""Send an email message.

	Args:
		service: Authorized Gmail API service instance.
		user_id: User's email address. The special value "me"
		can be used to indicate the authenticated user.
		message: Message to be sent.

	Returns:
		Sent Message.
	"""
	try:
		message = (service.users().messages().send(userId=user_id, body=message)
							 .execute())
		print('Message Id: %s' % message['id'])
		return message
	except errors.HttpError as error:
		print('An error occurred: %s' % error)


def CreateMessage(sender, to, subject, message_text):
	"""Create a message for an email.

	Args:
		sender: Email address of the sender.
		to: Email address of the receiver.
		subject: The subject of the email message.
		message_text: The text of the email message.

	Returns:
		An object containing a base64url encoded email object.
	"""
	message = MIMEText(message_text)
	message['to'] = to
	message['from'] = sender
	message['subject'] = subject
	# return {'raw': base64.urlsafe_b64encode(message.as_string())}
	return {'raw': base64.urlsafe_b64encode(message.as_string().encode()).decode()}

def SendPasswordResetMail(user, generated_password, sender='amineelmansouri2001@gmail.com'):
	to = user.email
	subject = "Link to Reset Password for FlaskApp"
	message_text = """
	Dear {0},
	Your FlaskApp password has been reset to {1}
	Visit the site and change it immediately. 
	""".format(user.username, generated_password)

	credentials = get_credentials()
	http = credentials.authorize(httplib2.Http())
	service = discovery.build('gmail', 'v1', http=http)

	message = CreateMessage(sender, user.email, subject, message_text)
	sent_message = SendMessage(service, 'me', message)

	return sent_message

############################################################################################
##########################################TEST CODE#########################################
############################################################################################
# def main():
# 	"""Shows basic usage of the Gmail API.

# 	Creates a Gmail API service object and outputs a list of label names
# 	of the user's Gmail account.
# 	"""
# 	credentials = get_credentials()
# 	http = credentials.authorize(httplib2.Http())
# 	service = discovery.build('gmail', 'v1', http=http)

# 	###################################################################
# 	############################TEST CODE##############################
# 	###################################################################
# 	# results = service.users().labels().list(userId='me').execute()
# 	# labels = results.get('labels', [])
# 	# if not labels:
# 	#     print('No labels found.')
# 	# else:
# 	#   print('Labels:')
# 	#   for label in labels:
# 	#     print(label['name'])
# 	###################################################################
# 	###################################################################
# 	###################################################################

# 	message = CreateMessage('krish.raghuram@gmail.com', 'k.raghuram@iitg.ac.in', 'TEST', 'Hello World')
# 	sent_message = SendMessage(service, 'me', message)

# if __name__ == '__main__':
# 	main()
############################################################################################
############################################################################################
############################################################################################