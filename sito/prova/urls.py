"""
    File generato da me, poichè meglio avere un urls.py per ogni app al posto di uno generale per l'intero progetto
"""

from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home")
]
