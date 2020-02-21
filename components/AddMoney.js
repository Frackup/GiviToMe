// components/AddMoney.js

import React from 'react'
import { StyleSheet, View, Text, Button, Alert, TouchableOpacity, Keyboard } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import DateTimePicker from '@react-native-community/datetimepicker'
import Moment from 'react-moment'

import firebase from '../config/Firebase'

class AddMoney extends React.Component {

    constructor() {
        super();
        this.ref = firebase.firestore().collection('money');
        this.globalData = firebase.firestore().collection('globalData')

        this.state = {
            title: "",
            titleAlert: false,
            amount: 0,
            amountAlert: false,
            date: new Date(),
            people: "",
            peopleAlert: false,
            show: false,
            displayedAmount: "0 €",
            totalMoney: 0,
        };
    }

    _getGlobalData() {
        let query = this.globalData.get()
        .then(snapshot => {
            if (snapshot.empty) {
            console.log('No matching data.');
            return;
            }  

            snapshot.forEach(myData => {
            const { totalMoney, totalQuantity } = myData.data()
            this.setState({
                globalDataId: myData.id,
                totalMoney: totalMoney,
                totalQuantity: totalQuantity,
                isLoading: false,
            })
            });
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
    }

    componentDidMount() {
        this._getGlobalData()
    }

    _setDate = (event, date) => {
        date = date || this.state.date;

        this.setState({
            show: Platform.OS === 'ios' ? true : false,
            date,
        });
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
        if (this.state.show) {
            this.setState({
                show: false,
            })
        }
    }
    
    _datepicker = () => {
        this._show();
    }

    _addMoney() {
        const newTotalAmount = parseInt(this.state.totalMoney) + parseInt(this.state.amount)

        // Ajout du prêt d'argent en BDD
        this.ref.add({
            title: this.state.title,
            amount: this.state.amount,
            date: this.state.date,
            people: this.state.people
        }).then((docRef) => {
            this.setState({
            title: '',
            amount: 0,
            date: new Date(),
            people: ''
            });
        })
        .catch((error) => {
            console.error("Error adding money: ", error);
        });

        // Mise à jour du total prêté dans la table des données globales
        const updateRef = firebase.firestore().collection('globalData').doc(this.state.globalDataId);
        updateRef.set({
            totalMoney: newTotalAmount,
            totalQuantity: this.state.totalQuantity
        }).then((docRef) => {
            this.setState({
            newTotalAmount: newTotalAmount,
            });
        })
        .catch((error) => {
            console.error("Error updating global data: ", error);
            this.setState({
              isLoading: false,
            });
        });
    }

    // Fonction pour permettre au bouton affiché de gérer à la fois la validation de la date via DatePicker et aussi
    // l'enregistrement des données du prêt.
    _doubleAction(){
        if(this.state.show){
            this._hideDP()
        } else {
            if(this._checkDataFilling()){
                this._addMoney()
                this._resetData()
                Alert.alert("Prêt d'argent ajouté")
            } else {
                Alert.alert("Tous les champs ne sont pas complétés")
            }
        }
    }

    _checkDataFilling(){
        var dataComplete = true

        if(this.state.title === ""){
            this.setState({ titleAlert: true })
            dataComplete= false
        }
        if(this.state.amount === 0){
            this.setState({ amountAlert: true })
            dataComplete= false
        }
        if(this.state.people === ""){
            this.setState({ peopleAlert: true })
            dataComplete= false
        }

        return dataComplete
    }

    _processDataOnFocus(value){
        const amount = this.state.amount
        this.setState({
            displayedAmount: amount
        })
        this._hideDP()
        this.setState({ value: false })
    }

    _resetData() {
        this.setState({
            title: "",
            titleAlert: false,
            amount: "0",
            amountAlert: false,
            date: new Date(),
            people: "",
            peopleAlert: false,
            show: false,
            displayedAmount: "0 €"
        })
    }

    _saveStateAmount(text) {
        this.setState({ amount: text })
        this.setState(
            { displayedAmount: text}
        )
    }

    _formatDisplayedAmount(){
        const text = this.state.displayedAmount + " €"
        this.setState({ displayedAmount: text })
    }

    _showMandatory(activate){
        if (activate) {
            return(
                <Text style={styles.alert_view}>* Ce champs est obligatoire</Text>
            )
        } else {
            null
        }
    }

    _dataProcessing(value){
        this._hideDP()
        this.setState({ value: false })
    }

    render(){
        const { show, date } = this.state

        return(
            <View style={styles.main_view}>
                <View style={styles.form_view}>
                    <View style={styles.title_container}>
                        <Text style={styles.title_text_view}>Renseignez vos informations</Text>
                    </View>
                    <View style={styles.data_container}>
                        <Text style={styles.text_view}>Intitulé :</Text>
                            <TextInput style={styles.data_input}
                            clearButtonMode="always"
                            value={this.state.title}
                            onChangeText={(text) => this.setState({title: text})}
                            onFocus={() => this._dataProcessing("titleAlert")}
                            returnKeyType="done"/>
                            {this._showMandatory(this.state.titleAlert)}

                        <Text style={styles.text_view}>Date du prêt :</Text>
                        <TouchableOpacity onPress={this._datepicker}>
                            <Moment style={styles.data_input} element={Text} format="DD/MM/YYYY" date={date}/>
                        </TouchableOpacity>
                        
                        <Text style={styles.text_view}>Montant à prêter :</Text>
                        <TextInput style={styles.data_input}
                        keyboardType="numeric"
                        value={this.state.displayedAmount}
                        clearButtonMode="always"
                        returnKeyType="done"
                        onFocus={() => this._processDataOnFocus("amountAlert")}
                        onSubmitEditing={() => this._formatDisplayedAmount()}
                        onChangeText={(text) => this._saveStateAmount(text)} />
                        {this._showMandatory(this.state.amountAlert)}

                        <Text style={styles.text_view}>Personne impliquée :</Text>
                            <TextInput style={styles.data_input}
                            clearButtonMode="always"
                            returnKeyType="done"
                            value={this.state.people}
                            onFocus={() => this._dataProcessing("peopleAlert")}
                            onChangeText={(text) => {this.setState({ people: text })}}/>
                            {this._showMandatory(this.state.peopleAlert)}
                    </View>
                    <View style={styles.button_container}>
                        <Button style={styles.validation_button}
                        title={(show) ? "Valider" : "Enregistrer"} onPress={() => this._doubleAction()} />
                    </View>
                </View>
                <View style={styles.dp_view}>
                    { show && <DateTimePicker value={date}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={this._setDate} />
                    }
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    dp_view: {
        flex: 0.5,
        alignContent: "flex-end"
    },
    form_view: {
        flex: 1
    },
    main_view: {
        flex: 1
    },
    title_container: {
        flex: 0.75,
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
    },
    alert_view: {
        fontSize: 12,
        color: "red",
        marginLeft: 10,
    },
})

export default AddMoney