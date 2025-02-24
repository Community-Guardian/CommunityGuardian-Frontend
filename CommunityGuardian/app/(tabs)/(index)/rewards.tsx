import React, { useState, useEffect } from 'react';
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
  ActivityIndicator, // To display loading indicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/context/AuthContext'; // Import the AuthContext

interface Reward {
  id: string;
  name: string;
  amount: string;
  image: string;
  description: string;
}

const RewardsScreen = () => {
  const [rewards, setRewards] = useState<Reward[]>([]); // State to store rewards
  const [loading, setLoading] = useState(true); // State to manage loading
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null); // State to manage selected reward
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility
  const { getRewards } = useAuth(); // Fetch getRewards function from AuthContext

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const rewardsData = await getRewards(); // Fetch rewards from backend
        setRewards(rewardsData); // Update rewards state
      } catch (error) {
        console.error('Error fetching rewards:', error);
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    fetchRewards(); // Fetch rewards when component mounts
  }, []);

  const handleCardPress = (reward: Reward) => {
    setSelectedReward(reward);
    setModalVisible(true);
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.infoText}>
        Relevant information regarding the whereabouts of the persons of interest will be rewarded as per terms.
      </Text>

      {/* Grid View */}
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

      {/* Modal for Reward Details */}
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
            {selectedReward && (
              <>
                <Text style={styles.modalTitle}>{selectedReward.name}</Text>
                <Image source={{ uri: selectedReward.image }} style={styles.modalImage} />
                <Text style={styles.modalDetails}>{selectedReward.description}</Text>
                <Text style={styles.modalContact}>Reward: {selectedReward.amount}</Text>

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
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RewardsScreen;
