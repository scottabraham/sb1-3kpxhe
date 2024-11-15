import React, { createContext, useContext } from 'react';
import { IAlertService } from '../interfaces/IAlertService';

const AlertServiceContext = createContext<IAlertService | null>(null);

interface AlertServiceProviderProps {
  children: React.ReactNode;
  service: IAlertService;
}

export function AlertServiceProvider({ children, service }: AlertServiceProviderProps) {
  return (
    <AlertServiceContext.Provider value={service}>
      {children}
    </AlertServiceContext.Provider>
  );
}

export function useAlertService(): IAlertService {
  const context = useContext(AlertServiceContext);
  if (!context) {
    throw new Error('useAlertService must be used within an AlertServiceProvider');
  }
  return context;
}