import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native"
import { useState } from "react"
import { NavigationStackProp } from 'react-navigation-stack';
import { useAuth } from "../../context/AuthContext";
import Spinner from 'react-native-loading-spinner-overlay';



type Props = {
    navigation: NavigationStackProp<{ userId: string }>;
};


const Signup = ({ navigation }: Props) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const authCtx = useAuth()
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.signupText}>Login</Text>
                <TextInput style={styles.textbox} placeholder="username" onChangeText={text => setUsername(text)}>{username}</TextInput>
                <TextInput style={styles.textbox} placeholder="password" onChangeText={text => setPassword(text)} secureTextEntry={true}>{password}</TextInput>
                <Spinner
                    visible={loading}
                    textContent={'Logging in...'}
                    textStyle={styles.spinnerTextStyle}
                />
                <Button title="Login"
                    disabled={loading}
                    onPress={() => {
                        setLoading(true)
                        authCtx?.login(username, password)
                            .then((resp: any) => {
                                setLoading(false)
                                if (resp.access) {
                                    Alert.alert("Login", resp.access)
                                    return;
                                }
                                Alert.alert("error", resp?.detail)
                            })
                    }}
                ></Button>
                <Text style={styles.loginText}
                    onPress={() => {

                        navigation.navigate("signup")
                    }}
                >Don't have an account? Signup</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            alignContent: "center",
            justifyContent: "center",
            height: "100%",
            padding: 8,
            backgroundColor: "#444"
        },

        textbox: {
            fontSize: 18,
            borderRadius: 10,
            marginBottom: 2,
            padding: 10,
            backgroundColor: "#fff",
            color: "#000"
        },

        card: {
            backgroundColor: "#222",
            padding: 10,
            borderRadius: 10

        },
        signupText: {
            color: "#fff",
            fontSize: 28,
            padding: 5,
            margin: 10
        },
        loginText: {
            color: "blue",
            textAlign: "right",
            padding: 8
        },
        spinnerTextStyle: {
            color: '#FFF'
        },
    }
)

export default Signup