from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from . models import ActiveOrders, PastOrders, ActivePrintOuts, PastPrintOuts, Items, TempFileStorage
from . serializers import ActiveOrdersSerializer, PastOrdersSerializer, ActivePrintoutsSerializer, PastPrintoutsSerializer, ItemsSerializer
from django.core.files.storage import default_storage
from .calculate_cost import check_black_content
from pathlib import Path
from django.core.files.base import ContentFile
# To get all Items
class GetItemList(APIView):
    
    permission_classes = (IsAuthenticated, )

    def get(self, request):

        all_items = Items.objects.all()
        serializer = ItemsSerializer(all_items, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)

# To get all active orders of the logged in user
class GetActiveOrders(APIView):

    permission_classes = (IsAuthenticated, )

    def get(self, request):
        
        all_orders = ActiveOrders.objects.filter(user=request.user)
        serializer = ActiveOrdersSerializer(all_orders, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

# To get all past orders of the logged in user
class GetPastOrders(APIView):

    permission_classes = (IsAuthenticated, )

    def get(self, request):
        
        all_orders = PastOrders.objects.filter(user=request.user)
        serializer = PastOrdersSerializer(all_orders, many=True)


        return Response(serializer.data, status=status.HTTP_200_OK)

# To get all active printouts of the logged in user
class GetActivePrintouts(APIView):

    permission_classes = (IsAuthenticated, )

    def get(self, request):
        
        all_orders = ActivePrintOuts.objects.filter(user=request.user)
        serializer = ActivePrintoutsSerializer(all_orders, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

# To get all past printouts of the logged in user
class GetPastPrintouts(APIView):

    permission_classes = (IsAuthenticated, )

    def get(self, request):
        
        all_orders = PastPrintOuts.objects.filter(user=request.user)
        serializer = PastPrintoutsSerializer(all_orders, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

# To create a single order or multiple orders at once
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

# To create a single printout order    
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
            serializer.save()
            return Response({'message': 'Printout Order Created Successfully'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'Printout Order Creation Failed'}, status=status.HTTP_400_BAD_REQUEST)
        
class CostCalculationView(APIView):

    def post(self, request):
        files = request.FILES.getlist('files')
        pages = request.data.getlist('pages')

        cost = 0

        try:
            n = len(files)

            for i in range(n):
                file = files[i]
                page = pages[i]

                # Save the file temporarily
                temp_file = default_storage.save('temp_files/' + file.name, ContentFile(file.read()))

                # Full path to the temporarily saved file
                temp_path = default_storage.path(temp_file)

                # Assuming check_black_content function is available
                black_pages, non_black_pages = check_black_content.check_black_content(pdf_path=temp_path, page_ranges=page)

                cost += 2.0 * len(non_black_pages)
                cost += 3.0 * len(black_pages)
                print(black_pages)
                print(non_black_pages)
                # Delete the temporarily saved file
                default_storage.delete(temp_file)

            return Response({'cost': cost}, status=status.HTTP_200_OK)

        except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

                
            
            

