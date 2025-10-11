// import 'package:flutter/material.dart';
// import 'package:clickpic/constants/colors.dart';

// class PhoneInputField extends StatefulWidget {
//   final TextEditingController controller;
//   final String hintText;
//   final Function(String)? onCountryCodeChanged;

//   const PhoneInputField({
//     Key? key,
//     required this.controller,
//     this.hintText = 'Phone Number',
//     this.onCountryCodeChanged,
//   }) : super(key: key);

//   @override
//   State<PhoneInputField> createState() => _PhoneInputFieldState();
// }

// class _PhoneInputFieldState extends State<PhoneInputField> {
//   String selectedCountryCode = '+91';

//   final Map<String, String> countryCodes = {
//     '+91': '🇮🇳',
//     '+1': '🇺🇸',
//     '+44': '🇬🇧',
//     '+61': '🇦🇺',
//   };

//   @override
//   Widget build(BuildContext context) {
//     return Container(
//       decoration: BoxDecoration(
//         borderRadius: BorderRadius.circular(15),
//         border: Border.all(color: Colors.grey[400]!),
//       ),
//       child: Row(
//         children: [
//           // Country Code Dropdown
//           Container(
//             padding: const EdgeInsets.only(left: 12, right: 4),
//             decoration: BoxDecoration(
//               border: Border(
//                 right: BorderSide(color: Colors.grey[300]!, width: 1),
//               ),
//             ),
//             child: DropdownButtonHideUnderline(
//               child: DropdownButton<String>(
//                 value: selectedCountryCode,
//                 icon: const Icon(Icons.arrow_drop_down, size: 20),
//                 items: countryCodes.entries.map((entry) {
//                   return DropdownMenuItem<String>(
//                     value: entry.key,
//                     child: Row(
//                       mainAxisSize: MainAxisSize.min,
//                       children: [
//                         Text(
//                           entry.value,
//                           style: const TextStyle(fontSize: 18),
//                         ),
//                         const SizedBox(width: 6),
//                         Text(
//                           entry.key,
//                           style: const TextStyle(
//                             fontSize: 14,
//                             fontWeight: FontWeight.w600,
//                           ),
//                         ),
//                       ],
//                     ),
//                   );
//                 }).toList(),
//                 onChanged: (String? newValue) {
//                   setState(() {
//                     selectedCountryCode = newValue!;
//                   });
//                   if (widget.onCountryCodeChanged != null) {
//                     widget.onCountryCodeChanged!(newValue!);
//                   }
//                 },
//               ),
//             ),
//           ),
//           // Phone Number Input
//           Expanded(
//             child: TextField(
//               controller: widget.controller,
//               keyboardType: TextInputType.phone,
//               decoration: InputDecoration(
//                 hintText: widget.hintText,
//                 border: InputBorder.none,
//                 enabledBorder: InputBorder.none,
//                 focusedBorder: InputBorder.none,
//                 contentPadding: const EdgeInsets.symmetric(
//                   horizontal: 16,
//                   vertical: 16,
//                 ),
//               ),
//             ),
//           ),
//         ],
//       ),
//     );
//   }

//   // Getter to get full phone number with country code
//   String get fullPhoneNumber => '$selectedCountryCode${widget.controller.text}';
// }