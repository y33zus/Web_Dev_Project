from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

class Command(BaseCommand):
    help = 'Create a superuser without is_staff attribute'

    def handle(self, *args, **options):
        User = get_user_model()
        User.objects.create_superuser('lomai', 'lomai@lomai.com', 'lomaipass')
        self.stdout.write(self.style.SUCCESS('Superuser created successfully'))
