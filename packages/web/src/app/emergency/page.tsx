'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { AlertTriangle, CheckCircle, Phone, Ambulance } from 'lucide-react';
import { DANGER_SIGNS_QUESTIONS, EMERGENCY_INSTRUCTIONS } from '@hutanotrack/shared';

export default function EmergencyPage() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [showResults, setShowResults] = useState(false);

  const dangerDetected = Object.values(answers).some((v) => v === true);

  const handleAnswer = (id: string, value: boolean) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
  };

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-3xl mx-auto">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Emergency Screening</h2>
          <p className="text-sm text-gray-500 mt-1">Quick danger sign assessment for patients</p>
        </div>

        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div key="questions" exit={{ opacity: 0, y: -20 }} className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Danger Sign Assessment</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-amber-500">
                    <AlertTriangle className="w-4 h-4" />
                    Answer all questions honestly
                  </div>
                </CardHeader>
                <div className="space-y-4">
                  {DANGER_SIGNS_QUESTIONS.map((q) => (
                    <div key={q.id} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
                        {q.question_en}
                      </p>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleAnswer(q.id, true)}
                          className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${
                            answers[q.id] === true
                              ? 'bg-red-500 text-white'
                              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-red-300'
                          }`}
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => handleAnswer(q.id, false)}
                          className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${
                            answers[q.id] === false
                              ? 'bg-healthcare-500 text-white'
                              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-healthcare-300'
                          }`}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Button
                onClick={handleSubmit}
                className="w-full"
                size="lg"
                disabled={Object.keys(answers).length < DANGER_SIGNS_QUESTIONS.length}
              >
                Complete Screening
              </Button>
            </motion.div>
          ) : (
            <motion.div key="results" initial={{ opacity: 0, y: 20 }} className="space-y-4">
              {dangerDetected ? (
                <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10">
                  <div className="text-center py-6">
                    <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
                      <AlertTriangle className="w-8 h-8 text-red-500" />
                    </div>
                    <h3 className="text-xl font-bold text-red-700 dark:text-red-400 mb-2">
                      Danger Signs Detected
                    </h3>
                    <p className="text-red-600 dark:text-red-300 mb-6">
                      {EMERGENCY_INSTRUCTIONS.en}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button variant="danger" size="lg">
                        <Phone className="w-5 h-5" />
                        Call Emergency Services
                      </Button>
                      <Button variant="secondary" size="lg">
                        <Ambulance className="w-5 h-5" />
                        Notify CHW
                      </Button>
                    </div>
                  </div>
                </Card>
              ) : (
                <Card className="border-healthcare-200 dark:border-healthcare-800 bg-healthcare-50 dark:bg-healthcare-900/10">
                  <div className="text-center py-6">
                    <div className="w-16 h-16 rounded-full bg-healthcare-100 dark:bg-healthcare-900/30 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-healthcare-500" />
                    </div>
                    <h3 className="text-xl font-bold text-healthcare-700 dark:text-healthcare-400 mb-2">
                      No Danger Signs Detected
                    </h3>
                    <p className="text-healthcare-600 dark:text-healthcare-300 mb-6">
                      The patient appears stable. Continue with regular monitoring and care.
                    </p>
                  </div>
                </Card>
              )}

              <Button onClick={handleReset} variant="secondary" className="w-full">
                Start New Screening
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </DashboardLayout>
  );
}
