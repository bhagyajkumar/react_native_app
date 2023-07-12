import React, { FC, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, SafeAreaView, Button } from 'react-native';
import Post from '../../components/Post/Post';
import { useAuth } from '../../context/AuthContext';

interface PostData {
    id: number;
    title: string;
    user: {
        username: string;
    };
    image: string;
}


const App: FC = () => {
    const authCtx = useAuth()
    const [posts, setPosts] = useState<PostData[]>([]);

    useEffect(() => {
        // Simulating API call to fetch data
        const fetchData = async () => {
            try {
                const response = await fetch('https://dsawizapi.onrender.com/api/post/');
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const renderPost = ({ item }: { item: PostData }) => (
        <Post
            username={item.user.username}
            imageSource={item.image}
            caption={item.title}
        />
    );

    return (
        <>
        <Button title='logout' onPress={()=>{authCtx.logout()}}/>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={posts}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderPost}
                    contentContainerStyle={styles.contentContainer}
                />
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        padding: 10,
    },
});

export default App;
