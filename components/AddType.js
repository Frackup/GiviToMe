// components/AddType.js

import React from 'react'
import { StyleSheet, View, Text, Alert, TouchableOpacity, Image } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import TypeData from '../dbaccess/TypeData'

// TODO : Effectuer une récupération de tous les types et vérifier si doublon

export default class AddType extends React.Component {

    constructor() {
        super();

        this.state = {
            label: '',
            typesList: []
        };
    }

    _updateNavigationParams() {
        const navigation = this.props.navigation

        const saveIconName = "ic_save.png"

        if (Platform.OS === "ios"){
            navigation.setOptions({
                        headerRight: () => <TouchableOpacity style={styles.save_touchable_headerrightbutton}
                                        onPress={() => this._saveData()}>
                                        <Image source={require('../assets/icons/' + saveIconName)} style={styles.save_image} />
                        </TouchableOpacity>
                })
            }
    }

    _initData(){
        let myTypes = new TypeData()

        myTypes.getData().then(val => {
            this.setState({
                typesList: val,
                myTypes: myTypes
            })
        })

        myTypes.total().then(val => {
            this.setState({
                total: val
            })
        })
    }

    componentDidMount() {
        this._updateNavigationParams()
        this._initData()
    }

    _addType() {

        this.state.myTypes.add(
            this.state.label,
        )

        this.setState({
            label: '',
            })
    }

    _checkUnicity() {
        let alone = true

        this.state.typesList.forEach(element => {
            if (element.label === this.state.label) {
                alone = false
            }
        });

        return alone
    }

    _saveData() {
        if(this._checkUnicity()){
            if(this._checkDataFilling()){
                this._addType()
                Alert.alert("Type ajouté")
            } else {
                Alert.alert("Vous n'avez pas renseigné de type")
            }
        } else {
            alert('Le type existe déjà')
        }
    }

    _checkDataFilling(){
        var dataComplete = true

        if(this.state.label === ''){
            this.setState({ labelAlert: true })
            dataComplete= false
        } else {
            this.setState({ labelAlert: false })
        }

        return dataComplete
    }

    _resetData() {
        this.setState({
            label: '',
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

    render(){
        return(
            <View style={styles.main_view}>
                <View style={styles.form_view}>
                    <View style={styles.title_container}>
                        <Text style={styles.title_text_view}>Ajouter votre nouveau type</Text>
                    </View>
                    <View style={styles.data_container}>
                        <Text style={styles.text_view}>Type</Text>
                            <TextInput style={styles.data_input}
                            clearButtonMode="always"
                            value={this.state.label}
                            onChangeText={(text) => this.setState({label: text})}
                            returnKeyType="done"/>
                            {this._showMandatory(this.state.labelAlert)}


                    </View>
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