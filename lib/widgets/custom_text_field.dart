import 'package:flutter/material.dart';

class CustomTextField extends StatelessWidget {
  final TextEditingController controller;
  final TextInputType keyboardType;
  final bool isObscureText;
  final double width;
  final String hintText;
  final Widget? suffixIcon;
  const CustomTextField({
    super.key,
    required this.controller,
    required this.hintText,
    required this.width,
    required this.keyboardType,
    this.isObscureText = false,
    this.suffixIcon
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 49,
      width: width,
      child: TextField(
        obscureText: isObscureText,
        keyboardType: keyboardType,
        controller: controller,
        decoration: InputDecoration(
          contentPadding: EdgeInsets.symmetric(vertical: 12, horizontal: 10),
          enabledBorder: OutlineInputBorder(
            borderSide: BorderSide(color: Color(0xFFB3B3B3)),
            borderRadius: BorderRadius.circular(8),
          ),
          focusedBorder: OutlineInputBorder(
            borderSide: BorderSide(color: Color(0xFFB3B3B3)),
            borderRadius: BorderRadius.circular(8),
          ),
          hintText: hintText,
          hintStyle: TextStyle(
            fontSize: 13,
            color: Color(0xFFB3B3B3)),
          suffixIcon: suffixIcon
        ),
      ),
    );
  }
}
