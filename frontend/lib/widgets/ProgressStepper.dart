import 'package:flutter/material.dart';
import 'package:clickpic/constants/colors.dart'; // Import your AppColors

class ProgressStepper extends StatelessWidget {
  /// The current step, 0-indexed (0 = Upload, 1 = Details, 2 = Checkout).
  final int currentStep;

  const ProgressStepper({super.key, required this.currentStep});

  @override
  Widget build(BuildContext context) {
    const double stepNodeRadius = 16.0;
    const double stepNodeDiameter = stepNodeRadius * 2;

    return LayoutBuilder(
      builder: (context, constraints) {
        final double totalWidth = constraints.maxWidth;
        final double lineTotalWidth = totalWidth - stepNodeDiameter;
        final double progressWidth = lineTotalWidth * (currentStep / 2.0);

        return SizedBox(
          width: totalWidth,
          height: 60, // Height to fit circle and text
          child: Stack(
            alignment: Alignment.center,
            children: [
              // --- 1. The Lines ---
              Positioned(
                left: stepNodeRadius,
                right: stepNodeRadius,
                top: stepNodeRadius,
                child: Container(
                  height: 2.0,
                  color: AppColors.Light_gray,
                ),
              ),
              Positioned(
                top: stepNodeRadius,
                left: stepNodeRadius,
                child: AnimatedContainer(
                  duration: const Duration(milliseconds: 300),
                  height: 2.0,
                  width: progressWidth,
                  color: AppColors.primary,
                ),
              ),

              // --- 2. The Circles and Text ---
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  _buildStepNode(
                    title: 'Upload',
                    icon: Icons.cloud_upload_outlined, // Added icon
                    stepIndex: 0,
                    radius: stepNodeRadius,
                  ),
                  _buildStepNode(
                    title: 'Details',
                    icon: Icons.list_alt_outlined, // Added icon
                    stepIndex: 1,
                    radius: stepNodeRadius,
                  ),
                  _buildStepNode(
                    title: 'Checkout',
                    icon: Icons.payment_outlined, // Added icon
                    stepIndex: 2,
                    radius: stepNodeRadius,
                  ),
                ],
              ),
            ],
          ),
        );
      },
    );
  }

  // Helper widget to build each step (circle + icon + text)
  Widget _buildStepNode({
    required String title,
    required IconData icon, // Icon is now a required parameter
    required int stepIndex,
    required double radius,
  }) {
    final bool isActive = currentStep == stepIndex;
    final bool isCompleted = currentStep > stepIndex;

    Color circleColor;
    Color iconColor;
    Widget iconChild;

    if (isCompleted) {
      circleColor = AppColors.primary;
      iconChild = const Icon(Icons.check, color: Colors.white, size: 16);
    } else if (isActive) {
      circleColor = AppColors.primary.withOpacity(0.2);
      iconColor = AppColors.primary;
      iconChild = Icon(icon, color: iconColor, size: 18); // Use the step's icon
    } else {
      circleColor = AppColors.Light_gray.withOpacity(0.5); // Lighter gray
      iconColor = AppColors.gray;
      iconChild = Icon(icon, color: iconColor, size: 18); // Use the step's icon
    }

    return Column(
      children: [
        CircleAvatar(
          radius: radius,
          backgroundColor: circleColor,
          child: iconChild, // Use the new iconChild
        ),
        const SizedBox(height: 8),
        // The Text
        Text(
          title,
          style: TextStyle(
            color: (isCompleted || isActive) ? AppColors.primary : AppColors.gray,
            fontWeight: (isCompleted || isActive) ? FontWeight.bold : FontWeight.normal,
          ),
        ),
      ],
    );
  }
}