import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import call from 'react-native-phone-call';
import SendSMS from 'react-native-sms'; // Import SMS library
import { useAuth } from '@/context/AuthContext'; // Assuming you are using AuthContext to manage user and contacts

const emergencyServicesData = [
  { id: '1', name: 'Emergency 112', icon: 'call', alertText: 'Call Emergency 112', phone: '112' },
  { id: '2', name: 'Police', icon: 'car', alertText: 'Call the Police', phone: '999' },
  { id: '3', name: 'Ambulance', icon: 'medical', alertText: 'Call an Ambulance', phone: '999' },
  { id: '4', name: 'Fire Station', icon: 'flame', alertText: 'Call the Fire Station', phone: '999' },
  { id: '5', name: 'Wildlife Support', icon: 'paw', alertText: 'Call Wildlife Support', phone: '0719-202-220' },
  { id: '6', name: 'Child Helpline', icon: 'happy', alertText: 'Call Child Helpline', phone: '1190' },
  { id: '7', name: 'Women Helpline', icon: 'woman', alertText: 'Call Women Helpline', phone: '0722-200-111' },
  { id: '8', name: 'Car Accident', icon: 'car-sport', alertText: 'Report a Car Accident', phone: '999' },
  { id: '9', name: 'Private', icon: 'lock-closed', alertText: 'Contact Private Support', phone: '0721-000-000' },
];

const EmergencyScreen = () => {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [timer, setTimer] = useState(5);
  const [isSos, setIsSos] = useState(false); // State to differentiate between SOS and emergency services
  const { user } = useAuth(); // Get the user and contacts from context

  const emergencyContacts = user.emergency_contacts; // Assuming emergency_contacts is part of user data

  const requestCallPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CALL_PHONE,
        {
          title: 'Call Permission',
          message: 'This app needs access to make phone calls to emergency services.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      return true; // iOS doesn't require explicit permission for phone calls
    }
  };

  const handleCardPress = (service: any) => {
    setSelectedService(service);
    setModalVisible(true);
    setTimer(5); // Reset timer for every modal open
    setIsSos(false); // Not an SOS, so set it to false
  };
  const handleSendSMS = () => {
    if (emergencyContacts && emergencyContacts.length > 0) {
      const contactNumber = emergencyContacts[0].phone_number; // Get the phone number of the first emergency contact
      const message = 'I am in danger. Please send help!'; // Customize the SOS message
  
      console.log(`Sending SMS to: ${contactNumber} with message: ${message}`);  // Debugging log
  
      SendSMS.send(
        {
          body: message,
          recipients: [contactNumber], // Send to the emergency contact's phone number
          successTypes: ['sent', 'queued'],
          allowAndroidSendWithoutReadPermission: true,
        },
        (completed, cancelled, error) => {
          if (completed) {
            console.log('SMS Sent Successfully');
          } else if (cancelled) {
            console.log('SMS Cancelled');
          } else if (error) {
            console.log('Error Sending SMS', error);
          }
        }
      );
    } else {
      console.log('No emergency contacts found'); // Debugging log
      Alert.alert('No Emergency Contact', 'Please add an emergency contact.');
    }
  };
  

  const handleConfirmPress = async () => {
    if (isSos) {
      handleSendSMS(); // Send the SOS message if SOS is pressed
    } else if (selectedService) {
      const hasPermission = await requestCallPermission();
      if (hasPermission) {
        const callArgs = {
          number: selectedService.phone,
          prompt: false, // Will prompt the user for confirmation
        };
        call(callArgs).catch(console.error); // Make the phone call
      } else {
        Alert.alert('Permission Denied', 'Permission to make phone calls is required.');
      }
    }
    setModalVisible(false); // Close the modal after the action
  };

  const handleSosPress = () => {
    setIsSos(true); // Set it to SOS mode
    setModalVisible(true);
    setTimer(5); // Reset the timer
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  // Timer to automatically confirm the action after 5 seconds
  useEffect(() => {
    if (modalVisible && timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else if (timer === 0) {
      handleConfirmPress(); // Auto confirm when the timer reaches 0
    }
  }, [modalVisible, timer]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* SOS Button */}
        <TouchableOpacity style={styles.sosButton} onPress={handleSosPress}>
          <Text style={styles.sosText}>SOS</Text>
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.emergencyTitle}>Make an Emergency Call</Text>

        {/* Emergency Service Cards */}
        <View style={styles.gridContainer}>
          {emergencyServicesData.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={styles.card}
              onPress={() => handleCardPress(service)}
            >
              <Ionicons name={service.icon} size={40} color="black" />
              <Text style={styles.cardText}>{service.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Modal for Confirmation */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirm Emergency</Text>
            <Text style={styles.modalText}>
              {isSos
                ? 'Are you sure you want to trigger the SOS emergency?'
                : `Are you sure you want to ${selectedService?.alertText}?`}
            </Text>
            <Text style={styles.timerText}>Auto-confirming in {timer} seconds...</Text>
            <Pressable
              style={[styles.button, styles.confirmButton]}
              onPress={handleConfirmPress}
            >
              <Text style={styles.textStyle}>Yes</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.cancelButton]}
              onPress={closeModal}
            >
              <Text style={styles.textStyle}>No</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
  },
  sosButton: {
    backgroundColor: 'red',
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    elevation: 10,
  },
  sosText: {
    color: '#fff',
    fontSize: 48,
    fontWeight: 'bold',
  },
  emergencyTitle: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginVertical: 10,
    width: 110,
    height: 110,
    elevation: 3,
  },
  cardText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  timerText: {
    fontSize: 14,
    color: 'red',
    marginBottom: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#28a745',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default EmergencyScreen;
