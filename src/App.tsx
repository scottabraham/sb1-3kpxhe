import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AlertService } from './services/implementations/AlertService';
import { AlertServiceProvider } from './services/context/AlertServiceContext';
import AlertList from './components/AlertList';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute
      refetchOnWindowFocus: false
    }
  }
});

const alertService = new AlertService();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AlertServiceProvider service={alertService}>
        <div className="min-h-screen bg-gray-100 p-8">
          <AlertList />
        </div>
      </AlertServiceProvider>
    </QueryClientProvider>
  );
}