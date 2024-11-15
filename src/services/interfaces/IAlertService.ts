import type { Alert, AlertTableParams, AlertTableResponse } from '../types/alert';

export interface IAlertService {
  getAlert: (id: string) => Promise<Alert>;
  getAlertTable: (params: AlertTableParams) => Promise<AlertTableResponse>;
}