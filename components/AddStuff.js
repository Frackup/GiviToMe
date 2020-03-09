// components/AddStuff.js

import React from 'react'
import { StyleSheet, View, Text, Button, Alert, TouchableOpacity, Keyboard, Picker, Image } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import DateTimePicker from '@react-native-community/datetimepicker'
import Moment from 'react-moment'
import StuffData from '../dbaccess/StuffData'
import TypeData from '../dbaccess/TypeData'

class AddStuff extends React.Component {

    constructor() {
        super();

        this.state = {
            title: "",
            titleAlert: false,
            quantity: 0,
            displayedQty: "",
            quantityAlert: false,
            date: new Date(),
            people: "",
            peopleAlert: false,
            showdp: false,
            showpicker: false,
            totalQuantity: 0,
            type: "Sélectionner",
            typeAlert: false,
            typeList: []
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

    _populateTypes() {
        let myTypes = new TypeData();
        myTypes.getTypeData().then(val => { this.setState({
            typeList: val
        })
        })
        .catch(error => {
            console.error(error)
        })
    }

    componentDidMount() {
        this._updateNavigationParams()
        this._populateTypes()
    }

    _setDate = (event, date) => {
        date = date || this.state.date;

        this.setState({
            show: Platform.OS === 'ios' ? true : false,
            date,
        });
    }
    
    // Fonction pour afficher le DatePicker
    _showDP = () => {
        this.setState({
            showdp: true,
        });
        Keyboard.dismiss()
    }

    // Fonction pour masquer le DatePicker
    _hideDP = () => {
        if (this.state.showdp) {
            this.setState({
                show: false,
            })
        }
    }

    _showPicker = () => {
        this.setState({
            showpicker: true
        });
        Keyboard.dismiss()
    }

    _hidePicker = () => {
        if (this.state.showpicker) {
            this.setState({
                showpicker: false
            })
        }
    }
    
    _datepicker = () => {
        this._showDP();
    }

    _addStuff() {

        let myStuff = new StuffData();

        myStuff.addStuff(
            this.state.title,
            this.state.quantity,
            this.state.date,
            this.state.people,
            this.state.type
        )

        this.setState({
            title: '',
            quantity: 0,
            date: new Date(),
            people: ''
            })
    }

    _saveData() {
        if(this._checkDataFilling()){
            this._addStuff()
            this._resetData()
            Alert.alert("Prêt d'objet ajouté")
        } else {
            Alert.alert("Tous les champs ne sont pas complétés")
        }
    }

    _checkDataFilling(){
        var dataComplete = true

        if(this.state.title === ""){
            this.setState({ titleAlert: true })
            dataComplete= false
        } else {
            this.setState({ titleAlert: false })
        }
        if(this.state.quantity === 0 || this.state.quantity === 'NaN'){
            this.setState({ quantityAlert: true })
            dataComplete= false
        } else {
            this.setState({ quantityAlert: false })
        }
        if(this.state.people === ""){
            this.setState({ peopleAlert: true })
            dataComplete= false
        } else {
            this.setState({ peopleAlert: false })
        }
        if(this.state.type === "Sélectionner"){
            this.setState({ typeAlert: true })
            dataComplete= false
        } else {
            this.setState({ typeAlert: false })
        }

        return dataComplete
    }

    _resetData() {
        this.setState({
            title: "",
            titleAlert: false,
            quantity: 0,
            displayedQty: "",
            quantityAlert: false,
            date: new Date(),
            people: "",
            peopleAlert: false,
            showdp: false,
            showpicker: false
        })
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

    _dataProcessing(text){
        if (text != 'quantity') {
            const quantity = this.state.quantity
            if (quantity !== 0) {
                this.setState({
                    displayedQty: quantity.toString()
                })
            }
        }
        this._hideDP()
        this._hidePicker()
        this._checkDataFilling()
    }

    _saveStateQty(text) {
        this.setState({ quantity: text })
        this.setState(
            { displayedQty: text.toString()}
        )
    }

    render(){
        const { showdp, showpicker, date } = this.state

        let typeItems = this.state.typeList.map( ( val ) => {
            return <Picker.Item key={val.key} value={val.label} label={val.label} />
        })

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
                            <Moment element={Text} format="DD/MM/YYYY" date={date} style={styles.alt_input}/>
                        </TouchableOpacity>
                        
                        <Text style={styles.text_view}>Quantité à prêter</Text>
                            <TextInput style={styles.data_input}
                            keyboardType="numeric"
                            value={this.state.displayedQty}
                            clearButtonMode="always"
                            returnKeyType="done"
                            onFocus={() => this._dataProcessing('quantity')}
                            onChangeText={(text) => this._saveStateQty(text)} />
                            {this._showMandatory(this.state.quantityAlert)}

                        <Text style={styles.text_view}>Personne impliquée</Text>
                            <TextInput style={styles.data_input}
                            clearButtonMode="always"
                            returnKeyType="done"
                            value={this.state.people}
                            onFocus={() => this._dataProcessing()}
                            onChangeText={(text) => {this.setState({ people: text })}}/>
                            {this._showMandatory(this.state.peopleAlert)}

                        <Text style={styles.text_view}>Type</Text>
                        <TouchableOpacity style={styles.data_input} onPress={this._showPicker}>
                            <Text style={styles.alt_input}>{this.state.type}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.dp_view}>
                    { showdp && <DateTimePicker value={date}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={this._setDate} />
                    }
                    {/* showpicker && <View style={styles.button_container}>
                            <Button style={styles.validation_button}
                            title="Valider" onPress={this._hidePicker} />
                        </View>
                */}
                    { showpicker && 
                    <Picker selectedValue = {this.state.type} 
                    onValueChange = {(text) => this.setState({type: text})}>
                        { typeItems }
                        </Picker>
                    }
                    {this._showMandatory(this.state.typeAlert)}
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
        marginTop: 20,
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
        color: 'white',
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

export default AddStuff