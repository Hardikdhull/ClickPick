import 'package:flutter/material.dart';
import 'package:clickpic/constants/colors.dart';

class ProgressStepper extends StatelessWidget {
  final int currentStep;

  const ProgressStepper({super.key, required this.currentStep});

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final double totalWidth = constraints.maxWidth;
        final double progressWidth = totalWidth * (currentStep / 2.0);

        return Container(
          width: totalWidth,
          height: 60,
          child: Stack(
            alignment: Alignment.center,
            children: [
              Positioned(
                top: 12,
                left: totalWidth / 4,
                right: totalWidth / 4,
                child: Container(
                  height: 2.0,
                  color: AppColors.Light_gray,
                ),
              ),
              Positioned(
                top: 12,
                left: totalWidth / 4,
                child: AnimatedContainer(
                  duration: const Duration(milliseconds: 300),
                  height: 2.0,
                  width: progressWidth,
                  color: AppColors.purple,
                ),
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  _buildStepNode(
                    title: 'Upload',
                    stepIndex: 0,
                  ),
                  _buildStepNode(
                    title: 'Details',
                    stepIndex: 1,
                  ),
                  _buildStepNode(
                    title: 'Checkout',
                    stepIndex: 2,
                  ),
                ],
              ),
            ],
          ),
        );
      },
    );
  }
  Widget _buildStepNode({required String title, required int stepIndex}) {
    final bool isActive = currentStep == stepIndex;
    final bool isCompleted = currentStep > stepIndex;

    Color circleColor;
    Color textColor;
    Widget circleChild;

    if (isActive) {
      circleColor = AppColors.purple.withOpacity(0.2);
      textColor = AppColors.purple;
      circleChild = CircleAvatar(
        radius: 6,
        backgroundColor: AppColors.purple,
      );
    } else if (isCompleted) {
      circleColor = AppColors.purple;
      textColor = AppColors.purple;
      circleChild = Container();
    } else {
      circleColor = Colors.white;
      textColor = AppColors.Light_gray;
      circleChild = Container(
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          border: Border.all(color: AppColors.Light_gray, width: 2),
        ),
      );
    }

    return Column(
      children: [
        CircleAvatar(
          radius: 12,
          backgroundColor: circleColor,
          child: circleChild,
        ),
        const SizedBox(height: 8),
        Text(
          title,
          style: TextStyle(
            color: textColor,
            fontWeight: isActive ? FontWeight.bold : FontWeight.normal,
          ),
        ),
      ],
    );
  }
}