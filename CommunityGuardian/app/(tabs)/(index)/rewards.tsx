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
  Alert,
} from 'react-native';

interface Reward {
  id: string;
  name: string;
  amount: string;
  image: string;
  description: string;
}

const RewardsScreen = () => {
  const [rewards, setRewards] = useState<Reward[]>([
    {
      id: '2',
      name: 'Mark Njoroge',
      amount: '$300',
      image: 'https://static.propublica.org/projects/algorithmic-bias/assets/img/generated/Robert-Cannon-mugshot2-270*360-c88b61.jpg',
      description: 'Reward for anyone who provides information about the criminal who escaped police custody and is wanted for rape and murder.',
    },
    {
      id: '4',
      name: 'Stolen Car',
      amount: '$1000',
      image: 'https://bammtours.co.ke/wp-content/uploads/2021/04/Prestige-car-hire-Kenya..jpg',
      description: 'Reward for information leading to the recovery of the stolen car KCK 214H Toyota TX.',
    },
  ]);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCardPress = (reward: Reward) => {
    setSelectedReward(reward);
    setModalVisible(true);
  };

  const handleContact = () => {
    setModalVisible(false);
    Alert.alert(
      'Contact Successful',
      'The concerned person has been successfully contacted. Thank you for your assistance!'
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.infoText}>
        Relevant information regarding the whereabouts of the persons of interest will be rewarded as per terms.
      </Text>

      <FlatList
        data={rewards}
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
            <Text style={styles.cardReward}>{item.amount}</Text>
          </TouchableOpacity>
        )}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {selectedReward && (
              <>
                <Text style={styles.modalTitle}>{selectedReward.name}</Text>
                <Image source={{ uri: selectedReward.image }} style={styles.modalImage} />
                <Text style={styles.modalDetails}>{selectedReward.description}</Text>
                <Text style={styles.modalContact}>Reward: {selectedReward.amount}</Text>

                <Pressable
                  style={[styles.button, styles.buttonContact]}
                  onPress={handleContact}
                >
                  <Text style={styles.textStyle}>Contact</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(false)}
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
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonContact: {
    backgroundColor: '#4caf50',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default RewardsScreen;
