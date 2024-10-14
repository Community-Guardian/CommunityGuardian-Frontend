import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import {
  postReport,
  getReports,
  UpdateReport,
  DeleteReport,
} from '@/handlers/api'; // Import your API handler for reports

// Define the shape of our ReportContext
interface ReportContextData {
  reports: any[];
  createReport: (reportData: FormData) => Promise<void>;
  fetchReports: () => Promise<void>;
  updateReport: (reportId: string, reportData: FormData) => Promise<void>;
  deleteReport: (reportId: string) => Promise<void>;
  loading: boolean;
}

// Props type for ReportProvider
interface ReportProviderProps {
  children: ReactNode;
}

// Default values for the context
const ReportContext = createContext<ReportContextData>({
  reports: [],
  createReport: async () => {},
  fetchReports: async () => {},
  updateReport: async () => {},
  deleteReport: async () => {},
  loading: false,
});

// ReportProvider component that wraps the app
export const ReportProvider: React.FC<ReportProviderProps> = ({ children }) => {
  const [reports, setReports] = useState<any[]>([]); // This will hold the list of reports
  const [loading, setLoading] = useState<boolean>(false);

  // Function to create a new report
  const createReport = async (reportData: FormData) => {
    try {
      setLoading(true);

      // Call the API to submit the report
      await postReport(reportData);

      // Optionally fetch the latest reports after submission
      await fetchReports();

    } catch (error) {
      console.error('Error submitting report:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch all reports
  const fetchReports = async () => {
    try {
      setLoading(true);

      // Call the API to get reports
      const reportsData = await getReports();
      setReports(reportsData); // Update the reports state with the fetched data

    } catch (error) {
      console.error('Error fetching reports:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Function to update a report
  const updateReport = async (reportId: string, reportData: FormData) => {
    try {
      setLoading(true);

      // Call the API to update the report
      await UpdateReport(reportId, reportData);

      // Optionally fetch the latest reports after updating
      await fetchReports();
      
    } catch (error) {
      console.error('Error updating report:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Function to delete a report
  const deleteReport = async (reportId: string) => {
    try {
      setLoading(true);

      // Call the API to delete the report
      await DeleteReport(reportId);

      // Optionally fetch the latest reports after deletion
      await fetchReports();

    } catch (error) {
      console.error('Error deleting report:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Optionally use `useEffect` to load reports when the component mounts
  useEffect(() => {
    fetchReports(); // Fetch reports on mount
  }, []); // This will trigger when the provider mounts and fetch reports

  return (
    <ReportContext.Provider value={{ reports, createReport, fetchReports, updateReport, deleteReport, loading }}>
      {children}
    </ReportContext.Provider>
  );
};

// Hook to use the ReportContext
export const useReport = () => useContext(ReportContext);
