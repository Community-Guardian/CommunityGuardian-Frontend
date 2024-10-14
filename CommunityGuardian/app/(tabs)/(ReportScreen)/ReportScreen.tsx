import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Switch, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker'; 
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useReport } from '@/context/ReportContext';

export default function ReportCrimeScreen() {
  const { createReport } = useReport(); // Use ReportContext for submitting the report
  const [crimeType, setCrimeType] = useState<string>(''); // Type as string
  const [description, setDescription] = useState<string>(''); // Type as string
  const [location, setLocation] = useState<string>(''); // New location input state, typed as string
  const [selectedFile, setSelectedFile] = useState<DocumentPicker.DocumentPickerResult | null>(null); // Using DocumentPickerResult type from the latest expo-document-picker
  const [role, setRole] = useState<string>(''); // Updated to string for dropdown
  const [isTermsAccepted, setIsTermsAccepted] = useState<boolean>(false); // Boolean type for switch
  const [date, setDate] = useState<Date>(new Date()); // Use Date type for date
  const [time, setTime] = useState<Date>(new Date()); // Use Date type for time
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);

  const crimeTypes = ['burglary', 'assault', 'theft', 'vandalism', 'fraud', 'other']; // Crime types for the dropdown
  const roles = ['victim', 'witness', 'perpetrator', 'anonymous']; // Role options

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false);
    setTime(currentTime);
  };

  // Enhanced file upload handler with validation
  const handleFileUpload = async () => {
    try {
      const file = await DocumentPicker.getDocumentAsync({
        type: '*/*', // Allowing all file types
        copyToCacheDirectory: true, // Ensures file is cached for processing
        multiple: false, // We are selecting only one file at a time
      });
      console.log(file);
      
      // Check if the file selection was successful
      if (!file.canceled) {
        // Set the selected file
        setSelectedFile(file);

        Alert.alert('File Selected', `File Name: ${file.assets[0].name}`);
      } else {
        // Handle cancellation if needed
        Alert.alert('Cancelled', 'No file selected.');
      }
    } catch (error) {
      console.error('Error picking file:', error);
      Alert.alert('Error', 'An error occurred while picking the file.');
    }
  };

  // Submission handler
  const handleSubmit = async () => {
    if (!crimeType || !description || !role || !location || !isTermsAccepted) {
      Alert.alert('Error', 'Please fill out all fields and agree to the terms before submitting.');
      return;
    }

    const formData = new FormData();
    formData.append('crime_type', crimeType);
    formData.append('description', description);
    formData.append('date', date.toISOString().split('T')[0]); // Convert date to YYYY-MM-DD format
    formData.append('time', time.toTimeString().split(' ')[0]); // Convert time to HH:MM:SS format
    formData.append('who_am_i', role);
    formData.append('location', location);

    // Append file if selected and the file contains a URI (successfully picked)
    if (selectedFile && !selectedFile.canceled) {
      const fileData = {
        uri: selectedFile.assets[0].uri,
        name: selectedFile.assets[0].name,
        type: selectedFile.assets[0].mimeType || 'application/octet-stream', // Default to octet-stream if mimeType is not available
      };
      formData.append('file_upload', fileData as any);
    }

    try {
      await createReport(formData); // Submit the report to the backend
      Alert.alert('Success', 'Your report has been submitted.');
    } catch (error) {
      Alert.alert('Error', 'Failed to submit the report. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Location Input Section */}
        <TextInput
          style={styles.input}
          placeholder="Enter Location of Incident"
          value={location}
          onChangeText={setLocation}
        />

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

        {/* Crime Type Dropdown */}
        <View style={styles.dropdown}>
          <Text style={styles.dropdownLabel}>Crime Type</Text>
          <Picker
            selectedValue={crimeType}
            onValueChange={(itemValue) => setCrimeType(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Crime Type" value="" />
            {crimeTypes.map((type) => (
              <Picker.Item key={type} label={type} value={type} />
            ))}
          </Picker>
        </View>

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

        {selectedFile && !selectedFile.canceled&& (
          <Text style={styles.fileName}>Selected File: {selectedFile?.assets[0]?.name}</Text>
        )}

        {/* Role Selection Dropdown */}
        <View style={styles.dropdown}>
          <Text style={styles.dropdownLabel}>I am the:</Text>
          <Picker
            selectedValue={role}
            onValueChange={(itemValue) => setRole(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Role" value="" />
            {roles.map((r) => (
              <Picker.Item key={r} label={r} value={r} />
            ))}
          </Picker>
        </View>

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
  dropdown: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  dropdownLabel: {
    marginBottom: 8,
    fontSize: 16,
    color: '#4b5563',
  },
  picker: {
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
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
