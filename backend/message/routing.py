from django.urls import re_path

from message.consumers import ChatConsumer

websocket_urlpatterns = [
    re_path(r'^ws/$', ChatConsumer.as_asgi()),
]
