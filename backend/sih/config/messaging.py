import json
import requests
import google.auth.transport.requests

from google.oauth2 import service_account

PROJECT_ID = 'kavach-23-a3959'
BASE_URL = 'https://fcm.googleapis.com'
FCM_ENDPOINT = 'v1/projects/' + PROJECT_ID + '/messages:send'
FCM_URL = BASE_URL + '/' + FCM_ENDPOINT
SCOPES = ['https://www.googleapis.com/auth/firebase.messaging']

# [START retrieve_access_token]


def _get_access_token():
    """
    Retrieve a valid access token that can be used to authorize requests.
    :return: Access token.
    """
    credentials = service_account.Credentials.from_service_account_file(
        'service-account.json', scopes=SCOPES)
    request = google.auth.transport.requests.Request()
    credentials.refresh(request)
    return credentials.token

# [END retrieve_access_token]


def _build_common_message(notif_title, notif_body, device_id, data=None):
    """Construct common notifiation message.

    Construct a JSON object that will be used to define the
    common parts of a notification message that will be sent
    to any app instance subscribed to the news topic.
    """
    return {
        'message': {
            'token': device_id,
            'notification': {
                'title': notif_title,
                'body': notif_body,
            },
            'data': data
        }
    }


def send_fcm_message(notif_title, notif_body, device_id, data=None):
    """
    Send HTTP request to FCM with given message.
    Args:
      fcm_message: JSON object that will make up the body of the request.
    """
    # [START use_access_token]
    headers = {
        'Authorization': 'Bearer ' + _get_access_token(),
        'Content-Type': 'application/json; UTF-8',
    }
    # [END use_access_token]
    resp = requests.post(FCM_URL, data=json.dumps(_build_common_message(
        notif_title, notif_body, device_id, data)), headers=headers)

    if resp.status_code == 200:
        print('Message sent to Firebase for delivery, response:')
        # print(resp.text)
    else:
        print('Unable to send message to Firebase')
        # print(resp.text)
