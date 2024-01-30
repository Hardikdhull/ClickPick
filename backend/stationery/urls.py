from django.urls import path
from . import views
from . import admin_utils

urlpatterns = [    
    path('item-list/', views.GetItemList.as_view(), name='get_item_list'),
    path('active-orders/', views.GetActiveOrders.as_view(), name='get_active_orders'),
    path('past-orders/', views.GetPastOrders.as_view(), name='get_past_orders'),
    path('active-printouts/', views.GetActivePrintouts.as_view(), name='get_active_printouts'),
    path('past-printouts/', views.GetPastPrintouts.as_view(), name='get_past_printouts'),
    path('create-order/', views.MakeOrder.as_view(), name='create_order'),
    path('create-printout/', views.MakePrintout.as_view(), name='create_printout'),
    path('calculate-cost/', views.CostCalculationView.as_view(), name='calculate_cost'),
    path('generate-firstpage/', views.FirstPageGenerationView.as_view(), name='generate_firstpage'),
    path('delete_active_order/<int:order_id>/', admin_utils.delete_active_order, name='delete_active_order'),
]