import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import {
  loginUser,
  logoutUser,
  signUpUser,
  getIndividual,
  updateIndividual,
  createEmergencyContact,
  getEmergencyContact, // Import the getEmergencyContact function
  updateEmergencyContact,
  deleteEmergencyContact,
} from '@/handlers/api'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the shape of our AuthContext
interface AuthContextData {
  user: any;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password1: string, password2: string, userType: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updatedData: any) => Promise<void>; 
  createContact: (contactData: any) => Promise<void>; 
  updateContact: (contactId: string, contactData: any) => Promise<void>; 
  deleteContact: (contactId: string) => Promise<void>; 
  loading: boolean;
}

// Props type for AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// Default values for the context
const AuthContext = createContext<AuthContextData>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  signUp: async () => {},
  logout: async () => {},
  updateUser: async () => {}, 
  createContact: async () => {}, 
  updateContact: async () => {}, 
  deleteContact: async () => {}, 
  loading: false,
});

// AuthProvider component that wraps the app
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>({
    details: null,
    emergency_contacts: [], // Initialize emergency_contacts
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Function to fetch user details
  const refreshUserData = async () => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      try {
        const userData = await getIndividual();
        setUser((prevUser:any) => ({
          ...prevUser,
          details: userData, // Update user details
        }));
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error loading user data:', error);
        setIsAuthenticated(false);
      }
    }
    setLoading(false);
  };

  // Fetch emergency contacts function
  const getContacts = async () => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      try {
        const contacts = await getEmergencyContact();
        setUser((prevUser:any) => ({
          ...prevUser,
          emergency_contacts: contacts, // Update emergency contacts
        }));
      } catch (error) {
        console.error('Error loading emergency contacts:', error);
      }
    }
  };

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await loginUser(email, password);
      setUser({ details: response.user, emergency_contacts: [] }); // Initialize with empty contacts
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign Up function
  const signUp = async (email: string, password1: string, password2: string, userType: string) => {
    try {
      setLoading(true);
      const response = await signUpUser(email, password1, password2, userType);
      setUser({ details: response.user, emergency_contacts: [] }); // Initialize with empty contacts
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Sign Up error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setLoading(true);
      await logoutUser();
      setUser({ details: null, emergency_contacts: [] }); // Reset user data
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');
      setLoading(false);
    }
  };

  // Update user details function
  const updateUser = async (updatedData: any) => {
    try {
      setLoading(true);
      const response = await updateIndividual(updatedData);
      setUser((prevUser:any) => ({
        ...prevUser,
        details: response, // Update user details
      }));
      await AsyncStorage.setItem('user', JSON.stringify(response)); 
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Create emergency contact function
  const createContact = async (contactData: any) => {
    try {
      setLoading(true);
      await createEmergencyContact(contactData);
      await refreshUserData(); // Refresh user data after creating a contact
      await getContacts(); // Fetch contacts again after creation
    } catch (error) {
      console.error('Error creating contact:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update emergency contact function
  const updateContact = async (contactId: string, contactData: any) => {
    try {
      setLoading(true);
      await updateEmergencyContact(contactId, contactData);
      await refreshUserData(); // Refresh user data after updating a contact
      await getContacts(); // Fetch contacts again after update
    } catch (error) {
      console.error('Error updating contact:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Delete emergency contact function
  const deleteContact = async (contactId: string) => {
    try {
      setLoading(true);
      await deleteEmergencyContact(contactId);
      await refreshUserData(); // Refresh user data after deleting a contact
      await getContacts(); // Fetch contacts again after deletion
    } catch (error) {
      console.error('Error deleting contact:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Fetch user details on app startup
  useEffect(() => {
    refreshUserData(); // Fetch user data on mount
    getContacts(); // Fetch emergency contacts on mount
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signUp, logout, updateUser, createContact, updateContact, deleteContact, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
