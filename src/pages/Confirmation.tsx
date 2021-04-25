import React from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { Button } from "../components/Button";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { useNavigation, useRoute } from "@react-navigation/core";


interface Params {
    title: string;
    subtitle: string;
    buttonTitle: string;
    icon: 'smile' | 'hug',
    nextScreen: string;
  }
  
  const emojis = {
    hug: '🤗',
    smile: '😄'
  } 

export function Confirmation(){
    const navigation = useNavigation();
    const route = useRoute();

    const {
        title,
        subtitle,
        buttonTitle,
        icon,
        nextScreen
    } = route.params as Params;

    function handleSubmit(){
        navigation.navigate(nextScreen); 
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                
                <Text style={styles.emoji}>
                    {emojis[icon]}
                </Text>
                
                <Text style={styles.title}>
                    {title}
                </Text>

                <Text style={styles.subtitle}>
                    {subtitle}
                </Text>

                <View style={styles.footer}>
                    <Button 
                        text={buttonTitle}
                        onPress={handleSubmit}
                    />
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