import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Header } from "../miscs/Header";
import { useNavigation } from "@react-navigation/native";
import {ArrowLeft, ArrowRight, Check} from "lucide-react-native";
import { VideoView, useVideoPlayer } from "expo-video";


const guideSteps = [
    {
        title: "Check for matches",
        text: "When a scout seeker matches with you, you will receive a notification.",
        video: require('../assets/guy-phone.mp4')
    },
    {
        title: "Get to know each other",
        text: "When a scout seeker matches with you, you can communicate via the dedicated chat space to get to know each other.",
        video: require('../assets/texting.mp4')
    },
    {
        title: "Meet",
        text: "Decide when to meet with your match based on availabilities of both of you.",
        video: require('../assets/meeting.mp4')
    },
    {
        title: "Guide",
        text: "Try to help your match as much as you can. You can provide tips, advice, and feedback. Show him/her the best spots to practice.",
        video: require('../assets/helping.mp4')
    }
];

function BecomeScoutGuide() {
    const navigation = useNavigation();
    const [currentStep, setCurrentStep] = useState(0);
    const [currentGuideStep, setCurrentGuideStep] = useState(guideSteps[0]);

    const handleNextStep = () => {
        if (currentStep < guideSteps.length - 1) {
            setCurrentStep(currentStep + 1);
            setCurrentGuideStep(guideSteps[currentStep + 1]);
        }
    };
 
    const handlePreviousStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
            setCurrentGuideStep(guideSteps[currentStep - 1]);
        }
    };

    const handleFinish = () => {
        navigation.navigate("BottomBar");
    };

    const player = useVideoPlayer(currentGuideStep.video, (player) => {
        player.loop = true;
        player.muted = true;
        player.allowsExternalPlayback = false;
        player.play();
    });

    return (
        <View style={{flex: 1}}>
            <Header
                title={"Scout Guide"}
                onBack={() => navigation.navigate("BottomBar")}
            />
            <View style={styles.contentContainer}>
                <Text style={styles.title}>{currentGuideStep.title}</Text>
                <Text style={styles.description}>{currentGuideStep.text}</Text>

                <VideoView player={player} style={styles.video} nativeControls={false}/>

                <View style={styles.navigationContainer}>
                    {currentStep > 0 && (
                        <TouchableOpacity
                            onPress={handlePreviousStep}
                            style={styles.iconButton}
                        >
                            <ArrowLeft
                                size={24}
                                color={"#08bdff"}
                            />
                        </TouchableOpacity>
                    )}

                    {currentStep < guideSteps.length - 1 ? (
                        <TouchableOpacity
                            style={styles.iconButton}
                            onPress={handleNextStep}
                        >
                            <ArrowRight
                                size={24}
                                color={"#08bdff"}
                            />
                        </TouchableOpacity>
                    ) : (
                        <View style={styles.finishContainer}>
                            <TouchableOpacity
                                style={styles.finishButton}
                                onPress={handleFinish}
                            >
                                <Check size={24} color={"#ffffff"} />
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#2ebbf1',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        color: '#FFFFFF',
        marginTop: 50,
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        color: '#FFFFFF',
    },
    video: {
        marginVertical: 30,
        width: 300,
        height: 200,
    },
    navigationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    finishContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 10,
        marginHorizontal: 10,
        minWidth: 100,
        alignItems: 'center',
    },
    finishButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#1dc600',
        borderWidth: 2,
        borderColor: '#1dc600',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginHorizontal: 20,
    },
    buttonText: {
        color: '#000000',
        fontWeight: 'bold',
    },
    iconButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#068cba',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginHorizontal: 20,
    },
});

export default BecomeScoutGuide;