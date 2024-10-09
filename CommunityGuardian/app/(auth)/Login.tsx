import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router'; // Adjust based on your router setup
import Ionicons from '@expo/vector-icons/Ionicons'; // Import Ionicons for the eye icon

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // For toggling password visibility
  const [loading, setLoading] = useState(false); // To show logging in state

  const { login } = useAuth(); // Use the login function from AuthContext
  const router = useRouter(); // Using router for navigation

  const handleLogin = async () => {
    setLoading(true); // Show "Logging in..." when login is in progress
    try {
      await login(username, password);
      setLoading(false); // Hide "Logging in..." after successful login
      router.push('/(tabs)/'); // Navigate to the home screen or dashboard after login
    } catch (error) {
      setLoading(false); // Hide "Logging in..." if login fails
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleSignUp = () => {
    // Navigate to the Sign Up screen
    router.push('/(auth)/SignUp'); // Update the path according to your file structure
  };

  const handleResetPassword = () => {
    // Navigate to the Reset Password screen
    // router.push('/(auth)/reset-password'); // Update the path according to your file structure
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        {/* Gradient Background */}
        <LinearGradient
          colors={['hsla(0, 75%, 50%, 1)', 'hsla(147, 62%, 35%, 1)']} // Red to Green
          start={[0.75, 0.25]} // This approximates the 225-degree angle
          end={[0, 1]} // This specifies the direction of the gradient
          style={styles.backgroundImage}
        />

        {/* Welcome Text */}
        <View style={styles.formContainer}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.subText}>Log in to your account</Text>

          {/* Username Input */}
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />

          {/* Password Input with Eye Icon */}
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword} // Toggle secure text entry based on state
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? 'eye-off' : 'eye'}
                size={24}
                color="grey"
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" /> // Show loading indicator while logging in
            ) : (
              <Text style={styles.loginButtonText}>Login</Text>
            )}
          </TouchableOpacity>

          {/* Forgot Password Link */}
          <TouchableOpacity onPress={handleResetPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Sign Up Link */}
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account?</Text>
            <TouchableOpacity onPress={handleSignUp}>
              <Text style={styles.signupLink}> Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  backgroundImage: {
    height: 200,
    width: '100%',
  },
  formContainer: {
    padding: 16,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  subText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6b7280',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#f1f5f9',
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginVertical: 8,
    paddingRight: 10,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  loginButton: {
    backgroundColor: '#ef4444',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    color: '#1D4ED8',
    textAlign: 'center',
    marginTop: 16,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  signupText: {
    fontSize: 16,
    color: '#6b7280',
  },
  signupLink: {
    fontSize: 16,
    color: '#ef4444',
    fontWeight: 'bold',
  },
});
