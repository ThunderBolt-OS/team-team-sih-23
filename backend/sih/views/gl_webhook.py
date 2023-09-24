import environ
import hashlib
import hmac
import json

from shapely.geometry import Point, shape

from django.utils import timezone

from datetime import datetime, timedelta

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from ..models import Bus, BusLocation, Trip
from ..config import send_fcm_message

env = environ.Env()


@api_view(['POST'])
def gl_webhook(request):
    try:
        payload = request.data

        # print(payload)

        # check if location data is present
        location = payload.get('location')
        if location is None:
            return Response({'message': 'No location data found'}, status=status.HTTP_400_BAD_REQUEST)

        # Extract relevant fields from the parsed data
        location = location[0]

        client_timestamp = location.get('timestamp')
        is_moving = location.get('is_moving')

        # coords
        coords = location.get('coords')

        if coords is None:
            return Response({'message': 'No coords data found'}, status=status.HTTP_400_BAD_REQUEST)

        # required fields
        latitude = coords.get('latitude')
        longitude = coords.get('longitude')

        # optional fields
        altitude = coords.get('altitude')
        location_accuracy = coords.get('accuracy')
        speed = coords.get('speed')

        # optional transistorsoft specific fields
        speed_accuracy = coords.get('speed_accuracy')
        heading = coords.get('heading')
        heading_accuracy = coords.get('heading_accuracy')
        ellipsoidal_altitude = coords.get('ellipsoidal_altitude')
        altitude_accuracy = coords.get('altitude_accuracy')

        # optional extra fields
        battery_level = location.get('battery').get('level')
        battery_is_charging = location.get('battery').get('is_charging')
        activity_type = location.get('activity').get('type')
        activity_confidence = location.get('activity').get('confidence')

        # check if bandobas officer is exists
        try:
            trip_id = payload.get('trip_id')
            trip = Trip.objects.get(pk=trip_id)
            bus = Bus.objects.filter(
                trip=trip_id).last()
        except Trip.DoesNotExist:
            return Response({'message': 'Trip not found'}, status=status.HTTP_404_NOT_FOUND)

        # save the location data to the database
        # saving to the database will trigger the send_location_update method
        # which will send the location data to the client via websocket
        BusLocation.objects.create(
            trip=trip,

            # common
            latitude=latitude,
            longitude=longitude,
            # common optional
            altitude=altitude,
            location_accuracy=location_accuracy,
            speed=speed,
            distance_from_nfc_device=10,
            is_point_inside_polygon=True,

            # timestamps
            client_timestamp=client_timestamp,

            # transistorsoft specific
            is_moving=is_moving,
            speed_accuracy=speed_accuracy,
            heading=heading,
            heading_accuracy=heading_accuracy,
            ellipsoidal_altitude=ellipsoidal_altitude,
            altitude_accuracy=altitude_accuracy,
            battery_level=battery_level,
            battery_is_charging=battery_is_charging,
            activity_type=activity_type,
            activity_confidence=activity_confidence,
        )

        return Response({'message': 'Webhook received'}, status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response({'message': 'Something went wrong'})


def _check_point_in_polygon(latitude, longitude, polygon_geojson):
    point = Point(longitude, latitude)
    polygon = shape(polygon_geojson)
    return polygon.contains(point), polygon.distance(point)
