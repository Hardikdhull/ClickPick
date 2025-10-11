import 'package:flutter/material.dart';

class CustomTextField extends StatelessWidget {
  final TextEditingController controller;
  final double width;
  final String hintText;
  const CustomTextField({super.key, required this.controller, required this.hintText, required this.width});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 50,
      width: width,
      child: TextField(
        controller: controller,
        decoration: InputDecoration(
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(15)
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(15)
          ),
          hintText: hintText
        ),
      ),
    );
  }
}