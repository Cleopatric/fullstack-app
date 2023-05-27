from django.conf import settings
from django.core.cache import cache
from django.db.models.query import QuerySet


class CacheMixin:

    @staticmethod
    def get_qs_from_cache(cache_key: str) -> QuerySet:
        return cache.get(cache_key)

    @staticmethod
    def save_qs_to_cache(cache_key: str, queryset: QuerySet) -> None:
        cache.set(cache_key, queryset, settings.CACHE_TIME)

    @staticmethod
    def delete_from_cache(cache_key: str) -> None:
        cache.delete_many(keys=cache.keys(f'{cache_key}*'))
