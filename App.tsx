import React, { useEffect } from "react";
import { SafeAreaView, Text, StyleSheet, View, TextInput, Button } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { AuthProvider, useAuth } from "./context/AuthContext";
import {Navigation} from "./pages"
const Stack = createNativeStackNavigator();

const App = () => {
  const { authToken } = useAuth();
  
  useEffect(() => {
    console.log(authToken);
  }, [authToken]);

  return (
    <AuthProvider>
        <Navigation />
    </AuthProvider>

  );
};


export default App;