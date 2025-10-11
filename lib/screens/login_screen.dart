import 'package:clickpic/constants/colors.dart';
import 'package:clickpic/widgets/country_code_dropdown.dart';
import 'package:clickpic/widgets/custom_text_field.dart';
import 'package:flutter/material.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  @override
  Widget build(BuildContext context) {
    final TextEditingController _numController = TextEditingController();
    final TextEditingController _pwdController = TextEditingController();
    final screenHeight = MediaQuery.of(context).size.height;
    
    return Scaffold(
      backgroundColor: Colors.white,
      body: Stack(
        children: [
          Image.asset(
            'assets/images/login_header.png',
            width: double.infinity,
            height: screenHeight * 0.35,
            fit: BoxFit.cover,
          ),
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
                    horizontal: 14,
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
                      SizedBox(height: 15,),
                      Align(
                        alignment: Alignment.centerLeft,
                        child: Text(
                          'Phone number',
                          style: TextStyle(
                            color: AppColors.primary,
                            fontSize: 16,
                            fontWeight: FontWeight.w500
                          )
                        ),
                      ),
                      SizedBox(height: 5,),
                      Row(
                        children: [
                          CountryCodeDropdown(),
                          SizedBox(width: 10,),
                          Align(
                            alignment: Alignment.centerLeft,
                            child: CustomTextField(controller: _numController, hintText: 'Phone Number', width: 261,),
                          ),
                        ],
                      ),
                      SizedBox(height: 20,),
                      Align(
                        alignment: Alignment.centerLeft,
                        child: Text(
                          'Password',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.w500,
                            color: AppColors.primary
                          ),
                        ),
                      ),
                      SizedBox(height: 5,),
                      Align(
                        alignment: Alignment.centerLeft,
                        child: CustomTextField(controller: _pwdController, hintText: 'Password', width: double.infinity),
                      )
                    ],w),
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