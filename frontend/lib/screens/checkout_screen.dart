import 'package:flutter/material.dart';
import 'package:clickpic/widgets/custom_button.dart';
import 'package:clickpic/widgets/custom_text_field.dart';
import 'package:clickpic/constants/colors.dart';
import 'package:clickpic/widgets/summary_row.dart';
import 'package:clickpic/widgets/progressstepper.dart';
import 'package:razorpay_flutter/razorpay_flutter.dart';

class CheckoutScreen extends StatefulWidget {
  const CheckoutScreen({super.key});

  @override
  State<CheckoutScreen> createState() => _CheckoutScreenState();
}

class _CheckoutScreenState extends State<CheckoutScreen> {
  final _cardNumberController = TextEditingController();
  final _expiryDateController = TextEditingController();
  final _cvvController = TextEditingController();

  @override
  void dispose() {
    _cardNumberController.dispose();
    _expiryDateController.dispose();
    _cvvController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        leading: const Icon(Icons.arrow_back, color: Colors.black),
        title: const Text(
          'Checkout',
          style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold),
        ),
        backgroundColor: Colors.white,
        elevation: 0,
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const ProgressStepper(currentStep: 2),
            const SizedBox(height: 32),
            const Text(
              'Order Summary',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 12),
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppColors.gray,
                borderRadius: BorderRadius.circular(12),
              ),
              child: const Column(
                children: [
                  SummaryRow(title: 'Document Print', amount: '₹50.00'),
                  SizedBox(height: 8),
                  SummaryRow(title: 'Tax & Fees', amount: '₹5.00'),
                  Divider(height: 24),
                  SummaryRow(title: 'Total', amount: '₹55.00', isTotal: true),
                ],
              ),
            ),
            const SizedBox(height: 32),
            const Text(
              'Payment Details',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 20),
            CustomTextField(
              controller: _cardNumberController,
              hintText: 'Card Number',
              keyboardType: TextInputType.number,
              width: double.infinity,
            ),
            const SizedBox(height: 16),
            Row(
              children: [
                Expanded(
                  child: CustomTextField(
                    controller: _expiryDateController,
                    hintText: 'Expiry Date (MM/YY)',
                    keyboardType: TextInputType.datetime,
                    width: double.infinity,
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: CustomTextField(
                    controller: _cvvController,
                    hintText: 'CVV',
                    keyboardType: TextInputType.number,
                    width: double.infinity,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 200),

            CustomButton(
              text: 'Pay ₹55.00',
              onTap: () {
                // TODO: Add payment processing logic

              },
            ),
          ],
        )
      ),
    );
  }
}
