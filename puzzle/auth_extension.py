from drf_spectacular.contrib.rest_framework_simplejwt import SimpleJWTScheme

from customjwt.authentication import CustomJWTAuthentication


class SimpleJWTTokenUserScheme(SimpleJWTScheme):
    name = "CustomJWTAuth"
    target_class = CustomJWTAuthentication
