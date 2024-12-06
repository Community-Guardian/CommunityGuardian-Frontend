import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Switch, Alert, Clipboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

// Simulating an email sending function
const sendEmailNotification = (orbNumber: string) => {
  // Here you would integrate your email service (e.g., SendGrid, SMTP server)
  console.log(`ORB Number: ${orbNumber} sent to user via email.`);
};

export default function ReportCrimeScreen() {
  const [crimeType, setCrimeType] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<DocumentPicker.DocumentPickerResult | null>(null);
  const [role, setRole] = useState<string>('');
  const [isTermsAccepted, setIsTermsAccepted] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);

  const crimeTypes = ['burglary', 'assault', 'theft', 'vandalism', 'fraud', 'other'];
  const roles = ['victim', 'witness', 'perpetrator', 'anonymous'];

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

  const handleFileUpload = async () => {
    try {
      const file = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (!file.canceled) {
        setSelectedFile(file);
        Alert.alert('File Selected', `File Name: ${file.assets[0].name}`);
      } else {
        Alert.alert('Cancelled', 'No file selected.');
      }
    } catch (error) {
      console.error('Error picking file:', error);
      Alert.alert('Error', 'An error occurred while picking the file.');
    }
  };

  const generateORBNumber = () => {
    return `ORB-${Math.floor(Math.random() * 1000000)}`;
  };

  const handleSubmit = async () => {
    if (!crimeType || !description || !role || !location || !isTermsAccepted) {
      Alert.alert('Error', 'Please fill out all fields and agree to the terms before submitting.');
      return;
    }

    const orbNumber = generateORBNumber();
    
    // Simulate successful report submission
    Alert.alert(
      'Success',
      `Your report has been submitted. Your ORB number is: ${orbNumber}`,
      [
        { text: 'Copy ORB Number', onPress: () => { 
          Clipboard.setString(orbNumber); 
          clearForm(); // Clear form after copying
        }},
        { text: 'OK', onPress: () => {
          clearForm(); // Clear form after confirmation
          sendEmailNotification(orbNumber); // Send ORB number to the user's email
        }}
      ]
    );
  };

  const clearForm = () => {
    setCrimeType('');
    setDescription('');
    setLocation('');
    setSelectedFile(null);
    setRole('');
    setIsTermsAccepted(false);
    setDate(new Date());
    setTime(new Date());
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Location of Incident"
          value={location}
          onChangeText={setLocation}
        />

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

        <View style={styles.selectedDateTimeContainer}>
          <Text style={styles.selectedDateTimeText}>Selected Time: {time.toLocaleTimeString()}</Text>
          <Text style={styles.selectedDateTimeText}>Selected Date: {date.toDateString()}</Text>
        </View>

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

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter Description"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <TouchableOpacity style={styles.uploadButton} onPress={handleFileUpload}>
          <Ionicons name="camera-outline" size={20} color="white" />
          <Text style={styles.uploadButtonText}>Enter Media Evidence/files</Text>
        </TouchableOpacity>

        {selectedFile && !selectedFile.canceled && (
          <Text style={styles.fileName}>Selected File: {selectedFile?.assets[0]?.name}</Text>
        )}

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
