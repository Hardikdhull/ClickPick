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
  final TextEditingController _numController = TextEditingController();
  final TextEditingController _pwdController = TextEditingController();
  String _selectedCountryCode = '+91';

  @override
  Widget build(BuildContext context) {
    final screenHeight = MediaQuery.of(context).size.height;

    return Scaffold(
      backgroundColor: Colors.white,
      body: Stack(
        children: [
          _buildHeaderImage(screenHeight),
          _buildLoginForm(screenHeight),
        ],
      ),
    );
  }

  Widget _buildHeaderImage(double screenHeight) {
    return Image.asset(
      'assets/images/login_header.png',
      width: double.infinity,
      height: screenHeight * 0.35,
      fit: BoxFit.cover,
    );
  }

  Widget _buildLoginForm(double screenHeight) {
    return SingleChildScrollView(
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
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _buildWelcomeHeader(),
                const SizedBox(height: 15),
                _buildPhoneNumberSection(),
                const SizedBox(height: 20),
                _buildPasswordSection(),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildWelcomeHeader() {
    return Column(
      children: [
        Center(
          child: Text(
            'Welcome Back!',
            style: TextStyle(
              fontWeight: FontWeight.w700,
              fontSize: 24,
              color: AppColors.primary,
            ),
          ),
        ),
        const SizedBox(height: 8),
        Center(
          child: Text.rich(
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
        ),
      ],
    );
  }

  Widget _buildPhoneNumberSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildLabel('Phone number'),
        const SizedBox(height: 5),
        Row(
          children: [
            CountryCodeDropdown(
              onChanged: (code) {
                setState(() {
                  _selectedCountryCode = code;
                });
              },
            ),
            const SizedBox(width: 10),
            Expanded(
              child: CustomTextField(
                controller: _numController,
                hintText: 'Phone Number',
                width: double.infinity,
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildPasswordSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildLabel('Password'),
        const SizedBox(height: 5),
        CustomTextField(
          controller: _pwdController,
          hintText: 'Password',
          width: double.infinity,
        ),
      ],
    );
  }

  Widget _buildLabel(String text) {
    return Text(
      text,
      style: TextStyle(
        fontSize: 16,
        fontWeight: FontWeight.w500,
        color: AppColors.primary,
      ),
    );
  }

  @override
  void dispose() {
    _numController.dispose();
    _pwdController.dispose();
    super.dispose();
  }
}