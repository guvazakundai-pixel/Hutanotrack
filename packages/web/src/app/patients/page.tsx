'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { SearchInput } from '@/components/ui/SearchInput';
import { Badge, RiskBadge } from '@/components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { Avatar } from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import { Plus, Filter, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

const patients = [
  { id: '1', firstName: 'Tendai', lastName: 'Mukanya', gender: 'Male', age: 45, village: 'Mbare', disease: 'Diabetes', riskLevel: 'amber', phone: '+263 712 345 678', lastVisit: '2024-01-15' },
  { id: '2', firstName: 'Chipo', lastName: 'Dube', gender: 'Female', age: 52, village: 'Highfield', disease: 'Hypertension', riskLevel: 'red', phone: '+263 713 456 789', lastVisit: '2024-01-14' },
  { id: '3', firstName: 'Blessing', lastName: 'Ndlovu', gender: 'Male', age: 38, village: 'Kuwadzana', disease: 'HIV', riskLevel: 'green', phone: '+263 714 567 890', lastVisit: '2024-01-10' },
  { id: '4', firstName: 'Rudo', lastName: 'Moyo', gender: 'Female', age: 29, village: 'Hatfield', disease: 'Maternal', riskLevel: 'green', phone: '+263 715 678 901', lastVisit: '2024-01-12' },
  { id: '5', firstName: 'Tafadzwa', lastName: 'Chikomo', gender: 'Male', age: 61, village: 'Budiriro', disease: 'Diabetes', riskLevel: 'amber', phone: '+263 716 789 012', lastVisit: '2024-01-08' },
  { id: '6', firstName: 'Nyasha', lastName: 'Gumbo', gender: 'Female', age: 33, village: 'Glen Norah', disease: 'TB', riskLevel: 'red', phone: '+263 717 890 123', lastVisit: '2024-01-13' },
  { id: '7', firstName: 'Takudzwa', lastName: 'Mufambi', gender: 'Male', age: 47, village: 'Epworth', disease: 'Hypertension', riskLevel: 'green', phone: '+263 718 901 234', lastVisit: '2024-01-11' },
  { id: '8', firstName: 'Shamiso', lastName: 'Chikwanha', gender: 'Female', age: 55, village: 'Chitungwiza', disease: 'Diabetes', riskLevel: 'amber', phone: '+263 719 012 345', lastVisit: '2024-01-09' },
];

export default function PatientsPage() {
  const [search, setSearch] = useState('');

  const filtered = patients.filter(
    (p) =>
      p.firstName.toLowerCase().includes(search.toLowerCase()) ||
      p.lastName.toLowerCase().includes(search.toLowerCase()) ||
      p.village.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Patients</h2>
            <p className="text-sm text-gray-500 mt-1">
              Manage all registered patients across your clinic
            </p>
          </div>
          <Button>
            <Plus className="w-4 h-4" />
            Add Patient
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4 flex-1">
              <SearchInput
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search patients by name or village..."
              />
              <Button variant="secondary" size="sm">
                <Filter className="w-4 h-4" />
                Filters
              </Button>
            </div>
          </CardHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Age/Gender</TableHead>
                <TableHead>Village</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>
                    <Link href={`/patients/${patient.id}`} className="flex items-center gap-3 hover:opacity-80">
                      <Avatar firstName={patient.firstName} lastName={patient.lastName} size="sm" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          {patient.firstName} {patient.lastName}
                        </p>
                        <p className="text-xs text-gray-400">{patient.phone}</p>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {patient.age} • {patient.gender}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{patient.village}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="blue">{patient.disease}</Badge>
                  </TableCell>
                  <TableCell>
                    <RiskBadge riskLevel={patient.riskLevel} />
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-500">{patient.lastVisit}</span>
                  </TableCell>
                  <TableCell>
                    <button className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
}
