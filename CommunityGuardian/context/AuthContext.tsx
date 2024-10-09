import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { loginUser, logoutUser, signUpUser, getUserDetails } from '@/handlers/api'; // Import your API functions
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the shape of our AuthContext
interface AuthContextData {
  user: any;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password1: string, password2: string, userType: string) => Promise<void>;
  logout: () => Promise<void>;
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
  loading: false,
});

// AuthProvider component that wraps the app
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Fetch user details on app startup
  useEffect(() => {
    const loadUserData = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        try {
          const userData = await getUserDetails();
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error loading user data:', error);
          setIsAuthenticated(false);
        }
      }
      setLoading(false);
    };
    loadUserData();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await loginUser(email, password);
      setUser(response.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign Up function
  const signUp = async (email: string,password1: string, password2: string, userType: string) => {
    try {
      setLoading(true);
      const response = await signUpUser(email, password1, password2, userType);
      setUser(response.user);
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
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signUp, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
