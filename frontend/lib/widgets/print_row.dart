import 'package:flutter/material.dart';
import 'package:clickpic/constants/colors.dart';



class PrintRow extends StatelessWidget {
  const PrintRow({super.key,
    required this.icon,
    required this.title,
    required this.value,
    required this.onTap,
  });

  final IconData icon;
  final String title;
  final String value;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return ListTile(
      contentPadding: EdgeInsets.zero,
      leading: Icon(icon, color: Colors.black54),
      title: Text(title, style: const TextStyle(fontWeight: FontWeight.w500)),
      trailing: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(value,
              style: const TextStyle(color: Colors.black54, fontSize: 16)),
          const SizedBox(width: 8),
          const Icon(Icons.arrow_forward_ios, size: 16, color: AppColors.gray),
        ],
      ),
      onTap: onTap,
    );
  }
}