import { useQuery } from '@tanstack/react-query';
import { useAlertService } from '../services/context/AlertServiceContext';
import type { AlertTableParams } from '../services/types/alert';

export function useAlert(id: string) {
  const service = useAlertService();
  return useQuery({
    queryKey: ['alert', id],
    queryFn: () => service.getAlert(id)
  });
}

export function useAlertTable(params: AlertTableParams) {
  const service = useAlertService();
  return useQuery({
    queryKey: ['alerts', params],
    queryFn: () => service.getAlertTable(params)
  });
}