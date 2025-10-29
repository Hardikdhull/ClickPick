import 'package:flutter/material.dart';
import 'package:clickpic/constants/colors.dart';
import 'package:clickpic/widgets/custom_button.dart';
import 'package:clickpic/widgets/custom_text_field.dart';
import 'package:clickpic/screens/checkout_screen.dart';
import 'package:clickpic/widgets/progressstepper.dart';


class DetailsScreen extends StatefulWidget {
  const DetailsScreen({super.key});

  @override
  State<DetailsScreen> createState() => _PrintDetailsScreenState();
}

class _PrintDetailsScreenState extends State<DetailsScreen> {

  String _selectedColor = 'Black & White';
  String _selectedPageSize = 'A4';
  int _copyCount = 1;
  final _commentController = TextEditingController();

  final List<String> _colorOptions = ['Black & White', 'Colored'];
  final List<String> _pageSizeOptions = ['A1', 'A2', 'A3', 'A4', 'A5'];

  @override
  void dispose() {
    _commentController.dispose();
    super.dispose();
  }
  void _incrementCopies() {
    setState(() {
      _copyCount++;
    });
  }
  void _decrementCopies() {
    if (_copyCount > 1) {
      setState(() {
        _copyCount--;
      });
    }
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        leading: const Icon(Icons.arrow_back, color: Colors.black),
        title: const Text(
          'Print Details',
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
            const ProgressStepper(currentStep: 1),
            const SizedBox(height: 12),
            const Text(
              'Document',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.black),
            ),
            const SizedBox(height: 12),
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.grey.shade100,
                borderRadius: BorderRadius.circular(12),
              ),
              child: const Row(
                children: [
                  Icon(Icons.description, color: AppColors.purple, size: 30),
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
            const SizedBox(height: 24),
            const Text(
              'Comments',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.black),
            ),
            const SizedBox(height: 12),
            CustomTextField(
              controller: _commentController,
              hintText: 'Add special instructions (optional)',
              keyboardType: TextInputType.text,
              width: double.infinity,
            ),
            const SizedBox(height: 24),
            const Text(
              'Options',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.black),
            ),
            const SizedBox(height: 12),
            _buildDropdownRow(
              title: 'Color',
              value: _selectedColor,
              items: _colorOptions,
              onChanged: (newValue) {
                if (newValue != null) {
                  setState(() {
                    _selectedColor = newValue;
                  });
                }
              },
            ),
            _buildDropdownRow(
              title: 'Paper Size',
              value: _selectedPageSize,
              items: _pageSizeOptions,
              onChanged: (newValue) {
                if (newValue != null) {
                  setState(() {
                    _selectedPageSize = newValue;
                  });
                }
              },
            ),
            _buildCopyCounterRow(),

            const SizedBox(height: 100),
            CustomButton(
              text: 'Proceed to Payment',
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const CheckoutScreen()),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
  Widget _buildDropdownRow({
    required String title,
    required String value,
    required List<String> items,
    required ValueChanged<String?> onChanged,
  }) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            title,
            style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w500),
          ),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12.0),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(8.0),
              border: Border.all(color: AppColors.Light_gray, width: 1),
            ),
            child: DropdownButtonHideUnderline(
              child: DropdownButton<String>(
                value: value,
                items: items.map((String item) {
                  return DropdownMenuItem<String>(
                    value: item,
                    child: Text(item),
                  );
                }).toList(),
                onChanged: onChanged,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCopyCounterRow() {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          const Text(
            'Copies',
            style: TextStyle(fontSize: 16, fontWeight: FontWeight.w500),
          ),
          Container(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(8.0),
              border: Border.all(color: AppColors.Light_gray, width: 1),
            ),
            child: Row(
              children: [
                IconButton(
                  icon: const Icon(Icons.remove),
                  onPressed: _decrementCopies,
                  color: AppColors.gray,
                ),
                Text(
                  '$_copyCount',
                  style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                ),
                IconButton(
                  icon: const Icon(Icons.add),
                  onPressed: _incrementCopies,
                  color: AppColors.primary,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}