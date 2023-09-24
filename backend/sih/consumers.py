import json

from channels.generic.websocket import AsyncJsonWebsocketConsumer

from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed
from asgiref.sync import sync_to_async
from channels.db import database_sync_to_async

from .models import BandobasOfficerLocation, User, ChatMessage, Bus, BusLocation


class BusLocationConsumer(AsyncJsonWebsocketConsumer):
    async def authenticate_user(self):
        headers = self.scope.get('headers')
        token = None
        if headers:
            for key, value in headers:
                if key.decode() == 'authorization':
                    token = value.decode().split(' ')[1]
                    break

                if key.decode() == 'cookie':
                    for v in value.decode().split(';'):
                        splitted = v.strip().split('=')
                        if splitted[0] == 'accessToken':
                            token = splitted[1]
                            break

        if not token:
            await self.close(code=4000, reason='Authorization header not found')

        try:
            request = type('DummyRequest', (), {
                           'META': {'HTTP_AUTHORIZATION': f'JWT {token}'}})()
            authenticate = sync_to_async(JWTAuthentication().authenticate)
            user, _ = await authenticate(request)
            self.scope['user'] = user
        except AuthenticationFailed as e:
            self.close(code=4001, reason=str(e))

    async def connect(self):
        await self.authenticate_user()

        # Get the trip_id from the URL route sent by the client
        self.trip_id = self.scope['url_route']['kwargs']['trip_id']
        self.group_name = f'location_updates_{self.trip_id}'

        # Join the group
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

        try:
            bus_location = await sync_to_async(BusLocation.objects.filter(
                trip=self.trip_id).latest)()
            await self.send(text_data=json.dumps({
                'type': 'init_location_update',
                'data': {
                    'latitude': str(bus_location.latitude),
                    'longitude': str(bus_location.longitude),
                    'altitude': str(bus_location.altitude),
                    'is_point_inside_polygon': bus_location.is_point_inside_polygon,
                    'battery_level': bus_location.battery_level,
                }
            }))
        except BusLocation.DoesNotExist:
            bus_location = None
            await self.send(text_data=json.dumps({
                'type': 'alert',
                'data': {
                    'code': 'NO_LOCATION_DATA_FOUND',
                    'message': 'no location record found for this officer'
                }
            }))

    async def disconnect(self, close_code):
        print("socket closed due to", close_code)
        # Leave the group
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def location_update(self, event):
        # Send location updates to the WebSocket
        await self.send(text_data=json.dumps(event))

    async def scan_request_update(self, event):
        # Send location updates to the WebSocket
        await self.send(text_data=json.dumps(event))

    async def receive(self, text_data):
        pass


class OfficerLocationConsumer(AsyncJsonWebsocketConsumer):
    async def authenticate_user(self):
        headers = self.scope.get('headers')
        token = None
        if headers:
            for key, value in headers:
                if key.decode() == 'authorization':
                    token = value.decode().split(' ')[1]
                    break

                if key.decode() == 'cookie':
                    for v in value.decode().split(';'):
                        splitted = v.strip().split('=')
                        if splitted[0] == 'accessToken':
                            token = splitted[1]
                            break

        if not token:
            await self.close(code=4000, reason='Authorization header not found')

        try:
            request = type('DummyRequest', (), {
                           'META': {'HTTP_AUTHORIZATION': f'JWT {token}'}})()
            authenticate = sync_to_async(JWTAuthentication().authenticate)
            user, _ = await authenticate(request)
            self.scope['user'] = user
        except AuthenticationFailed as e:
            self.close(code=401)

    async def connect(self):
        await self.authenticate_user()

        # TODO check if officer_id requested is of a bandobas the network admin created

        # Get the officer_id from the URL route sent by the client
        self.officer_id = self.scope['url_route']['kwargs']['officer_id']
        self.group_name = f'location_updates_{self.officer_id}'

        # Join the group
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

        try:
            bandobas_officer_location = await sync_to_async(BandobasOfficerLocation.objects.filter(
                officer=self.officer_id).latest)()
            await self.send(text_data=json.dumps({
                'type': 'init_location_update',
                'data': {
                    'latitude': str(bandobas_officer_location.latitude),
                    'longitude': str(bandobas_officer_location.longitude),
                    'altitude': str(bandobas_officer_location.altitude),
                    'is_point_inside_polygon': bandobas_officer_location.is_point_inside_polygon,
                    'battery_level': bandobas_officer_location.battery_level,
                }
            }))
        except BandobasOfficerLocation.DoesNotExist:
            bandobas_officer_location = None
            await self.send(text_data=json.dumps({
                'type': 'alert',
                'data': {
                    'code': 'NO_LOCATION_DATA_FOUND',
                    'message': 'no location record found for this officer'
                }
            }))

    async def disconnect(self, close_code):
        print("socket closed due to", close_code)
        # Leave the group
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def location_update(self, event):
        # Send location updates to the WebSocket
        await self.send(text_data=json.dumps(event))

    async def scan_request_update(self, event):
        # Send location updates to the WebSocket
        await self.send(text_data=json.dumps(event))

    async def receive(self, text_data):
        pass


class ChatConsumer(AsyncJsonWebsocketConsumer):
    async def authenticate_user(self):
        headers = self.scope.get('headers')
        token = None
        if headers:
            for key, value in headers:
                if key.decode() == 'authorization':
                    token = value.decode().split(' ')[1]
                    break

                if key.decode() == 'cookie':
                    for v in value.decode().split(';'):
                        splitted = v.strip().split('=')
                        if splitted[0] == 'accessToken':
                            token = splitted[1]
                            break

        if not token:
            await self.close(code=4000, reason='Authorization header not found')

        try:
            request = type('DummyRequest', (), {
                           'META': {'HTTP_AUTHORIZATION': f'JWT {token}'}})()
            authenticate = sync_to_async(JWTAuthentication().authenticate)
            user, _ = await authenticate(request)
            self.scope['user'] = user
        except AuthenticationFailed as e:
            self.close(code=4001, reason=str(e))

    async def connect(self):
        await self.authenticate_user()

        await self.accept()

        # Join the WebSocket group for the authenticated user
        await self.join_user_group()

    async def join_user_group(self):
        user = self.scope['user']
        group_name = f'private_chat_{user.phone}'
        await self.channel_layer.group_add(
            group_name,
            self.channel_name,
        )

    async def receive_json(self, content):
        message_type = content.get('type')
        if message_type == 'private_message':
            await self.handle_private_message(content)
        else:
            await self.send_json({
                'error': 'Invalid message type',
            })

    async def handle_private_message(self, content):
        sender = self.scope['user']
        receiver_phone = content.get('receiver_phone')
        message_content = content.get('content')

        try:
            receiver = await sync_to_async(User.objects.get)(phone=receiver_phone)
        except User.DoesNotExist:
            await self.send_json({
                'error': 'Receiver not found',
            })
            return

        if sender == receiver:
            await self.send_json({
                'error': 'You cannot send a private message to yourself',
            })
            return

        # Save the message to the database
        chat_message = await sync_to_async(ChatMessage.objects.create)(
            sender=sender, receiver=receiver, content=message_content)

        # Send the message to both sender and receiver
        await self.channel_layer.group_send(
            f'private_chat_{sender.phone}',
            {
                'type': 'chat_message',
                'content': {
                    'id': chat_message.id,
                    'sender': {'phone': sender.phone},
                    'receiver': {'phone': receiver.phone},
                    'content': message_content,
                    'timestamp': chat_message.timestamp.isoformat(),
                },
            },
        )

        await self.channel_layer.group_send(
            f'private_chat_{receiver.phone}',
            {
                'type': 'chat_message',
                'content': {
                    'id': chat_message.id,
                    'sender': {'phone': sender.phone},
                    'receiver': {'phone': receiver.phone},
                    'content': message_content,
                    'timestamp': chat_message.timestamp.isoformat(),
                },
            },
        )

    async def chat_message(self, event):
        await self.send_json(event)
