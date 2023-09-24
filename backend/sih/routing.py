from django.urls import path
from .consumers import OfficerLocationConsumer, ChatConsumer, BusLocationConsumer

websocket_urlpatterns = [
    path('ws/location/<int:officer_id>/', OfficerLocationConsumer.as_asgi()),
    path('ws/trip/<int:trip_id>/', BusLocationConsumer.as_asgi()),
    path('ws/chat/', ChatConsumer.as_asgi()),
]
