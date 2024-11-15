import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import AlertList from '../AlertList';
import { AlertServiceProvider } from '../../services/context/AlertServiceContext';
import { AlertService } from '../../services/implementations/AlertService';

// Mock the AlertService implementation
vi.mock('../../services/implementations/AlertService');

describe('AlertList', () => {
  const mockAlerts = {
    alerts: [
      {
        id: '1',
        title: 'Test Alert',
        message: 'This is a test alert',
        severity: 'warning' as const,
        timestamp: '2024-02-28T12:00:00Z',
      },
      {
        id: '2',
        title: 'Error Alert',
        message: 'This is an error alert',
        severity: 'error' as const,
        timestamp: '2024-02-28T13:00:00Z',
      },
    ],
    total: 2,
    page: 1,
    limit: 10,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderWithProvider = (ui: React.ReactElement) => {
    return render(ui, {
      wrapper: ({ children }) => (
        <AlertServiceProvider>{children}</AlertServiceProvider>
      ),
    });
  };

  it('renders loading state', () => {
    vi.mocked(AlertService).mockImplementation(() => ({
      getAlertTable: () => ({
        isLoading: true,
        data: undefined,
        error: undefined,
      }),
      getAlert: () => ({
        isLoading: false,
        data: undefined,
        error: undefined,
      }),
    }));

    renderWithProvider(<AlertList />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    vi.mocked(AlertService).mockImplementation(() => ({
      getAlertTable: () => ({
        isLoading: false,
        data: undefined,
        error: new Error('Failed to fetch'),
      }),
      getAlert: () => ({
        isLoading: false,
        data: undefined,
        error: undefined,
      }),
    }));

    renderWithProvider(<AlertList />);
    expect(screen.getByText('Error loading alerts')).toBeInTheDocument();
  });

  it('renders alerts correctly', () => {
    vi.mocked(AlertService).mockImplementation(() => ({
      getAlertTable: () => ({
        isLoading: false,
        data: mockAlerts,
        error: undefined,
      }),
      getAlert: () => ({
        isLoading: false,
        data: undefined,
        error: undefined,
      }),
    }));

    renderWithProvider(<AlertList />);

    // Check if alerts are rendered
    expect(screen.getByText('Test Alert')).toBeInTheDocument();
    expect(screen.getByText('This is a test alert')).toBeInTheDocument();
    expect(screen.getByText('Error Alert')).toBeInTheDocument();
    expect(screen.getByText('This is an error alert')).toBeInTheDocument();

    // Check if severity badges are rendered with correct classes
    const warningBadge = screen.getByText('warning');
    const errorBadge = screen.getByText('error');
    expect(warningBadge).toHaveClass('bg-yellow-100');
    expect(errorBadge).toHaveClass('bg-red-100');

    // Check if timestamps are formatted correctly
    const timestamps = screen.getAllByText(expect.stringMatching(/\d{1,2}\/\d{1,2}\/\d{4}/));
    expect(timestamps).toHaveLength(2);
  });

  it('calls getAlertTable with correct parameters', () => {
    const getAlertTableMock = vi.fn().mockReturnValue({
      isLoading: false,
      data: mockAlerts,
      error: undefined,
    });

    vi.mocked(AlertService).mockImplementation(() => ({
      getAlertTable: getAlertTableMock,
      getAlert: () => ({
        isLoading: false,
        data: undefined,
        error: undefined,
      }),
    }));

    renderWithProvider(<AlertList />);

    expect(getAlertTableMock).toHaveBeenCalledWith({
      page: 1,
      limit: 10,
      sortBy: 'timestamp',
      sortOrder: 'desc',
    });
  });
});