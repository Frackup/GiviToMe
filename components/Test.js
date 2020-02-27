// components/Test.js

import React from 'react'
import { View, Text, Picker, StyleSheet, TextInput, Keyboard, Alert, Button } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

class Test extends React.Component {

    state = {user: 'toto',
        show: false
    }

    updateUser = (user) => {
        this.setState({ user: user })
    }

    _picker = () => {
        this._show()
    }

    _show = () => {
        this.setState({
            show: true,
        });
        Keyboard.dismiss()
    }

    _updateData = () => {
        this.setState({
            show: false,
        })
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>This is the Settings Page</Text>

                <TouchableOpacity onPress={this._picker}>
                    <Text style={styles.text}>{this.state.user}</Text>
                </TouchableOpacity>

                {this.state.show && 
                <View style={styles.button_container}>
                    <Button style={styles.validation_button}
                    title="Valider" onPress={this._updateData} />
                </View>
                }
                {this.state.show &&
                <Picker selectedValue = {this.state.user} onValueChange = {this.updateUser}>
                    <Picker.Item label = "Steve" value = "steve" />
                    <Picker.Item label = "Ellen" value = "ellen" />
                    <Picker.Item label = "Maria" value = "maria" />
                </Picker>}
            
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    text: {
       fontSize: 25,
       margin: 5,
       color: 'red',
       borderRadius: 5,
       borderWidth: 2,
       padding: 3
    },
    button_container: {
        flex: 1
    }
 })

export default Test