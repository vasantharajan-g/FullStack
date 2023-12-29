from django.contrib import admin
from django.urls import path,include
from rest_framework.routers import DefaultRouter
from vendor_profile_mgmt.views import VendorViewSet,PurchaseOrderViewSet,PurchaseOrderAcknowledgeView,VendorPerformance_metrics

router = DefaultRouter()

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('/api/vendors/{vendor_id}', VendorPerformance_metrics),
# ]   

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api/purchase_orders/<int:po_id>/acknowledge', PurchaseOrderAcknowledgeView.as_view(), name='purchaseorder-acknowledge'),
    path('api/vendors/{vendor_id}/performance',VendorPerformance_metrics,name="Performance_metrics")

]

router.register(r'vendors', VendorViewSet, basename='vendor')
urlpatterns = router.urls

router.register(r'purchase_orders', PurchaseOrderViewSet, basename='purchase_order')
urlpatterns = router.urls

