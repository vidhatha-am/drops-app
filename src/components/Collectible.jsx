import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const Collectible = () => {
    return (
        <View style={styles.container}>
            <WebView
                source={{ uri: 'https://games.asset.money' }}
                style={{ borderRadius: 20 }}
                // allowsFullscreenVideo={true}
                javaScriptEnabled={true}
                
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
});

export default Collectible;
