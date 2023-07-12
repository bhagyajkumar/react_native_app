import React, { FC, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeart, faHeartbeat } from '@fortawesome/free-solid-svg-icons';

interface PostProps {
  username: string;
  imageSource: string;
  caption: string;
}

const Post: FC<PostProps> = ({ username, imageSource, caption }) => {
    const [liked, setLiked] = useState(false);
  
    const handleLike = () => {
      setLiked(!liked);
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.profileImage}
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBfGUf8xBbzuVXfQaMvko4EYuwIvD9yOd5Uw&usqp=CAU"
            }} // replace with your own image source
          />
          <Text style={styles.username}>{username}</Text>
        </View>
        <Image style={styles.postImage} source={{ uri: imageSource }} />
        <View style={styles.captionContainer}>
          <Text style={styles.caption}>{caption}</Text>
        </View>
        <TouchableOpacity
          style={styles.likeButton}
          onPress={handleLike}
          activeOpacity={0.8}
        >
          <FontAwesomeIcon
            icon={liked ? faHeart : faHeartbeat}
            size={24}
            color={liked ? 'red' : 'black'}
          />
        </TouchableOpacity>
      </View>
    );
  };
  

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  captionContainer: {
    padding: 10,
  },
  caption: {
    fontSize: 14,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});

export default Post;
