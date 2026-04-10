'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import Sidebar from '@/components/dashboard/Sidebar';
import CalendarView from '@/components/calendar/CalendarView';

export default function SchedulePage() {
  return (
    <DashboardLayout sidebar={<Sidebar />}>
      <CalendarView />
    </DashboardLayout>
  );
}