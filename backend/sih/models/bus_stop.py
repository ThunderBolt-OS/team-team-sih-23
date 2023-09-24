from django.db import models

from .bus import Bus


class BusStop(models.Model):
    name = models.CharField(max_length=100)
    latitude = models.FloatField()
    longitude = models.FloatField()
    geojson_data = models.JSONField()

    class Meta:
        db_table = 'BusStop'

    def __str__(self):
        return self.name


class BusRouteStop(models.Model):
    bus = models.ForeignKey(Bus, on_delete=models.CASCADE)
    stop = models.ForeignKey(BusStop, on_delete=models.CASCADE)
    order = models.PositiveIntegerField()

    class Meta:
        ordering = ['order']
        unique_together = ('bus', 'stop')
        db_table = 'BusRouteStop'

    def __str__(self):
        return f'{self.bus} - Stop: {self.stop} (Order: {self.order})'


'''
# Create a bus stop
bus_stop = BusStop.objects.create(name='Bus Stop A', latitude=90, longitude=90, geojson_data={})

# Create a bus route and associate the bus stop with it
bus_route = Bus.objects.create(bus_number='Route 1', created_by=user)
bus_route.stops.add(bus_stop)

# Access bus stops associated with a bus route
stops_on_route_1 = bus_route.stops.all()

# Access buses passing through a particular bus stop
buses_at_stop_A = bus_stop.buses.all()
'''
