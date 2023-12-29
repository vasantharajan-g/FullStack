from rest_framework import viewsets,generics
from .models import Vendor, PurchaseOrder
from .serilizer import VendorSerializer, PurchaseOrderSerializer
from django.db.models import Avg, F
import datetime
from rest_framework import permissions

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


class VendorViewSet(viewsets.ModelViewSet):
    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer
    permission_classes = [IsAuthenticated]


class PurchaseOrderViewSet(viewsets.ModelViewSet):
    queryset = PurchaseOrder.objects.all()
    serializer_class = PurchaseOrderSerializer
    permission_classes = [IsAuthenticated]


class PurchaseOrderAcknowledgeView(generics.UpdateAPIView):
    queryset = PurchaseOrder.objects.all()
    serializer_class = PurchaseOrderSerializer
    permission_classes = [IsAuthenticated]

    lookup_url_kwarg = 'po_id'

    def perform_update(self, serializer):
        serializer.save(acknowledgment_date=datetime.now())


class VendorPerformance_metrics(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, pk):
        vendor = Vendor.objects.get(pk=pk)
        self.vendor_metrics(vendor)
        data = {
            'on_time_delivery_rate': vendor.on_time_delivery_rate,
            'quality_rating_avg': vendor.quality_rating_avg,
            'average_response_time': vendor.average_response_time,
            'fulfillment_rate': vendor.fulfillment_rate,
        }
        return Response(data)

    def vendor_metrics(self, vendor):
        
        pos = PurchaseOrder.objects.filter(vendor=vendor)

        # Delevery rate
        on_time_pos = pos.filter(status='completed', delivery_date__lte=F('order_date')).count()
        completed_pos = pos.filter(status='completed').count()
        vendor.on_time_delivery_rate = (on_time_pos / completed_pos) if completed_pos > 0 else 0

        # quality rating 
        vendor.quality_rating_avg = pos.filter(status='completed').aggregate(Avg('quality_rating'))['quality_rating__avg'] or 0

        # average Raponse Time
        acknowledged_pos = pos.exclude(acknowledgment_date=None)
        response_times = acknowledged_pos.annotate(response_time=F('acknowledgment_date') - F('issue_date'))
        avg_response_time = response_times.aggregate(Avg('response_time'))['response_time__avg']
        vendor.average_response_time = avg_response_time.total_seconds() / 60 if avg_response_time else 0  # convert to minutes

        # Ffilment rate
        fulfilled_pos = pos.filter(status='completed', quality_rating__isnull=False).count()
        vendor.fulfillment_rate = (fulfilled_pos / pos.count()) if pos.count() > 0 else 0

        vendor.save()
