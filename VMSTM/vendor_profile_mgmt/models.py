from django.db import models
from django.db.models.signals import post_save
from django.conf import settings
from rest_framework.authtoken.models import Token



def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

post_save.connect(create_auth_token, sender=settings.AUTH_USER_MODEL)


class Vendor(models.Model):
    name = models.CharField(max_length=255)
    contact_details = models.TextField()
    address = models.TextField()
    vendor_code = models.CharField(max_length=255, unique=True)
    on_time_delivery_rate = models.FloatField()
    quality_rating_avg = models.FloatField()
    average_response_time = models.FloatField()
    fulfillment_rate = models.FloatField()

    def __str__(self):
        return self.name
    

class PurchaseOrder(models.Model):
    po_number = models.CharField(max_length=255, unique=True)
    vendor = models.ForeignKey('Vendor', on_delete=models.CASCADE)
    order_date = models.DateTimeField()
    delivery_date = models.DateTimeField()
    items = models.JSONField()   # sqlite Db
    #  items = models.JSONField()  # Use this db postgres
    quantity = models.IntegerField()
    status = models.CharField(max_length=255)
    quality_rating = models.FloatField(null=True)
    issue_date = models.DateTimeField()
    acknowledgment_date = models.DateTimeField(null=True)

    def __str__(self):
        return self.po_number    
    
class VendorPerformance(models.Model):
    vendor = models.ForeignKey('Vendor', on_delete=models.CASCADE)
    date = models.DateTimeField()
    on_time_delivery_rate = models.FloatField()
    quality_rating_avg = models.FloatField()
    average_response_time = models.FloatField()
    fulfillment_rate = models.FloatField()

    def __str__(self):
        return f'{self.vendor.name} performance on {self.date}'    
    
