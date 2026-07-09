# HutanoTrack

**Keeping Communities Connected to Care**

A modern, secure, offline-first digital healthcare platform designed specifically for Zimbabwe and other low-resource environments. HutanoTrack helps patients, community health workers, clinics, NGOs, employers, insurers, and diaspora family members manage chronic diseases such as diabetes and hypertension while being easily expandable to maternal health, HIV, TB, elderly care, and other long-term healthcare programmes.

---

## Architecture

```
hutanotrack/
├── packages/
│   ├── backend/          # NestJS REST API
│   │   └── src/
│   │       ├── auth/         # Authentication (JWT, OTP, Biometric)
│   │       ├── users/        # User management
│   │       ├── patients/     # Patient management & risk classification
│   │       ├── appointments/ # Appointment scheduling
│   │       ├── medications/  # Medication tracking & adherence
│   │       ├── health-data/  # Vital signs & health records
│   │       ├── referrals/    # Referral management
│   │       ├── notifications/# SMS, Push, WhatsApp, Email
│   │       ├── ai/          # AI-powered insights
│   │       ├── analytics/   # Dashboard analytics & reporting
│   │       └── audit/       # Audit logging
│   ├── web/              # Next.js Clinic Dashboard & Family Portal
│   │   └── src/
│   │       ├── app/         # Pages (14 routes)
│   │       ├── components/  # UI components, charts, layouts
│   │       ├── providers/   # Auth & Theme providers
│   │       └── lib/         # Utilities & helpers
│   ├── mobile-patient/   # Flutter Patient Mobile App
│   ├── mobile-chw/       # Flutter CHW Mobile App
│   └── shared/          # Shared TypeScript types & constants
├── docker-compose.yml
└── package.json          # Monorepo root
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend Web** | Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion |
| **Mobile** | Flutter 3.x, Dart |
| **Backend** | NestJS 10, TypeScript, Express |
| **Database** | PostgreSQL 16 |
| **ORM** | TypeORM |
| **Auth** | JWT, OTP, Biometric (fingerprint/Face ID) |
| **Charts** | Recharts (web), fl_chart / Syncfusion (mobile) |
| **UI Library** | Radix UI primitives, Lucide icons |
| **Cloud** | Docker, Kubernetes-ready |
| **AI** | Predictive analytics for risk, adherence, and appointments |

## Products

### 1. Patient Mobile App
- Phone/OTP login with biometric support
- Health dashboard with vitals, medication tracking, and trends
- Emergency danger sign screening with automatic CHW notification
- Medication adherence tracking with reminders
- Appointment management with confirmations
- Health education in English, Shona, and Ndebele
- Family support invites
- **Fully offline-first** with automatic sync

### 2. Community Health Worker App
- Offline-first home visit recording with GPS
- Patient profiles with risk classification (Green/Amber/Red)
- Visit scheduling and tracking
- Referral management
- Automated report generation
- Photo capture during visits
- Sync when online

### 3. Clinic Web Dashboard
- Role-based access (Admin, Doctor, Nurse, Receptionist, etc.)
- Real-time patient search and management
- Appointment calendar with drag-and-drop
- EMR with clinical notes, diagnoses, vitals, medications
- Pharmacy inventory management
- Laboratory test tracking
- Community health dashboard with village heatmaps
- Interactive analytics (BP control, diabetes control, adherence)
- Dark mode

### 4. Family Web Portal
- Monitor family members' health adherence
- View appointments and health trends
- Receive alerts about family members
- Communicate with healthcare workers
- Privacy-controlled access

### 5. Administration Portal
- User, clinic, and role management
- Audit logs with filtering
- System configuration
- Backup and recovery management

## AI Features

- **High-risk patient detection** - Identifies patients needing immediate attention
- **Missed appointment prediction** - Flags patients likely to miss appointments
- **Medication non-adherence prediction** - Detects patients falling behind on medication
- **Clinical summaries** - Auto-generated patient history summaries
- **Lifestyle suggestions** - Personalized recommendations based on health data

*AI assists healthcare workers and never replaces clinical decision-making.*

## Design System

- **Primary**: Medical Blue (#2563EB), Healthcare Green (#16A34A)
- **UI**: Soft shadows, rounded corners (16-24px), frosted glass panels
- **Typography**: Inter / Geist / SF Pro Display
- **Dark Mode**: Full support across all interfaces
- **Accessibility**: WCAG-compliant contrast ratios, large touch targets

## Getting Started

### Prerequisites
- Node.js >= 18
- PostgreSQL >= 14
- Docker (optional)

### Development Setup

```bash
# Install dependencies
npm install

# Start PostgreSQL (using Docker)
docker compose up postgres -d

# Start backend development server
npm run dev --workspace=@hutanotrack/backend

# Start web development server (in another terminal)
npm run dev --workspace=@hutanotrack/web
```

### Environment Variables
Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

### API Documentation
When running, API docs are available at:
```
http://localhost:4000/api/docs
```

## License

MIT © HutanoTrack
