import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ArrowRight } from "lucide-react-native";

export default function MatchIntro() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Find Your Perfect Scout</Text>

                <View style={styles.infoContainer}>
                    <Text style={styles.description}>
                        You're about to begin your journey to find a sports scout that matches your needs.
                    </Text>

                    <Text style={styles.stepText}>
                        We'll ask you a few questions about:
                    </Text>

                    <View style={styles.bulletPoints}>
                        <Text style={styles.bulletText}>• Your preferred sport</Text>
                        <Text style={styles.bulletText}>• Your experience level</Text>
                        <Text style={styles.bulletText}>• Your location preference</Text>
                        <Text style={styles.bulletText}>• Language preferences</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("FindScout")}
                >
                    <Text style={styles.buttonText}>Get Started</Text>
                    <ArrowRight size={24} color="#fff" style={styles.icon} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e6f7ff", // Light blue background
    },
    contentContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#068cba",
        marginBottom: 40,
        textAlign: "center",
    },
    infoContainer: {
        width: "100%",
        marginBottom: 40,
    },
    description: {
        fontSize: 18,
        color: "#068cba",
        textAlign: "center",
        marginBottom: 30,
    },
    stepText: {
        fontSize: 16,
        color: "#068cba",
        marginBottom: 15,
    },
    bulletPoints: {
        paddingLeft: 20,
    },
    bulletText: {
        fontSize: 16,
        color: "#068cba",
        marginBottom: 10,
    },
    button: {
        flexDirection: "row",
        backgroundColor: "#068cba",
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        marginRight: 10,
    },
    icon: {
        marginLeft: 5,
    }
});