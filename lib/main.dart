import 'package:clickpic/constants/fonts.dart';
import 'package:clickpic/screens/login_screen.dart';
import 'package:clickpic/screens/signup_screen.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        fontFamily: AppFonts.inter,
      ),
      title: 'Clickpic',
      home: SignupScreen(),
    );
  }
}