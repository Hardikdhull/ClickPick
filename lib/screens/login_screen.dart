import 'package:clickpic/constants/colors.dart';
import 'package:flutter/material.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  @override
  Widget build(BuildContext context) {
    final screenHeight = MediaQuery.of(context).size.height;
    
    return Scaffold(
      backgroundColor: Colors.white,
      body: Stack(
        children: [
          // Image at top
          Image.asset(
            'assets/images/login_header.png',
            width: double.infinity,
            height: screenHeight * 0.45,
            fit: BoxFit.cover,
          ),
          // Scrollable white container
          SingleChildScrollView(
            child: Column(
              children: [
                SizedBox(height: screenHeight * 0.27),
                Container(
                  width: double.infinity,
                  constraints: BoxConstraints(
                    minHeight: screenHeight * 0.73,
                  ),
                  padding: const EdgeInsets.symmetric(
                    horizontal: 24,
                    vertical: 32,
                  ),
                  decoration: const BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.vertical(
                      top: Radius.circular(32),
                    ),
                  ),
                  child: Column(
                    children: [
                      Text(
                        'Welcome Back!',
                        style: TextStyle(
                          fontWeight: FontWeight.w700,
                          fontSize: 24,
                          color: AppColors.primary,
                        ),
                      ),
                      const SizedBox(height: 8),
                      Text.rich(
                        TextSpan(
                          style: TextStyle(
                            color: Colors.grey[700],
                            fontSize: 16,
                          ),
                          text: 'Please ',
                          children: const <TextSpan>[
                            TextSpan(
                              text: 'Log In',
                              style: TextStyle(
                                color: AppColors.primary,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                            TextSpan(text: ' to Continue'),
                          ],
                        ),
                      ),
                      const SizedBox(height: 32),
                      // Add your form fields here
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}