from django.urls import path
from django.conf.urls import url, include
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
path('', views.index, name='index'),
url(r'^api/skillstaxonomy/$', views.SkillsTaxonomyList.as_view()),
url(r'^api/intereststaxonomy/$', views.InterestsTaxonomyList.as_view()),
url(r'^api/goalstaxonomy/$', views.GoalsTaxonomyList.as_view()),
url(r'^api/projectleads/$', views.ProjectLeadList.as_view()),
url(r'^api/projects/$', views.ProjectList.as_view()),
url(r'^api/skillstaxonomy/(?P<pk>[0-9]+)/$', views.SkillsTaxonomyDetail.as_view()),
url(r'^api/intereststaxonomy/(?P<pk>[0-9]+)/$', views.InterestsTaxonomyDetail.as_view()),
url(r'^api/goalstaxonomy/(?P<pk>[0-9]+)/$', views.GoalsTaxonomyDetail.as_view()),
url(r'^api/projectleads/(?P<pk>[0-9]+)/$', views.ProjectLeadDetail.as_view()),
url(r'^api/projects/(?P<pk>[0-9]+)/$', views.ProjectDetail.as_view()),
url(r'^api-auth/', include('rest_framework.urls')),
]

urlpatterns = format_suffix_patterns(urlpatterns)