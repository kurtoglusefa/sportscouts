import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Header } from "../miscs/Header";
import { SearchBar } from '@rneui/themed';

export function Map() {
    const navigation = useNavigation();
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [checkedIn, setCheckedIn] = useState(false);
    const [search, setSearch] = useState('');
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const locations = [
        {
            name: "Ruffini Centro Sportivo",
            id: 1,
            coordinate: { latitude: 45.0703, longitude: 7.6869 },
            address: 'Piazza Castello, Turin, Italy',
            sports: 'Basketball',
        },
        {
            name: "Pala Alpitour",
            id: 2,
            coordinate: { latitude: 45.0625, longitude: 7.6781 },
            address: 'Via Roma, Turin, Italy',
            sports: 'Soccer',
        },
        {
            name: "Tennis Torino",
            id: 3,
            coordinate: { latitude: 45.0761, longitude: 7.6625 },
            address: 'Corso Francia, Turin, Italy',
            sports: 'Tennis',
        },
    ];

    const handleMarkerPress = (location) => {
        setSelectedLocation(location);
        setCheckedIn(false);
    };

    const handleCheckIn = () => {
        setCheckedIn(true);
    };

    const updateSearch = (search) => {
        setSearch(search);
        if (search) {
            const filtered = locations.filter(location =>
                location.sports.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredLocations(filtered);
        } else {
            setFilteredLocations([]);
        }
    };

    const clearSearch = () => {
        setSearch('');
        setFilteredLocations([]);
        setIsSearchVisible(false);
        Keyboard.dismiss();
    };

    const displayedLocations = filteredLocations.length > 0 ? filteredLocations : locations;

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Header backButton={false} textStyles={{marginLeft: 100}} title={"Find Facilities"} />
                {isSearchVisible && (
                    <SearchBar
                        placeholder="Search sport/facility..."
                        onChangeText={updateSearch}
                        value={search}
                        containerStyle={styles.searchContainer}
                        inputContainerStyle={styles.searchInputContainer}
                        clearIcon={
                            <TouchableOpacity onPress={clearSearch}>
                                <Ionicons name="close" size={24} color="black" />
                            </TouchableOpacity>
                        }
                        key="search-bar"
                    />
                )}
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 45.0703,
                        longitude: 7.6869,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                    }}
                >
                    {displayedLocations.map((location) => (
                        <Marker
                            key={location.id}
                            coordinate={location.coordinate}
                            onPress={() => handleMarkerPress(location)}
                            pinColor={filteredLocations.length > 0 ? 'blue' : 'red'}
                        />
                    ))}
                </MapView>
                {selectedLocation && (
                    <Modal
                        visible={!!selectedLocation}
                        transparent={true}
                        animationType="slide"
                        onRequestClose={() => setSelectedLocation(null)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <View style={styles.modalHeader}>
                                    <Text style={styles.modalTitle}>{selectedLocation.name}</Text>
                                    <TouchableOpacity onPress={() => setSelectedLocation(null)} style={styles.closeButton}>
                                        <Ionicons name="close" size={24} color="black" />
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.boldText}>Address:</Text>
                                <Text>{selectedLocation.address}</Text>
                                <Text style={styles.boldText}>Sports:</Text>
                                <Text>{selectedLocation.sports}</Text>
                                <TouchableOpacity
                                    style={[styles.checkInButton, checkedIn && styles.checkedInButton]}
                                    onPress={handleCheckIn}
                                    disabled={checkedIn}
                                >
                                    <Text style={styles.buttonText}>{checkedIn ? 'Checked-in' : 'Check-in'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                )}
                <TouchableOpacity style={styles.searchButton} onPress={() => setIsSearchVisible(!isSearchVisible)}>
                    <Ionicons name="search" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchButton: {
        position: 'absolute',
        top: '85%', // Positioned in the middle of the screen
        right: 20,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#068cba',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    searchContainer: {
        backgroundColor: 'transparent',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        marginTop: 10,
        width: '90%',
        alignSelf: 'center',
        zIndex: 1,
    },
    searchInputContainer: {
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
    },
    map: {
        flex: 1,
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
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    closeButton: {
        position: 'absolute',
        right: 2,
    },
    boldText: {
        fontWeight: 'bold',
        marginTop: 10,
    },
    checkInButton: {
        marginTop: 20,
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#007bff',
        alignItems: 'center',
        width: '40%',
    },
    checkedInButton: {
        backgroundColor: '#6c757d',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
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
});