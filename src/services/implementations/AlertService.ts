import { IAlertService } from '../interfaces/IAlertService';
import type { Alert, AlertTableParams, AlertTableResponse } from '../types/alert';

export class AlertService implements IAlertService {
  private baseUrl = '/api';

  async getAlert(id: string): Promise<Alert> {
    const response = await fetch(`${this.baseUrl}/alerts/${id}`);
    if (!response.ok) throw new Error('Failed to fetch alert');
    return response.json();
  }

  async getAlertTable(params: AlertTableParams): Promise<AlertTableResponse> {
    const queryParams = new URLSearchParams({
      page: params.page.toString(),
      limit: params.limit.toString(),
      ...(params.sortBy && { sortBy: params.sortBy }),
      ...(params.sortOrder && { sortOrder: params.sortOrder })
    });

    const response = await fetch(`${this.baseUrl}/alerts?${queryParams}`);
    if (!response.ok) throw new Error('Failed to fetch alerts');
    return response.json();
  }
}