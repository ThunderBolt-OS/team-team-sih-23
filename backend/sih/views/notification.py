from rest_framework import status, serializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response


from ..models import BandobasOfficer

from ..config import send_fcm_message


##########################################################################################

class SendNotificationToBandobasOfficerSerializer(serializers.Serializer):
    heading = serializers.CharField(max_length=100)
    body = serializers.CharField(max_length=1000)
    notif_type = serializers.CharField(max_length=100)


@api_view(['POST'])
# @permission_classes([])
def send_notification_to_bandobas_officer(request, officer_id):
    if not request.user.is_authenticated:
        return Response({'message': 'Authentication credentials were not provided'},
                        status=status.HTTP_401_UNAUTHORIZED)

    serializer = SendNotificationToBandobasOfficerSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    validated_data = serializer.validated_data
    heading = validated_data.get('heading')
    body = validated_data.get('body')
    notif_type = validated_data.get('notif_type')

    try:
        fcm_token = 'aldjsl'

        send_fcm_message(heading, body, fcm_token, {
            'type': notif_type,
        })

    except BandobasOfficer.DoesNotExist:
        return Response({'message': 'Bandobas officer not found'}, status=status.HTTP_404_NOT_FOUND)

    return Response({"message": "notification sent"})


##########################################################################################

class RegisterDeviceSerializer(serializers.Serializer):
    fcm_token = serializers.CharField(max_length=500)


@api_view(['POST'])
def register_network_admin_device(request):
    serializer = RegisterDeviceSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # get the fcm token from the request
    fcm_token = serializer.validated_data.get('fcm_token')

    user = request.user
    user.fcm_token = fcm_token
    user.save()

    return Response({"message": "fcm_token registered"})
