'use client';

import { useState } from 'react';
import { Search, Plus, Filter, MoreVertical, Phone, MapPin } from 'lucide-react';

const patients = [
  {
    id: 'P-001',
    name: 'Tendai Mukosi',
    age: 45,
    gender: 'M',
    condition: 'Diabetes Type 2',
    risk: 'amber',
    lastVisit: '2024-12-10',
    village: 'Murewa',
    phone: '+263 77 123 4567',
    adherence: 82,
  },
  {
    id: 'P-002',
    name: 'Maria Sibanda',
    age: 62,
    gender: 'F',
    condition: 'Hypertension',
    risk: 'red',
    lastVisit: '2024-12-15',
    village: 'Goromonzi',
    phone: '+263 71 234 5678',
    adherence: 65,
  },
  {
    id: 'P-003',
    name: 'John Dube',
    age: 38,
    gender: 'M',
    condition: 'HIV',
    risk: 'green',
    lastVisit: '2024-12-18',
    village: 'Seke',
    phone: '+263 78 345 6789',
    adherence: 95,
  },
  {
    id: 'P-004',
    name: 'Sarah Ndlovu',
    age: 55,
    gender: 'F',
    condition: 'Diabetes, Hypertension',
    risk: 'amber',
    lastVisit: '2024-12-12',
    village: 'Chitungwiza',
    phone: '+263 77 456 7890',
    adherence: 78,
  },
  {
    id: 'P-005',
    name: 'Patrick Moyo',
    age: 70,
    gender: 'M',
    condition: 'Hypertension',
    risk: 'red',
    lastVisit: '2024-12-20',
    village: 'Marondera',
    phone: '+263 71 567 8901',
    adherence: 45,
  },
];

const riskColors = {
  green: 'bg-healthcare-50 text-healthcare-700 border-healthcare-200',
  amber: 'bg-amber-50 text-amber-700 border-amber-200',
  red: 'bg-red-50 text-red-700 border-red-200',
};

export default function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Patients</h1>
          <p className="text-neutral-500 mt-1">Manage and view patient records</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-medical-600 text-white rounded-xl hover:bg-medical-700 transition-colors font-medium text-sm">
          <Plus className="h-4 w-4" />
          Add Patient
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search patients by name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-neutral-200 bg-white py-2.5 pl-10 pr-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-medical-500 focus:outline-none focus:ring-2 focus:ring-medical-500/20 transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 transition-colors text-sm font-medium">
          <Filter className="h-4 w-4" />
          Filters
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-100">
                <th className="text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider px-6 py-4">Patient</th>
                <th className="text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider px-6 py-4">Condition</th>
                <th className="text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider px-6 py-4">Risk</th>
                <th className="text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider px-6 py-4">Adherence</th>
                <th className="text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider px-6 py-4">Last Visit</th>
                <th className="text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider px-6 py-4">Location</th>
                <th className="w-10 px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-neutral-50 transition-colors cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-medical-50 flex items-center justify-center">
                        <span className="text-sm font-semibold text-medical-600">
                          {patient.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-neutral-900">{patient.name}</p>
                        <p className="text-xs text-neutral-500">{patient.id} · {patient.age}yrs · {patient.gender}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-neutral-700">{patient.condition}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${riskColors[patient.risk]}`}>
                      {patient.risk.charAt(0).toUpperCase() + patient.risk.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 rounded-full bg-neutral-100 max-w-[100px]">
                        <div
                          className={`h-full rounded-full ${
                            patient.adherence >= 80 ? 'bg-healthcare-500' :
                            patient.adherence >= 60 ? 'bg-amber-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${patient.adherence}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-neutral-600">{patient.adherence}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-neutral-600">{patient.lastVisit}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-sm text-neutral-600">
                      <MapPin className="h-3.5 w-3.5" />
                      {patient.village}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-1 rounded-lg hover:bg-neutral-100 text-neutral-400">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-100">
          <p className="text-sm text-neutral-500">Showing {filteredPatients.length} of 1,247 patients</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 rounded-lg border border-neutral-200 text-sm text-neutral-600 hover:bg-neutral-50">Previous</button>
            <button className="px-3 py-1.5 rounded-lg bg-medical-600 text-white text-sm">1</button>
            <button className="px-3 py-1.5 rounded-lg border border-neutral-200 text-sm text-neutral-600 hover:bg-neutral-50">2</button>
            <button className="px-3 py-1.5 rounded-lg border border-neutral-200 text-sm text-neutral-600 hover:bg-neutral-50">3</button>
            <span className="text-sm text-neutral-400">...</span>
            <button className="px-3 py-1.5 rounded-lg border border-neutral-200 text-sm text-neutral-600 hover:bg-neutral-50">42</button>
            <button className="px-3 py-1.5 rounded-lg border border-neutral-200 text-sm text-neutral-600 hover:bg-neutral-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
