from rest_framework import status, serializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from ..models import ChatMessage, User

from django.db.models import Q


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


@api_view(['GET'])
def get_all_users(request):
    """
    Get all users
    """
    users = User.objects.all()
    return Response(UserSerializer(users, many=True).data)


class ChatMessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer()
    receiver = UserSerializer()

    class Meta:
        model = ChatMessage
        fields = '__all__'


@api_view(['GET'])
def get_my_conversations(request):
    """
    Get all conversations of the logged in user
    """
    user = request.user

    # get phone of all those whom the user has sent/recieved messages
    phone_numbers = ChatMessage.objects.filter(
        Q(sender=user) | Q(receiver=user)).values_list('sender__phone', 'receiver__phone')

    # flatten the list of tuples
    phone_numbers = set(
        [item for sublist in phone_numbers for item in sublist])

    # serialize the phone numbers
    phone_numbers = UserSerializer(User.objects.filter(
        phone__in=phone_numbers), many=True).data

    return Response({
        'conversations': phone_numbers
    })


class UserSerializer2(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['phone']


class ChatMessageSerializer2(serializers.ModelSerializer):
    sender = UserSerializer2()
    receiver = UserSerializer2()

    class Meta:
        model = ChatMessage
        fields = '__all__'


@api_view(['GET'])
def get_my_messages(request, sender_phone):
    """
    Get all messages between two users
    """
    receiver = request.user
    sender = User.objects.get(phone=sender_phone)

    messages = ChatMessage.objects.filter(
        Q(sender=sender, receiver=receiver) | Q(sender=receiver, receiver=sender)).order_by('timestamp')[:10]

    return Response(ChatMessageSerializer2(messages, many=True).data)
