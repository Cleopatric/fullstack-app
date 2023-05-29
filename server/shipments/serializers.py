from rest_framework import serializers

from shipments.models import City, Shipment


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = '__all__'


class BaseShipmentSerializer(serializers.ModelSerializer):
    direction_city = serializers.CharField(source='direction.name')

    class Meta:
        abstract = True


class ShipmentSerializer(BaseShipmentSerializer):
    class Meta:
        model = Shipment
        fields = ('id', 'title', 'direction_city', 'date',)


class FullShipmentSerializer(BaseShipmentSerializer):
    class Meta:
        model = Shipment
        fields = ('id', 'title', 'direction_city', 'date',
                  'direction', 'comment',)


class UpdateShipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shipment
        fields = ('id', 'title', 'direction', 'date',
                  'direction', 'comment',)
