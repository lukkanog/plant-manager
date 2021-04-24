import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image 
} from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

import ProfilePicture from "../assets/default-profile-picture.jpg";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

export function Header(){
    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá</Text>
                <Text style={styles.username}>desgraçado</Text>
            </View>

            <Image
                source={ProfilePicture}
                style={styles.image}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        // pega a altura da barra ed status em dispositivos com 'tela infinita' como os novos iPhones
        marginTop: getStatusBarHeight(),
    },
    greeting: {
        fontFamily : fonts.text,
        fontSize: 32,
        color: colors.heading,
    },
    username: {
        fontFamily : fonts.heading,
        fontSize: 32,
        color: colors.heading,
    },
    image: {
        width: 56,
        height: 56,
        borderRadius: 28,
    },
    
})