from rest_framework import serializers
from .models import Vendor, PurchaseOrder, VendorPerformance

class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = '__all__'

class PurchaseOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseOrder
        fields = '__all__'

class VendorPerformanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = VendorPerformance
        fields = '__all__'