import React, { useState } from 'react';
import { SafeAreaView, TextInput, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

export default function EditProfileScreen() {
  // Local state for the profile fields
  const [firstName, setFirstName] = useState('John'); // Default first name
  const [lastName, setLastName] = useState('Doe'); // Default last name
  const [username, setUsername] = useState('john_doe'); // Default username
  const [contactNumber, setContactNumber] = useState('1234567890'); // Default contact number
  const [email, setEmail] = useState('john.doe@example.com'); // Default email

  // Static save handler with alert
  const handleSave = () => {
    alert('Profile updated successfully!'); // Just an alert without backend interaction
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://c.files.bbci.co.uk/assets/4da9473d-2f23-4b23-aac5-32c728a4da8f' }} // Placeholder image
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editIcon}>
          <Text style={styles.editIconText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Contact Number"
          value={contactNumber}
          onChangeText={setContactNumber}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <TouchableOpacity style={styles.updateButton} onPress={handleSave}>
        <Text style={styles.updateButtonText}>Update</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editIcon: {
    backgroundColor: 'red',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  editIconText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  updateButton: {
    backgroundColor: 'red',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
