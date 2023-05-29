from django.dispatch.dispatcher import receiver
from django.db.models.signals import post_save, post_delete

from shipments.models import City, Shipment
from shipments.services import ShipmentsService

service = ShipmentsService()


@receiver([post_save, post_delete], sender=City, dispatch_uid='cities_added')
def handle_cities(sender: City, instance: City, **kwargs):
    if instance:
        service.delete_from_cache(f'{service.directions_cache_key}*')


@receiver([post_save, post_delete], sender=Shipment, dispatch_uid='shipments_added')
def handle_shipments(sender: Shipment, instance: Shipment, **kwargs):
    if instance:
        service.delete_from_cache(f'{service.shipments_cache_key}*')
