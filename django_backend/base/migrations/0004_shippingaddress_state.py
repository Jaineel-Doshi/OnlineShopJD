# Generated by Django 4.0.6 on 2022-07-26 20:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_product_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='shippingaddress',
            name='state',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
