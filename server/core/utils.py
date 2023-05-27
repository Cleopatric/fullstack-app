from functools import wraps


def cache_wrapper(cache_key):
    def actual_decorator(func):
        @wraps(func)
        def wrapper(self, *func_args, **func_kwargs):
            data = self.get_qs_from_cache(cache_key)

            if data:
                return data

            qs = func(self, *func_args, **func_kwargs)
            self.save_qs_to_cache(cache_key, qs)
            return qs

        return wrapper

    return actual_decorator
