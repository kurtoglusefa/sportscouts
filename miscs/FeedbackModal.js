import React, { useState } from 'react';
import {
    View,
    Text,
    Modal,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';

export function FeedbackModal({ feedbackUser, visible, onClose }) {
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');

    const handleSubmit = () => {
        onClose();
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Feedback for {feedbackUser}</Text>

                    <Text style={styles.label}>Rate Your Experience</Text>
                    <View style={styles.ratingContainer}>
                        {[1, 2, 3, 4, 5].map((num) => (
                            <TouchableOpacity
                                key={num}
                                onPress={() => setRating(num)}
                                style={[
                                    styles.ratingButton,
                                    rating >= num && styles.selectedRating
                                ]}
                            >
                                <Text style={styles.ratingText}>{num}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={styles.label}>Additional Comments</Text>
                    <TextInput
                        style={styles.textInput}
                        multiline
                        numberOfLines={4}
                        placeholder="Share your thoughts..."
                        value={feedback}
                        onChangeText={setFeedback}
                    />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={onClose}
                        >
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={handleSubmit}
                            disabled={rating === 0}
                        >
                            <Text style={styles.submitText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        alignSelf: 'flex-start',
        marginVertical: 10,
        fontWeight: 'bold',
    },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    ratingButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedRating: {
        backgroundColor: '#007bff',
    },
    ratingText: {
        color: 'white',
        fontWeight: 'bold',
    },
    textInput: {
        width: '100%',
        height: 100,
        borderColor: '#e0e0e0',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        textAlignVertical: 'top',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
    cancelButton: {
        flex: 1,
        marginRight: 10,
        padding: 15,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        alignItems: 'center',
    },
    submitButton: {
        flex: 1,
        marginLeft: 10,
        padding: 15,
        backgroundColor: '#007bff',
        borderRadius: 10,
        alignItems: 'center',
    },
    cancelText: {
        color: 'black',
        fontWeight: 'bold',
    },
    submitText: {
        color: 'white',
        fontWeight: 'bold',
    },
});