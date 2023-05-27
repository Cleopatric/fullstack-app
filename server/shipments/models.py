from django.db import models


class City(models.Model):
    name = models.CharField(verbose_name='City name', max_length=200, unique=True)

    def __str__(self) -> str:
        return f'City: {self.name}'

    class Meta:
        db_table = 'cities'
        verbose_name = 'City'
        verbose_name_plural = 'Cities'


class Shipment(models.Model):
    title = models.CharField(verbose_name='Title', max_length=60, unique=True)
    direction = models.ForeignKey(City, verbose_name='Direction city', on_delete=models.CASCADE)
    date = models.DateField(verbose_name='Depart date')
    comment = models.TextField(verbose_name='Comment',
                               max_length=1000, blank=True, null=True)

    def __str__(self) -> str:
        return f'Shipment: {self.title}'

    class Meta:
        db_table = 'shipments'
        verbose_name = 'Shipment'
        verbose_name_plural = 'Shipments'
