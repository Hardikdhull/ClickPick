from django.contrib import admin

from . models import ActiveOrders, PastOrders, ActivePrintOuts, PastPrintOuts, Items

class ItemsAdmin(admin.ModelAdmin):
    list_display = ['item', 'price', 'in_stock', 'image_preview']
    list_editable = ['in_stock']

admin.site.register(Items, ItemsAdmin)
admin.site.register(ActiveOrders)