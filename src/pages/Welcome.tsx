import React from "react";
import { View, SafeAreaView, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

import colors from "../styles/colors";
import wateringImg from "../assets/watering.png";
import { Button } from "../components/Button";

export function Welcome(){



    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
                Gerencie{"\n"}
                suas plantas  {"\n"}
                de forma fácil!
            </Text>

            <Image source={wateringImg}  />

            <Text style={styles.subtitle}>
                Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar sempre que você precisar :)
            </Text>

            <Button title="Let's vamos!" onPress={handleVisibility} />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",   
        justifyContent: "space-between"
    },
    title:{
        fontSize: 32,
        fontWeight: "bold",
        textAlign: "center",
        color: colors.heading,
        marginTop: 38,
    },
    subtitle:{
        fontSize: 18,
        textAlign: "center",
        color: colors.heading,
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: colors.green,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 16,
        marginBottom: 10,
        height: 56,
        paddingHorizontal: 10   
    },
    image: {
        width: 292,
        height: 284,
    },
    buttonText: {
        color: colors.white,
    }
})