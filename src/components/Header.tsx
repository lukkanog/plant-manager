import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image 
} from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

import { defaultPath } from "../utils/ImageUtils";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

export function Header(){
    const [ name, setName ] = useState<string>();
    const [ image, setImage ] = useState<string>();

    async function getName(){
        const user = await AsyncStorage.getItem("@plantmanager:user");
        setName(user || "Usuário(a)");
    }

    async function getImage(){
        const picture = await AsyncStorage.getItem("@plantmanager:imageSrc");
        setImage(picture || defaultPath);
    }

    useEffect(() => {
        getName();
        getImage();
    }, [])

    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá</Text>
                <Text style={styles.username}>{name}</Text>
            </View>

            <Image
                source={{uri: image}}
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
        width: 60,
        height: 60,
        borderRadius: 28,
    },
    
})