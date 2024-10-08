import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const rewardsData = [
  { id: '1', name: 'John Doe', reward: 'Ksh5000', image: 'https://miro.medium.com/v2/resize:fit:1400/1*00-rDciPw699Ta6QIYxk-Q.jpeg', details: 'John Doe is wanted for questioning regarding a recent robbery in Nairobi.' },
  { id: '2', name: 'Jane Doe', reward: 'Ksh5000', image: 'https://miro.medium.com/v2/resize:fit:1400/1*00-rDciPw699Ta6QIYxk-Q.jpeg', details: 'Jane Doe is wanted for questioning in relation to a fraud case in Murang\'a.' },
  { id: '3', name: 'Sam Doe', reward: 'Ksh5000', image: 'https://miro.medium.com/v2/resize:fit:1400/1*00-rDciPw699Ta6QIYxk-Q.jpeg', details: 'Sam Doe is suspected to be involved in a drug trafficking ring in Mombasa.' },
  { id: '4', name: 'Peter Doe', reward: 'Ksh5000', image: 'https://miro.medium.com/v2/resize:fit:1400/1*00-rDciPw699Ta6QIYxk-Q.jpeg', details: 'Peter Doe is a key suspect in a theft case in Kisumu.' },
  { id: '5', name: 'Dan Doe', reward: 'Ksh5000', image: 'https://miro.medium.com/v2/resize:fit:1400/1*00-rDciPw699Ta6QIYxk-Q.jpeg', details: 'Dan Doe is wanted for questioning in a hit-and-run case in Eldoret.' },
  { id: '6', name: 'Joy Doe', reward: 'Ksh5000', image: 'https://miro.medium.com/v2/resize:fit:1400/1*00-rDciPw699Ta6QIYxk-Q.jpeg', details: 'Joy Doe is wanted in connection with a recent scam targeting elders in Nairobi.' },
];

// Define a type for the person object
interface Person {
  id: string;
  name: string;
  reward: string;
  image: string;
  details: string;
}

const RewardsScreen = () => {
  // Initialize selectedPerson as either null or a Person object
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCardPress = (person: Person) => {
    setSelectedPerson(person);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* Info Text */}
      <Text style={styles.infoText}>
        Relevant information regarding the whereabouts of the persons of interest will be rewarded as per terms.
      </Text>

      {/* Grid View */}
      <FlatList
        data={rewardsData}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleCardPress(item)}
          >
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <Text style={styles.cardName}>{item.name}</Text>
            <Text style={styles.cardReward}>{item.reward}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Modal for Person Details */}
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
            {selectedPerson && (
              <>
                <Text style={styles.modalTitle}>{selectedPerson.name}</Text>
                <Image source={{ uri: selectedPerson.image }} style={styles.modalImage} />
                <Text style={styles.modalDetails}>{selectedPerson.details}</Text>
                <Text style={styles.modalContact}>Contact Authorities: +254 712 345 678</Text>

                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Close</Text>
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
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchIcon: {
    position: 'absolute',
    right: 15,
    color: '#888',
  },
  infoText: {
    paddingHorizontal: 15,
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  gridContainer: {
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    margin: 10,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    elevation: 3,
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  cardName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  cardReward: {
    color: '#555',
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
  modalImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 15,
  },
  modalDetails: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
  },
  modalContact: {
    fontSize: 16,
    color: '#ff4444',
    marginBottom: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#333',
    marginTop: 2,
  },
});

export default RewardsScreen;
