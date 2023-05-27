from rest_framework import filters
from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import ListAPIView, RetrieveAPIView, \
    CreateAPIView, UpdateAPIView, DestroyAPIView

from shipments.services import ShipmentsService
from shipments.serializers import CitySerializer, ShipmentSerializer, \
    FullShipmentSerializer, UpdateShipmentSerializer

service = ShipmentsService()


class ShipmentSetPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100


class CitiesView(ListAPIView):
    serializer_class = CitySerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ('name',)

    def get_queryset(self):
        return service.get_all_directions()


class ShipmentViewMixin:

    def get_queryset(self):
        return service.get_all_shipments()


class AllShipmentView(ShipmentViewMixin, ListAPIView):
    serializer_class = ShipmentSerializer
    paginator = ShipmentSetPagination()
    filter_backends = [filters.SearchFilter]
    search_fields = ('title', 'direction__name')


class CurrentShipmentView(ShipmentViewMixin, RetrieveAPIView):
    serializer_class = FullShipmentSerializer


class DeleteShipmentView(ShipmentViewMixin, DestroyAPIView):
    serializer_class = FullShipmentSerializer


class CreateShipmentView(ShipmentViewMixin, CreateAPIView):
    serializer_class = UpdateShipmentSerializer


class UpdateShipmentView(ShipmentViewMixin, UpdateAPIView):
    serializer_class = UpdateShipmentSerializer
