from django.db.models.query import QuerySet

from core.mixins import CacheMixin
from core.utils import cache_wrapper
from shipments.models import City, Shipment


class ShipmentsService(CacheMixin):
    shipments_cache_key = r'shipments_caches'
    directions_cache_key = r'directions_caches'

    @cache_wrapper(directions_cache_key)
    def get_all_directions(self) -> QuerySet:
        return City.objects.all().order_by('id')

    @cache_wrapper(shipments_cache_key)
    def get_all_shipments(self) -> QuerySet:
        return Shipment.objects.select_related('direction').all().order_by('id')
