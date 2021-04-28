import React, { useState, useEffect } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Platform,
    Alert,
    TouchableOpacity,
    Image,
} from "react-native";
import { Button } from "../components/Button";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker';
import { defaultPath } from "../utils/ImageUtils";
import { MaterialIcons } from '@expo/vector-icons';



export function UserPicture() {
    const navigation = useNavigation();

    const [ image, setImage ] = useState(defaultPath);
    const [ buttonText, setButtonText ] = useState("Deixa pra próxima");


    const requestPermissions = async () => {
        if (Platform.OS !== 'web') {
            const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            const { status: camStatus } = await ImagePicker.requestCameraPermissionsAsync();

            if (libraryStatus !== 'granted' || camStatus !== 'granted') {
                Alert.alert("Beleza, fica tranquilo que a foto é opcional 😉");
                handleSubmit();
            }
        }
    }

    useEffect(() => {
        requestPermissions();
    }, []);

    useEffect(() => {
        if (image && image !== defaultPath) {
            setButtonText("Continuar");
        }
    }, [image])


    async function handleSubmit() {
        try {
            await AsyncStorage.setItem('@plantmanager:imageSrc', image);

            navigation.navigate('Confirmation', {
                title: 'Prontinho',
                subtitle: `Agora vamos começar a cuidar das suas plantinhas com muito cuidado.`,
                buttonTitle: 'Começar',
                icon: 'smile',
                nextScreen: 'PlantSelect',
            });
        } catch {
            Alert.alert('Não foi possível salvar a sua foto linda e maravilhosa. 😢');
        }
    }


    const takePicture = async () => {
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };



    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper} >
                <View style={styles.form}>
                    <View style={styles.header}>

                        <Text style={styles.title}>
                            Deseja adicionar uma foto de perfil? {"📷"}
                        </Text>

                        {image ?
                            <Image
                                source={{ uri: image }}
                                width={100}
                                height={100}
                                style={styles.previewPicture}
                            />
                        : null}

                        <View style={styles.buttons}>

                            <TouchableOpacity
                                style={styles.galleryButton}
                                onPress={pickImage}
                            >
                                <MaterialIcons 
                                    name="photo-library" 
                                    size={24} 
                                    color="black" 
                                    style={styles.buttonIcon} 
                                />
                                
                                <Text style={styles.buttonText}>
                                    Escolher foto
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.galleryButton}
                                onPress={takePicture}
                            >
                                <MaterialIcons 
                                    name="camera-alt" 
                                    size={24} 
                                    color="black" 
                                    style={styles.buttonIcon} 
                                />

                                <Text style={styles.buttonText}>
                                    Tirar foto
                                </Text>
                            </TouchableOpacity>
                        </View>

                       
                    </View>

                    <View style={styles.footer}>
                        <Button
                            text={buttonText}
                            onPress={handleSubmit}
                        />
                    </View>
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

    title: {
        fontSize: 24,
        lineHeight: 32,
        textAlign: "center",
        color: colors.heading,
        fontFamily: fonts.heading
    },

    buttons: {
        width: '100%',
        justifyContent: "space-around",
        alignItems: "center",
        paddingVertical: 30,
        // flexDirection: 'row',
    },

    galleryButton: {
        flexDirection: "row",
        backgroundColor: colors.shape,
        borderRadius: 15,
        width: 200,
        marginVertical: 5,
        paddingVertical: 10,
        justifyContent: "center",
        alignItems: "center"
    },

    buttonIcon: {
        marginRight: 10,
    },

    buttonText: {
        fontFamily: fonts.heading,
        color: colors.heading,
    },

    previewPicture: {
        height: 200,
        width: 200,
        backgroundColor: colors.shape,
        borderRadius: 40,
        marginTop: 10,
    },

    footer: {
        width: "100%",
    }
})