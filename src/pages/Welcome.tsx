import React from "react";
import { 
    View,
    SafeAreaView,
    Text, 
    Image,
    StyleSheet,
    Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import wateringImg from "../assets/watering.png";
import { WelcomeButton } from "../components/WelcomeButton";
import { useNavigation } from "@react-navigation/core";

export function Welcome(){
    const navigation = useNavigation();

    function handleStart(){
        navigation.navigate('UserIdentification');
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>

                <Text style={styles.title}>
                    Gerencie{"\n"}
                    suas plantas  {"\n"}
                    de forma fácil!
                </Text>

                <Image 
                    source={wateringImg}
                    resizeMode="contain"  
                />

                <Text style={styles.subtitle}>
                    Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar sempre que você precisar :)
                </Text>

                <WelcomeButton onPress={handleStart}>
                    <Feather 
                        name="chevron-right"
                        style={styles.buttonIcon}
                    />
                </WelcomeButton>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,  
    },
    wrapper:{
        flex: 1,
        alignItems: "center",   
        justifyContent: "space-around",
        paddingHorizontal: 20,
    },

    title:{
        fontFamily: fonts.heading,
        fontSize: 28,
        textAlign: "center",
        color: colors.heading,
        marginTop: 38,
        lineHeight: 34,
    },
    subtitle:{
        fontFamily: fonts.text,
        fontSize: 18,
        textAlign: "center",
        color: colors.heading,
        paddingHorizontal: 20,
    },

    image: {
        height: Dimensions.get("window").width * 0.7,
    },

    buttonIcon: {
        fontSize : 24,
        color: colors.white,
    }



})