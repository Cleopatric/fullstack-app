from rest_framework import status

from shipments.models import Shipment
from shipments.tests.base_test import BaseTestCase


class ShipmentsViewTests(BaseTestCase):
    shipments_url = r'/shipments/all-shipments'
    shipment_url = r'/shipments/current-shipment/'
    creation_url = r'/shipments/create-shipment/'
    update_url = r'/shipments/update-shipment/'
    delete_url = r'/shipments/delete-shipment/'

    def setUp(self):
        self.city = self.get_city_instance()
        self.shipment = self.get_shipment_instance(self.city)

        self.search_url = f'{self.shipments_url}?search={self.shipment.title}'
        self.current_shipment_url = f'{self.shipment_url}{self.shipment.id}/'
        self.update_url = f'{self.update_url}{self.shipment.id}/'
        self.delete_url = f'{self.delete_url}{self.shipment.id}/'

    def test_shipments_status_code(self):
        response = self.client.get(self.shipments_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_current_shipment_id(self):
        response = self.client.get(self.current_shipment_url)
        shipment_id = response.data.get('id')
        self.assertEqual(shipment_id, self.shipment.id)

    def test_shipment_direction_id(self):
        response = self.client.get(self.current_shipment_url)
        direction_id = response.data.get('direction')
        self.assertEqual(direction_id, self.city.id)

    def test_shipment_direction_city(self):
        response = self.client.get(self.current_shipment_url)
        direction_city = response.data.get('direction_city')
        self.assertEqual(direction_city, self.city.name)

    def test_exist_shipment_creation_status(self):
        exist_shipment = self.configs.get('test_shipment')
        response = self.client.post(self.creation_url, data=exist_shipment)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_shipment_creation_status(self):
        self.shipment.delete()
        shipment_params = self.configs.get('test_shipment')
        shipment_params['direction'] = self.city.id
        response = self.client.post(self.creation_url, data=shipment_params)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_update_status(self):
        shipment_params = self.configs.get('test_shipment')
        shipment_params['direction'] = self.city.id
        response = self.client.put(self.update_url, data=shipment_params)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_title(self):
        shipment_params = self.configs.get('test_shipment')
        new_title = f'{self.shipment.title}-UPDATED'
        shipment_params['title'] = f'{self.shipment.title}-UPDATED'
        shipment_params['direction'] = self.city.id

        response = self.client.put(self.update_url, data=shipment_params)
        title = response.data.get('title')
        self.assertEqual(title, new_title)

    def test_delete_shipment(self):
        self.client.delete(self.delete_url)
        shipment = Shipment.objects.only('id').filter(id=self.shipment.id)
        self.assertEqual(bool(shipment), False)

    def tearDown(self):
        self.service.delete_from_cache(f'{self.service.shipments_cache_key}*')
