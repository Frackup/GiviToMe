// components/Settings.js

import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

class Settings extends React.Component {
    render(){
        return(
            <View style={styles.main_container}>
                <Text style={styles.title_text}>This is the Settings Page</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: '#003F5C'
    },
    title_text: {
        color: 'white'
    }
})

export default Settings