import React, {useEffect, useRef, useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    ImageBackground,
    Keyboard
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import {Header} from "../miscs/Header";
import {ChatHeader} from "../miscs/ChatHeader";
import {Dialog} from "react-native-simple-dialogs";

const mockChats = [
    { id: '1', name: 'Anna Johnson', lastMessage: 'Hello!', newMessage: true, sports: 'Basketball', phoneNumber: '123-456-7890' },
    { id: '2', name: 'Luca Esposito', lastMessage: 'Hi there!', newMessage: false, sports: 'Soccer', phoneNumber: '987-654-3210' },
    { id: '3', name: 'Pippo Lippo', lastMessage: 'How are you?', newMessage: true, sports: 'Tennis', phoneNumber: '555-555-5555' },
];

const mockMessages = {
    '1': [
        { id: '1', text: 'Hello!', sender: 'Anna', timestamp: '10:00 AM', seen: true },
        { id: '2', text: 'Hi Anna!', sender: 'user', timestamp: '10:01 AM', seen: true },
    ],
    '2': [
        { id: '1', text: 'Hi there!', sender: 'Luca', timestamp: '11:00 AM', seen: false },
        { id: '2', text: 'Hello Luca!', sender: 'user', timestamp: '11:01 AM', seen: false },
    ],
    '3': [
        { id: '1', text: 'How are you?', sender: 'Pippo', timestamp: '12:00 PM', seen: true },
        { id: '2', text: 'I am good, Pippo!', sender: 'user', timestamp: '12:01 PM', seen: true },
    ],
};

export function Chat() {
    const navigation = useNavigation();
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const flatListRef = useRef(null);
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [dialogVisible, setDialogVisible] = useState(false);


    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            (event) => {
                setKeyboardHeight(event.endCoordinates.height);
                // Scroll to bottom when keyboard appears
                if (flatListRef.current) {
                    flatListRef.current.scrollToEnd({ animated: true });
                }
            }
        );

        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardHeight(0);
            }
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const openChat = (chatId) => {
        setSelectedChat(chatId);
        setMessages(mockMessages[chatId]);
    };

    const sendMessage = () => {
        if (input.trim()) {
            const newMessage = {
                id: Date.now().toString(),
                text: input,
                sender: 'user',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                seen: false,
            };
            const updatedMessages = [...messages, newMessage];
            setMessages(updatedMessages);
            setInput('');

            if (flatListRef.current) {
                setTimeout(() => {
                    flatListRef.current.scrollToEnd({ animated: true });
                }, 100);
            }
        }
    };

    const goBack = () => {
        setSelectedChat(null);
    };

    return (
        <View style={styles.container}>
            {selectedChat ? (
                <View style={styles.chatContainer}>
                    <ChatHeader
                        title={mockChats.find(chat => chat.id === selectedChat).name}
                        onBack={goBack}
                        setFinishMatch={setDialogVisible}
                    />
                    <ImageBackground
                        source={require('../assets/chatBackground.jpg')}
                        style={styles.backgroundImage}
                    >
                        <Dialog
                            visible={dialogVisible}
                            title="End Scout Match"
                            titleStyle={{fontWeight: "bold"}}
                            dialogStyle={{borderRadius: 15}}
                            onTouchOutside={() => setDialogVisible(false)}
                            contentInsetAdjustmentBehavior={"automatic"}
                            onRequestClose={() => setDialogVisible(false)}>
                            <Text style={styles.dialogTitle}>Are you sure you want to end the match with the scout?</Text>
                            <View style={styles.matchDialog}>
                                <TouchableOpacity style={styles.closeButton} onPress={() => setDialogVisible(false)}>
                                    <Text style={styles.closeText}>Close</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.confirmButton} onPress={() => {
                                    setDialogVisible(false);
                                    navigation.navigate("Profile");
                                }}>
                                    <Text style={styles.confirmText}>Confirm</Text>
                                </TouchableOpacity>
                            </View>
                        </Dialog>
                        <FlatList
                            ref={flatListRef}
                            data={messages}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <View style={[
                                    styles.message,
                                    item.sender === 'user' ? styles.userMessage : styles.friendMessage
                                ]}>
                                    <Text style={styles.messageText}>{item.text}</Text>
                                    <View style={styles.messageFooter}>
                                        <Text style={styles.timestamp}>{item.timestamp}</Text>
                                        {item.sender === 'user' && (
                                            <Ionicons
                                                name={item.seen ? 'checkmark-done' : 'checkmark'}
                                                size={16}
                                                color="#068cba"
                                            />
                                        )}
                                    </View>
                                </View>
                            )}
                            contentContainerStyle={styles.messagesContainer}
                            onContentSizeChange={() => {
                                if (flatListRef.current) {
                                    flatListRef.current.scrollToEnd({ animated: false });
                                }
                            }}
                        />
                    </ImageBackground>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={input}
                            onChangeText={setInput}
                            placeholder="Write something..."
                            placeholderTextColor="#888"
                            multiline
                            maxHeight={100}
                        />
                        <TouchableOpacity style={styles.attachmentButton}>
                            <Ionicons name="attach" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
                            <Ionicons name="send" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <>
                    <Header
                        backButton={false}
                        title={"Chats"}
                        onBack={() => navigation.goBack()}
                        textStyles={{paddingLeft: 55}}
                        headerMargin={{marginBottom: 10}}
                    />
                    <FlatList
                        data={mockChats}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.chatItem} onPress={() => openChat(item.id)}>
                                <Ionicons name="person-circle" size={40} color="#068cba" />
                                <View style={styles.chatDetails}>
                                    <Text style={styles.chatName}>{item.name}</Text>
                                    <Text style={styles.chatSports}>{item.sports}</Text>
                                    <Text style={styles.chatLastMessage}>{item.lastMessage}</Text>
                                </View>
                                {item.newMessage && <Ionicons name="chatbubble-ellipses" size={24} color="red" />}
                            </TouchableOpacity>
                        )}
                        contentContainerStyle={styles.chatsContainer}
                    />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    chatContainer: {
        flex: 1,
    },
    inputWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        padding: 10,
        position: 'absolute',
        bottom: 70,
        left: 0,
        right: 0,
    },
    title: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    chatsContainer: {
        paddingHorizontal: 10,
    },
    chatItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    chatDetails: {
        flex: 1,
        marginLeft: 10,
    },
    chatName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#01779f',
    },
    chatSports: {
        fontSize: 14,
        color: '#888',
    },
    chatLastMessage: {
        fontSize: 14,
        color: '#888',
    },
    messagesContainer: {
        flexGrow: 1,
        padding: 10,
    },
    message: {
        padding: 10,
        borderRadius: 15,
        marginVertical: 5,
        maxWidth: '80%',
    },
    messageText: {
        fontSize: 16,
        color: '#000',
    },
    userMessage: {
        backgroundColor: 'rgba(209, 231, 221, 0.9)',
        alignSelf: 'flex-end',
    },
    friendMessage: {
        backgroundColor: 'rgba(248, 215, 218, 0.9)',
        alignSelf: 'flex-start',
    },
    messageFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 5,
        gap: 5,
    },
    timestamp: {
        fontSize: 10,
        color: '#666',
    },
    input: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#000',
    },
    attachmentButton: {
        marginRight: 10,
    },
    sendButton: {
        backgroundColor: '#068cba',
        borderRadius: 20,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    matchDialog: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    dialogTitle: {
        fontSize: 16,
    },
    closeButton: {
        backgroundColor: 'red',
        borderRadius: 20,
        padding: 10,
        alignItems: "center",
        width:  80,
        marginHorizontal: 10,
    },
    confirmButton: {
        backgroundColor: 'green',
        borderRadius: 20,
        padding: 10,
        alignItems: "center",
        width:  80,
        marginHorizontal: 10
    },
    closeText: {
        color: 'white'
    },
    confirmText: {
        color: 'white',
    }
});