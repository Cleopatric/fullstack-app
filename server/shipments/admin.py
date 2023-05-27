from django.contrib import admin

from shipments.models import City, Shipment


@admin.register(City)
class CategoriesAdmin(admin.ModelAdmin):
    list_display = ('name', 'id',)
    search_fields = ('name',)


@admin.register(Shipment)
class ShipmentAdmin(admin.ModelAdmin):
    search_fields = ('title', 'direction__name',)
    list_display = ('title', 'direction', 'date', 'id',)
    list_select_related = ['direction', ]
    raw_id_fields = ['direction', ]
    list_filter = ('direction',)
    ordering = ['-id', ]
