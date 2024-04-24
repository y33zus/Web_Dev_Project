from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import User, Movie, WatchList, WatchedList, PersonalTop, RecommendedList

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'nickname', 'phone_number', 'password', 'confirm_password']
        read_only_fields = ['id']
        
    def create(self, validated_data):
        validated_data.pop('confirm_password', None)  # Удалить подтверждение пароля из данных
        user = User.objects.create_user(
            nickname=validated_data['nickname'],
            phone_number=validated_data['phone_number'],
            password=validated_data['password']
        )
        return user
    
    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({"confirm_password": "Password fields didn't match."})
        return data

class MovieSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=255)
    year_of_publishing = serializers.IntegerField()
    director = serializers.CharField(max_length=255)
    genre = serializers.CharField(max_length=255)
    photo = serializers.URLField()

    def create(self, validated_data):
        return Movie.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.year_of_publishing = validated_data.get('year_of_publishing', instance.year_of_publishing)
        instance.director = validated_data.get('director', instance.director)
        instance.genre = validated_data.get('genre', instance.genre)
        instance.photo = validated_data.get('photo', instance.photo)
        instance.save()
        return instance

'''
class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ['id', 'name', 'year_of_publishing', 'director', 'genre', 'photo']
'''

class WatchListSerializer(serializers.Serializer):
    user_id = serializers.IntegerField(read_only=True)
    movie_id = serializers.IntegerField()

    def validate_movie_id(self, value):
        if not Movie.objects.filter(id=value).exists():
            raise serializers.ValidationError("Movie with the given ID does not exist.")
        return value

    def create(self, validated_data):
        user = self.context['request'].user
        movie_id = validated_data['movie_id']
        movie = Movie.objects.get(id=movie_id)
        watchlist_item, created = WatchList.objects.get_or_create(user=user, movie=movie)
        return watchlist_item

    def to_representation(self, instance):
        return {
            'user_id': instance.user.id,
            'movie_id': instance.movie.id
        }

'''
class WatchListSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.id')
    movie = serializers.PrimaryKeyRelatedField(queryset=Movie.objects.all())

    class Meta:
        model = WatchList
        fields = ['user', 'movie']

    def create(self, validated_data):
        user = self.context['request'].user
        watchlist_item, created = WatchList.objects.get_or_create(user=user, **validated_data)
        return watchlist_item
'''


class WatchedListSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.id')
    movie = serializers.PrimaryKeyRelatedField(queryset=Movie.objects.all())

    class Meta:
        model = WatchedList
        fields = ['user', 'movie']

    def create(self, validated_data):
        user = self.context['request'].user
        watched_item, created = WatchedList.objects.get_or_create(user=user, **validated_data)
        return watched_item


class PersonalTopSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.id')  
    movie_id = serializers.PrimaryKeyRelatedField(queryset=Movie.objects.all(), source='movie')

    class Meta:
        model = PersonalTop
        fields = ['user', 'movie_id', 'movie_position']

    def validate(self, data):
        user = self.context['request'].user
        movie_position = data['movie_position']
        if PersonalTop.objects.filter(user=user, movie_position=movie_position).exists():
            raise serializers.ValidationError({"movie_position": "This position is already occupied."})
        return data

    def create(self, validated_data):
        user = self.context['request'].user
        return PersonalTop.objects.create(user=user, **validated_data)

    def update(self, instance, validated_data):
        instance.movie = validated_data.get('movie', instance.movie)
        instance.movie_position = validated_data.get('movie_position', instance.movie_position)
        instance.save()
        return instance

'''
Create 
'''
class RecommendedListSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    movie = MovieSerializer()  

    class Meta:
        model = RecommendedList
        fields = ['user', 'movie', 'recommendation_reason']