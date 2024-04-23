from django.contrib import admin
from .models import User, Movie, WatchList, WatchedList, PersonalTop
# Register your models here.

admin.site.register(User)
admin.site.register(Movie)
admin.site.register(WatchList)
admin.site.register(WatchedList)
admin.site.register(PersonalTop)