import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TextInput, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FeedScreen = () => {
  // Dummy data for posts, now only admin can post
  const [posts, setPosts] = useState([
    {
      id: '1',
      author: 'admin', // Admin is hardcoded here
      time: '2 hours ago',
      content: 'Engage in the Vote: Impeachment Motion for DP Rigathi Gachagua. What are your views?',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiiymV6QYTxA6K74SYSxjwDzEjcW7NruVizisXIm2KYk8VAaisyz6RZCcC09fVUPU_ueA&usqp=CAU',
      likes: 10,
      liked: false,
      commentsData: [
        {
          id: '1',
          username: 'Kelvin', // Admin is hardcoded here as well
          content: 'Great post!',
          liked: false,
        },
        {
          id: '2',
          username: 'Kelvin', // Admin is hardcoded for comment
          content: 'Totally agree!',
          liked: false,
        },
      ],
    },
    {
      id: '2',
      author: 'admin', // Admin is hardcoded here
      time: '1 day ago',
      content: 'Engage in the Discussion: Should the Kenyan Presidential Term Be Extended to 7 Years?',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbcMWiCWl8ZHjFL7WLjFM8V4A8oCbGN2hm-Q&s',
      likes: 5,
      liked: false,
      commentsData: [
        {
          id: '3',
          username: 'Kelvin', // Admin is hardcoded here as well
          content: 'This looks awesome!',
          liked: false,
        },
      ],
    },
  ]);
  
  const [newComment, setNewComment] = useState('');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null); // For tracking the post to add a comment

  // Handle liking a post (local increment of like count)
  const handleLike = (postId: string) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            liked: !post.liked, // Toggle the 'liked' state
            likes: post.liked ? post.likes - 1 : post.likes + 1, // Adjust like count
          }
        : post
    );
    setPosts(updatedPosts); // Update the posts state
  };

  // Toggle and fetch comments for a specific post
  const handleCommentToggle = (postId) => {
    if (selectedPostId === postId) {
      setSelectedPostId(null); // Close comments
    } else {
      setSelectedPostId(postId); // Open comments
    }
  };

  // Send a new comment to the post
  const handleSendComment = (postId: string) => {
    if (newComment.trim()) {
      const updatedPosts = posts.map((post) => {
        if (post.id === postId) {
          const newCommentData = {
            id: (post.commentsData.length + 1).toString(),
            username: 'admin', // Admin is hardcoded here as well
            content: newComment,
            liked: false,
          };
          return { ...post, commentsData: [...post.commentsData, newCommentData] };
        }
        return post;
      });
      setPosts(updatedPosts);
      setNewComment(''); // Clear the input
    }
  };

  // Toggle like state for a comment
  const handleLikeComment = (postId, commentId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const updatedComments = post.commentsData.map((comment) =>
          comment.id === commentId
            ? { ...comment, liked: !comment.liked } // Toggle 'liked' state
            : comment
        );
        return { ...post, commentsData: updatedComments };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {posts.map((post) => (
          <View key={post.id} style={styles.postContainer}>
            {/* Header: Profile image, author, time */}
            <View style={styles.header}>
              <Image
                source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwltzOYXgK3aTKoZgeavHmebuLyqiLFIBARx6TAw-li5Nzs-1wbPWrfMLbtx_2IV3kqQc&usqp=CAU' }} // Placeholder image
                style={styles.avatar}
              />
              <View>
                <Text style={styles.author}>{post.author}</Text>
                <Text style={styles.time}>{post.time}</Text>
              </View>
            </View>

            {/* Post Text Content */}
            <Text style={styles.content}>{post.content}</Text>

            {/* Post Image */}
            {post.image && (
              <Image
                source={{ uri: post.image }}
                style={styles.postImage}
              />
            )}

            {/* Likes and Comments Summary */}
            <View style={styles.postActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleLike(post.id)}
              >
                <Ionicons
                  name="heart-outline"
                  size={18}
                  color={post.liked ? 'red' : 'black'} // Change color based on 'liked' state
                />
                <Text style={[styles.actionText, { color: post.liked ? 'red' : 'black' }]}>
                  {post.liked ? 'Liked' : 'Like'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleCommentToggle(post.id)}
              >
                <Ionicons name="chatbubble-outline" size={18} />
                <Text style={styles.actionText}>Comment</Text>
              </TouchableOpacity>
            </View>

            {/* Comments Section */}
            {selectedPostId === post.id && (
              <View style={styles.commentsSection}>
                <Text style={styles.commentsTitle}>Comments</Text>
                <View style={styles.commentsContainer}>
                  {post.commentsData.map((comment) => (
                    <View key={comment.id} style={styles.commentContainer}>
                      {/* Avatar */}
                      <Image
                        source={{ uri: 'https://i.scdn.co/image/ab6761610000e5ebd3c46774704f0ecb5a655974' }} // Placeholder for comment avatar
                        style={styles.commentAvatar}
                      />
                      {/* Content and Like Icon */}
                      <View style={styles.commentRow}>
                        <View style={styles.commentContent}>
                          <Text style={styles.commentUsername}>{comment.username}</Text>
                          <Text style={styles.commentText}>{comment.content}</Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => handleLikeComment(post.id, comment.id)}
                          style={styles.likeButton}
                        >
                          <Ionicons
                            name="heart-outline"
                            size={18}
                            color={comment.liked ? 'red' : 'black'} // Change color based on 'liked' state
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </View>

                {/* Comment Input */}
                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder="Add a comment..."
                    style={styles.input}
                    value={newComment}
                    onChangeText={setNewComment}
                  />
                  <TouchableOpacity onPress={() => handleSendComment(post.id)}>
                    <Ionicons name="send-outline" size={24} style={styles.sendIcon} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        ))}
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
  commentsSection: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    marginTop: 10,
  },
  commentsTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  commentsContainer: {
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    paddingVertical: 10,
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  commentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  commentContent: {
    flex: 1,
  },
  commentUsername: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 2,
  },
  commentText: {
    fontSize: 14,
    marginBottom: 5,
    color: '#333',
  },
  likeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
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
