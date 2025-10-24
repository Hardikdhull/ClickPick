import 'package:flutter/material.dart';
import 'package:clickpic/constants/colors.dart';
import 'package:clickpic/widgets/notification_title.dart';

class NotificationScreen extends StatelessWidget {
  const NotificationScreen({super.key});

  final List<Map<String, dynamic>> notifications = const [
    {
      'icon': Icons.check_circle,
      'title': 'Order Successful',
      'subtitle': 'Your order #12345 has been confirmed.',
      'time': '5 min ago'
    },
    {
      'icon': Icons.local_shipping,
      'title': 'Order Shipped',
      'subtitle': 'Your order #12344 is on its way.',
      'time': '1 hour ago'
    },
    {
      'icon': Icons.delivery_dining,
      'title': 'Order Delivered',
      'subtitle': 'Your order #12343 has been delivered.',
      'time': '1 day ago'
    },
    {
      'icon': Icons.campaign,
      'title': 'New Promo!',
      'subtitle': 'Get 20% off your next print order.',
      'time': '2 days ago'
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.gray.withOpacity(50),
      appBar: AppBar(
        leading: const Icon(Icons.arrow_back, color: Colors.black),
        title: const Text(
          'Notifications',
          style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold),
        ),
        backgroundColor: Colors.white,
        elevation: 1,
        centerTitle: true,
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(16.0),
        itemCount: notifications.length,
        itemBuilder: (context, index) {
          final notification = notifications[index];
          return NotificationTile(
            title: notification['title'],
            subtitle: notification['subtitle'],
            timestamp: notification['time'],
            icon: notification['icon'],
          );
        },
      ),
    );
  }
}