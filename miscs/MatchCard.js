import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const MatchCard = ({ photo, name, languages, onMatchPress }) => {
    return (
        <View style={styles.card}>
            <Image source={photo} style={styles.photo} />
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.languages}>{languages.join(', ')}</Text>
            <TouchableOpacity style={styles.button} onPress={onMatchPress}>
                <Text style={styles.buttonText}>Match</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    photo: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 5,
    },
    languages: {
        fontSize: 16,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#068cba',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default MatchCard;