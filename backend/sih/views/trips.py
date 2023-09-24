from rest_framework import status, serializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from ..models import ChatMessage, User, Trip

from django.db.models import Q
from django.utils import timezone


class TripsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        fields = '__all__'


@api_view(['GET'])
def get_all_trips(request):
    """
    Get all trips
    """
    trips = Trip.objects.all()
    return Response(TripsSerializer(trips, many=True).data)


@api_view(['POST'])
def end_trip(request):
    """
    End a trip
    """
    trip = Trip.objects.get(id=request.data['id'])
    trip.end_time = timezone.now()
    trip.save()
    return Response(TripsSerializer(trip).data)
