from django.shortcuts import redirect
from . models import ActiveOrders, PastOrders, ActivePrintOuts, PastPrintOuts

def delete_active_order(request, order_id):
    
    active_order = ActiveOrders.objects.get(order_id=order_id)

    new_past_order = PastOrders(order_id=order_id, user=active_order.user, item=active_order.item,
                                quantity=active_order.quantity, cost=active_order.cost,
                                custom_message=active_order.custom_message, order_time=active_order.order_time)

    new_past_order.save()
    active_order.delete()
    
    return redirect('/admin/stationery/activeorders/')

def delete_active_printout(request, order_id):
    
    active_printout = ActivePrintOuts.objects.get(order_id=order_id)

    new_past_printout = PastPrintOuts(order_id=order_id, user=active_printout.user, coloured_pages=active_printout.coloured_pages,
                                black_and_white_pages=active_printout.black_and_white_pages, cost=active_printout.cost,
                                custom_message=active_printout.custom_message, order_time=active_printout.order_time,
                                file=active_printout.file)

    new_past_printout.save()
    active_printout.delete()
    
    return redirect('/admin/stationery/activeprintouts/')