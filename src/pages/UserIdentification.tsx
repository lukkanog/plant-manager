import React, { useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from "react-native";
import { Button } from "../components/Button";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function UserIdentification() {
    const navigation = useNavigation();

    const [filled, setFilled] = useState(false);
    const [focus, setFocus] = useState(false);
    const [name, setName] = useState<string>()

    function handleInputBlur() {
        setFocus(false);
        setFilled(!!name);
    }


    function handleInputFocus() {
        setFocus(true);
    }

    function handleInputChange(value: string) {
        setFilled(!!value);
        setName(value);
    }

    async function handleSubmit() {
        if (!name){
            return Alert.alert("Por favor, nos informe seu nome 😥")
        }

        try {
            await AsyncStorage.setItem('@plantmanager:user', name);
            navigation.navigate('Confirmation', {
              title: 'Prontinho',
              subtitle: `Agora vamos começar a cuidar das suas plantinhas com muito cuidado.`,
              buttonTitle: 'Começar',
              icon: 'smile',
              nextScreen: 'PlantSelect',
            });
          } catch {
            Alert.alert('Não foi possível salvar o seu nome. 😢');
          }
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
                <TouchableWithoutFeedback 
                    onPress={Keyboard.dismiss} 
                    style={styles.wrapper}
                >
                        <View style={styles.form}>
                            <View style={styles.header}>
                                <Text style={styles.emoji}>
                                    {filled ? "😁" : "😀"}
                                </Text>

                                <Text style={styles.title}>
                                    Como podemos {"\n"}
                                chamar você?
                            </Text>
                            </View>

                            <TextInput
                                style={[
                                    styles.input,
                                    (focus || filled) && { borderColor: colors.green }
                                ]}
                                placeholder="Digite seu nome"
                                onChangeText={handleInputChange}
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                            />

                            <View style={styles.footer}>
                                <Button
                                    text="Continuar"
                                    onPress={handleSubmit}
                                />
                            </View>
                        </View>
                </TouchableWithoutFeedback>


            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        // justifyContent: "space-around"
    },
    wrapper: {
        flex: 1,
        width: "100%",
    },
    form: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 44,
    },
    header: {
        alignItems: "center",
    },

    emoji: {
        fontSize: 24,
        color: colors.heading,
    },

    title: {
        fontSize: 24,
        lineHeight: 32,
        textAlign: "center",
        color: colors.heading,
        fontFamily: fonts.heading
    },

    input: {
        borderBottomWidth: 2,
        borderColor: colors.gray,
        color: colors.heading,
        width: "100%",
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: "center",
    },

    footer: {
        marginTop: 40,
        width: "100%",
    }

})