import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView, // Import ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const emergencyServicesData = [
  { id: '1', name: 'Emergency 112', icon: 'call', alertText: 'Call Emergency 112' },
  { id: '2', name: 'Police', icon: 'car', alertText: 'Call the Police' },
  { id: '3', name: 'Ambulance', icon: 'medical', alertText: 'Call an Ambulance' },
  { id: '4', name: 'Fire Station', icon: 'flame', alertText: 'Call the Fire Station' },
  { id: '5', name: 'Wildlife Support', icon: 'paw', alertText: 'Call Wildlife Support' },
  { id: '6', name: 'Child Helpline', icon: 'happy', alertText: 'Call Child Helpline' },
  { id: '7', name: 'Women Helpline', icon: 'woman', alertText: 'Call Women Helpline' },
  { id: '8', name: 'Car Accident', icon: 'car-sport', alertText: 'Report a Car Accident' },
  { id: '9', name: 'Private', icon: 'lock-closed', alertText: 'Contact Private Support' },
];

const EmergencyScreen = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [timer, setTimer] = useState(5);

  const handleCardPress = (service) => {
    setSelectedService(service);
    setModalVisible(true);
    setTimer(5); // Reset timer for every modal open
  };

  const handleConfirmPress = () => {
    setModalVisible(false);
    alert(`${selectedService.alertText} is being triggered!`);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  // Timer to automatically confirm emergency after 5 seconds
  useEffect(() => {
    if (modalVisible && timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else if (timer === 0) {
      handleConfirmPress();
    }
  }, [modalVisible, timer]);

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>

        {/* SOS Button */}
        <TouchableOpacity style={styles.sosButton}>
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
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {selectedService && (
              <>
                <Text style={styles.modalTitle}>Confirm Emergency</Text>
                <Text style={styles.modalText}>
                  Are you sure you want to {selectedService.alertText}?
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
              </>
            )}
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
    alignItems: 'center', // Align content to center
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
