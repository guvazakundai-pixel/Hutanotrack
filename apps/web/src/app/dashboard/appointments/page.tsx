'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const appointmentsData = [
  { time: '09:00', patients: [
    { name: 'Tendai Mukosi', type: 'Check-up', doctor: 'Dr. Moyo', status: 'confirmed' },
    { name: 'Grace Banda', type: 'Follow-up', doctor: 'Dr. Chirwa', status: 'scheduled' },
  ]},
  { time: '10:00', patients: [
    { name: 'Maria Sibanda', type: 'BP Review', doctor: 'Dr. Moyo', status: 'in-progress' },
  ]},
  { time: '11:00', patients: [
    { name: 'John Dube', type: 'Diabetes Review', doctor: 'Dr. Moyo', status: 'confirmed' },
    { name: 'Sarah Ndlovu', type: 'Counselling', doctor: 'Dr. Chirwa', status: 'scheduled' },
  ]},
  { time: '14:00', patients: [
    { name: 'Patrick Moyo', type: 'Medication Review', doctor: 'Dr. Moyo', status: 'scheduled' },
  ]},
];

const statusStyles = {
  'confirmed': 'bg-medical-50 text-medical-700',
  'scheduled': 'bg-neutral-100 text-neutral-600',
  'in-progress': 'bg-amber-50 text-amber-700',
  'completed': 'bg-healthcare-50 text-healthcare-700',
};

export default function AppointmentsPage() {
  const [currentDate] = useState(new Date());

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Appointments</h1>
          <p className="text-neutral-500 mt-1">Manage clinic appointments and scheduling</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-medical-600 text-white rounded-xl hover:bg-medical-700 transition-colors font-medium text-sm">
          <Plus className="h-4 w-4" />
          New Appointment
        </button>
      </div>

      {/* Calendar Header */}
      <div className="bg-white rounded-2xl border border-neutral-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-600">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h2 className="text-lg font-semibold text-neutral-900">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <button className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-600">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <div className="flex gap-1">
            {['Day', 'Week', 'Month'].map((view) => (
              <button
                key={view}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                  view === 'Week' ? 'bg-medical-600 text-white' : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                {view}
              </button>
            ))}
          </div>
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-center text-xs font-medium text-neutral-500 py-2">{day}</div>
          ))}
          {Array.from({ length: 35 }, (_, i) => {
            const day = i - 2;
            const isToday = day === new Date().getDate() - 1;
            return (
              <button
                key={i}
                className={`p-2 rounded-xl text-sm transition-colors ${
                  isToday ? 'bg-medical-600 text-white font-semibold' :
                  day > 0 && day <= 31 ? 'hover:bg-neutral-100 text-neutral-900' :
                  'text-neutral-300'
                }`}
              >
                {day > 0 && day <= 31 ? day : ''}
              </button>
            );
          })}
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-2xl border border-neutral-100 p-6">
        <h3 className="text-lg font-semibold text-neutral-900 mb-6">Today's Schedule</h3>
        <div className="space-y-6">
          {appointmentsData.map((slot) => (
            <div key={slot.time} className="flex gap-4">
              <div className="text-right min-w-[60px] pt-1">
                <p className="text-sm font-semibold text-neutral-900">{slot.time}</p>
              </div>
              <div className="relative flex flex-col gap-3 flex-1">
                <div className="absolute left-0 top-3 bottom-3 w-px bg-neutral-200" />
                {slot.patients.map((apt) => (
                  <div key={apt.name} className="ml-6 p-4 rounded-xl bg-neutral-50 border border-neutral-100 hover:shadow-sm transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-neutral-900">{apt.name}</p>
                        <p className="text-xs text-neutral-500">{apt.type} · {apt.doctor}</p>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[apt.status]}`}>
                        {apt.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
