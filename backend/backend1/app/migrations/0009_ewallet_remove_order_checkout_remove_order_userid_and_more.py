# Generated by Django 5.0.2 on 2024-05-14 00:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0008_checkout_order'),
    ]

    operations = [
        migrations.CreateModel(
            name='Ewallet',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField(max_length=255)),
                ('balance', models.IntegerField()),
            ],
        ),
        migrations.RemoveField(
            model_name='order',
            name='checkout',
        ),
        migrations.RemoveField(
            model_name='order',
            name='userId',
        ),
        migrations.DeleteModel(
            name='Checkout',
        ),
        migrations.DeleteModel(
            name='Order',
        ),
    ]