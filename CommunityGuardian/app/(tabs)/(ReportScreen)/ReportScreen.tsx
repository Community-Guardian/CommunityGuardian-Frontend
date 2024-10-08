import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Switch, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker'; 
import DateTimePicker from '@react-native-community/datetimepicker';
import { RadioButton } from 'react-native-paper'; 

export default function ReportCrimeScreen() {
  const [crimeType, setCrimeType] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<DocumentPicker.DocumentPickerResult | null>(null);
  const [role, setRole] = useState<'Victim' | 'Witness' | 'Perpetrator' | 'Anonymous' | null>(null);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const handleTimeChange = (event: any, selectedTime: any) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === 'ios');
    setTime(currentTime);
  };

// File upload handler
const handleFileUpload = async () => {
  try {
    const file = await DocumentPicker.getDocumentAsync({
      type: '*/*', // Allowing all file types
    });

    if (file) {
      // Check if the user didn't cancel the selection
      if (file.type !== 'cancel') {
        setSelectedFile(file);
        Alert.alert('File Selected', `File Name: ${file.name}`);
      } else {
        // Handle case when the user cancels the document picker
        Alert.alert('Cancelled', 'No file selected.');
      }
    }
  } catch (error) {
    console.error('Error picking file:', error);
  }
};


  // Submission handler
  const handleSubmit = () => {
    if (!crimeType || !description || !role || !isTermsAccepted) {
      Alert.alert('Error', 'Please fill out all fields and agree to the terms before submitting.');
      return;
    }

    Alert.alert('Success', 'Your report has been submitted.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        {/* Location Section */}
        <View style={styles.locationSection}>
          <Ionicons name="location-outline" size={20} color="#000" />
          <Text style={styles.locationText}>Enter Location of incident</Text>
          <Ionicons name="create-outline" size={20} color="#000" />
        </View>

        {/* Date and Time Selection */}
        <View style={styles.timeDateSection}>
          <TouchableOpacity style={styles.timeDateButton} onPress={() => setShowTimePicker(true)}>
            <Text style={styles.buttonText}>Select time</Text>
            <Ionicons name="time-outline" size={20} color="#000" />
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              value={time}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={handleTimeChange}
            />
          )}

          <TouchableOpacity style={styles.timeDateButton} onPress={() => setShowDatePicker(true)}>
            <Text style={styles.buttonText}>Select date</Text>
            <Ionicons name="calendar-outline" size={20} color="#000" />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>

        {/* Display selected Date and Time */}
        <View style={styles.selectedDateTimeContainer}>
          <Text style={styles.selectedDateTimeText}>Selected Time: {time.toLocaleTimeString()}</Text>
          <Text style={styles.selectedDateTimeText}>Selected Date: {date.toDateString()}</Text>
        </View>

        {/* Crime Type Input */}
        <TextInput
          style={styles.input}
          placeholder="Select Crime type"
          value={crimeType}
          onChangeText={setCrimeType}
        />

        {/* Description Input */}
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter Description"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        {/* File Upload Section */}
        <TouchableOpacity style={styles.uploadButton} onPress={handleFileUpload}>
          <Ionicons name="camera-outline" size={20} color="white" />
          <Text style={styles.uploadButtonText}>Enter Media Evidence/files</Text>
        </TouchableOpacity>

        {selectedFile && selectedFile.type === 'success' && (
          <Text style={styles.fileName}>Selected File: {selectedFile.name}</Text>
        )}

        {/* Role Selection */}
        <Text style={styles.roleText}>Please Select, I am the:</Text>
        <View style={styles.radioGroup}>
          <RadioButton.Group onValueChange={newValue => setRole(newValue as 'Victim' | 'Witness' | 'Perpetrator' | 'Anonymous')} value={role}>
            <View style={styles.radioItem}>
              <RadioButton value="Victim" />
              <Text style={styles.radioLabel}>Victim</Text>
            </View>
            <View style={styles.radioItem}>
              <RadioButton value="Witness" />
              <Text style={styles.radioLabel}>Witness</Text>
            </View>
            <View style={styles.radioItem}>
              <RadioButton value="Perpetrator" />
              <Text style={styles.radioLabel}>Perpetrator</Text>
            </View>
            <View style={styles.radioItem}>
              <RadioButton value="Anonymous" />
              <Text style={styles.radioLabel}>Anonymous</Text>
            </View>
          </RadioButton.Group>
        </View>

        {/* Additional Details */}
        <TouchableOpacity style={styles.additionalDetailsButton}>
          <Ionicons name="add-circle-outline" size={20} color="white" />
          <Text style={styles.additionalDetailsText}>Additional Details</Text>
        </TouchableOpacity>

        {/* Terms and Conditions */}
        <View style={styles.termsContainer}>
          <Switch
            value={isTermsAccepted}
            onValueChange={setIsTermsAccepted}
            trackColor={{ true: 'green', false: '#d1d5db' }}
          />
          <Text style={styles.termsText}>
            By submitting this form, I hereby acknowledge that I have read and agree to the terms and conditions of service.
          </Text>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
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
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  locationSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f3f4f6',
    padding: 12,
    margin: 16,
    borderRadius: 8,
  },
  locationText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
  },
  timeDateSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  timeDateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  buttonText: {
    marginRight: 8,
    color: '#4b5563',
  },
  selectedDateTimeContainer: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  selectedDateTimeText: {
    fontSize: 16,
    color: '#4b5563',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f9fafb',
    padding: 12,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ef4444',
    padding: 12,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    justifyContent: 'center',
  },
  uploadButtonText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: 'bold',
  },
  fileName: {
    marginTop: 8,
    textAlign: 'center',
    color: '#4b5563',
  },
  roleText: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 24,
  },
  radioGroup: {
    marginHorizontal: 16,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: '#4b5563',
  },
  additionalDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ef4444',
    padding: 12,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    justifyContent: 'center',
  },
  additionalDetailsText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: 'bold',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16,
  },
  termsText: {
    flex: 1,
    marginLeft: 12,
    color: '#4b5563',
  },
  submitButton: {
    backgroundColor: '#ef4444',
    padding: 16,
    marginHorizontal: 16,
    marginTop: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
