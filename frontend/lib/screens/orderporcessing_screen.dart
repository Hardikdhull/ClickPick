import 'package:flutter/material.dart';
import 'package:clickpic/widgets/custom_button.dart';
import 'package:clickpic/constants/colors.dart';

class OrderProcessingScreen extends StatefulWidget {
  const OrderProcessingScreen({super.key});

  @override
  State<OrderProcessingScreen> createState() => _OrderProcessingScreenState();
}

class _OrderProcessingScreenState extends State<OrderProcessingScreen> {
  bool _isProcessing = true;

  @override
  void initState() {
    super.initState();
    Future.delayed(const Duration(seconds: 3), () {
      if (mounted) {
        setState(() {
          _isProcessing = false;
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        automaticallyImplyLeading: !_isProcessing, // Hide back arrow while processing
        leading: _isProcessing ? null : const Icon(Icons.arrow_back, color: Colors.black),
      ),
      body: Center(
        child: _isProcessing ? _buildProcessingView() : _buildSuccessView(),
      ),
    );
  }
  Widget _buildProcessingView() {
    return const Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        CircularProgressIndicator(
          valueColor: AlwaysStoppedAnimation<Color>(AppColors.primary),
        ),
        SizedBox(height: 24),
        Text(
          'Processing your order...',
          style: TextStyle(fontSize: 18, color: AppColors.gray),
        ),
      ],
    );
  }
  Widget _buildSuccessView() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24.0),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const Icon(
            Icons.check_circle_outline,
            color: Colors.green,
            size: 100,
          ),
          const SizedBox(height: 24),
          const Text(
            'Order Successful!',
            textAlign: TextAlign.center,
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 12),
          const Text(
            'Thank you for your purchase. You will receive an email confirmation shortly.',
            textAlign: TextAlign.center,
            style: TextStyle(fontSize: 16, color: AppColors.gray),
          ),
          const SizedBox(height: 40),
          CustomButton(
            text: 'Back to Home',
            onTap: () {
              Navigator.of(context).pushNamedAndRemoveUntil('/', (Route<dynamic> route) => false);
            },
          ),
        ],
      ),
    );
  }
}