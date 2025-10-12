import 'package:clickpic/constants/colors.dart';
import 'package:clickpic/widgets/country_code_dropdown.dart';
import 'package:clickpic/widgets/custom_button.dart';
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
  final TextEditingController _pwdController = TextEditingController();
  final TextEditingController _confirmPwdController = TextEditingController();
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
      height: screenHeight * 0.30,
      fit: BoxFit.cover,
    );
  }

  Widget _buildTopIndicator() {
  return Center(
    child: Container(
      width: 54,
      height: 8,
      decoration: BoxDecoration(
        color: Color(0xFFB3B3B3),
        borderRadius: BorderRadius.circular(8),
      ),
    ),
  );
}

  Widget _buildSignUpForm(double screenHeight) {
    return SingleChildScrollView(
      child: Column(
        children: [
          SizedBox(height: screenHeight * 0.25),
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
                _buildTopIndicator(),
                const SizedBox(height: 15,),
                _buildWelcomeHeader(),
                const SizedBox(height: 20),
                _buildNameSection(),
                const SizedBox(height: 15),
                _buildPhoneNumberSection(),
                const SizedBox(height: 15),
                _buildCreatePasswordSection(),
                const SizedBox(height: 15),
                _buildConfirmPasswordSection(),
                const SizedBox(height: 20),
                _buildBottomSection(),
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
          child: ShaderMask(
            shaderCallback: (bounds) => const LinearGradient(
              colors: [Color(0xFF006C80), Color(0xFF00414D)],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ).createShader(bounds),
            child: const Text(
              'Welcome Onboard!',
              style: TextStyle(
                fontWeight: FontWeight.w700,
                fontSize: 24,
                color: Colors
                    .white, 
              ),
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

  Widget _buildCreatePasswordSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildLabel('Create Password'),
        const SizedBox(height: 5),
        CustomTextField(
          controller: _pwdController,
          hintText: 'Enter Password',
          width: double.infinity,
          keyboardType: TextInputType.text,
          isObscureText: true,
        ),
      ],
    );
  }

  Widget _buildConfirmPasswordSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildLabel('Confirm Password'),
        const SizedBox(height: 5),
        CustomTextField(
          controller: _confirmPwdController,
          hintText: 'Enter Password Again',
          width: double.infinity,
          keyboardType: TextInputType.text,
        ),
      ],
    );
  }

  Widget _buildBottomSection() {
    return Column(
      children: [
        CustomButton(onTap: () {}, text: 'Sign Up'),
        const SizedBox(height: 15),
        Text.rich(
          TextSpan(
            text: 'Already a user?? ',
            style: TextStyle(fontSize: 12, fontWeight: FontWeight.w500),
            children: const <TextSpan>[
              TextSpan(
                text: 'Log In ',
                style: TextStyle(
                  color: AppColors.primary,
                  fontWeight: FontWeight.w600,
                ),
              ),
              TextSpan(text: 'to Continue'),
            ],
          ),
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
