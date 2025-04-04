import {View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";
import {useState} from "react";
import {Ionicons} from "@expo/vector-icons";
import {exploreFacilitiesString, findScoutString, welcomeMessageString} from "../miscs/Strings";
import { useNavigation } from '@react-navigation/native';
import {Spacer} from "../miscs/Spacer";
import {CustomButton} from "../miscs/CustomButton";


export default function Homepage() {
    const [selectedValue, setSelectedValue] = useState("English");
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const navigation = useNavigation();

    const options = ["English", "Italian"];

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const setLanguage = (value) => {
        if(options.includes(value)){
            options.unshift(value);
            setSelectedValue(value);
            setDropdownVisible(false);
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.trigger} onPress={toggleDropdown}>
                <Image source={require('../assets/languageIcon.png')} style={{width: 30, height: 30, tintColor: '#068cba'}}/>
                <Text style={StyleSheet.create({
                    paddingLeft: 10,
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: '#068cba',
                })}>{selectedValue}</Text>
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

            <View style={styles.centeredContainer}>
                <Text style={styles.welcome}>{selectedValue === "English" ? welcomeMessageString.English : welcomeMessageString.Italian}</Text>

                <Spacer marginVertical={30}/>

                <CustomButton
                    navigation={navigation}
                    title={selectedValue === "English" ? findScoutString.English : findScoutString.Italian}
                    destination={'FindScout'}
                    buttonStyle={{width: '200'}}
                    textStyle={{fontSize: 20}}
                />

                <Spacer marginVertical={10}/>

                <CustomButton
                    navigation={navigation}
                    title={selectedValue === "English" ? exploreFacilitiesString.English : exploreFacilitiesString.Italian}
                    destination={'Map'}
                    buttonStyle={{width: '160'}}
                    textStyle={{fontSize: 15}}
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    centeredContainer: {
        flex: 1,
        alignItems: "center",
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: "flex-start",
        paddingTop: 50,
    },
    welcome: {
        fontFamily: 'itim',
        fontWeight: 'bold',
        paddingTop: 100,
        fontSize: 40,
        textAlign: 'center',
        color: '#199ecf',
    },
    topbar: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        paddingLeft: 20,
    },
    trigger: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 0,
        borderColor: "#ccc",
        borderRadius: 8,
        marginLeft: 20,
        paddingRight: 20,
        width: 180,
    },
    selectedText: {
        fontSize: 16,
    },
    dropdown: {
        position: "absolute",
        top: 90,
        left: 20,
        width: 200,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        backgroundColor: "#fff",
        zIndex: 1000,
        shadowColor: "#000",
        shadowOffset: { width: 20, height: 20 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 20,
    },
    option: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    optionText: {
        fontSize: 16,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 8,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 10,
    },
    buttonText: {
        fontFamily: 'itim',
        color: 'black',
    },
});