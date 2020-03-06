// /components/TypesList.js

import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class TypesList extends React.Component {
    
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <View style={styles.main_view}>
                <Text>Liste des types</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_view: {
        flex: 1
    }
})