import React, { useState } from 'react';
import { SafeAreaView, TextInput, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { useAuth } from '@/context/AuthContext'; // Assuming you have the useAuth hook

export default function EditProfileScreen() {
  const { user, updateUser } = useAuth(); // Get the current user and updateUser function
  const [firstName, setFirstName] = useState(user?.details?.first_name || '');
  const [lastName, setLastName] = useState(user?.details?.last_name || '');
  const [username, setUsername] = useState(user?.details?.username || '');
  const [contactNumber, setContactNumber] = useState(user?.details?.contact_number || '');
  const [email, setEmail] = useState(user?.details?.email || '');

  const handleSave = async () => {
    const updatedData = {
      first_name:firstName,
      last_name:lastName,
      username:username,
      contact_number:contactNumber,
      email:email,
    };
    try {
      await updateUser(updatedData); // Call updateUser to handle profile update
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileSection}>
        <Image
          source={{ uri: user?.profileImage || 'https://c.files.bbci.co.uk/assets/4da9473d-2f23-4b23-aac5-32c728a4da8f' }} // Placeholder or user image
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
