from channels.routing import ProtocolTypeRouter, URLRouter
from channels.sessions import CookieMiddleware, SessionMiddleware
from django.core.asgi import get_asgi_application
from message import routing
import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "PriceAnalysis.settings")
asgi = get_asgi_application()

application = ProtocolTypeRouter({
    "http": asgi,
    "websocket": CookieMiddleware(SessionMiddleware(URLRouter(routing.websocket_urlpatterns))),
})
