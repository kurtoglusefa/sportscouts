import {View, Text, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import React from "react";

export function ChatHeader({title, backButton = true, onBack = () => {},headerMargin = {}, setFinishMatch, textStyles = {}}) {
    const handleFinishMatch = () => {
        setFinishMatch(true);
    }
    return (
        <View style={[styles.header, headerMargin]}>

            {backButton && <TouchableOpacity onPress={onBack}>
                <Ionicons name="arrow-back" size={24} color="#068cba" />
            </TouchableOpacity>}
            <TouchableOpacity>
                <Ionicons name="call" size={24} color="#068cba" style={{paddingLeft: 25}}/>
            </TouchableOpacity>
            <Text style={[styles.title, textStyles]}>{title}</Text>
            <TouchableOpacity onPress={handleFinishMatch}>
                <Ionicons name="close-circle-outline" size={24} color="#068cba" style={{color: "red",paddingLeft: 25}}/>
            </TouchableOpacity>
        </View>
    );
}



const styles = {
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        marginTop: 25,
        borderBottomWidth: 1,
        borderBottomColor: "#014663"
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center",
        marginLeft: 45,
        color: "#068cba"
    },
};