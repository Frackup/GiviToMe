// components/Test.js

import React from 'react'
import { StyleSheet, View, Text, Button, Alert, TouchableOpacity, Keyboard } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import DateTimePicker from '@react-native-community/datetimepicker'
import Moment from 'react-moment'

import firebase from '../config/Firebase'

class Test extends React.Component{
    constructor(){
        super()
        this.ref = firebase.firestore().collection('money');
        this.state = {
            title: "",
            date: "",
            amount: "0",
            people: "",
            show: false,
            displayedAmount: "0 €"
        }

        //this.onInputChange = validationService.onInputChange.bind(this);
        //this.getFormValidation = validationService.getFormValidation.bind(this);
        //this._submit = this._submit.bind(this);
    }

    _setDate = (event, date) => {
        date = date || this.state.inputs.date;

        this.setState({
            show: Platform.OS === 'ios' ? true : false
        })
        this.onInputChange({ id: "date", date })
    }
    
    // Fonction pour afficher le DatePicker
    _show = () => {
        this.setState({
            show: true,
        });
        Keyboard.dismiss()
    }

    // Fonction pour masquer le DatePicker
    _hideDP = () => {
        this.setState({
            show: false,
        })
    }
    
    _datepicker = () => {
        this._show();
    }

    _addMoney() {
        this.ref.add({
            title: this.state.title,
            amount: this.state.amount,
            date: this.state.date,
            people: this.state.people
        }).then((docRef) => {
            this.setState({
            title: '',
            amount: '0',
            date: new Date(),
            people: ''
            });
        })
        .catch((error) => {
            console.error("Error adding money: ", error);
        });
    }

    // Fonction pour permettre au bouton affiché de gérer à la fois la validation de la date via DatePicker et aussi
    // l'enregistrement des données du prêt.
    _doubleAction(){
        if(this.state.show){
            this._hideDP()
        } else {
            this._addMoney()
            this._submit()
            Alert.alert("Prêt d'argent ajouté")
        }
    }

    _submit() {
        this.getFormValidation();
    }

    _renderError(id) {
        const { inputs } = this.state;
        if (inputs[id].errorLabel) {
        return <Text style={styles.error}>{inputs[id].errorLabel}</Text>;
        }
        return null;
    }

    _eraseDataOnFocus(){
        this.setState({
            amount: "",
            displayedAmount: ""
        })
    }

    _saveStateAmount(text) {
        //TODO: penser à vérifier si l'utilisateur n'a pas conservé le "€" pour le retirer avant l'enregistrement en base.
        this.setState({ amount: text })
        this.setState(
            { displayedAmount: text}
        )
    }

    _formatDisplayedAmount(){
        const text = this.state.displayedAmount + " €"
        this.setState({ displayedAmount: text })
    }

    render(){
        const { show } = this.state
        const date = this.state.date

        return(
            <View style={styles.main_view}>
                <View style={styles.title_container}>
                <Text style={styles.title_text_view}>Renseigner vos informations</Text>
                </View>
                <View style={styles.data_container}>
                    <Text style={styles.text_view}>Intitulé :</Text>
                        <TextInput style={styles.data_input}
                        clearButtonMode="always"
                        onChangeText={(text) => this.setState({ title: text })}
                        returnKeyType="done"/>

                    <Text style={styles.text_view}>Date du prêt :</Text>
                    <TouchableOpacity onPress={this._datepicker}>
                        <Moment style={styles.data_input} element={Text} format="DD/MM/YYYY" date={date}/>
                    </TouchableOpacity>

                    <Text style={styles.text_view}>Montant à prêter BIS :</Text>
                    <TextInput style={styles.data_input}
                    keyboardType="numeric"
                    value={this.state.displayedAmount}
                    clearButtonMode="always"
                    returnKeyType="done"
                    onFocus={() => this._eraseDataOnFocus()}
                    onSubmitEditing={() => this._formatDisplayedAmount()}
                    onChangeText={(text) => this._saveStateAmount(text)}>
                    </TextInput>
                    





                    <Text style={styles.text_view}>Personne impliquée :</Text>
                        <TextInput style={styles.data_input}
                        clearButtonMode="always"
                        onChangeText={(text) => this.setState({ people: text })}/>
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

const styles=StyleSheet.create({
    main_view: {
        flex: 1
    },
    title_container: {
        flex: 0.5,
        alignItems: "center",
        marginTop: 20
    },
    data_container: {
        flex: 8.5
    },
    title_text_view: {
        fontSize: 20
    },
    text_view: {
        fontSize: 15,
        marginTop: 10,
        marginBottom: 6,
        marginLeft: 10
    },
    data_input: {
        fontSize: 15,
        borderWidth: 2,
        borderRadius: 5,
        marginLeft: 10,
        marginRight: 10,
        padding: 3
    },
    button_container: {
        flex: 1
    }
})

export default Test