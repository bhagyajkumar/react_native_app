import { View, SafeAreaView, Text, Button, StyleSheet } from "react-native"
import { useAuth } from "../../context/AuthContext"




const Profile = ()=>{
    const authCtx = useAuth()
    return(
        <SafeAreaView>
            <Text style={styles.text}>{authCtx?.authToken}</Text>
            {
                authCtx.authToken &&
                <Text style={styles.text}>hey</Text>
            }
            <Button title="logout" onPress={()=>{authCtx.logout()}}/>
        </SafeAreaView>
    )   
}

const styles = StyleSheet.create({
    text: {
        color: "#000"
    }
})

export default Profile