import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TextInput, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

const FeedScreen = () => {
  const [posts, setPosts] = useState<any[]>([]); // To store posts
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [newComment, setNewComment] = useState(''); // For the new comment input
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null); // For tracking the post to add a comment
  const { isAuthenticated, getAllPosts, getPostComments, createPostComment } = useAuth(); // Access the auth state and API functions
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/(auth)/Login'); // Redirect to login if not authenticated
    } else {
      fetchPosts(); // Fetch posts when authenticated
    }
  }, [isAuthenticated]);

  // Fetch all posts from the backend
  const fetchPosts = async () => {
    try {
      const fetchedPosts = await getAllPosts();
      const postsWithLikedState = fetchedPosts.map((post) => ({
        ...post,
        liked: false, // Initialize liked state
      }));
      setPosts(postsWithLikedState);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoadingPosts(false);
    }
  };
  

  // Toggle and fetch comments for a specific post
  const handleCommentToggle = async (postId) => {
    if (selectedPostId === postId) {
      setSelectedPostId(null); // Close comments
    } else {
      try {
        const comments = await getPostComments(postId); // Fetch comments
        const commentsWithLikeState = comments.map((comment) => ({
          ...comment,
          liked: false, // Initialize 'liked' state
        }));
        const updatedPosts = posts.map((post) =>
          post.id === postId ? { ...post, commentsData: commentsWithLikeState } : post
        );
        setPosts(updatedPosts);
        setSelectedPostId(postId); // Open comments
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    }
  };
  
  // Send a new comment to the backend and fetch updated comments
  const handleSendComment = async (postId: string) => {
    if (newComment.trim()) {
      try {
        const commentData = {
          post: postId,
          content: newComment,
        };
        await createPostComment(commentData); // Send the comment to the backend
        // Fetch the updated comments after posting
        const updatedComments = await getPostComments(postId);
        const updatedPosts = posts.map((post) =>
          post.id === postId ? { ...post, commentsData: updatedComments } : post
        );
        setPosts(updatedPosts);
        setNewComment(''); // Clear the input
      } catch (error) {
        console.error('Error creating comment:', error);
      }
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

  // Handle liking a post (local increment of like count)
  const handleLike = async (postId: string) => {
    try {
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
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  };
  
  if (!isAuthenticated) {
    return null; // Avoid rendering anything if not authenticated
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {loadingPosts ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          posts.map((post) => (
            <View key={post.id} style={styles.postContainer}>
              {/* Header: Profile image, author, time */}
              <View style={styles.header}>
                <Image
                  source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtcPVdcIDUDATBrcMoTRUoE2f1OOPz_nIeag&s' }} // Replace with the actual author image URL
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
                  source={{ uri: post.image }} // Placeholder for the actual post image
                  style={styles.postImage}
                />
              )}

              {/* Likes and Comments Summary */}
              {/* <Text style={styles.likedBy}>{post.likes} Likes</Text> */}

              {/* Post Actions */}
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
  <TouchableOpacity style={styles.actionButton}>
    <Ionicons name="share-outline" size={18} />
    <Text style={styles.actionText}>Share</Text>
  </TouchableOpacity>
</View>

              {/* Comments Section */}
              {selectedPostId === post.id && (
                <View style={styles.commentsSection}>
                  <Text style={styles.commentsTitle}>Comments</Text>
                  <View style={styles.commentsContainer}>
  
                  {post.commentsData?.map((comment) => (
  <View key={comment.id} style={styles.commentContainer}>
    {/* Avatar */}
    <Image
      source={{ uri: comment.avatar }} // Replace with actual comment author avatar
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
          ))
        )}
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
    flexDirection: 'row', // Align avatar and text in a row
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
  commentActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', // Align items horizontally
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
