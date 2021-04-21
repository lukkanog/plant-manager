import React, { useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { Button } from "../components/Button";
import colors from "../styles/colors";
import fonts from "../styles/fonts";


export function Confirmation(){
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                
                <Text style={styles.emoji}>
                    😁
                </Text>
                
                <Text style={styles.title}>
                    Prontinho!
                </Text>

                <Text style={styles.subtitle}>
                    Agora vamos começar a cuidar das suas plantinhas com muito cuidado
                </Text>

                <View style={styles.footer}>
                    <Button text="Bora lá!" />
                </View>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "space-around"
    },
    wrapper: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        padding: 30,
    },

    emoji: {
        fontSize: 70,
        color: colors.heading,
    },

    title: {
        fontSize: 24,
        lineHeight: 32,
        marginTop: 15,
        textAlign: "center",
        color: colors.heading,
        fontFamily: fonts.heading
    },
    subtitle: {
        fontFamily: fonts.text,
        textAlign: "center",
        fontSize: 17,
        paddingVertical: 10,
        color: colors.heading
    },
    
    footer: {
        marginTop: 40,
        width: "100%",
    }
    
})