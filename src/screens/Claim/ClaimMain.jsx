import React from 'react';
import { View, StyleSheet, Text , TouchableOpacity} from 'react-native';
import Collectible from '../../components/Collectible';

const ClaimMain = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Claim Main Page</Text>
            <View style={styles.card}>
                <Collectible />
            </View>
            <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Claim</Text>
          </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#16161A',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        fontFamily: 'Satoshi', // Make sure the Satoshi font is linked in your project

    },
    card: {
        width: 380,
        height: 480,
        backgroundColor: '#000',
        margin: 20,
        shadowColor: "#000", // shadow properties for iOS
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.30,
        shadowRadius: 60,
        elevation: 8, // elevation for Android
    },
    button: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: 'rgba(75, 75, 234, 0.2)',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 1,
      shadowRadius: 30,
      elevation: 8,
      borderRadius: 100,
      width: 312,
      height: 70,
      backgroundColor: '#7F5AF0',
    },
    buttonText: {
      color: '#fff',
      fontFamily: 'Satoshi', // Make sure the Satoshi font is linked in your project
    },
});

export default ClaimMain;
