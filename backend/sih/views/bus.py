from rest_framework import status, serializers, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from ..models import ChatMessage, User, Bus

from django.db.models import Q
from django.utils import timezone


class BusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bus
        fields = '__all__'


class BusListAPIView(generics.ListCreateAPIView):
    queryset = Bus.objects.all()
    serializer_class = BusSerializer


class BusDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Bus.objects.all()
    serializer_class = BusSerializer
