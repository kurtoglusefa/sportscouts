import React, {useRef, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView, Animated} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ProgressBar } from 'react-native-paper';
import {Header} from "../miscs/Header";
import {Image} from "react-native";
import ConfettiCannon from 'react-native-confetti-cannon';
import {FeedbackModal} from "../miscs/FeedbackModal";

export function Profile() {
    const navigation = useNavigation();
    const [showAchievements, setShowAchievements] = useState(false);
    const [showFacilities, setShowFacilities] = useState(false);
    const [showScouts, setShowScouts] = useState(false);
    const [becomeScoutModalVisible, setBecomeScoutModalVisible] = useState(false);
    const [showScoutButton, setShowScoutButton] = useState(true);
    const [demoActive, setDemoActive] = useState(true);
    const [points, setPoints] = useState(40);
    const [rank, setRank] = useState('Pro');
    const [progressBar, setProgressBar] = useState(0.75);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [feedbackUser, setFeedbackUser] = useState('');
    let confettiRef = useRef(null);
    const fadeAnim = useRef(new Animated.Value(1)).current;

    const facilities = [
        {
            id: 1,
            name: 'CUS Torino 1',
            type: 'Basketball',
            address: 'Piazza Castello, Turin, Italy',
        },
        {
            id: 2,
            name: 'CUS Torino 2',
            type: 'Soccer',
            address: 'Via Roma, Turin, Italy',
        },
        {
            id: 3,
            name: 'CUS  Torino 3',
            type: 'Tennis',
            address: 'Corso Francia, Turin, Italy',
        },
    ];
    const onDemoPress = () => {
        if(demoActive){
            setDemoActive(false);
            setPoints(60);
            setRank('Master');
            setProgressBar(0.9);
        }else {
            setDemoActive(true);
            setPoints(40);
            setRank('Pro');
            setProgressBar(0.75);
            setShowScoutButton(true);
        }
    }
    const onBecomeScout = () => {
        confettiRef.start();
        setShowScoutButton(false);
        setPoints(0);
        setRank('Beginner');
        setProgressBar(0);

        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true
        }).start(() => {
            navigation.navigate('BecomeScoutGuide');

            fadeAnim.setValue(0);
        });
    }
    return (
        <Animated.View
            style={[
                styles.container,
                { opacity: fadeAnim },
            ]}
        >
        {becomeScoutModalVisible && (
                <Modal
                    visible={becomeScoutModalVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setBecomeScoutModalVisible(false)}
                >
                    <View style={styles.becomeScoutModal}>
                        <Text style={styles.becomeScoutModalTitle}>Become a scout</Text>
                        <Text style={styles.becomeScoutModalText}>Scouts are experienced players who can help you improve your skills. You can also become a scout yourself and help others. You just need 20 more points.</Text>
                        <TouchableOpacity onPress={() => setBecomeScoutModalVisible(false)} style={styles.closeButton}>
                            <Ionicons name="close" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </Modal>
        )}
            <TouchableOpacity
                style={styles.settingsButton}
                onPress={() => navigation.navigate('Settings')}
            >
                <Ionicons name="settings-outline" size={24} color="white" />
            </TouchableOpacity>
            <ScrollView style={becomeScoutModalVisible ? styles.containerWithModal : styles.container}>
                <Header title={"My Profile"} onBack={() => navigation.goBack()} showDemoButton={true} demoClicked={!demoActive} onDemo={onDemoPress}/>
                <View style={styles.profileSection}>
                    <View style={styles.iconContainer}>
                        <Image source={require("../assets/avatar.png")} size={100} style={styles.profilePhoto} />
                    </View>
                    <Text style={styles.name}>John</Text>
                    <Text style={styles.rank}>{rank} {!showScoutButton ? "Scout" : ""}</Text>
                    <View style={styles.progressContainer}>
                        <View style={styles.progressWrapper}>
                            <ProgressBar
                                progress={progressBar}
                                color="#01779f"
                                style={styles.progressBar}
                            />
                            <View style={styles.textWrapper}>
                                <Text style={styles.score}>{points} points</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.rankLabels}>
                        <Text style={styles.label}>Beginner</Text>
                        <Text style={styles.label}>Advanced</Text>
                        <Text style={styles.label}>Pro</Text>
                        <Text style={styles.label}>Master</Text>
                    </View>
                    { showScoutButton && (<TouchableOpacity style={demoActive ? styles.scoutButtonDisabled : styles.scoutButtonEnabled} disabled={demoActive} onPress={onBecomeScout}>
                        <Text style={styles.buttonText}>Become a Scout</Text>
                        <Ionicons name="information-circle-outline" size={20} color="white" onPress={() => setBecomeScoutModalVisible(true)} />
                    </TouchableOpacity>)}
                </View>
                <TouchableOpacity onPress={() => setShowAchievements(!showAchievements)} style={styles.collapseHeader}>
                    <Text style={styles.collapseHeaderText}>My Achievements</Text>
                    <Ionicons name={showAchievements ? "chevron-up" : "chevron-down"} size={24} color="#01779f" />
                </TouchableOpacity>
                {showAchievements && (
                    <View style={styles.collapseContent}>
                        <View style={styles.achievementItem}>
                            <MaterialCommunityIcons name="star-circle-outline" size={24} color="#12b300" />
                            <Text style={styles.achievementText}>First meeting with a scout</Text>
                        </View>
                        <View style={styles.achievementItem}>
                            <MaterialCommunityIcons name="star-circle-outline" size={24} color="#12b300" />
                            <Text style={styles.achievementText}>Second meeting with a scout</Text>
                        </View>
                        <View style={styles.achievementItem}>
                            <MaterialCommunityIcons name="star-circle-outline" size={24} color="#12b300" />
                            <Text style={styles.achievementText}>Third meeting with a scout</Text>
                        </View>
                    </View>
                )}
                <TouchableOpacity onPress={() => setShowFacilities(!showFacilities)} style={styles.collapseHeader}>
                    <Text style={styles.collapseHeaderText}>My Facilities</Text>
                    <Ionicons name={showFacilities ? "chevron-up" : "chevron-down"} size={24} color="#01779f" />
                </TouchableOpacity>
                {showFacilities && (
                    <View style={styles.collapseContent}>
                        {facilities.map((facility) => (
                            <View key={facility.id} style={styles.card}>
                                <Text style={styles.cardTitle}>{facility.name}</Text>
                                <Text>{facility.type}</Text>
                                <Text>{facility.address}</Text>
                                <TouchableOpacity style={styles.mapButton} onPress={() => navigation.navigate("Map")}>
                                    <Text style={styles.buttonText}>See on the map</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                )}
                <TouchableOpacity onPress={() => setShowScouts(!showScouts)} style={styles.collapseHeader}>
                    <Text style={styles.collapseHeaderText}>Previous Scouts</Text>
                    <Ionicons name={showScouts ? "chevron-up" : "chevron-down"} size={24} color="#01779f" />
                </TouchableOpacity>
                {showScouts && (
                    <View style={styles.collapseContent}>
                        <View style={styles.card}>
                            <View style={styles.scoutHeader}>
                                <Ionicons name="person-outline" size={24} color="#01779f" />
                                <Text style={styles.scoutName}>Anna Johnson</Text>
                                <Text style={styles.scoutDate}>2023-10-01</Text>
                            </View>
                            <View style={styles.reviewBar}>
                                {[...Array(5)].map((_, i) => (
                                    <Ionicons key={i} name="star" size={20} color={i < 4 ? "#01779f" : "gray"} />
                                ))}
                            </View>
                            <TouchableOpacity style={[styles.evaluationButton, styles.blackWhiteButton]} onPress={() => {
                                setFeedbackUser('Anna Johnson');
                                setShowFeedbackModal(true)}
                            }>
                                <Text style={styles.blackWhiteButtonText}>Send a new evaluation</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.chatButton, styles.blackWhiteButton]} onPress={() => navigation.navigate("Chat")}>
                                <Text style={styles.blackWhiteButtonText}>Open chat</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.card}>
                            <View style={styles.scoutHeader}>
                                <Ionicons name="person-outline" size={24} color="#01779f" />
                                <Text style={styles.scoutName}>Alan Smith</Text>
                                <Text style={styles.scoutDate}>2023-09-15</Text>
                            </View>
                            <View style={styles.reviewBar}>
                                {[...Array(5)].map((_, i) => (
                                    <Ionicons key={i} name="star" size={20} color={i < 3 ? "#01779f" : "gray"} />
                                ))}
                            </View>
                            <TouchableOpacity style={[styles.evaluationButton, styles.blackWhiteButton]} onPress={() => {
                                setFeedbackUser('Alan Bianchi');
                                setShowFeedbackModal(true)}
                            }>
                                <Text style={styles.blackWhiteButtonText}>Send a new evaluation</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.chatButton, styles.blackWhiteButton]}>
                                <Text style={styles.blackWhiteButtonText}>Open chat</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.card, {marginBottom: 80}]}>
                            <View style={styles.scoutHeader}>
                                <Ionicons name="person-outline" size={24} color="#01779f" />
                                <Text style={styles.scoutName}>Alice Bianchi</Text>
                                <Text style={styles.scoutDate}>2023-08-20</Text>
                            </View>
                            <View style={styles.reviewBar}>
                                {[...Array(5)].map((_, i) => (
                                    <Ionicons key={i} name="star" size={20} color={i < 4 ? "#01779f" : "gray"} />
                                ))}
                            </View>
                            <TouchableOpacity style={[styles.evaluationButton, styles.blackWhiteButton]} onPress={() => {
                                setFeedbackUser('Alice Bianchi');
                                setShowFeedbackModal(true)}
                            }>
                                <Text style={styles.blackWhiteButtonText}>Send a new evaluation</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.chatButton, styles.blackWhiteButton]}>
                                <Text style={styles.blackWhiteButtonText}>Open chat</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </ScrollView>
            <ConfettiCannon
                count={100}
                origin={{x: -10, y: 0}}
                autoStart={false}
                ref={ref => (confettiRef = ref)}
            />
            <FeedbackModal
                feedbackUser={feedbackUser}
                visible={showFeedbackModal}
                onClose={() => setShowFeedbackModal(false)}
            />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerWithModal: {
        flex: 1,
        opacity: 0.3,
        backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    headerText: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    profileSection: {
        alignItems: 'center',
        padding: 20,
    },
    profilePhoto: {
        width: 120,
        height: 120,
        borderRadius: 50,
        resizeMode: 'contain',
    },
    iconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    name: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 10,
        color: "#01779f",
    },
    progressContainer: {
        width: '100%',
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 5,
        alignItems: 'center',
    },
    progressWrapper: {
        width: '100%',
        position: 'relative',
    },
    progressBar: {
        width: '100%',
        height: 30,
        borderRadius: 15,
    },
    textWrapper: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    score: {
        color: 'white',
        fontWeight: 'bold',
    },
    rank: {
        fontSize: 18,
        color: '#b1001f',
        marginTop: 5,
        fontWeight: 'bold',
    },
    rankLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },
    label: {
        color: '#067da6',
        fontWeight: 'bold',
    },
    scoutButtonDisabled: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#345667',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    scoutButtonEnabled: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#119be1',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    becomeScoutModal: {
      backgroundColor: 'white',
        borderRadius: 10,
        position: 'absolute',
        alignSelf: 'center',
        top: '40%',
        marginHorizontal: 20,
        padding: 20,
    },
    becomeScoutModalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    becomeScoutModalText: {

    },
    buttonText: {
        color: 'white',
        marginRight: 5,
    },
    collapseHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    collapseHeaderText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "#039acc",
    },
    collapseContent: {
        padding: 15,
    },
    card: {
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    mapButton: {
        backgroundColor: '#2ebbf1',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    scoutPhoto: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    achievementItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    achievementText: {
        marginLeft: 10,
        color: "#1c495a",
        fontFamily: 'itim',
    },
    reviewBar: {
        flexDirection: 'row',
        marginTop: 10,
    },
    evaluationButton: {
        outlineColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    chatButton: {
        outlineColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    scoutHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    scoutName: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0779aa',
    },
    scoutDate: {
        fontSize: 14,
        color: '#03435e',
    },
    blackWhiteButton: {
        backgroundColor: '#08bdff',
        borderColor: '#08bdff',
        borderWidth: 1,
        marginTop: 10,
        width: '60%',
        borderRadius: 20,
        alignSelf: 'center',
    },
    blackWhiteButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    settingsButton: {
        position: 'absolute',
        right: 20,
        bottom: 100,
        backgroundColor: '#01779f',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
});