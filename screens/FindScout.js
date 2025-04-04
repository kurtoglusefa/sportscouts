import {
    View,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    Animated,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image
} from "react-native";
import { Header } from "../miscs/Header";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { CustomButton } from "../miscs/CustomButton";
import { ArrowRight } from "lucide-react-native";
import {Ionicons} from "@expo/vector-icons";
import {
    getStarted,
    matchMessage,
    matchTitle,
    question1,
    question2,
    question3,
    question4,
    questionTitle
} from "../miscs/Strings";

export default function FindScout() {
    const navigation = useNavigation();
    const [showIntro, setShowIntro] = useState(true);
    const [introFadeAnim] = useState(new Animated.Value(1));
    const [formFadeAnim] = useState(new Animated.Value(0));

    // Your existing state variables
    const [sport, setSport] = useState("");
    const [experience, setExperience] = useState("");
    const [location, setLocation] = useState("");
    const [mainLanguage, setMainLanguage] = useState("");
    const [secondaryLanguage, setSecondaryLanguage] = useState("");
    const [currentStep, setCurrentStep] = useState(-1);
    const [formValid, setFormValid] = useState(false);
    const [fadeAnim] = useState(new Animated.Value(1));
    const [textFadeAnim] = useState(new Animated.Value(1));
    const [sportError, setSportError] = useState(false);
    const [experienceError, setExperienceError] = useState(false);
    const [locationError, setLocationError] = useState(false);
    const [mainLanguageError, setMainLanguageError] = useState(false);
    const [secondaryLanguageError, setSecondaryLanguageError] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState("English");
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const steps = [
        {
            field: "sport",
            value: sport,
            setValue: setSport,
            placeholder: "Sport...",
            introText: "What sport are you looking to practice?",
            required: true,
            possibleValues: ["Football", "Volleyball", "Basketball", "Boxing", "Gym", "Calisthenics", "Running"]
        },
        {
            field: "experience",
            value: experience,
            setValue: setExperience,
            placeholder: "Experience...",
            introText: "How many years of experience do you have in this sport?",
            inputMode: "numeric",
            required: true,
            possibleValues: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"]
        },
        {
            field: "location",
            value: location,
            setValue: setLocation,
            placeholder: "Preferred Location...",
            introText: "Where would you prefer your scout to be?",
            required: true,
            possibleValues: ["Crocetta", "Vanchiglia", "Santarita", "Sansalvario", "Aurora", "Barrieradimilano", "Borgopo", "Borgovecchio", "Campidoglio", "Citturin", "Cenisia", "Madonnadicampagna", "Parella", "Vallette", "Barrieradinizza", "Regioparco", "Falchera", "Rebaudengo", "Borgatalesna", "Barrieradilanzo", "Barca", "Bertolla", "Borgorossini", "Borgosanpaolo", "Cavoretto", "Lingotto", "Mirafiori"]
        },
        {
            field: "mainLanguage",
            value: mainLanguage,
            setValue: setMainLanguage,
            placeholder: "Main Language...",
            introText: "What is your primary language of communication?",
            required: true,
            possibleValues: ["English", "Italian", "Spanish", "French", "German", "Portuguese", "Russian", "Chinese", "Japanese", "Arabic", "Hindi"]
        },
        {
            field: "secondaryLanguage",
            value: secondaryLanguage,
            setValue: setSecondaryLanguage,
            placeholder: "Secondary Language...",
            introText: "What is your secondary language if any?",
            required: false,
            possibleValues: ["English", "Italian", "Spanish", "French", "German", "Portuguese", "Russian", "Chinese", "Japanese", "Arabic", "Hindi"]
        }
    ];

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const setLanguage = (value) => {
        setSelectedLanguage(value);
        setDropdownVisible(false);
    };

    const options = ["English", "Italian"];

    const transitionToForm = () => {
        setCurrentStep(0);
        Animated.parallel([
            Animated.timing(introFadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }),
            Animated.timing(formFadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            })
        ]).start(() => {
            setShowIntro(false);
        });
    };

    const fadeOut = () => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true
            }),
            Animated.timing(textFadeAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true
            })
        ]).start();
    };

    const fadeIn = () => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true
            }),
            Animated.timing(textFadeAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true
            })
        ]).start();
    };

    const handleNext = (fieldType, value) => {
        const formattedValue = value[0].toUpperCase() + value.slice(1).toLowerCase();
        if (!steps[currentStep].possibleValues.includes(formattedValue.replace(/\s/g, ''))) {
            switch (fieldType) {
                case "sport":
                    setSportError(true);
                    break;
                case "experience":
                    setExperienceError(true);
                    break;
                case "location":
                    setLocationError(true);
                    break;
                case "mainLanguage":
                    setMainLanguageError(true);
                    break;
                case "secondaryLanguage":
                    setSecondaryLanguageError(true);
                    break;
            }
        } else {
            if (currentStep < steps.length - 1) {
                fadeOut();
                setTimeout(() => {
                    setCurrentStep(prev => prev + 1);
                    fadeIn();
                }, 200);
            }
        }
    };

    const handleBack = () => {
        if (currentStep === 0 && !showIntro) {
            fadeOut();
            setTimeout(() => {
                setShowIntro(true);
                setCurrentStep(-1);
                introFadeAnim.setValue(1);
                formFadeAnim.setValue(0);
                fadeIn();
            }, 200);
        } else if (currentStep === 0 && showIntro) {
            navigation.navigate("Map");
        } else {
            fadeOut();
            setTimeout(() => {
                setCurrentStep(prev => prev - 1);
                fadeIn();
            }, 200);
        }
    };

    const isStepValid = () => {
        const currentField = steps[currentStep];
        return !currentField.required || currentField.value.trim() !== "";
    };

    useEffect(() => {
        const allRequiredFieldsFilled = steps
            .filter(step => step.required)
            .every(step => step.value.trim() !== "");
        setFormValid(allRequiredFieldsFilled);
    }, [sport, experience, location, mainLanguage]);

    const renderIntro = () => (
        <Animated.View style={[styles.introContainer, { opacity: introFadeAnim }]}>
            <Text style={styles.title}>{selectedLanguage === "English" ? matchTitle.English : matchTitle.Italian}</Text>

            <View style={styles.infoContainer}>
                <Text style={styles.description}>
                    {selectedLanguage === "English" ? matchMessage.English : matchMessage.Italian}
                </Text>

                <Text style={styles.stepText}>
                    {selectedLanguage === "English" ? questionTitle.English : questionTitle.Italian}
                </Text>

                <View style={styles.bulletPoints}>
                    <Text style={styles.bulletText}>• {selectedLanguage === "English" ? question1.English : question1.Italian}</Text>
                    <Text style={styles.bulletText}>• {selectedLanguage === "English" ? question2.English : question2.Italian}</Text>
                    <Text style={styles.bulletText}>• {selectedLanguage === "English" ? question3.English : question3.Italian}</Text>
                    <Text style={styles.bulletText}>• {selectedLanguage === "English" ? question4.English : question4.Italian}</Text>
                </View>
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={transitionToForm}
            >
                <Text style={styles.buttonText}>{selectedLanguage === "English" ? getStarted.English : getStarted.Italian}</Text>
                <ArrowRight size={24} color="#fff" style={styles.icon} />
            </TouchableOpacity>
        </Animated.View>
    );

    const renderCurrentStep = () => {
        const currentField = steps[currentStep];

        return (
            <View style={styles.contentContainer}>
                <Animated.Text style={[styles.text, { opacity: textFadeAnim }]}>
                    {currentField.introText}
                </Animated.Text>
                <Animated.View style={[styles.stepContainer, { opacity: fadeAnim }]}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(value) => {
                            currentField.setValue(value);
                            currentField.field === "sport" && setSportError(false);
                            currentField.field === "experience" && setExperienceError(false);
                            currentField.field === "location" && setLocationError(false);
                            currentField.field === "mainLanguage" && setMainLanguageError(false);
                            currentField.field === "secondaryLanguage" && setSecondaryLanguageError(false);
                        }}
                        value={currentField.value}
                        placeholder={currentField.placeholder}
                        placeholderTextColor={"#068cba"}
                        inputMode={currentField.inputMode}
                    />
                    {currentField.field === "sport" && sportError && (
                        <Text style={styles.errorText}>Please select a valid sport</Text>
                    )}
                    {currentField.field === "experience" && experienceError && (
                        <Text style={styles.errorText}>Please enter a valid number</Text>
                    )}
                    {currentField.field === "location" && locationError && (
                        <Text style={styles.errorText}>Please select a valid location</Text>
                    )}
                    {currentField.field === "mainLanguage" && mainLanguageError && (
                        <Text style={styles.errorText}>Please select a valid language</Text>
                    )}
                    {currentField.field === "secondaryLanguage" && secondaryLanguageError && (
                        <Text style={styles.errorText}>Please select a valid language</Text>
                    )}
                    {currentStep < steps.length - 1 ? (
                        <TouchableOpacity
                            onPress={() => handleNext(currentField.field, currentField.value)}
                            disabled={!isStepValid()}
                            style={[
                                styles.iconButton,
                                !isStepValid() && styles.iconButtonDisabled
                            ]}
                        >
                            <ArrowRight
                                size={24}
                                color={isStepValid() ? "#08bdff" : "#ccc"}
                            />
                        </TouchableOpacity>
                    ) : (
                        <CustomButton
                            navigation={navigation}
                            title="Match Scout"
                            destination="ScoutsSuggestions"
                            active={formValid}
                            buttonStyle={{ width: 150, height: 50 }}
                            textStyle={{ fontSize: 16, fontWeight: "bold" }}
                        />
                    )}
                </Animated.View>
            </View>
        );
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={"height"}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                <Header title={"Find a Scout"} backButton={currentStep === -1 ? false : true} onBack={handleBack} />
                {currentStep === -1 && <View style={styles.header}>
                    <TouchableOpacity style={styles.trigger} onPress={toggleDropdown}>
                        <Image source={require('../assets/languageIcon.png')} style={{ width: 30, height: 30, tintColor: '#068cba' }} />
                        <Text style={styles.selectedText}>{selectedLanguage}</Text>
                        <Ionicons
                            name={dropdownVisible ? "chevron-up" : "chevron-down"}
                            size={20}
                            color="#068cba"
                        />
                    </TouchableOpacity>
                    {dropdownVisible && (
                        <View style={styles.dropdown}>
                            {options.map((option, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.option}
                                    onPress={() => setLanguage(option)}
                                >
                                    <Text style={styles.optionText}>{option}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>}
                <View style={styles.body}>
                    {showIntro ? renderIntro() : (
                        <Animated.View style={{ opacity: formFadeAnim, flex: 1, width: '100%' }}>
                            {renderCurrentStep()}
                        </Animated.View>
                    )}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e6f7ff",
    },
    scrollContainer: {
        flexGrow: 1,
    },
    body: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
    },
    introContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 30,
    },
    contentContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    stepContainer: {
        alignItems: "center",
        justifyContent: "center",
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
    },
    textInput: {
        borderWidth: 2,
        borderColor: "#068cba",
        borderRadius: 5,
        width: 300,
        height: 50,
        margin: 30,
        alignItems: "center",
        paddingHorizontal: 15,
        color: "#068cba"
    },
    text: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "#068cba",
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
    },
    iconButtonDisabled: {
        borderColor: '#ccc',
    },
    trigger: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 0,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingRight: 20,
        width: 180,
    },
    selectedText: {
        fontSize: 16,
        color: "#068cba",
    },
    dropdown: {
        position: "absolute",
        top: 40,
        width: 180,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        backgroundColor: "#fff",
        zIndex: 1000,
        shadowColor: "#08bdff",
        shadowOffset: { width: 20, height: 20 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 20,
    },
    option: {
        color: "#068cba",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    optionText: {
        fontSize: 16,
        color: "#068cba",
    },
    header: {
        marginLeft: 20,
        marginTop: 10,
    },
});