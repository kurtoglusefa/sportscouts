import React, {useRef, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Image, Animated} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import {useNavigation} from "@react-navigation/native";
import {Header} from "../miscs/Header";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export function ScoutsSuggestions () {
    const cards = [
        {
            id: 1,
            title: 'Luca',
            image: require('../assets/person1.png'),
            description: 'English, Italian',
            extraText: 'Crocetta',
        },
        {
            id: 2,
            title: 'Anna',
            image: require('../assets/person2.png'),
            description: 'Italian, English, Spanish',
            extraText: 'Santa Rita',
        },
        {
            id: 3,
            title: 'Pippo',
            image: require('../assets/person3.png'),
            description: 'Italian, English, French',
            extraText: 'Crocetta',
        },
        {
            id: 4,
            title: 'Eleonora',
            image: require('../assets/person4.png'),
            description: 'Italian, English, German',
            extraText: 'Crocetta',
        },
    ];
    const navigation = useNavigation();
    const [matchState, setMatchState] = useState({
        isMatched: false,
        showMatchText: false
    });
    const fadeAnim = useRef(new Animated.Value(1)).current;

    const onMatch = () => {
        setMatchState({
            isMatched: true,
            showMatchText: true
        });

        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start();

        setTimeout(() => {
            navigation.navigate("BottomBar");
        }, 1000);
    };

    const renderCard = (card) => {
        return (
            <View style={styles.card}>
                <Text style={styles.cardText}>{card.title}</Text>
                <Image source={card.image} style={styles.profileImage} />
                <Text style={styles.cardLanguages}>Languages: {card.description}</Text>
                <Text style={styles.cardLocation}>Location: {card.extraText}</Text>
            </View>
        );
    };

    // If matched and match text should be shown
    if (matchState.isMatched && matchState.showMatchText) {
        return (
            <View style={styles.matchContainer}>
                <Text style={styles.matchText}>Match</Text>
            </View>
        );
    }

    return (
        <Animated.View style={{opacity: fadeAnim}}>
            <Header
                title={"Find Scouts"}
                onBack={() => navigation.goBack()}
            />
            <View style={styles.container}>
                <Swiper
                    cards={cards}
                    renderCard={renderCard}
                    cardIndex={0}
                    stackSize={5}
                    backgroundColor="transparent"
                    stackSeparation={15}
                    animateCardOpacity
                    verticalSwipe={false}
                    onSwipedRight={onMatch}
                    onSwipedAll={() => navigation.navigate("BottomBar")}
                    overlayLabels={{
                        left: {
                            title: 'Next',
                            style: {
                                label: {
                                    backgroundColor: 'red',
                                    color: 'white',
                                    fontSize: 24,
                                    padding: 10,
                                },
                                wrapper: {
                                    flexDirection: 'column',
                                    alignItems: 'flex-end',
                                    justifyContent: 'flex-start',
                                    marginTop: 20,
                                    marginLeft: -20,
                                },
                            },
                        },
                        right: {
                            title: 'Match',
                            style: {
                                label: {
                                    backgroundColor: 'green',
                                    color: 'white',
                                    fontSize: 24,
                                    padding: 10,
                                },
                                wrapper: {
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    justifyContent: 'flex-start',
                                    marginTop: 20,
                                    marginLeft: 20,
                                },
                            },
                        },
                    }}
                />
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    matchContainer: {
        flex: 1,
        backgroundColor: '#006f97',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: SCREEN_WIDTH * 0.9,
        height: SCREEN_HEIGHT * 0.6,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
        padding: 40,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    cardText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#03435e',
        alignItems: "center",
        marginLeft: SCREEN_WIDTH / 4,
        marginBottom: 10,
    },
    cardLanguages: {
        fontSize: 16,
        fontWeight: "bold",
        color: '#00647a',
        marginBottom: 10,
    },
    cardLocation: {
        fontSize: 16,
        fontWeight: "bold",
        color: '#00647a'
    },
    matchText: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: "center",
    },
    profileImage:{
        width: 200,
        height: 200,
        marginLeft: SCREEN_WIDTH / 12,
        marginBottom: 10,
    }
});