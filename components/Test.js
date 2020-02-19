import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


class Test extends React.Component {
  
    render() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 56 }}>
                Hello, world!
            </Text> 
            <Ionicons name="ios-home" size={32} color="red" />
        </View>
    );
  }
}

export default Test