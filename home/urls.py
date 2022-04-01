from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [

    path('admin/', admin.site.urls),
    path('api/', include('core.urls')),
]
urlpatterns +=static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)