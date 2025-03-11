import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import DashboardClient from './DashboardClient';

export default async function WidgetsPage() {
  // Server-side authentication check
  const session = await auth();
  
  // Check if user is authenticated
  if (!session) {
    // Redirect to login page if not authenticated
    redirect('/auth/login');
  }
  
  // If authenticated, render the client component
  return <DashboardClient />;
}