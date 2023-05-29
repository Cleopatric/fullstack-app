from rest_framework import status

from shipments.tests.base_test import BaseTestCase


class CitiesViewTests(BaseTestCase):
    cities_url = r'/shipments/cities'

    def setUp(self):
        self.city = self.get_city_instance()
        self.search_url = f'{self.cities_url}?search={self.city.name}'

    def test_search_city_id(self):
        response = self.client.get(self.search_url)
        city_id = response.data[0].get('id')
        self.assertEqual(city_id, self.city.id)

    def test_search_city_name(self):
        response = self.client.get(self.search_url)
        city_name = response.data[0].get('name')
        self.assertEqual(city_name, self.city.name)

    def test_cities_status_code(self):
        response = self.client.get(self.cities_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def tearDown(self):
        self.service.delete_from_cache(f'{self.service.directions_cache_key}*')
