from django.urls import path
from .views import *

urlpatterns = [
    # test.py
    path("test/auth", test_auth),
    path("test/no-auth", test_no_auth),

    # authentication routes
    path("auth/generate-otp", generate_otp),
    path("auth/validate-otp", validate_otp),
    path("auth/phone", get_phone_number),

    # gt_webhook.py
    path('gl-webhook/', gl_webhook),

    # chat.py
    path('chat/conversations/', get_my_conversations),
    path('chat/messages/<int:sender_phone>', get_my_messages),
    path('chat/users/', get_all_users),

    # notification.py
    path('notification/send/<int:officer_id>',
         send_notification_to_bandobas_officer),
    path('network-admin/register-device/', register_network_admin_device),

    # trips.py
    path('trips/all/', get_all_trips),
    path('trips/end/', end_trip),

    # bus.py
    path('buses/', BusListAPIView.as_view(), name='bus-list'),
    path('buses/<int:pk>/', BusDetailAPIView.as_view(), name='bus-detail'),
]
