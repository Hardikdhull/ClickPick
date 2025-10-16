import 'package:clickpic/constants/colors.dart' show AppColors;
import 'package:clickpic/widgets/print_row.dart';
import 'package:clickpic/widgets/custom_button.dart';
import 'package:flutter/material.dart';


class DetailsScreen extends StatelessWidget {
  const DetailsScreen ({super.key});

  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        leading: const Icon(Icons.arrow_back, color: Colors.black ),
        title: const Text(
          'Print Details',
          style: TextStyle(color : Colors.black, fontWeight: FontWeight.bold),
        ),
        backgroundColor: Colors.white,
        elevation: 0,
        centerTitle: true,
      ),
      body: Padding(padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Document',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.black),
            ),
            const SizedBox(height: 12),
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(12),
              ),
              child: const Row(
                children: [
                  Icon(Icons.description, color: AppColors.primary, size: 30),
                  SizedBox(width: 16),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'My_Resume.pdf',
                        style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                      ),
                      Text('1.2 MB', style: TextStyle(color: AppColors.gray)),
                    ],
                  ),

                ],
              ),
            ),
            const SizedBox(height: 32),
            const Text(
              'Options',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.black),
            ),
            const SizedBox(height: 12),
            PrintRow(
              icon: Icons.copy,
              title: 'Copies',
              value: '1',
              onTap: () {},
            ),
            PrintRow(
              icon: Icons.color_lens,
              title: 'Color',
              value: 'Black & White',
              onTap: () {},
            ),
            PrintRow(
              icon: Icons.find_in_page,
              title: 'Paper Size',
              value: 'A4',
              onTap: () {},
            ),
            const Spacer(),
            CustomButton(
              text: 'Proceed to Payment',
              onTap: () {
                // TODO: Handle navigation to payment or cart
              },
            ),
          ],
        ),
      ),
    );
  }
}