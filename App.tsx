import React from "react";
import { SafeAreaView, Text, StyleSheet, View, TextInput, Button } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";

const Stack = createNativeStackNavigator();


const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="login"
            component={Login}
            options={{ title: 'login', headerStyle: { backgroundColor: "primary" } }}
          />
          <Stack.Screen
            name="signup"
            component={Signup}
            options={{ title: 'signup', headerStyle: { backgroundColor: "primary" } }}
          />
          {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  )
}




export default App;