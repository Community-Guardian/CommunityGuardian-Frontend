import React, { useState } from 'react';
import {
  SafeAreaView, ScrollView, View, Text, TouchableOpacity, Switch, StyleSheet, TextInput, Modal, FlatList,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ProfileScreen() {
  const [isSosEnabled, setIsSosEnabled] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    phone_number: '',
    email: '',
    relationship: 'Parent/Guardian',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editContactId, setEditContactId] = useState<string | null>(null);

  // Dummy user data and emergency contacts
  const user = {
    details: {
      username: 'John Doe',
    },
    emergency_contacts: [
      { id: '1', name: 'Jane Doe', relationship: 'Spouse', phone_number: '123-456-7890', email: 'jane@example.com' },
      { id: '2', name: 'Mark Smith', relationship: 'Friend', phone_number: '987-654-3210', email: 'mark@example.com' },
    ],
  };

  // Handle adding or updating emergency contact
  const handleAddOrUpdateContact = () => {
    if (!newContact.name || !newContact.phone_number || !newContact.email) {
      alert('Please fill in all fields');
      return;
    }

    if (isEditing && editContactId) {
      // Logic to update the contact
    } else {
      // Logic to add the new contact to the list
    }

    setModalVisible(false);
    setNewContact({ name: '', phone_number: '', email: '', relationship: 'Parent/Guardian' });
    setIsEditing(false);
    setEditContactId(null);
  };

  // Handle deleting a contact
  const handleDeleteContact = (id: string) => {
    // Logic to delete a contact
  };

  // Handle editing a contact
  const handleEditContact = (contact: any) => {
    setNewContact(contact);
    setIsEditing(true);
    setEditContactId(contact.id);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Ionicons name="person-outline" size={40} color="red" />
          </View>
          <Text style={styles.profileName}>{user?.details?.username}</Text>
          <TouchableOpacity>
            <Text style={styles.editProfile}>Edit Profile {'>'}</Text>
          </TouchableOpacity>
        </View>

        {/* General Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>General</Text>
          <TouchableOpacity>
            <Text style={styles.sectionItem}>Help Centre</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.sectionItem}>Your Post Feed</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.sectionItem}>Send Feedback</Text>
          </TouchableOpacity>
        </View>

        {/* SOS Message Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>SOS Message</Text>
          <View style={styles.sosToggleContainer}>
            <Text style={styles.sectionItem}>Enable SOS Menu bar</Text>
            <Switch
              value={isSosEnabled}
              onValueChange={setIsSosEnabled}
              trackColor={{ true: 'green', false: '#d1d5db' }}
            />
          </View>
          <TouchableOpacity>
            <Text style={styles.sectionItem}>Edit SOS Message Content</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.sectionItem}>Additional SOS Settings</Text>
          </TouchableOpacity>
        </View>

        {/* Emergency Contacts Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Emergency Contacts</Text>
          <TouchableOpacity style={styles.addContact} onPress={() => {
            setIsEditing(false);
            setModalVisible(true);
          }}>
            <Ionicons name="add-outline" size={20} color="#000" />
            <Text style={styles.sectionItem}>Add Emergency Contact</Text>
          </TouchableOpacity>

          {/* Display Emergency Contacts */}
          <FlatList
            data={user.emergency_contacts} // Using the dummy data here
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.contactCard}>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactName}>{item.name}</Text>
                  <Text style={styles.contactRelationship}>{item.relationship}</Text>
                </View>
                <View style={styles.contactActions}>
                  <TouchableOpacity onPress={() => handleEditContact(item)}>
                    <Ionicons name="pencil-outline" size={24} color="blue" style={styles.icon} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDeleteContact(item.id)}>
                    <Ionicons name="trash-outline" size={24} color="red" style={styles.icon} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      </ScrollView>

      {/* Modal for Adding/Editing Emergency Contact */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Close Icon */}
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Ionicons name="close-outline" size={30} color="black" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>{isEditing ? 'Edit Emergency Contact' : 'Add Emergency Contact'}</Text>

            <TextInput
              placeholder="Name"
              style={styles.input}
              value={newContact.name}
              onChangeText={(text) => setNewContact({ ...newContact, name: text })}
            />
            <TextInput
              placeholder="Contact Number"
              style={styles.input}
              keyboardType="phone-pad"
              value={newContact.phone_number}
              onChangeText={(text) => setNewContact({ ...newContact, phone_number: text })}
            />
            <TextInput
              placeholder="Email"
              style={styles.input}
              keyboardType="email-address"
              value={newContact.email}
              onChangeText={(text) => setNewContact({ ...newContact, email: text })}
            />

            <Text style={styles.label}>Please Select the Relationship:</Text>
            {['Parent/Guardian', 'Sibling', 'Friend', 'Spouse', 'Mentor', 'Others'].map((relation) => (
              <TouchableOpacity
                key={relation}
                onPress={() => setNewContact({ ...newContact, relationship: relation })}
                style={styles.radioItem}
              >
                <Ionicons
                  name={newContact.relationship === relation ? 'radio-button-on' : 'radio-button-off'}
                  size={20}
                  color="black"
                />
                <Text style={styles.radioLabel}>{relation}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity onPress={handleAddOrUpdateContact} style={styles.addButton}>
              <Text style={styles.addButtonText}>{isEditing ? 'Update' : 'Add'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  profileImageContainer: {
    backgroundColor: '#e5e7eb',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 12,
  },
  editProfile: {
    color: 'green',
    marginTop: 8,
  },
  sectionContainer: {
    padding: 16,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    margin: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionItem: {
    fontSize: 16,
    color: '#4b5563',
    paddingVertical: 8,
  },
  sosToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  addContact: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactRelationship: {
    fontSize: 14,
    color: '#6b7280',
  },
  contactActions: {
    flexDirection: 'row',
  },
  icon: {
    marginHorizontal: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 12,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  radioLabel: {
    marginLeft: 8,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  addButton: {
    backgroundColor: 'red',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
