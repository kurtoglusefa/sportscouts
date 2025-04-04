import {Image, Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import React from "react";

<View style={styles.header}>
    <TouchableOpacity style={styles.trigger} onPress={toggleDropdown}>
        <Image source={require('../assets/languageIcon.png')} style={{ width: 30, height: 30, tintColor: '#068cba' }} />
        <Text style={styles.selectedText}>{selectedValue}</Text>
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
    <Text style={styles.headerText}>Nearby Map</Text>
    <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
        <Image source={require('../assets/mapsearch.png')} style={styles.searchIcon} />
    </TouchableOpacity>
</View>