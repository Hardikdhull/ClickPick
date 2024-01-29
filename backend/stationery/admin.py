from django.contrib import admin
from import_export.admin import ExportActionMixin

from django.utils.html import format_html

from . models import ActiveOrders, PastOrders, ActivePrintOuts, PastPrintOuts, Items

class ItemsAdmin(ExportActionMixin, admin.ModelAdmin):
    list_display = ['item', 'price', 'in_stock', 'image_preview']
    list_editable = ['in_stock']

class ActiveOrdersAdmin(admin.ModelAdmin):
    list_display = ['order_id', 'user', 'item', 'quantity', 'cost', 'custom_message', 'order_time', 'delete_button']
    
    # https://stackoverflow.com/questions/62047370/how-to-put-a-button-on-list-page-for-each-row-in-django-admin-page#:~:text=In%20the%20case%20of%20a,protect%20against%20various%20securit%20issues.&text=The%20values%20of%20object.id,get%20inserted%20into%20the%20placeholders.
    def delete_button(self, obj):
        return format_html(
            "<a href='/stationery/delete_active_order/{}' style='display: inline-block; padding: 10px; font-size: 14px; text-align: center; text-decoration: none; background-color: #007bff; color: #ffffff; border: 1px solid #007bff; border-radius: 5px;'>Mark as Past</a>",
            obj.order_id
        )
        
    delete_button.short_description = "Mark order as past"

class PastOrdersAdmin(admin.ModelAdmin):
    list_display = ['order_id', 'user', 'item', 'quantity', 'cost', 'custom_message', 'order_time']        
        
admin.site.register(Items, ItemsAdmin)
admin.site.register(ActiveOrders, ActiveOrdersAdmin)
admin.site.register(PastOrders, PastOrdersAdmin)