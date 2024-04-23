# Generated by Django 5.0.4 on 2024-04-22 23:48

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('year_of_publishing', models.IntegerField()),
                ('director', models.CharField(max_length=255)),
                ('genre', models.CharField(max_length=255)),
                ('photo', models.URLField()),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('nickname', models.CharField(max_length=255, unique=True)),
                ('phone_number', models.CharField(max_length=255, unique=True)),
                ('password', models.CharField(max_length=255)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='RecommendedList',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('recommendation_reason', models.CharField(blank=True, max_length=255)),
                ('movie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='movie_app.movie')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='movie_app.user')),
            ],
        ),
        migrations.CreateModel(
            name='PersonalTop',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('movie_position', models.IntegerField()),
                ('movie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='movie_app.movie')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='movie_app.user')),
            ],
            options={
                'unique_together': {('user', 'movie_position')},
            },
        ),
        migrations.CreateModel(
            name='WatchedList',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('movie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='movie_app.movie')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='movie_app.user')),
            ],
            options={
                'unique_together': {('user', 'movie')},
            },
        ),
        migrations.CreateModel(
            name='WatchList',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('movie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='movie_app.movie')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='movie_app.user')),
            ],
            options={
                'unique_together': {('user', 'movie')},
            },
        ),
    ]