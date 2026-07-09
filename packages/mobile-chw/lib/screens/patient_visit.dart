import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:image_picker/image_picker.dart';

class PatientVisitScreen extends StatefulWidget {
  final String patientName;
  const PatientVisitScreen({super.key, required this.patientName});

  @override
  State<PatientVisitScreen> createState() => _PatientVisitScreenState();
}

class _PatientVisitScreenState extends State<PatientVisitScreen> {
  Position? _currentPosition;
  final _notesController = TextEditingController();
  final _followUpController = TextEditingController();
  bool _isRecording = false;

  @override
  void initState() {
    super.initState();
    _getCurrentLocation();
  }

  Future<void> _getCurrentLocation() async {
    bool serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) return;

    LocationPermission permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.denied) return;
    }

    Position position = await Geolocator.getCurrentPosition();
    setState(() => _currentPosition = position);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Visit: ${widget.patientName}'),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // GPS Location
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(20),
              boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 8, offset: const Offset(0, 2))],
            ),
            child: Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(10),
                  decoration: BoxDecoration(
                    color: _currentPosition != null ? const Color(0xFFF0FDF4) : const Color(0xFFFEF2F2),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Icon(
                    Icons.location_on,
                    color: _currentPosition != null ? const Color(0xFF16A34A) : const Color(0xFFDC2626),
                    size: 24,
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        _currentPosition != null ? 'Location Captured' : 'No GPS Signal',
                        style: const TextStyle(fontWeight: FontWeight.w600, color: Color(0xFF0F172A)),
                      ),
                      if (_currentPosition != null)
                        Text(
                          '${_currentPosition!.latitude.toStringAsFixed(4)}, ${_currentPosition!.longitude.toStringAsFixed(4)}',
                          style: const TextStyle(fontSize: 12, color: Color(0xFF64748B)),
                        ),
                    ],
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.refresh, color: Color(0xFF64748B)),
                  onPressed: _getCurrentLocation,
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),

          // Vital Signs
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(20),
              boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 8, offset: const Offset(0, 2))],
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('Vital Signs', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600, color: Color(0xFF0F172A))),
                const SizedBox(height: 16),
                Row(
                  children: [
                    Expanded(child: _buildVitalField('Systolic', 'mmHg')),
                    const SizedBox(width: 12),
                    Expanded(child: _buildVitalField('Diastolic', 'mmHg')),
                  ],
                ),
                const SizedBox(height: 12),
                Row(
                  children: [
                    Expanded(child: _buildVitalField('Heart Rate', 'bpm')),
                    const SizedBox(width: 12),
                    Expanded(child: _buildVitalField('Blood Sugar', 'mmol/L')),
                  ],
                ),
                const SizedBox(height: 12),
                Row(
                  children: [
                    Expanded(child: _buildVitalField('Temperature', '°C')),
                    const SizedBox(width: 12),
                    Expanded(child: _buildVitalField('O2 Sat', '%')),
                  ],
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),

          // Symptoms
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(20),
              boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 8, offset: const Offset(0, 2))],
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('Symptoms', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600, color: Color(0xFF0F172A))),
                const SizedBox(height: 12),
                Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: [
                    'Headache', 'Dizziness', 'Fatigue', 'Nausea',
                    'Chest Pain', 'Shortness of Breath', 'Swelling', 'Fever',
                  ].map((s) => FilterChip(
                    label: Text(s, style: const TextStyle(fontSize: 13)),
                    selected: false,
                    onSelected: (v) {},
                    backgroundColor: const Color(0xFFF8FAFC),
                    selectedColor: const Color(0xFFEFF6FF),
                    checkmarkColor: const Color(0xFF2563EB),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  )).toList(),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),

          // Notes
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(20),
              boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 8, offset: const Offset(0, 2))],
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('Visit Notes', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600, color: Color(0xFF0F172A))),
                const SizedBox(height: 12),
                TextField(
                  controller: _notesController,
                  maxLines: 4,
                  decoration: const InputDecoration(
                    hintText: 'Enter visit notes, observations, and findings...',
                    hintStyle: TextStyle(color: Color(0xFF94A3B8)),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),

          // Photos
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(20),
              boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 8, offset: const Offset(0, 2))],
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('Photos', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600, color: Color(0xFF0F172A))),
                const SizedBox(height: 12),
                GestureDetector(
                  onTap: () async {
                    final picker = ImagePicker();
                    await picker.pickImage(source: ImageSource.camera);
                  },
                  child: Container(
                    width: double.infinity,
                    padding: const EdgeInsets.symmetric(vertical: 24),
                    decoration: BoxDecoration(
                      border: Border.all(color: const Color(0xFFE2E8F0), style: BorderStyle.solid),
                      borderRadius: BorderRadius.circular(16),
                      color: const Color(0xFFF8FAFC),
                    ),
                    child: const Column(
                      children: [
                        Icon(Icons.camera_alt_outlined, color: Color(0xFF94A3B8), size: 32),
                        SizedBox(height: 8),
                        Text('Tap to take a photo', style: TextStyle(color: Color(0xFF94A3B8))),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),

          // Follow-up Actions
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(20),
              boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 8, offset: const Offset(0, 2))],
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('Follow-up Actions', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600, color: Color(0xFF0F172A))),
                const SizedBox(height: 12),
                TextField(
                  controller: _followUpController,
                  maxLines: 3,
                  decoration: const InputDecoration(
                    hintText: 'Enter follow-up actions and recommendations...',
                    hintStyle: TextStyle(color: Color(0xFF94A3B8)),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 24),

          // Save Button
          SizedBox(
            width: double.infinity,
            child: ElevatedButton.icon(
              onPressed: () {},
              icon: const Icon(Icons.save_outlined),
              label: const Text('Save Visit & Sync Later', style: TextStyle(fontSize: 16)),
              style: ElevatedButton.styleFrom(
                padding: const EdgeInsets.symmetric(vertical: 16),
              ),
            ),
          ),
          const SizedBox(height: 8),
          SizedBox(
            width: double.infinity,
            child: OutlinedButton.icon(
              onPressed: () {},
              icon: const Icon(Icons.cloud_upload_outlined),
              label: const Text('Save & Sync Now', style: TextStyle(fontSize: 16)),
              style: OutlinedButton.styleFrom(
                padding: const EdgeInsets.symmetric(vertical: 16),
              ),
            ),
          ),
          const SizedBox(height: 40),
        ],
      ),
    );
  }

  Widget _buildVitalField(String label, String unit) {
    return TextField(
      keyboardType: TextInputType.number,
      decoration: InputDecoration(
        labelText: label,
        suffixText: unit,
        suffixStyle: const TextStyle(color: Color(0xFF94A3B8), fontSize: 12),
        contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
        isDense: true,
      ),
    );
  }
}
