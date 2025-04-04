import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, TextInput, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Header } from "../miscs/Header";

export function Settings() {
    const navigation = useNavigation();
    const [name, setName] = useState('John');
    const [location, setLocation] = useState('Turin, Italy');
    const [language, setLanguage] = useState('English');
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [showLanguageModal, setShowLanguageModal] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'it', name: 'Italiano' },
        { code: 'fr', name: 'Français' },
        { code: 'es', name: 'Español' },
        { code: 'de', name: 'Deutsch' }
    ];

    const handleLanguageSelect = (selectedLanguage) => {
        setLanguage(selectedLanguage);
        setShowLanguageModal(false);
        Alert.alert('Success', `Language changed to ${selectedLanguage}`);
    };

    const handleSaveChanges = () => {
        Alert.alert('Success', 'Your settings have been updated successfully');
    };

    const handleChangePassword = () => {
        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'New passwords do not match');
            return;
        }
        if (newPassword.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters long');
            return;
        }
        Alert.alert('Success', 'Password changed successfully');
        setShowChangePassword(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    const handleDeleteAccount = () => {
        Alert.alert(
            'Delete Account',
            'Are you sure you want to delete your account? This action cannot be undone.',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => {
                        // Handle account deletion logic here
                        navigation.navigate('Login');
                    },
                    style: 'destructive',
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Header title="Settings" textStyles={{marginLeft: 100}} onBack={() => navigation.goBack()} />
            <ScrollView style={styles.content}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Personal Information</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                            placeholder="Enter your name"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Default Location</Text>
                        <TextInput
                            style={styles.input}
                            value={location}
                            onChangeText={setLocation}
                            placeholder="Enter your location"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Primary Language</Text>
                        <TouchableOpacity
                            style={styles.dropdownButton}
                            onPress={() => setShowLanguageModal(true)}
                        >
                            <Text style={styles.dropdownButtonText}>{language}</Text>
                            <Ionicons name="chevron-down" size={24} color="#01779f" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Security</Text>
                    <TouchableOpacity
                        style={styles.settingButton}
                        onPress={() => setShowChangePassword(!showChangePassword)}
                    >
                        <Text style={styles.settingButtonText}>Change Password</Text>
                        <Ionicons name="chevron-forward" size={24} color="#01779f" />
                    </TouchableOpacity>

                    {showChangePassword && (
                        <View style={styles.passwordSection}>
                            <TextInput
                                style={styles.input}
                                value={currentPassword}
                                onChangeText={setCurrentPassword}
                                placeholder="Current Password"
                                secureTextEntry
                            />
                            <TextInput
                                style={styles.input}
                                value={newPassword}
                                onChangeText={setNewPassword}
                                placeholder="New Password"
                                secureTextEntry
                            />
                            <TextInput
                                style={styles.input}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                placeholder="Confirm New Password"
                                secureTextEntry
                            />
                            <TouchableOpacity
                                style={styles.saveButton}
                                onPress={handleChangePassword}
                            >
                                <Text style={styles.saveButtonText}>Update Password</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSaveChanges}
                >
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => console.log('Delete Account')}
                >
                    <Text style={styles.deleteButtonText}>Delete Account</Text>
                </TouchableOpacity>
            </ScrollView>

            <Modal
                visible={showLanguageModal}
                transparent={true}
                animationType="slide"
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Select Language</Text>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setShowLanguageModal(false)}
                            >
                                <Ionicons name="close" size={24} color="#01779f" />
                            </TouchableOpacity>
                        </View>
                        {languages.map((lang) => (
                            <TouchableOpacity
                                key={lang.code}
                                style={[
                                    styles.languageOption,
                                    language === lang.name && styles.selectedLanguage
                                ]}
                                onPress={() => handleLanguageSelect(lang.name)}
                            >
                                <Text style={[
                                    styles.languageText,
                                    language === lang.name && styles.selectedLanguageText
                                ]}>
                                    {lang.name}
                                </Text>
                                {language === lang.name && (
                                    <Ionicons name="checkmark" size={24} color="#fff" />
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        padding: 20,
    },
    section: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#01779f',
        marginBottom: 15,
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        color: '#1c495a',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 12,
        fontSize: 16,
    },
    dropdownButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 12,
    },
    dropdownButtonText: {
        fontSize: 16,
        color: '#1c495a',
    },
    settingButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#f8f8f8',
        borderRadius: 5,
        marginBottom: 10,
    },
    settingButtonText: {
        fontSize: 16,
        color: '#1c495a',
    },
    passwordSection: {
        marginTop: 10,
        gap: 10,
    },
    saveButton: {
        backgroundColor: '#119be1',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    deleteButton: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 30,
        borderWidth: 1,
        borderColor: '#b1001f',
    },
    deleteButtonText: {
        color: '#b1001f',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '80%',
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#01779f',
    },
    closeButton: {
        padding: 5,
    },
    languageOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: '#f8f8f8',
    },
    selectedLanguage: {
        backgroundColor: '#01779f',
    },
    languageText: {
        fontSize: 16,
        color: '#1c495a',
    },
    selectedLanguageText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});