from django.urls import path
from django.conf.urls import url, include
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
path('', views.index, name='index'),
url(r'^api/skill/$', views.SkillList.as_view()),
url(r'^api/interest/$', views.InterestList.as_view()),
url(r'^api/goal/$', views.GoalList.as_view()),
url(r'^api/project/$', views.ProjectList.as_view()),
url(r'^api/skill/(?P<pk>[0-9]+)/$', views.SkillDetail.as_view()),
url(r'^api/interest/(?P<pk>[0-9]+)/$', views.InterestDetail.as_view()),
url(r'^api/goal/(?P<pk>[0-9]+)/$', views.GoalDetail.as_view()),
url(r'^api/project/(?P<pk>[0-9]+)/$', views.ProjectDetail.as_view()),
url(r'^api-auth/', include('rest_framework.urls')),
]

urlpatterns = format_suffix_patterns(urlpatterns)