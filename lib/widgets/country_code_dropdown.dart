import 'package:flutter/material.dart';

class CountryCodeDropdown extends StatefulWidget {
  final Function(String)? onChanged;
  final String initialCode;

  const CountryCodeDropdown({
    Key? key,
    this.onChanged,
    this.initialCode = '+91',
  }) : super(key: key);

  @override
  State<CountryCodeDropdown> createState() => _CountryCodeDropdownState();
}

class _CountryCodeDropdownState extends State<CountryCodeDropdown> {
  late String selectedCountryCode;

  final Map<String, String> countryCodes = {
    '+91': '🇮🇳',
    '+1': '🇺🇸',
    '+44': '🇬🇧',
    '+61': '🇦🇺',
  };

  @override
  void initState() {
    super.initState();
    selectedCountryCode = widget.initialCode;
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 47,
      padding: const EdgeInsets.symmetric(horizontal: 8),
      decoration: BoxDecoration(
        border: Border.all(color: Colors.black),
        borderRadius: BorderRadius.circular(8),
        color: Colors.white,
      ),
      child: DropdownButtonHideUnderline(
        child: DropdownButton<String>(
          value: selectedCountryCode,
          icon: const Icon(Icons.arrow_drop_down_rounded, color: Colors.black),
          isDense: true,
          items: countryCodes.entries.map((entry) {
            return DropdownMenuItem<String>(
              value: entry.key,
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    entry.value,
                    style: const TextStyle(fontSize: 20),
                  ),
                  const SizedBox(width: 5),
                  Text(
                    entry.key,
                    style: const TextStyle(
                      fontSize: 16,
                      color: Colors.black,
                    ),
                  ),
                ],
              ),
            );
          }).toList(),
          onChanged: (String? newValue) {
            setState(() {
              selectedCountryCode = newValue!;
            });
            if (widget.onChanged != null) {
              widget.onChanged!(newValue!);
            }
          },
        ),
      ),
    );
  }
}

// Usage Example:
// CountryCodeDropdown(
//   onChanged: (code) {
//     print('Selected: $code');
//   },
// )