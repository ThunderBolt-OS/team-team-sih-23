from django.db import models

from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync


class BandobasOfficer(models.Model):
    fcm_token = models.CharField(
        max_length=255, default="officer_not_registered")
    device_id = models.CharField(
        max_length=255, default="officer_not_registered")

    police_user = models.ForeignKey(
        'User', models.CASCADE, related_name='police_user')

    duty_start_time = models.DateTimeField()
    duty_end_time = models.DateTimeField()

    department = models.CharField(max_length=55, blank=True, null=True)
    rank = models.CharField(max_length=55, blank=True, null=True)

    weapons = models.TextField(blank=True, null=True)
    instructions = models.CharField(max_length=200, blank=True, null=True)

    created_by = models.ForeignKey('User', models.CASCADE)

    class Meta:
        db_table = 'BandobasOfficer'

    @property
    def last_location(self):
        return self.bandobasofficerlocation_set.last()

    def __str__(self) -> str:
        return f'{self.pk} | {self.police_user.name} | {self.police_user.phone} | bandobast id: {self.assigned_nfc_device.assigned_to_bandobas.pk}'


class BandobasOfficerLocation(models.Model):
    officer = models.ForeignKey('BandobasOfficer', on_delete=models.CASCADE)

    # common
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    # common optional
    altitude = models.CharField(max_length=50, null=True, blank=True)
    location_accuracy = models.CharField(max_length=50, null=True, blank=True)
    speed = models.CharField(max_length=50, null=True, blank=True)
    distance_from_nfc_device = models.FloatField(null=True, blank=True)
    is_point_inside_polygon = models.BooleanField(default=False)

    # timestamps
    client_timestamp = models.DateTimeField()
    timestamp = models.DateTimeField(auto_now_add=True)

    # transistorsoft specific
    is_moving = models.CharField(max_length=50, null=True, blank=True)
    speed_accuracy = models.CharField(max_length=50, null=True, blank=True)
    heading = models.CharField(max_length=50, null=True, blank=True)
    heading_accuracy = models.CharField(max_length=50, null=True, blank=True)
    ellipsoidal_altitude = models.CharField(
        max_length=50, null=True, blank=True)
    altitude_accuracy = models.CharField(max_length=50, null=True, blank=True)
    battery_level = models.CharField(max_length=50, null=True, blank=True)
    battery_is_charging = models.CharField(
        max_length=50, null=True, blank=True)
    activity_type = models.CharField(max_length=50, null=True, blank=True)
    activity_confidence = models.CharField(
        max_length=50, null=True, blank=True)

    # hypertrack specific
    bearing = models.CharField(max_length=50, null=True, blank=True)

    class Meta:
        db_table = 'BandobasOfficerLocation'
        get_latest_by = 'timestamp'

    def save(self, *args, **kwargs):
        is_new = self.pk is None
        super().save(*args, **kwargs)
        if is_new:
            self.send_location_update()

    def send_location_update(self):
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            f'location_updates_{self.officer_id}',
            {'type': 'location_update', 'data': self.get_location_data()}
        )

    def get_location_data(self):
        # Return the data you want to send in the location update
        data = {
            'latitude': str(self.latitude),
            'longitude': str(self.longitude),
        }
        return data
