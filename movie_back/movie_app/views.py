from django.shortcuts import render, get_object_or_404
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import User, Movie, WatchList, WatchedList, PersonalTop, RecommendedList
from .serializers import UserSerializer, MovieSerializer, WatchListSerializer, WatchedListSerializer, PersonalTopSerializer

# Create your views here.


# UPDATED 
# jwt login
@api_view(['POST'])
@permission_classes([AllowAny])
def custom_login(request):
    phone_number = request.data.get('phone_number')
    password = request.data.get('password')

    if not phone_number or not password:
        return Response({"error": "Phone number and password are required."}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(username=phone_number, password=password)
    print(phone_number, password)
    if user:
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user_id': user.id
        }, status=status.HTTP_200_OK)  
    else:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)   
 
 # NEW VIEW ADDED
 
class UserListView(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserDetailView(APIView):
    def get(self, request, pk):
        user = get_object_or_404(User, pk=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self, request, pk):
        user = get_object_or_404(User, pk=pk)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        user = get_object_or_404(User, pk=pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
 
 
 
# movie as fbv

@api_view(['GET', 'POST'])
def movie_list(request):
    if request.method == 'GET':
        movies = Movie.objects.all()
        serializer = MovieSerializer(movies, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = MovieSerializer(data=request.data)
        if serializer.is_valid():
            # Мы должны явно сохранить данные, вместо использования serializer.save()
            data = serializer.validated_data
            movie = Movie.objects.create(**data)
            return Response(MovieSerializer(movie).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def movie_detail(request, pk):
    try:
        movie = Movie.objects.get(pk=pk)
    except Movie.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = MovieSerializer(movie)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = MovieSerializer(movie, data=request.data)
        if serializer.is_valid():
            # Обновляем каждое поле вручную
            movie.name = serializer.validated_data.get('name', movie.name)
            movie.year_of_publishing = serializer.validated_data.get('year_of_publishing', movie.year_of_publishing)
            movie.director = serializer.validated_data.get('director', movie.director)
            movie.genre = serializer.validated_data.get('genre', movie.genre)
            movie.photo = serializer.validated_data.get('photo', movie.photo)
            movie.save()
            return Response(MovieSerializer(movie).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        movie.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


'''
@api_view(['GET', 'POST'])
def movie_list(request):
    if request.method == 'GET':
        movies = Movie.objects.all()
        serializer = MovieSerializer(movies, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = MovieSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET', 'PUT', 'DELETE'])
def movie_detail(request, pk):
    """
    Retrieve, update or delete a movie.
    """
    try:
        movie = Movie.objects.get(pk=pk)
    except Movie.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = MovieSerializer(movie)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = MovieSerializer(movie, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        movie.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
'''

# views for models
class UserView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                'message': 'User created successfully',
                'user_id': user.id
            }, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class WatchListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        watchlist_items = WatchList.objects.filter(user=request.user).prefetch_related('movie')
        # Теперь сериализуем items вручную для представления
        serializer = WatchListSerializer(watchlist_items, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = WatchListSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            watchlist_item = serializer.save()
            return Response(WatchListSerializer(watchlist_item).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            watchlist_item = WatchList.objects.get(user=request.user, pk=pk)
            watchlist_item.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except WatchList.DoesNotExist:
            return Response({'error': 'Watchlist item not found'}, status=status.HTTP_404_NOT_FOUND)

'''
class WatchListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        watchlist_items = WatchList.objects.filter(user=request.user).prefetch_related('movie')
        serializer = WatchListSerializer(watchlist_items, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = WatchListSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            watchlist_item = WatchList.objects.get(user=request.user, pk=pk)
            watchlist_item.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except WatchList.DoesNotExist:
            return Response({'error': 'Watchlist item not found'}, status=status.HTTP_404_NOT_FOUND)
'''       


class WatchedListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        watched_items = WatchedList.objects.filter(user=request.user).prefetch_related('movie')
        serializer = WatchedListSerializer(watched_items, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = WatchedListSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            watched_item = WatchedList.objects.get(user=request.user, pk=pk)
            watched_item.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except WatchedList.DoesNotExist:
            return Response({'error': 'Watched item not found'}, status=status.HTTP_404_NOT_FOUND)
        


class PersonalTopView(APIView):
    permission_classes = [IsAuthenticated]

    # getting top from user
    def get(self, request):
        personal_top_items = PersonalTop.objects.filter(user=request.user)
        serializer = PersonalTopSerializer(personal_top_items, many=True)
        return Response(serializer.data)

    #adding new film into top
    def post(self, request):
        serializer = PersonalTopSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            # Checking if movie exists on current position
            movie_position = serializer.validated_data.get('movie_position')
            movie = serializer.validated_data.get('movie')
            personal_top_item, created = PersonalTop.objects.update_or_create(
                user=request.user, movie_position=movie_position,
                defaults={'movie': movie}
            )
            if created:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk=None):
        # deliting movie by id
        if pk is not None:
            try:
                personal_top_item = PersonalTop.objects.get(user=request.user, pk=pk)
                personal_top_item.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            except PersonalTop.DoesNotExist:
                return Response({'error': 'Top item not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Deleting all top
            PersonalTop.objects.filter(user=request.user).delete()
            return Response({'message': 'All top items deleted successfully'}, status=status.HTTP_204_NO_CONTENT)