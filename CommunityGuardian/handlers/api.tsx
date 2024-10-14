import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { 
  BASE_URL, 
  GET_INDIVIDUAL_URL,
  UPDATE_INDIVIDUAL_URL,
  REFRESH_TOKEN,
  SIGN_UP_URL, 
  LOGIN_URL_URL, 
  LOGOUT_URL,
  GET_USER_URL,
} from './apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Handler for API error
const handleApiError = (error: AxiosError) => {
  if (error.response && error.response.data) {
    console.error('API Error:', error.response.data);
    throw error.response.data;
  } else {
    console.error('API Error:', error.message);
    throw error;
  }
};

// Configure Axios
const api = axios.create({
  baseURL: BASE_URL,
});

// Add a request interceptor to include the access token in headers
api.interceptors.request.use(
  async (config: any) => { // Cast config to any to bypass the type issues
    try {
      const token = await AsyncStorage.getItem('accessToken');
      console.log(token);

      // Explicitly check if the token is neither null nor undefined
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error retrieving access token:', error);
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Handle refresh token logic
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config; // Cast to any to allow _retry property

    // Ensure originalRequest is defined before accessing its properties
    if (originalRequest && error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');

        // Explicitly check if the refresh token is neither null nor undefined
        if (refreshToken) {
          const response = await api.post(REFRESH_TOKEN, { refresh: refreshToken });

          if (response.status === 200) {
            // Store the new access token
            await AsyncStorage.setItem('accessToken', response.data.access);

            // Update the Authorization header with the new access token
            if (originalRequest.headers) {
              originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;
            }

            // Retry the original request with the new access token
            return api(originalRequest);
          }
          else {
            // If the refresh token is invalid or the response status is not 200
            await AsyncStorage.removeItem('accessToken');
            await AsyncStorage.removeItem('refreshToken');
          }
        }

        // If the refresh token is invalid or the response status is not 200
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
        // Optionally, you might want to redirect to login page or handle logout here
        return Promise.reject(error); // Reject with the original error
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);

        // Remove invalid tokens
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
        
        // Optionally, you might want to redirect to login page or handle logout here
        return Promise.reject(refreshError); // Reject with the refresh error
      }
    }

    return Promise.reject(error); // Reject with the original error if it's not a 401 or retry logic already failed
  }
);



// User Authentication Handlers
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(LOGIN_URL_URL, { email, password });
    const { access, refresh ,user} = response.data;
    await AsyncStorage.setItem('accessToken', access);
    await AsyncStorage.setItem('refreshToken', refresh);
    await AsyncStorage.setItem('username', user.username );

    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

export const signUpUser = async (email: string,  password1: string,password2: string ,user_type: string) => {
  try {
    const response = await axios.post(SIGN_UP_URL, { email, password1,password2 ,user_type});
    const { access, refresh ,user} = response.data;
    await AsyncStorage.setItem('accessToken', access);
    await AsyncStorage.setItem('refreshToken', refresh);
    await AsyncStorage.setItem('username', user.username );
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};
export const getUserDetails = async () => {
  try {
    const response = await api.get(GET_USER_URL);    
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};
export const getIndividual = async () => {
  try {
    const response = await api.get(GET_INDIVIDUAL_URL);    
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};
export const UpdateIndividual = async (formData:any) => {
  try {
    console.log(formData);
    
    const response = await api.patch(UPDATE_INDIVIDUAL_URL,formData);    
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};
export const logoutUser = async () => {
  try {
    const authToken = await AsyncStorage.getItem('accessToken');
    if (!authToken) throw new Error('No auth token found');
    const response = await api.post(LOGOUT_URL);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
  finally {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
  }
};

