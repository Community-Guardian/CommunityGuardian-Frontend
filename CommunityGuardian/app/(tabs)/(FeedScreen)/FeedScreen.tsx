import React, { useState,useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TextInput, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext'; // Make sure this is the correct path

const tempPost = {
  author: 'Jane Doe',
  time: '5d ago',
  content:
    ' URGENT: MISSING CHILD!!. Please help us find Mary Njambi, a precious 7-year-old girl who has been reported missing from Muranga Town. Mary is a petite young girl with a beautiful smile and a cheerful spirit. She has short black hair and is wearing a bright yellow dress with pink sandals. Last seen playing near the market area, she may be feeling scared and alone. If you have any information about her whereabouts, please contact us immediately. Lets come together as a community to bring Mary home safely!',
  image: 'https://images.pexels.com/photos/2505397/pexels-photo-2505397.jpeg?cs=srgb&dl=pexels-planeteelevene-2505397.jpg&fm=jpg', // Placeholder for post image
  likes: 79,
  comments: 17,
  likedBy: 'John Doe and 78 others',
  commentsData: [
    { id: '1', username: 'Jane', text: 'Lets Help!', likes: 10 },
    { id: '2', username: 'John', text: 'In our Prayers!', likes: 5 },
  ],
};

const FeedScreen = () => {
  const [showComments, setShowComments] = useState(true);
  const { isAuthenticated } = useAuth(); // Access the auth state
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/(auth)/Login'); // Redirect to login if not authenticated
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return null; // Avoid rendering anything if not authenticated
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Post Container */}
        <View style={styles.postContainer}>
          {/* Header: Profile image, author, time */}
          <View style={styles.header}>
            <Image
              source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Natural_Afro_American_Hair.jpg/220px-Natural_Afro_American_Hair.jpg' }} // Placeholder for user avatar
              style={styles.avatar}
            />
            <View>
              <Text style={styles.author}>{tempPost.author}</Text>
              <Text style={styles.time}>{tempPost.time}</Text>
            </View>
          </View>

          {/* Post Text Content */}
          <Text style={styles.content}>{tempPost.content}</Text>

          {/* Post Image */}
          <Image
            source={{ uri: tempPost.image }} // Placeholder for the actual post image
            style={styles.postImage}
          />

          {/* Likes and Comments Summary */}
          <Text style={styles.likedBy}>{tempPost.likedBy}</Text>

          {/* Post Actions */}
          <View style={styles.postActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="thumbs-up-outline" size={18} />
              <Text style={styles.actionText}>Like</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => setShowComments(!showComments)}>
              <Ionicons name="chatbubble-outline" size={18} />
              <Text style={styles.actionText}>Comment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="share-outline" size={18} />
              <Text style={styles.actionText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Comments Section */}
        {showComments && (
          <View style={styles.commentsContainer}>
            {tempPost.commentsData.map((item) => (
              <View key={item.id} style={styles.commentContainer}>
                <Image
                  source={{ uri: 'https://s3.amazonaws.com/cms.ipressroom.com/173/files/20211/603767f82cfac26fdf6354e9_Hidden+costs+of+being+black/Hidden+costs+of+being+black_hero.jpg' }} // Placeholder for user avatar
                  style={styles.commentAvatar}
                />
                <View style={styles.commentContent}>
                  <Text style={styles.commentUsername}>{item.username}</Text>
                  <Text style={styles.commentText}>{item.text}</Text>
                  <View style={styles.commentActions}>
                    <TouchableOpacity>
                      <Ionicons name="thumbs-up-outline" size={18} />
                    </TouchableOpacity>
                    <Text style={styles.commentActionText}>{item.likes} Likes</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Comment Input */}
        <View style={styles.inputContainer}>
          <TextInput placeholder="Add a comment..." style={styles.input} />
          <TouchableOpacity>
            <Ionicons name="send-outline" size={24} style={styles.sendIcon} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  postContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  author: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  time: {
    color: '#666',
    fontSize: 12,
  },
  content: {
    fontSize: 16,
    marginVertical: 5,
    color: '#333',
  },
  postImage: {
    width: '100%',
    height: 300,
    marginVertical: 10,
    borderRadius: 10,
  },
  likedBy: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  postActions: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 5,
    fontSize: 14,
  },
  commentsContainer: {
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  commentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  commentUsername: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  commentText: {
    fontSize: 14,
    marginVertical: 5,
  },
  commentActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentActionText: {
    marginLeft: 5,
    fontSize: 12,
    color: '#666',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  sendIcon: {
    marginLeft: 10,
  },
});

export default FeedScreen;
