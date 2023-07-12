import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from "../context/AuthContext";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Home from './Home';


const Stack = createNativeStackNavigator();


const Navigation = () => {
    const { authToken } = useAuth();
    return (

        <NavigationContainer>
            <Stack.Navigator>
                {!authToken ? (
                    <>
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
                    </>
                ) : (
                    <Stack.Screen
                        name="profile"
                        component={Home}
                        options={{ title: 'profile', headerStyle: { backgroundColor: "primary" } }}
                    />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export {Navigation}