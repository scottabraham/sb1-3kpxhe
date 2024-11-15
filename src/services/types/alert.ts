export interface Alert {
  id: string;
  title: string;
  message: string;
  severity: 'info' | 'warning' | 'error';
  timestamp: string;
}

export interface AlertTableParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface AlertTableResponse {
  alerts: Alert[];
  total: number;
  page: number;
  limit: number;
}