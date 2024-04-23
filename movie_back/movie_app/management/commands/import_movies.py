import requests
from django.core.management.base import BaseCommand
from movie_app.models import Movie


class Command(BaseCommand):
    help = 'Loads movies from OMDb API using titles from a provided list'

    def handle(self, *args, **options):
        api_key = '16456bcd'
        movies_loaded = 0

        for title in top_100_movies_titles:
            # Поиск фильма по названию
            search_url = f'http://www.omdbapi.com/?apikey={api_key}&t={title}'
            response = requests.get(search_url)

            if response.status_code == 200:
                movie_data = response.json()
                if movie_data.get('Response') == 'True':
                    # Добавляем или обновляем фильм в базе данных по названию и году выпуска
                    movie, created = Movie.objects.update_or_create(
                        name=movie_data.get('Title'),
                        year_of_publishing=int(movie_data.get('Year', 0)),
                        defaults={
                            'director': movie_data.get('Director'),
                            'genre': movie_data.get('Genre'),
                            'photo': movie_data.get('Poster')
                        }
                    )
                    if created:
                        self.stdout.write(self.style.SUCCESS(f'Successfully added movie {title}'))
                        movies_loaded += 1
                    else:
                        self.stdout.write(self.style.WARNING(f'Updated movie {title}'))
                else:
                    self.stdout.write(self.style.ERROR(f'Search failed for title "{title}": ' + movie_data.get('Error')))
            else:
                self.stdout.write(self.style.ERROR(f'HTTP request failed for title "{title}" with status code {response.status_code}'))

        self.stdout.write(self.style.SUCCESS(f'Total movies loaded/updated: {movies_loaded}'))


top_100_movies_titles = [
    "The Shawshank Redemption", "The Godfather", "The Godfather Part II", "The Dark Knight",
    "12 Angry Men", "Schindler's List", "The Lord of the Rings: The Return of the King", "Pulp Fiction",
    "The Good, the Bad and the Ugly", "Fight Club", "The Lord of the Rings: The Fellowship of the Ring",
    "Forrest Gump", "Star Wars: Episode V - The Empire Strikes Back", "Inception",
    "The Lord of the Rings: The Two Towers", "One Flew Over the Cuckoo's Nest", "Goodfellas",
    "The Matrix", "Seven Samurai", "City of God", "Se7en", "The Silence of the Lambs",
    "It's a Wonderful Life", "Life Is Beautiful", "The Usual Suspects", "Léon: The Professional",
    "Spirited Away", "Saving Private Ryan", "Coco", "American History X", "Interstellar",
    "The Green Mile", "Psycho", "The Pianist", "The Departed", "Terminator 2: Judgment Day",
    "Back to the Future", "Whiplash", "The Prestige", "The Lion King", "Gladiator",
    "The Intouchables", "Apocalypse Now", "Alien", "Sunset Boulevard", "Dr. Strangelove",
    "The Great Dictator", "Cinema Paradiso", "The Lives of Others", "Grave of the Fireflies",
    "Paths of Glory", "Django Unchained", "The Shining", "WALL·E", "American Beauty",
    "The Dark Knight Rises", "Princess Mononoke", "Aliens", "Oldboy", "Once Upon a Time in the West",
    "Witness for the Prosecution", "Das Boot", "Citizen Kane", "North by Northwest",
    "Vertigo", "Star Wars: Episode IV - A New Hope", "Reservoir Dogs", "Braveheart",
    "M", "Requiem for a Dream", "Amélie", "A Clockwork Orange", "Like Stars on Earth",
    "Taxi Driver", "Lawrence of Arabia", "Double Indemnity", "Eternal Sunshine of the Spotless Mind",
    "Amadeus", "To Kill a Mockingbird", "Toy Story 3", "Logan", "Full Metal Jacket",
    "Dangal", "The Sting", "2001: A Space Odyssey", "Singin' in the Rain", "Toy Story",
    "Bicycle Thieves", "The Kid", "Inglourious Basterds", "Snatch", "3 Idiots",
    "Monty Python and the Holy Grail"
]