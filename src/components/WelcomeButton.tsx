import React from "react";
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, Alert } from "react-native";
import colors from "../styles/colors";

interface ButtonProps extends TouchableOpacityProps{
    children: JSX.Element,
}

export function WelcomeButton({ children, ...rest } : ButtonProps) {
    return (
        <TouchableOpacity 
            style={styles.button} 
            {...rest} 
        >
            {children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.green,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 16,
        marginBottom: 10,
        height: 56,
        paddingHorizontal: 10   
    },
    buttonText: {
        color: colors.white,
    }
})