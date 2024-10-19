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
  getPosts, 
  getComments, 
  createComment,
  getRewards 
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
  getAllPosts: () => Promise<void>; // Add method to get all posts
  getPostComments: (postId: string) => Promise<void>; // Add method to get comments of a post
  createPostComment: (commentData: any) => Promise<void>; // Add method to create a comment
  getRewards: () => Promise<void>; // Add method to get rewards
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
  getAllPosts:  async () => {}, 
  getPostComments:  async () => {}, 
  createPostComment:  async () => {}, 
  getRewards:  async () => {}, 
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

  const getAllPosts = async () => {
    setLoading(true);
    try {
      const posts = await getPosts();
      return posts; // Optionally set the posts in state if needed
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch comments for a specific post
  const getPostComments = async (postId: string) => {
    setLoading(true);
    try {
      const comments = await getComments(postId);
      return comments; // Optionally set the comments in state if needed
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  // Create a new comment
  const createPostComment = async (commentData: any) => {
    setLoading(true);
    try {
      const newComment = await createComment(commentData);
      return newComment;
    } catch (error) {
      console.error('Error creating comment:', error);
    } finally {
      setLoading(false);
    }
  };
  const getRewardsData = async () => {
    setLoading(true);
    try {
      const rewards = await getRewards();
      return rewards; // Return the rewards data
    } catch (error) {
      console.error('Error fetching rewards:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signUp, logout, updateUser, createContact, updateContact, deleteContact,getAllPosts,  getPostComments,createPostComment,getRewards, loading }}>
      {children}
    </AuthContext.Provider>
  );
};



// Hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
