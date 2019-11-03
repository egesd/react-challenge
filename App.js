import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    AsyncStorage,
    TouchableOpacity
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";

export default function App() {
    const [count, setCount] = useState(0);

    const netInfo = useNetInfo();

    getCount = async () => {
        let count = "";
        try {
            count = (await AsyncStorage.getItem("count")) || "0";
            count = parseInt(count, 10);
            setCount(count);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getCount();
    }, count);

    increaseCount = async () => {
        const number = netInfo.isConnected ? count + 1 : count + 10;
        try {
            await AsyncStorage.setItem("count", number.toString());
            setCount(number);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={{ color: "red" }}>Connection type is: {netInfo.type}</Text>
            <Text style={{ fontSize: 30, paddingBottom: 5 }}>
                You've clicked {count} times
            </Text>
            <TouchableOpacity style={styles.button} onPress={increaseCount}>
                <LinearGradient
                    colors={["#7a5fb1", "#45053a"]}
                    start={[0, 0]}
                    end={[1, 1]}
                    style={{ padding: 5, borderRadius: 90 }}
                >
                    <Text style={styles.text}>Nappula</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    button: {
        display: "flex",
        backgroundColor: "#346324",
        color: "#a6436b",
        fontSize: 30,
        padding: 8,
        borderWidth: 3,
        borderColor: "#162f05",
        borderRadius: 90
    },
    text: {
        color: "white",
        fontSize: 26,
        padding: 2,
        backgroundColor: "#9a4369",
        borderRadius: 90
    }
});
