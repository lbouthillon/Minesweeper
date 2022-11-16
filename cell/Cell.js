import React, { useState } from 'react';
import { Image, StyleSheet, Pressable, View, } from 'react-native';
import {cell_images} from './cell_images';

const Cell = (props) => {
    const styles = StyleSheet.create({
        image: {
            minWidth:25,
            minHeight: 25,
        }
        
    });

    const reveal = () => {
        props.handlePress(props.id);
    };

    const mark = () => {
        props.handleLongPress(props.id);
    }


    return (

        <Pressable onPress={reveal} onLongPress={mark}>
            {props.hidden ? ( 
                props.marked ?
                <Image style={styles.image} source={require('../assets/marked_cell.png')}/> :
                <Image style={styles.image} source={require('../assets/hidden_cell.png')}/> ):
                
                
                
                <Image style={styles.image} source={cell_images[props.getValue(props.id)]}/>
            }
            
        </Pressable>
        

        
    );
}

export default Cell;