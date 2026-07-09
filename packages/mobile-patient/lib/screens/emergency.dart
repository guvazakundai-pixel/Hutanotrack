import 'package:flutter/material.dart';
import 'package:shared/shared.dart';

class EmergencyScreen extends StatefulWidget {
  const EmergencyScreen({super.key});

  @override
  State<EmergencyScreen> createState() => _EmergencyScreenState();
}

class _EmergencyScreenState extends State<EmergencyScreen> {
  final Map<String, bool> _answers = {};
  bool _showResults = false;

  final List<Map<String, String>> _questions = [
    {'id': 'chestPain', 'en': 'Are you experiencing chest pain?'},
    {'id': 'severeHeadache', 'en': 'Do you have a severe headache?'},
    {'id': 'blurredVision', 'en': 'Is your vision blurred?'},
    {'id': 'difficultyBreathing', 'en': 'Are you having difficulty breathing?'},
    {'id': 'highGlucoseSymptoms', 'en': 'Symptoms of high blood sugar?'},
    {'id': 'pregnancyDangerSigns', 'en': 'Any pregnancy danger signs?'},
  ];

  bool get _dangerDetected => _answers.values.any((v) => v == true);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Emergency Screening'),
        actions: [
          if (_showResults)
            TextButton(
              onPressed: () => setState(() {
                _answers.clear();
                _showResults = false;
              }),
              child: const Text('Reset'),
            ),
        ],
      ),
      body: _showResults ? _buildResults() : _buildQuestions(),
    );
  }

  Widget _buildQuestions() {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: const Color(0xFFFFFBEB),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: const Color(0xFFFDE68A)),
          ),
          child: const Row(
            children: [
              Icon(Icons.warning_amber_rounded, color: Color(0xFFF59E0B)),
              SizedBox(width: 12),
              Expanded(
                child: Text(
                  'Please answer all questions honestly. This helps us identify if you need immediate medical attention.',
                  style: TextStyle(fontSize: 13, color: Color(0xFF92400E)),
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 20),
        ..._questions.map((q) => _buildQuestion(q)),
        const SizedBox(height: 24),
        SizedBox(
          width: double.infinity,
          child: ElevatedButton(
            onPressed: _answers.length == _questions.length
                ? () => setState(() => _showResults = true)
                : null,
            style: ElevatedButton.styleFrom(
              padding: const EdgeInsets.symmetric(vertical: 16),
            ),
            child: const Text('Complete Screening', style: TextStyle(fontSize: 16)),
          ),
        ),
      ],
    );
  }

  Widget _buildQuestion(Map<String, String> q) {
    final id = q['id']!;
    final answer = _answers[id];

    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
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
          Text(
            q['en']!,
            style: const TextStyle(
              fontSize: 15,
              fontWeight: FontWeight.w500,
              color: Color(0xFF0F172A),
            ),
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              Expanded(
                child: GestureDetector(
                  onTap: () => setState(() => _answers[id] = true),
                  child: Container(
                    padding: const EdgeInsets.symmetric(vertical: 12),
                    decoration: BoxDecoration(
                      color: answer == true ? const Color(0xFFDC2626) : const Color(0xFFF1F5F9),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(
                      'Yes',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontWeight: FontWeight.w600,
                        color: answer == true ? Colors.white : const Color(0xFF64748B),
                      ),
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: GestureDetector(
                  onTap: () => setState(() => _answers[id] = false),
                  child: Container(
                    padding: const EdgeInsets.symmetric(vertical: 12),
                    decoration: BoxDecoration(
                      color: answer == false ? const Color(0xFF16A34A) : const Color(0xFFF1F5F9),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(
                      'No',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontWeight: FontWeight.w600,
                        color: answer == false ? Colors.white : const Color(0xFF64748B),
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildResults() {
    if (_dangerDetected) {
      return Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              width: 80,
              height: 80,
              decoration: BoxDecoration(
                color: const Color(0xFFFEF2F2),
                borderRadius: BorderRadius.circular(20),
              ),
              child: const Icon(Icons.warning, color: Color(0xFFDC2626), size: 40),
            ),
            const SizedBox(height: 24),
            const Text(
              'Danger Signs Detected',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
                color: Color(0xFFDC2626),
              ),
            ),
            const SizedBox(height: 12),
            const Text(
              'Please remain calm. Emergency services have been notified. A healthcare worker will contact you shortly.',
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 16, color: Color(0xFF64748B), height: 1.5),
            ),
            const SizedBox(height: 32),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton.icon(
                onPressed: () {},
                icon: const Icon(Icons.phone),
                label: const Text('Call Emergency Services'),
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFFDC2626),
                  padding: const EdgeInsets.symmetric(vertical: 16),
                ),
              ),
            ),
            const SizedBox(height: 12),
            SizedBox(
              width: double.infinity,
              child: OutlinedButton.icon(
                onPressed: () {},
                icon: const Icon(Icons.person),
                label: const Text('Notify My CHW'),
                style: OutlinedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(vertical: 16),
                ),
              ),
            ),
          ],
        ),
      );
    }

    return Padding(
      padding: const EdgeInsets.all(16),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            width: 80,
            height: 80,
            decoration: BoxDecoration(
              color: const Color(0xFFF0FDF4),
              borderRadius: BorderRadius.circular(20),
            ),
            child: const Icon(Icons.check_circle, color: Color(0xFF16A34A), size: 40),
          ),
          const SizedBox(height: 24),
          const Text(
            'No Danger Signs',
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
              color: Color(0xFF16A34A),
            ),
          ),
          const SizedBox(height: 12),
          const Text(
            'You appear to be stable. Continue with your regular monitoring and care plan.',
            textAlign: TextAlign.center,
            style: TextStyle(fontSize: 16, color: Color(0xFF64748B), height: 1.5),
          ),
          const SizedBox(height: 32),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              onPressed: () => setState(() {
                _answers.clear();
                _showResults = false;
              }),
              style: ElevatedButton.styleFrom(
                padding: const EdgeInsets.symmetric(vertical: 16),
              ),
              child: const Text('Start New Screening'),
            ),
          ),
        ],
      ),
    );
  }
}
