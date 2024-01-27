from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from . models import ActiveOrders, PastOrders, ActivePrintOuts, PastPrintOuts, Items
from . serializers import ActiveOrdersSerializer, PastOrdersSerializer, ActivePrintoutsSerializer, PastPrintoutsSerializer, ItemsSerializer


class GetItemList(APIView):
    
    permission_classes = (IsAuthenticated, )

    def get(self, request):

        all_items = Items.objects.all()
        serializer = ItemsSerializer(all_items, many=True)

        
        return Response(serializer.data, status=status.HTTP_200_OK)


class GetActiveOrders(APIView):

    permission_classes = (IsAuthenticated, )

    def get(self, request):
        
        all_orders = ActiveOrders.objects.filter(user=request.user)
        serializer = ActiveOrdersSerializer(all_orders, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class GetPastOrders(APIView):

    permission_classes = (IsAuthenticated, )

    def get(self, request):
        
        all_orders = PastOrders.objects.filter(user=request.user)
        serializer = PastOrdersSerializer(all_orders, many=True)


        return Response(serializer.data, status=status.HTTP_200_OK)

class GetActivePrintouts(APIView):

    permission_classes = (IsAuthenticated, )

    def get(self, request):
        
        all_orders = ActivePrintOuts.objects.filter(user=request.user)
        serializer = ActivePrintoutsSerializer(all_orders, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class GetPastPrintouts(APIView):

    permission_classes = (IsAuthenticated, )

    def get(self, request):
        
        all_orders = PastPrintOuts.objects.filter(user=request.user)
        serializer = PastPrintoutsSerializer(all_orders, many=True)

        
        return Response(serializer.data, status=status.HTTP_200_OK)

        
class MakeOrder(APIView):

    permission_classes = (IsAuthenticated, )

    def post(self, request):

        # key value pair is coming
        # key is named 'orders', value is a list of orders
        # {
        #   'orders': [ {'item' : RING_FILE, 'quantity': 2, 'cost': 40}, {'item' : PEN, 'quantity': 3, 'cost': 30}, ]
        # }

        orders = request.data.get('orders')

        for order in orders:
            data = {
                'user' : request.user.pk,
                'item' : Items.objects.filter(item=order['item']).first().pk,
                'quantity' : int(order['quantity']),
                'cost' : float(order['cost']),
                'custom_message' : order['custom_message'],
            }

            serializer = ActiveOrdersSerializer(data=data)

            if serializer.is_valid():
                serializer.save()
            else:
                return Response({'message': 'Order Creation Failed'}, status=status.HTTP_400_BAD_REQUEST)
            
        return Response({'message': 'Orders Created Successfully'}, status=status.HTTP_200_OK)
    
class MakePrintout(APIView):

    permission_classes = (IsAuthenticated, )

    def post(self, request):

        data = request.data
        data._mutable = True
        data['user'] = request.user
        data['cost'] = float(request.data.get('cost'))
        data._mutable = False

        serializer = ActivePrintoutsSerializer(data=data)

        if serializer.is_valid():
            return Response({'message': 'Printout Order Created Successfully'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'Printout Order Creation Failed'}, status=status.HTTP_400_BAD_REQUEST)
            

