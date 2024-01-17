from rest_framework import serializers
from . models import ActiveOrders, PastOrders, ActivePrintOuts, PastPrintOuts, Items


class ItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Items
        fields = '__all__'

class ActiveOrdersSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActiveOrders
        fields = '__all__'

class PastOrdersSerializer(serializers.ModelSerializer):
    class Meta:
        model = PastOrders
        fields = '__all__'

class ActivePrintoutsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivePrintOuts
        fields = '__all__'

class PastPrintoutsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PastPrintOuts
        fields = '__all__'