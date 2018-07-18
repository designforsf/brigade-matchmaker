from django.urls import path
from django.conf.urls import url, include
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
path('', views.index, name='index'),
path('create_project', views.create_project, name='create_project'),
url(r'^api/projectleads/$', views.ProjectLeadList.as_view()),
url(r'^api/projectleads/(?P<pk>[0-9]+)/$', views.ProjectLeadDetail.as_view()),
url(r'^api-auth/', include('rest_framework.urls')),
]

urlpatterns = format_suffix_patterns(urlpatterns)