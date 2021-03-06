import React from "react";
import { 
    TouchableOpacity,
    Text,
    StyleSheet,
    TouchableOpacityProps 
} from "react-native";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface ButtonProps extends TouchableOpacityProps{
    text: string,
}

export function Button({ text, ...rest } : ButtonProps) {
    return (
        <TouchableOpacity 
            style={styles.button}
            {...rest}
        >
            <Text style={styles.buttonText}>
                {text}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.green,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 16,
        height: 56,
    },
    buttonText: {
        fontFamily: fonts.heading,
        color: colors.white,
    }
})