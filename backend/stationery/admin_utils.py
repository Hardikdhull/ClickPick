from django.shortcuts import redirect
from . models import ActiveOrders, PastOrders

def delete_active_order(request, order_id):
    
    active_order = ActiveOrders.objects.get(order_id=order_id)

    new_past_order = PastOrders(order_id=order_id, user=active_order.user, item=active_order.item,
                                quantity=active_order.quantity, cost=active_order.cost,
                                custom_message=active_order.custom_message, order_time=active_order.order_time)

    new_past_order.save()
    active_order.delete()
    
    return redirect('/admin/stationery/activeorders/')