import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_fonts/google_fonts.dart';
import 'app.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(
    const ProviderScope(
      child: HutanoTrackCHWApp(),
    ),
  );
}

class HutanoTrackCHWApp extends ConsumerWidget {
  const HutanoTrackCHWApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return MaterialApp(
      title: 'HutanoTrack CHW',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF16A34A),
          primary: const Color(0xFF16A34A),
          secondary: const Color(0xFF2563EB),
          brightness: Brightness.light,
        ),
        textTheme: GoogleFonts.interTextTheme(),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            backgroundColor: const Color(0xFF16A34A),
            foregroundColor: Colors.white,
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(16),
            ),
          ),
        ),
        cardTheme: CardTheme(
          elevation: 0,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
          color: Colors.white,
        ),
        scaffoldBackgroundColor: const Color(0xFFF8FAFC),
        appBarTheme: const AppBarTheme(
          backgroundColor: Color(0xFF16A34A),
          foregroundColor: Colors.white,
          elevation: 0,
          centerTitle: false,
        ),
      ),
      home: const CHWSplashScreen(),
    );
  }
}

class CHWSplashScreen extends StatefulWidget {
  const CHWSplashScreen({super.key});

  @override
  State<CHWSplashScreen> createState() => _CHWSplashScreenState();
}

class _CHWSplashScreenState extends State<CHWSplashScreen> {
  @override
  void initState() {
    super.initState();
    Future.delayed(const Duration(seconds: 2), () {
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(builder: (_) => const CHWDashboard()),
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      backgroundColor: Color(0xFF16A34A),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.favorite_outlined, color: Colors.white, size: 60),
            SizedBox(height: 16),
            Text('HutanoTrack', style: TextStyle(color: Colors.white, fontSize: 28, fontWeight: FontWeight.bold)),
            SizedBox(height: 4),
            Text('Community Health Worker', style: TextStyle(color: Colors.white70, fontSize: 14)),
          ],
        ),
      ),
    );
  }
}

class CHWDashboard extends StatelessWidget {
  const CHWDashboard({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('My Dashboard'),
        actions: [
          IconButton(icon: const Icon(Icons.cloud_sync), onPressed: () {}),
          IconButton(icon: const Icon(Icons.person_outline), onPressed: () {}),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildStatsRow(),
            const SizedBox(height: 20),
            _buildTodayVisits(),
            const SizedBox(height: 20),
            _buildHighRiskPatients(),
            const SizedBox(height: 20),
            _buildPendingReferrals(),
            const SizedBox(height: 20),
            _buildOfflineStatus(),
          ],
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        selectedItemColor: const Color(0xFF16A34A),
        unselectedItemColor: const Color(0xFF94A3B8),
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.dashboard), label: 'Dashboard'),
          BottomNavigationBarItem(icon: Icon(Icons.people_outline), label: 'Patients'),
          BottomNavigationBarItem(icon: Icon(Icons.route_outlined), label: 'Visits'),
          BottomNavigationBarItem(icon: Icon(Icons.description_outlined), label: 'Reports'),
          BottomNavigationBarItem(icon: Icon(Icons.settings_outlined), label: 'Settings'),
        ],
      ),
    );
  }

  Widget _buildStatsRow() {
    return Row(
      children: [
        Expanded(child: _buildStatCard('Assigned\nPatients', '45', Icons.people, const Color(0xFF2563EB))),
        const SizedBox(width: 12),
        Expanded(child: _buildStatCard("Today's\nVisits", '8', Icons.tour_outlined, const Color(0xFF16A34A))),
        const SizedBox(width: 12),
        Expanded(child: _buildStatCard('High\nRisk', '5', Icons.warning_amber, const Color(0xFFDC2626))),
      ],
    );
  }

  Widget _buildStatCard(String label, String value, IconData icon, Color color) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 8, offset: const Offset(0, 2))],
      ),
      child: Column(
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(color: color.withOpacity(0.1), borderRadius: BorderRadius.circular(10)),
            child: Icon(icon, color: color, size: 22),
          ),
          const SizedBox(height: 8),
          Text(value, style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
          const SizedBox(height: 2),
          Text(label, textAlign: TextAlign.center, style: const TextStyle(fontSize: 11, color: Color(0xFF64748B))),
        ],
      ),
    );
  }

  Widget _buildTodayVisits() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 12, offset: const Offset(0, 4))],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text("Today's Visits", style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600, color: Color(0xFF0F172A))),
              TextButton(onPressed: () {}, child: const Text('View All')),
            ],
          ),
          const SizedBox(height: 12),
          _buildVisitItem('Tendai Mukanya', 'Mbare', '09:00 AM', 'Diabetes Check'),
          const Divider(height: 20),
          _buildVisitItem('Chipo Dube', 'Highfield', '10:30 AM', 'BP Follow-up'),
          const Divider(height: 20),
          _buildVisitItem('Blessing Ndlovu', 'Kuwadzana', '02:00 PM', 'Medication Review'),
        ],
      ),
    );
  }

  Widget _buildVisitItem(String name, String location, String time, String reason) {
    return Row(
      children: [
        Container(
          width: 44, height: 44,
          decoration: BoxDecoration(color: const Color(0xFFEFF6FF), borderRadius: BorderRadius.circular(12)),
          child: const Center(child: Icon(Icons.person, color: Color(0xFF2563EB))),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(name, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14, color: Color(0xFF0F172A))),
              Row(
                children: [
                  Icon(Icons.location_on, size: 12, color: const Color(0xFF94A3B8)),
                  const SizedBox(width: 4),
                  Text('$location • $reason', style: const TextStyle(fontSize: 12, color: Color(0xFF64748B))),
                ],
              ),
            ],
          ),
        ),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
          decoration: BoxDecoration(color: const Color(0xFFEFF6FF), borderRadius: BorderRadius.circular(20)),
          child: Text(time, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w500, color: Color(0xFF2563EB))),
        ),
      ],
    );
  }

  Widget _buildHighRiskPatients() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 12, offset: const Offset(0, 4))],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Icon(Icons.warning, color: Color(0xFFDC2626), size: 20),
              const SizedBox(width: 8),
              const Text('High Risk Patients', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600, color: Color(0xFF0F172A))),
              const Spacer(),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                decoration: BoxDecoration(color: const Color(0xFFFEF2F2), borderRadius: BorderRadius.circular(20)),
                child: const Text('5', style: TextStyle(color: Color(0xFFDC2626), fontWeight: FontWeight.w600, fontSize: 12)),
              ),
            ],
          ),
          const SizedBox(height: 12),
          _buildHighRiskItem('Chipo Dube', 'BP: 180/110', 'Highfield'),
          const Divider(height: 16),
          _buildHighRiskItem('Nyasha Gumbo', 'Glucose: 14.2', 'Glen Norah'),
          const Divider(height: 16),
          _buildHighRiskItem('Tafadzwa Chikomo', 'Missed 3 appointments', 'Budiriro'),
        ],
      ),
    );
  }

  Widget _buildHighRiskItem(String name, String reason, String location) {
    return Row(
      children: [
        Container(
          width: 8, height: 8,
          decoration: const BoxDecoration(color: Color(0xFFDC2626), shape: BoxShape.circle),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(name, style: const TextStyle(fontWeight: FontWeight.w600, color: Color(0xFF0F172A))),
              Text('$reason • $location', style: const TextStyle(fontSize: 12, color: Color(0xFF64748B))),
            ],
          ),
        ),
        ElevatedButton(
          onPressed: () {},
          style: ElevatedButton.styleFrom(padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6), minimumSize: Size.zero),
          child: const Text('Visit', style: TextStyle(fontSize: 12)),
        ),
      ],
    );
  }

  Widget _buildPendingReferrals() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 12, offset: const Offset(0, 4))],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Icon(Icons.assignment, color: Color(0xFFF59E0B), size: 20),
              const SizedBox(width: 8),
              const Text('Pending Referrals', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600, color: Color(0xFF0F172A))),
              const Spacer(),
              const Text('3 pending', style: TextStyle(fontSize: 13, color: Color(0xFFF59E0B), fontWeight: FontWeight.w500)),
            ],
          ),
          const SizedBox(height: 16),
          _buildReferralItem('Rudo Moyo', '→ Mbare Clinic', 'Prenatal check', 'Urgent'),
          const Divider(height: 16),
          _buildReferralItem('Takudzwa Mufambi', '→ Harare Hospital', 'Cardiology', 'Routine'),
        ],
      ),
    );
  }

  Widget _buildReferralItem(String name, String facility, String reason, String priority) {
    return Row(
      children: [
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
          decoration: BoxDecoration(
            color: priority == 'Urgent' ? const Color(0xFFFEF2F2) : const Color(0xFFF0FDF4),
            borderRadius: BorderRadius.circular(8),
          ),
          child: Text(priority, style: TextStyle(fontSize: 10, fontWeight: FontWeight.w600, color: priority == 'Urgent' ? const Color(0xFFDC2626) : const Color(0xFF16A34A))),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Text(name, style: const TextStyle(fontWeight: FontWeight.w600, color: Color(0xFF0F172A))),
                  const SizedBox(width: 4),
                  Text(facility, style: const TextStyle(fontSize: 12, color: Color(0xFF64748B))),
                ],
              ),
              Text(reason, style: const TextStyle(fontSize: 12, color: Color(0xFF94A3B8))),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildOfflineStatus() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFFF0FDF4),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFFBBF7D0)),
      ),
      child: const Row(
        children: [
          Icon(Icons.cloud_done, color: Color(0xFF16A34A), size: 24),
          SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Offline Mode', style: TextStyle(fontWeight: FontWeight.w600, color: Color(0xFF166534))),
                Text('4 records pending sync. Auto-syncs when connected.', style: TextStyle(fontSize: 12, color: Color(0xFF166534))),
              ],
            ),
          ),
          Icon(Icons.sync, color: Color(0xFF16A34A), size: 20),
        ],
      ),
    );
  }
}
