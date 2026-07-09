import 'package:flutter/material.dart';

class HealthRecordsScreen extends StatefulWidget {
  const HealthRecordsScreen({super.key});

  @override
  State<HealthRecordsScreen> createState() => _HealthRecordsScreenState();
}

class _HealthRecordsScreenState extends State<HealthRecordsScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Health Records'),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          const Text(
            'Record New Reading',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w600,
              color: Color(0xFF0F172A),
            ),
          ),
          const SizedBox(height: 16),
          _buildRecordCard(
            'Blood Pressure',
            Icons.monitor_heart_outlined,
            const Color(0xFF2563EB),
            [const TextFieldDecoration(hint: 'Systolic', suffix: 'mmHg'), const TextFieldDecoration(hint: 'Diastolic', suffix: 'mmHg')],
          ),
          const SizedBox(height: 12),
          _buildRecordCard(
            'Blood Glucose',
            Icons.water_drop_outlined,
            const Color(0xFF16A34A),
            [const TextFieldDecoration(hint: 'Value', suffix: 'mmol/L')],
          ),
          const SizedBox(height: 12),
          _buildRecordCard(
            'Weight',
            Icons.monitor_weight_outlined,
            const Color(0xFF7C3AED),
            [const TextFieldDecoration(hint: 'Weight', suffix: 'kg')],
          ),
          const SizedBox(height: 12),
          _buildRecordCard(
            'Heart Rate',
            Icons.favorite_outline,
            const Color(0xFFDC2626),
            [const TextFieldDecoration(hint: 'Heart Rate', suffix: 'bpm')],
          ),
          const SizedBox(height: 20),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              onPressed: () {},
              style: ElevatedButton.styleFrom(
                padding: const EdgeInsets.symmetric(vertical: 16),
              ),
              child: const Text('Save Readings', style: TextStyle(fontSize: 16)),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildRecordCard(String label, IconData icon, Color color, List<TextFieldDecoration> fields) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.04),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: color.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Icon(icon, color: color, size: 20),
              ),
              const SizedBox(width: 12),
              Text(
                label,
                style: const TextStyle(
                  fontSize: 15,
                  fontWeight: FontWeight.w600,
                  color: Color(0xFF0F172A),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Row(
            children: fields.map((f) {
              return Expanded(
                child: Padding(
                  padding: EdgeInsets.only(left: fields.indexOf(f) > 0 ? 8 : 0),
                  child: TextField(
                    keyboardType: TextInputType.number,
                    decoration: InputDecoration(
                      hintText: f.hint,
                      suffixText: f.suffix,
                      suffixStyle: const TextStyle(color: Color(0xFF94A3B8), fontSize: 13),
                      contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
                    ),
                  ),
                ),
              );
            }).toList(),
          ),
        ],
      ),
    );
  }
}

class TextFieldDecoration {
  final String hint;
  final String suffix;
  const TextFieldDecoration({required this.hint, required this.suffix});
}
