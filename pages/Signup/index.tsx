import { Alert, Button, Modal, StyleSheet, Text, TextInput, View } from "react-native"
import { useState } from "react"
import { NavigationStackProp } from 'react-navigation-stack';
import { useAuth } from "../../context/AuthContext";
import Spinner from 'react-native-loading-spinner-overlay';

type Props = {
  navigation: NavigationStackProp<{ userId: string }>;
};


const Signup = ({ navigation }: Props) => {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const authCtx = useAuth()


  const handleButtonClick = () => {
    setLoading(true)
    authCtx?.signup(email, username, password)
      .then((resp: any) => {
        Alert.alert("Signup successfull", "You can now login", [
          {
            text: "login",
            onPress: () => {
              navigation.navigate("login")
            }
          }
        ])
        setLoading(false)
      },
      (err:string)=>{
        setLoading(false)
        Alert.alert("Error", err)
      })

      
  }


  return (
    <View style={styles.container}>


      <View style={styles.card}>
        <Text style={styles.signupText}>Signup</Text>
        <TextInput style={styles.textbox} placeholder="Email" onChangeText={text => setEmail(text)}>{email}</TextInput>
        <TextInput style={styles.textbox} placeholder="username" onChangeText={text => setUsername(text)}>{username}</TextInput>
        <TextInput style={styles.textbox} placeholder="password" onChangeText={text => setPassword(text)} secureTextEntry={true}>{password}</TextInput>
          <Button disabled={loading} title="signup" onPress={handleButtonClick} />
          <Spinner
            visible={loading}
            textContent={'Signing up...'}
            textStyle={styles.spinnerTextStyle}
          />
        <Text style={styles.loginText} onPress={() => {
          navigation.navigate("login")
        }}>Already have an account? Login</Text>
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