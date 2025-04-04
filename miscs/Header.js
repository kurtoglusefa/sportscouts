import {View, Text, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {Spacer} from "./Spacer";

export function Header({title, backButton = true, onBack = () => {},headerMargin = {}, textStyles = {}, showDemoButton = false, demoClicked = false,onDemo = () => {}}) {
    return (
        <View style={[styles.header, headerMargin]}>
            {backButton && <TouchableOpacity onPress={onBack}>
                <Ionicons name="arrow-back" size={24} color="#068cba" />
            </TouchableOpacity>}
            <Spacer marginHorizontal={10} />
            <Text style={[styles.title, textStyles]}>{title}</Text>
            {showDemoButton && (
                <TouchableOpacity onPress={onDemo}>
                    {demoClicked ? <Ionicons name="stop" size={24} color={"#068cba"} style={{paddingLeft: 80}}/> :<Ionicons name="play" size={24} color="#068cba" style={{paddingLeft: 80}}/>}
                </TouchableOpacity>
            )}
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
        marginLeft: 75,
        color: "#068cba"
    },
};