// components/AddMoney.js

import React from 'react'
import { StyleSheet, View, Text, Button, Alert, TouchableOpacity, Keyboard, Image } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import DateTimePicker from '@react-native-community/datetimepicker'
import Moment from 'react-moment'

import firebase from '../config/Firebase'
import MoneyData from '../dbaccess/MoneyData'

class AddMoney extends React.Component {

    constructor() {
        super();

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

    _updateNavigationParams() {
        const navigation = this.props.navigation
        const type = this.props.route.params?.type ?? 'defaultValue'

        const saveIconName = "ic_save.png"

        if (Platform.OS === "ios" && type !== 'People'){
            navigation.setOptions({
                        headerRight: () => <TouchableOpacity style={styles.save_touchable_headerrightbutton}
                                        onPress={() => this._saveData()}>
                                        <Image source={require('../assets/icons/' + saveIconName)} style={styles.save_image} />
                        </TouchableOpacity>
                })
            }
    }

    componentDidMount() {
        this._updateNavigationParams()
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
        let myMoney = new MoneyData()

        myMoney.addMoney(
            this.state.title,
            this.state.amount,
            this.state.date,
            this.state.people
        )

        this.setState({
            title: '',
            amount: 0,
            date: new Date(),
            people: ''
            });
    }

    _checkDataFilling(){
        var dataComplete = true

        if(this.state.title === ""){
            this.setState({ titleAlert: true })
            dataComplete= false
        } else {
            this.setState({ titleAlert: false })
        }
        if(this.state.amount === 0){
            this.setState({ amountAlert: true })
            dataComplete= false
        } else {
            this.setState({ amountAlert: false })
        }
        if(this.state.people === ""){
            this.setState({ peopleAlert: true })
            dataComplete= false
        } else {
            this.setState({ peopleAlert: false })
        }

        return dataComplete
    }

    _processDataOnFocus(){
        const amount = this.state.amount
        if (this.state.amount !== 0) {
            this.setState({
                displayedAmount: amount.toString()
            })
            this._hideDP()
        }
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

    _dataProcessing(){
        this._hideDP()
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
                        <Text style={styles.text_view}>Intitulé</Text>
                            <TextInput style={styles.data_input}
                            clearButtonMode="always"
                            value={this.state.title}
                            onChangeText={(text) => this.setState({title: text})}
                            onFocus={() => this._dataProcessing()}
                            returnKeyType="done"/>
                            {this._showMandatory(this.state.titleAlert)}

                        <Text style={styles.text_view}>Date du prêt</Text>
                        <TouchableOpacity onPress={this._datepicker} style={styles.data_input}>
                            <Moment style={styles.alt_input} element={Text} format="DD/MM/YYYY" date={date}/>
                        </TouchableOpacity>
                        
                        <Text style={styles.text_view}>Montant à prêter</Text>
                            <TextInput style={styles.data_input}
                            keyboardType="numeric"
                            value={this.state.displayedAmount}
                            clearButtonMode="always"
                            returnKeyType="done"
                            onFocus={() => this._processDataOnFocus()}
                            onSubmitEditing={() => this._formatDisplayedAmount()}
                            onChangeText={(text) => this._saveStateAmount(text)} />
                            {this._showMandatory(this.state.amountAlert)}

                        <Text style={styles.text_view}>Personne impliquée</Text>
                            <TextInput style={styles.data_input}
                            clearButtonMode="always"
                            returnKeyType="done"
                            value={this.state.people}
                            onFocus={() => this._dataProcessing()}
                            onChangeText={(text) => {this.setState({ people: text })}}/>
                            {this._showMandatory(this.state.peopleAlert)}
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
    save_touchable_headerrightbutton: {
        marginRight: 8
    },
    save_image: {
        marginRight: 10,
        width: 25,
        height: 25,
    },
    dp_view: {
        flex: 0.5,
        alignContent: "flex-end"
    },
    form_view: {
        flex: 1
    },
    main_view: {
        flex: 1,
        backgroundColor: '#003F5C'
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
        fontSize: 20,
        color: '#FB5B5A'
    },
    text_view: {
        fontSize: 15,
        marginTop: 10,
        marginBottom: 6,
        marginLeft: 10,
        color: 'white',
        alignSelf: 'center'
    },
    data_input: {
        fontSize: 15,
        borderWidth: 2,
        borderRadius: 5,
        marginLeft: 10,
        marginRight: 10,
        padding: 3,
        borderColor: '#003F5C',
        backgroundColor: '#465881',
        color: 'white'
    },
    alt_input: {
        color: 'white'
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