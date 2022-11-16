import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, Modal, View, Dimensions, Button } from 'react-native';

const MessageComponent = (props) => {
    
    const slideAnim = useRef(new Animated.Value(60)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;
    
    
    
    const messageAnimation =
        Animated.sequence([
            Animated.timing(slideAnim, {
                toValue: - Dimensions.get("screen").height/2,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1.4,
                duration: 250,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 250,
                useNativeDriver: true,
            })
        ]);
    

    useEffect(() => {
        messageAnimation.reset();
        if (props.visible) {
            messageAnimation.start();
        }
    })

    return(
            <Animated.View
            style={{
                transform: [{translateY: slideAnim}, {scale: scaleAnim} ],
                height: 60,
            }}>
                <Text>{props.message}</Text>
                <Button 
                title="retry" onPress={() => {props.onClick()}}>Retry</Button>
            </Animated.View>
    )
}

export default MessageComponent;