import 'package:clickpic/constants/colors.dart';
import 'package:clickpic/widgets/country_code_dropdown.dart';
import 'package:clickpic/widgets/custom_text_field.dart';
import 'package:flutter/material.dart';

class SignupScreen extends StatefulWidget {
  const SignupScreen({super.key});

  @override
  State<SignupScreen> createState() => _SignupScreenState();
}

class _SignupScreenState extends State<SignupScreen> {
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _numController = TextEditingController();
  String _selectedCountryCode = '+91';

  @override
  Widget build(BuildContext context) {
    final screenHeight = MediaQuery.of(context).size.height;

    return Scaffold(
      backgroundColor: Colors.white,
      body: Stack(
        children: [
          _buildHeaderImage(screenHeight),
          _buildSignUpForm(screenHeight),
        ],
      ),
    );
  }

  Widget _buildHeaderImage(double screenHeight) {
    return Image.asset(
      'assets/images/login_header.png',
      width: double.infinity,
      height: screenHeight * 0.31,
      fit: BoxFit.cover,
    );
  }

  Widget _buildSignUpForm(double screenHeight) {
    return SingleChildScrollView(
      child: Column(
        children: [
          SizedBox(height: screenHeight * 0.26),
          Container(
            width: double.infinity,
            constraints: BoxConstraints(minHeight: screenHeight * 0.73),
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 32),
            decoration: const BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.vertical(top: Radius.circular(32)),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _buildWelcomeHeader(),
                const SizedBox(height: 20),
                _buildNameSection(),
                const SizedBox(height: 15,),
                _buildPhoneNumberSection()
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
            'Welcome Onboard!',
            style: TextStyle(
              fontWeight: FontWeight.w700,
              fontSize: 24,
              color: AppColors.primary,
            ),
          ),
        ),
        Center(
          child: Text.rich(
            TextSpan(
              style: const TextStyle(fontSize: 12),
              text: 'Please ',
              children: const <TextSpan>[
                TextSpan(
                  text: 'Sign Up',
                  style: TextStyle(
                    color: AppColors.primary,
                    fontWeight: FontWeight.w500,
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

  Widget _buildNameSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildLabel('Name'),
        const SizedBox(height: 5),
        CustomTextField(
          keyboardType: TextInputType.text,
          controller: _nameController,
          hintText: 'Name',
          width: double.infinity,
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
                keyboardType: TextInputType.phone,
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
}
