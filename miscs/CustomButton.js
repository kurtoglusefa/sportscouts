import {Text, TouchableOpacity} from "react-native";

export function CustomButton({ navigation, title, destination, buttonStyle, textStyle, active=true }) {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                buttonStyle,
                !active && styles.disabledButton,
            ]}
            onPress={() => active && navigation.navigate(destination)}
            disabled={!active}
        >
            <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = {
    button: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderWidth: 2,
        borderRadius: 8,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#199ecf',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 10,
        borderColor: '#199ecf',
    },
    buttonText: {
        fontFamily: 'itim',
        color: '#199ecf',
    },
    disabledButton: {
        backgroundColor: '#e1e1e1',
    },
};