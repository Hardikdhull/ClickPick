import 'package:clickpic/screens/Details_screen.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:clickpic/constants/colors.dart';
import 'package:clickpic/widgets/upload_box.dart';
import 'package:clickpic/widgets/progressstepper.dart';
import '../widgets/custom_button.dart';

class UploadScreen extends StatelessWidget {
  const UploadScreen ({super.key});

  @override
  Widget build(BuildContext context){
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        leading: const Icon(Icons.arrow_back, color: Colors.black,),
        title: const Text(
          'Upload document',
          style: TextStyle(
            color: Colors.black,
            fontWeight: FontWeight.bold,
          ),
        ),
        backgroundColor: Colors.white,
        elevation: 0,
        centerTitle: true,

      ),
      body: Padding(padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 16.0,),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const ProgressStepper(currentStep: 0),
            const SizedBox(height: 12),
            const Text(
              'Upload your document',
              style: TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.bold,
                color: Colors.black,
              ),
            ),
            const SizedBox(height: 40,),
            UploadBox(
              onTap: () {
                // TODO: Handle browse file logic
              },
            ),
            const SizedBox(height: 24),
            const Text(
              'Supported file format',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: Colors.black,
              ),
            ),
            const SizedBox(height: 8),
            const Text(
              'Pdf, Jpg, Png',
              style: TextStyle(
                fontSize: 14,
                color: Colors.white,
              ),
            ),
            const Spacer(),
            CustomButton(
              text: 'Upload',
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const DetailsScreen()),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}