import React, { useState } from 'react';
import { ScrollView, SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router'; // Adjust based on your routing setup
import Ionicons from '@expo/vector-icons/Ionicons'; // Import Ionicons for the eye icon

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // For toggling password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // For toggling confirm password visibility

  const router = useRouter(); // Using router for navigation

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    // Static success alert, without any backend interaction
    Alert.alert('Success', 'Account created successfully!');
    router.push('/(auth)/Login'); // Navigate to login after successful sign-up
  };

  const handleLoginRedirect = () => {
    // Navigate to the Login screen
    router.push('/(auth)/Login'); // Update the path according to your file structure
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
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
          <Text style={styles.subText}>Sign Up to your account</Text>

          {/* Email Input */}
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#6b7280"
            autoCapitalize="none"
          />

          {/* Username Input */}
          {/* Commented out as not being used */}
          {/* <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            placeholderTextColor="#6b7280"
            autoCapitalize="none"
          /> */}

          {/* Password Input */}
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword} // Toggle secure text entry based on state
              placeholderTextColor="#6b7280"
              autoCapitalize="none"
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

          {/* Confirm Password Input */}
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword} // Toggle secure text entry based on state
              placeholderTextColor="#6b7280"
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Ionicons
                name={showConfirmPassword ? 'eye-off' : 'eye'}
                size={24}
                color="grey"
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
            <Text style={styles.loginButtonText}>Sign Up</Text>
          </TouchableOpacity>

          {/* Already have an account? Log In */}
          <View style={styles.loginRedirectContainer}>
            <Text style={styles.loginRedirectText}>Already have an account?</Text>
            <TouchableOpacity onPress={handleLoginRedirect}>
              <Text style={styles.loginRedirectLink}> Log In</Text>
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
  backgroundImage: {
    height: 200,
    width: '100%',
  },
  formContainer: {
    padding: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#333',
  },
  subText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6b7280',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#f9fafb',
    padding: 14,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    color: '#333',
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginVertical: 8,
    paddingRight: 10,
  },
  passwordInput: {
    flex: 1,
    padding: 14,
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    marginLeft: 10,
  },
  loginButton: {
    backgroundColor: '#ef4444',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginRedirectContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  loginRedirectText: {
    fontSize: 16,
    color: '#6b7280',
  },
  loginRedirectLink: {
    fontSize: 16,
    color: '#ef4444',
    fontWeight: 'bold',
    marginLeft: 4,
  },
});
