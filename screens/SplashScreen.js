import React from 'react';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import {Dimensions} from "react-native";

const SplashScreen = () => {
    const navigation = useNavigation();
    const { width, height } = Dimensions.get('window');
    return (
        <LottieView
            source={require('../assets/sportscoutsIntro.json')}
            autoPlay
            style={{
                width: width,
                height: height,
                position: 'absolute',
            }}
            resizeMode="cover"
            loop={false}
            renderMode={'AUTOMATIC'}
            onAnimationFinish={() => navigation.replace('BottomBar')}
        />
    );
};

export default SplashScreen;
