'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SearchInput } from '@/components/ui/SearchInput';
import { BookOpen, Video, Headphones, Heart, Apple, Brain, Baby, Pill } from 'lucide-react';

const categories = [
  { id: 'diabetes', label: 'Diabetes', icon: Apple, color: 'bg-blue-50 text-blue-500' },
  { id: 'hypertension', label: 'Hypertension', icon: Heart, color: 'bg-red-50 text-red-500' },
  { id: 'nutrition', label: 'Nutrition', icon: Apple, color: 'bg-green-50 text-green-500' },
  { id: 'medication', label: 'Medication', icon: Pill, color: 'bg-purple-50 text-purple-500' },
  { id: 'maternal', label: 'Maternal Health', icon: Baby, color: 'bg-pink-50 text-pink-500' },
  { id: 'mental', label: 'Mental Wellbeing', icon: Brain, color: 'bg-amber-50 text-amber-500' },
];

const articles = [
  { id: 1, title: 'Understanding Diabetes Management', category: 'Diabetes', type: 'article', readTime: '5 min', language: 'English' },
  { id: 2, title: 'Kuchengeta Shuga Yeropa (Managing Blood Sugar)', category: 'Diabetes', type: 'audio', readTime: '8 min', language: 'Shona' },
  { id: 3, title: 'How to Reduce Blood Pressure Naturally', category: 'Hypertension', type: 'article', readTime: '4 min', language: 'English' },
  { id: 4, title: 'Healthy Eating on a Budget', category: 'Nutrition', type: 'video', readTime: '10 min', language: 'English' },
  { id: 5, title: 'Taking Your Medications Correctly', category: 'Medication', type: 'article', readTime: '3 min', language: 'English' },
  { id: 6, title: 'Ukudla Okunempilo (Healthy Eating)', category: 'Nutrition', type: 'video', readTime: '7 min', language: 'Ndebele' },
  { id: 7, title: 'Pregnancy Care and Nutrition', category: 'Maternal Health', type: 'article', readTime: '6 min', language: 'English' },
  { id: 8, title: 'Managing Stress and Anxiety', category: 'Mental Wellbeing', type: 'article', readTime: '4 min', language: 'English' },
];

export default function EducationPage() {
  const [search, setSearch] = useState('');

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Health Education</h2>
          <p className="text-sm text-gray-500 mt-1">Educational content in English, Shona, and Ndebele</p>
        </div>

        <div className="flex items-center gap-4">
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search health topics..."
          />
          <div className="flex gap-2 flex-wrap">
            {['English', 'Shona', 'Ndebele'].map((lang) => (
              <button
                key={lang}
                className="px-3 py-1.5 rounded-xl text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-medical-50 hover:text-medical-600 transition-colors"
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className="p-4 rounded-2xl bg-white dark:bg-surface-dark-elevated border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all text-center"
            >
              <div className={`w-10 h-10 rounded-xl ${cat.color} flex items-center justify-center mx-auto mb-2`}>
                <cat.icon className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-gray-700 dark:text-gray-300">{cat.label}</p>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((article) => {
            const TypeIcon = article.type === 'video' ? Video : article.type === 'audio' ? Headphones : BookOpen;
            return (
              <Card key={article.id} hover>
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-medical-50 dark:bg-medical-900/20 text-medical-500">
                    <TypeIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-snug">
                      {article.title}
                    </h3>
                    <div className="mt-2 flex items-center gap-2 flex-wrap">
                      <Badge variant="blue">{article.category}</Badge>
                      <span className="text-xs text-gray-400">{article.readTime}</span>
                      <Badge variant="gray">{article.language}</Badge>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
