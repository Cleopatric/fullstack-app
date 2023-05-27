from django.urls import path

from shipments.views import CitiesView, AllShipmentView, CurrentShipmentView, \
    CreateShipmentView, UpdateShipmentView, DeleteShipmentView

urlpatterns = [
    path('cities', CitiesView.as_view()),
    path('all-shipments', AllShipmentView.as_view()),
    path('create-shipment/', CreateShipmentView.as_view()),
    path('current-shipment/<int:pk>/', CurrentShipmentView.as_view()),
    path('update-shipment/<int:pk>/', UpdateShipmentView.as_view()),
    path('delete-shipment/<int:pk>/', DeleteShipmentView.as_view()),
]
