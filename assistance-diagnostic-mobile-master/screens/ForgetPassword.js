import React, { useState } from "react";
import { Text, View, TouchableOpacity, ImageBackground, TextInput } from "react-native";
import { StyleSheet } from "react-native";
import axios from "axios";
import { useUserData } from "../contexts/useUserData";

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const { path } = useUserData();
    const isEmailValid = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    };
    const handleSubmit = async () => {
        if (isEmailValid(email)){
            try {
                const data = {
                    email: email,
                };
                const response = await axios.post(`${path}/request_reset_password`, data);
                if (response.status === 200) {
                    setMessage("Password reset email sent successfully.");
                } else {
                    setError("An error occurred while sending the password reset email.");
                }
            }
            catch (error) {
                setError("An error occurred while sending the password reset email.");
            }
        }
        else {
            setError("Invalid email address");
        }

    };

    return (
        <ImageBackground
            source={require("../assets/home.jpg")}
            style={styles.container}
        >
            <View style={styles.card}>
                <Text style={styles.title}>Forget Password</Text>
                <TextInput
                    placeholder="Enter your email..."
                    style={styles.input}
                    onChangeText={(e) => setEmail(e)}
                />
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Reset Password</Text>
                </TouchableOpacity>
                {message && <Text style={styles.successMessage}>{message}</Text>}
                {error && <Text style={styles.errorMessage}>{error}</Text>}
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        resizeMode: "cover",
        width: "100%",
        height: "100%",
    },
    card: {
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: 10,
        padding: 20,
        width: "90%",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        height: 40,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    button: {
        backgroundColor: "blue",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
    successMessage: {
        color: "green",
        marginTop: 10,
        fontSize: 16,
    },
    errorMessage: {
        color: "red",
        marginTop: 10,
        fontSize: 16,
    },
});

export default ForgetPassword;
