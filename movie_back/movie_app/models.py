from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

# Create your models here.

#менеджер
class UserManager(BaseUserManager):
    def create_user(self, nickname, phone_number, password=None):
        if not phone_number:
            raise ValueError('Users must have a phone number')
        user = self.model(nickname=nickname, phone_number=phone_number)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, nickname, phone_number, password):
        user = self.create_user(nickname, phone_number, password)
        user.is_admin = True
        user.save(using=self._db)
        return user

#обычный (абичний) юзер
class User(AbstractBaseUser):
    nickname = models.CharField(max_length=255, unique=True)
    phone_number = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    
    objects = UserManager()
    
    USERNAME_FIELD = 'phone_number'
    REQUIRED_FIELDS = ['nickname']

    def __str__(self):
        return self.nickname
    
#модель фильма
class Movie(models.Model):
    name = models.CharField(max_length=255)
    year_of_publishing = models.IntegerField()
    director = models.CharField(max_length=255)
    genre = models.CharField(max_length=255)
    photo = models.URLField()

    def __str__(self):
        return f"{self.name} ({self.year_of_publishing})"
    

#фильмы, которые юзер хочет посмотреть
class WatchList(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)

    #только уникальные пары
    class Meta:
        unique_together = ('user', 'movie')

    def __str__(self):
        return f"{self.user.nickname} wants to watch {self.movie.name}"


#фильмы, которые юзер уже посмотрел
class WatchedList(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)

    #уникальные пары
    class Meta:
        unique_together = ('user', 'movie')

    def __str__(self):
        return f"{self.user.nickname} watched {self.movie.name}"


#топ фильмов юзера
class PersonalTop(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    movie_position = models.IntegerField()

    class Meta:
        unique_together = ('user', 'movie_position')

    def __str__(self):
        return f"{self.user.nickname}'s top {self.movie_position} movie: {self.movie.name}"


#рекомендованные юзеру фильмы
class RecommendedList(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    recommendation_reason = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f"Recommended for {self.user.nickname}: {self.movie.name} because {self.recommendation_reason}"
