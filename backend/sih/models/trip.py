from django.db import models

from .bus import Bus
from .auth import User


class Trip(models.Model):
    bus = models.ForeignKey(Bus, on_delete=models.CASCADE)

    driver = models.ForeignKey(User, on_delete=models.CASCADE)

    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'Trip'

    def __str__(self):
        return f'Trip for {self.bus} on {(self.start_time).strftime("%d/%m/%Y, %H:%M:%S")}'
