"""
URL configuration for movie_back project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from movie_app.views import WatchListView, WatchedListView, PersonalTopView, movie_list, movie_detail, UserListView, UserDetailView, custom_login, UserWatchListView


# jwt 
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

urlpatterns = [
    path('admin/', admin.site.urls),
    # jwt
    path('api/login/', custom_login, name='custom_login'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),

    #UPDATED
    # views
    path('watchlist/', WatchListView.as_view(), name='watchlist-list'),
    # NEW
    path('watchlist/<int:pk>/', WatchListView.as_view(), name='watchlist-detail'),
    path('users/<int:user_id>/watchlist/', UserWatchListView.as_view(), name='user-watchlist'),
    
    path('watchedlist/', WatchedListView.as_view(), name='watchedlist-list'),
    path('personaltop/', PersonalTopView.as_view(), name='personaltop-list'),
    
    #ADDED
    path('personaltop/add/', PersonalTopView.as_view(), name='personaltop-add'),
    path('personaltop/delete/<int:pk>/', PersonalTopView.as_view(), name='personaltop-delete'),
    
    #model
    path('movies/', movie_list, name='movie-list'),
    path('movies/<int:pk>/', movie_detail, name='movie-detail'),

    #update for user
    path('users/', UserListView.as_view(), name='user-list'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
]
