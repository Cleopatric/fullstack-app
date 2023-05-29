import os
import yaml

from rest_framework.test import APITestCase

from shipments.models import City, Shipment
from shipments.services import ShipmentsService


class BaseTestCase(APITestCase):
    filename = r'configs.yaml'
    file_path = os.path.join(os.path.dirname(__file__), filename)
    service = ShipmentsService()

    @property
    def configs(self) -> dict:
        configs = {}
        if not os.path.exists(self.file_path):
            return configs

        with open(self.file_path) as file:
            configs = yaml.safe_load(file)
        return configs

    def get_city_instance(self) -> City:
        city_params = self.configs.get('test_city')
        return City.objects.create(**city_params)

    def get_shipment_instance(self, direction: City) -> Shipment:
        shipment_params = self.configs.get('test_shipment')
        shipment_params['direction'] = direction
        return Shipment.objects.create(**shipment_params)
