'use client';

import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/ui/StatCard';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { SearchInput } from '@/components/ui/SearchInput';
import Button from '@/components/ui/Button';
import { Pill, AlertTriangle, Package, DollarSign, Plus } from 'lucide-react';
import { useState } from 'react';

const inventory = [
  { id: 1, name: 'Metformin 500mg', category: 'Diabetes', quantity: 450, unit: 'tablets', reorderLevel: 100, expiryDate: '2025-06-30', status: 'in-stock' as const },
  { id: 2, name: 'Lisinopril 10mg', category: 'Hypertension', quantity: 280, unit: 'tablets', reorderLevel: 100, expiryDate: '2025-08-15', status: 'in-stock' as const },
  { id: 3, name: 'Amlodipine 5mg', category: 'Hypertension', quantity: 85, unit: 'tablets', reorderLevel: 100, expiryDate: '2025-04-20', status: 'low-stock' as const },
  { id: 4, name: 'Glibenclamide 5mg', category: 'Diabetes', quantity: 320, unit: 'tablets', reorderLevel: 100, expiryDate: '2025-07-01', status: 'in-stock' as const },
  { id: 5, name: 'Aspirin 81mg', category: 'Cardiology', quantity: 600, unit: 'tablets', reorderLevel: 200, expiryDate: '2025-09-10', status: 'in-stock' as const },
  { id: 6, name: 'Insulin Glargine', category: 'Diabetes', quantity: 25, unit: 'vials', reorderLevel: 30, expiryDate: '2025-05-12', status: 'low-stock' as const },
  { id: 7, name: 'ART (TDF/3TC/DTG)', category: 'HIV', quantity: 150, unit: 'bottles', reorderLevel: 50, expiryDate: '2025-10-01', status: 'in-stock' as const },
  { id: 8, name: 'RHZE (TB Treatment)', category: 'TB', quantity: 15, unit: 'packs', reorderLevel: 20, expiryDate: '2025-03-15', status: 'low-stock' as const },
];

export default function PharmacyPage() {
  const [search, setSearch] = useState('');

  const filtered = inventory.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Pharmacy</h2>
            <p className="text-sm text-gray-500 mt-1">Manage medication inventory and dispensing</p>
          </div>
          <Button>
            <Plus className="w-4 h-4" />
            Add Medication
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard label="Total Items" value="156" icon={<Package className="w-5 h-5" />} />
          <StatCard label="Low Stock" value="4" icon={<AlertTriangle className="w-5 h-5" />} variant="warning" />
          <StatCard label="Expiring Soon" value="2" icon={<AlertTriangle className="w-5 h-5" />} variant="danger" />
          <StatCard label="Dispensed Today" value="47" icon={<Pill className="w-5 h-5" />} variant="success" />
        </div>

        <Card>
          <CardHeader>
            <SearchInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search medications..."
            />
          </CardHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Medication</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Reorder Level</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{item.name}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="blue">{item.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{item.quantity} {item.unit}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-500">{item.reorderLevel}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-500">{item.expiryDate}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={item.status === 'low-stock' ? 'red' : 'green'}>
                      {item.status === 'low-stock' ? 'Low Stock' : 'In Stock'}
                    </Badge>
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
