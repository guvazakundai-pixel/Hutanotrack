'use client';

import { useState, useEffect } from 'react';
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

function generatePatients(count: number) {
  const firstNames = ['Tendai', 'Chipo', 'Blessing', 'Rudo', 'Tafadzwa', 'Nyasha', 'Takudzwa', 'Shamiso', 'Kudzai', 'Tanaka', 'Mufaro', 'Tariro', 'Courage', 'Anesu', 'Panashe', 'Tatenda', 'Simba', 'Rufaro', 'Chenai', 'Farai'];
  const lastNames = ['Mukanya', 'Dube', 'Ndlovu', 'Moyo', 'Chikomo', 'Gumbo', 'Mufambi', 'Chikwanha', 'Sibanda', 'Ncube', 'Khumalo', 'Tsvangirai', 'Biti', 'Chamisa', 'Mudzuri', 'Gonese', 'Samukange', 'Mutonga', 'Mpofu', 'Nkomo'];
  const villages = ['Mbare', 'Highfield', 'Kuwadzana', 'Hatfield', 'Budiriro', 'Glen Norah', 'Epworth', 'Chitungwiza', 'Dzivarasekwa', 'Mufakose', 'Mabvuku', 'Tafara', 'Rugare', 'Sunningdale', 'Waterfalls'];
  const diseases = ['Diabetes', 'Hypertension', 'HIV', 'TB', 'Maternal', 'Malaria', 'Asthma', 'Epilepsy'];
  const riskLevels: ('green' | 'amber' | 'red')[] = ['green', 'amber', 'red'];
  const genders = ['Male', 'Female'];

  return Array.from({ length: count }, (_, i) => ({
    id: String(i + 1),
    firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
    lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
    gender: genders[Math.floor(Math.random() * genders.length)],
    age: Math.floor(Math.random() * 60) + 18,
    village: villages[Math.floor(Math.random() * villages.length)],
    disease: diseases[Math.floor(Math.random() * diseases.length)],
    riskLevel: riskLevels[Math.floor(Math.random() * riskLevels.length)],
    phone: `+263 71${Math.floor(Math.random() * 9)} ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 9000) + 1000}`,
    lastVisit: `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
  }));
}

const allPatients = generatePatients(105);

function SkeletonRow() {
  return (
    <TableRow>
      {Array.from({ length: 7 }).map((_, i) => (
        <TableCell key={i}>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" style={{ width: `${60 + Math.random() * 40}%` }} />
        </TableCell>
      ))}
    </TableRow>
  );
}

export default function PatientsPage() {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filtered = allPatients.filter(
    (p) =>
      `${p.firstName} ${p.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
      p.village.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col space-y-6 min-w-0">
        <div className="flex items-center justify-between shrink-0">
          <div className="min-w-0">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Patients</h2>
            <p className="text-sm text-gray-500 mt-1">
              Manage all registered patients across your clinic
            </p>
          </div>
          <Button className="shrink-0 min-h-[44px]">
            <Plus className="w-4 h-4" />
            Add Patient
          </Button>
        </div>

        <Card className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <CardHeader>
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <SearchInput
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search patients by name or village..."
              />
              <Button variant="secondary" size="sm" className="min-h-[44px] shrink-0">
                <Filter className="w-4 h-4" />
                Filters
              </Button>
            </div>
          </CardHeader>
          <div className="flex-1 overflow-auto min-w-0">
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
                {loading ? (
                  Array.from({ length: 8 }).map((_, i) => <SkeletonRow key={i} />)
                ) : filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7}>
                      <div className="text-center py-12 text-gray-400">
                        No patients found matching your search.
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell>
                        <Link href={`/patients/${patient.id}`} className="flex items-center gap-3 hover:opacity-80 min-h-[44px]">
                          <Avatar firstName={patient.firstName} lastName={patient.lastName} size="sm" />
                          <div className="min-w-0">
                            <p className="font-medium text-gray-900 dark:text-gray-100 truncate max-w-[160px]">
                              {patient.firstName} {patient.lastName}
                            </p>
                            <p className="text-xs text-gray-400 truncate">{patient.phone}</p>
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm whitespace-nowrap">
                          {patient.age} &middot; {patient.gender}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm truncate max-w-[120px] block">{patient.village}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="blue">{patient.disease}</Badge>
                      </TableCell>
                      <TableCell>
                        <RiskBadge riskLevel={patient.riskLevel} />
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-500 whitespace-nowrap">{patient.lastVisit}</span>
                      </TableCell>
                      <TableCell>
                        <button className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 min-h-[44px] min-w-[44px] flex items-center justify-center">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          {!loading && (
            <div className="shrink-0 border-t border-gray-100 dark:border-gray-800 px-6 py-3 flex items-center justify-between text-sm text-gray-500">
              <span>{filtered.length} patients</span>
              <span>Page 1 of 1</span>
            </div>
          )}
        </Card>
      </motion.div>
    </DashboardLayout>
  );
}
