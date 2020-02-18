// components/AddLend.js

import React from 'react'
import { View, Text } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import DateTimePicker from '@react-native-community/datetimepicker'
import Moment from 'react-moment'
import { TextInputMask } from 'react-native-masked-text'
import { validationService } from "../helpers/Service";

class AddLend extends React.Component{
    constructor(props){
        super(props)
        if(this.props.navigation.getParam('type') === 'Money')
        this.state = {
            inputs: {
              title: {
                type: "generic",
                value: ""
              },
              date: {
                type: "generic",
                value: new Date()
              },
              amount: {
                type: "integer",
                value: "0€"
              },
              people: {
                type: "generic",
                value: ""
              }
            }
          }
    }

    render(){
        const { show, date } = this.state

        return(
            <View style={styles.main_view}>
                <View style={styles.title_container}>
                <Text style={styles.title_text_view}>Renseigner vos informations</Text>
                </View>
                <View style={styles.data_container}>
                    <Text style={styles.text_view}>Intitulé :</Text>
                        <TextInput style={styles.data_input}
                        clearButtonMode="always"
                        onChangeText={(text) => this.setState({title: text})}
                        returnKeyType="done"/>

                    <Text style={styles.text_view}>Date du prêt :</Text>
                    <TouchableOpacity onPress={this._datepicker}>
                        <Moment style={styles.data_input} element={Text} format="DD/MM/YYYY" date={date}/>
                    </TouchableOpacity>

                    <Text style={styles.text_view}>Montant à prêter :</Text>
                        <TextInputMask
                        type={'money'}
                        style={styles.data_input}
                        returnKeyType='done'
                        options={{
                            precision: 2,
                            separator: ',',
                            delimiter: '.',
                            unit: '€',
                            suffixUnit: ''
                        }}
                        value={this.state.amount}
                        onChangeText={text => {
                            this.setState({
                            amount: text
                            })
                        }}
                        />

                    <Text style={styles.text_view}>Personne impliquée :</Text>
                        <TextInput style={styles.data_input}
                        clearButtonMode="always"
                        onChangeText={(text) => {this.setState({ people: text })}}/>
                </View>
                <View style={styles.button_container}>
                    <Button style={styles.validation_button} 
                    title={(show) ? "Valider" : "Enregistrer"} onPress={() => this._doubleAction()} />
                </View>
                { show && <DateTimePicker value={date}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={this._setDate} />
                }
            </View>
        )
    }
}
export default AddLend