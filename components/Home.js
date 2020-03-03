// components/Home.js

/************
Cette page affiche le récapitulatif des assets prêtés et du nombre de personnes impliquées
Une première récupération des informations de base de données se fera à ce niveau pour permettre de calculer les
informations à afficher.

Important d'utiliser ensuite redux pour permettre de conserver et transférer les informations sans effectuer à nouveau
un appel à la DB.
*************/

import React from 'react'
import { StyleSheet, Text, Image, View, TouchableOpacity, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
//import firebase from '../config/Firebase'

import StuffData from '../dbaccess/StuffData'
import MoneyData from '../dbaccess/MoneyData'

/* TODO:
 */

class Home extends React.Component {

    constructor(props) {
        super(props)
        this._goToSettings = this._goToSettings.bind(this)
        //this.ref = firebase.firestore().collection('globalData')

        this.state = { 
            totalMoney: 0,
            totalQuantity: 0,
            isLoading: true
        }
    }

    _updateNavigationParams() {
        const navigation = this.props.navigation

        let settingsIconName
        (Platform.OS === 'android') ? settingsIconName = 'md-settings' : settingsIconName = 'ios-settings'

        navigation.setOptions({
            headerRight: () => <TouchableOpacity style={styles.settings_touchable_headerrightbutton}
                            onPress={() => this._goToSettings()}>
                                <Ionicons name={settingsIconName} style={styles.settings_image} />
            </TouchableOpacity>
        })
    }

    _getData() {
        let myStuff = new StuffData();
        myStuff.totalStuff().then(val => { this.setState({
            totalQuantity: val
            })
        })
        .catch(error => {
            console.error(error)
        })

        let myMoney = new MoneyData();
        myMoney.totalMoney().then(val => { this.setState({
            totalMoney: val
            })
        })
    }

    componentDidMount(){
        this._updateNavigationParams()
        this._getData()
        //this._getGlobalData()
    }

    _addMoney(){
        this.props.navigation.navigate('AddMoney')
    }

    _addStuff(){
        this.props.navigation.navigate('AddStuff')
    }

    _goToSettings = () => {
        this.props.navigation.navigate('Settings')
    }

    render(){

        const iconName = (Platform.OS === 'android') ? 'md-add' : 'ios-add'

        return(
            <View style={styles.main_container}>
                <View style={styles.header_view}>
                    <Text style={styles.header_text}>GiViToMe</Text>
                </View>

                <View style={styles.lend_view}>

                        <View style={styles.lend_header}>
                            <Image source={require('../assets/icons/dash.png')}/>
                            <Text style={styles.lend_title}>Argent</Text>
                        </View>
                        <View style={styles.lend_content}>
                            <Image source={require('../assets/icons/cadre-home.png')} style={styles.home_img} />
                            {/* TODO: Gérer la localization pour afficher soit € soit $ */}
                            <Text style={styles.lend_text}>{this.state.totalMoney} €</Text>
                            <TouchableOpacity style={styles.add_button} onPress={() => {this._addMoney()}}>
                                <Ionicons name={iconName} style={styles.icon_style} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.lend_header}>
                            <Image source={require('../assets/icons/dash.png')}/>
                            <Text style={styles.lend_title}>Objets</Text>
                        </View>
                        <View style={styles.lend_content}>
                            <Image source={require('../assets/icons/cadre-home.png')} style={styles.home_img} />
                            <Text style={styles.lend_text}>{this.state.totalQuantity}</Text>
                            <TouchableOpacity style={styles.add_button} onPress={() => {this._addStuff()}}>
                                <Ionicons name={iconName} style={styles.icon_style} />
                            </TouchableOpacity>
                        </View>

                </View>

                <View style={styles.footer_view}>
                    <Text style={styles.text_footer_view}>a.vescera inc.</Text>
                </View>
            </View>
        )
    }    
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    header_view: {
        flex: 1,
        justifyContent: 'space-evenly',
        marginTop: 10,
        marginBottom: 20
    },
    header_text: {
        textAlign: 'center',
        fontSize: 35,
        color: '#2AA4A8'
    },
    lend_view: {
        flex: 3,
        justifyContent: 'flex-start'
    },
    lend_header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20
    },
    lend_title: {
        fontSize: 25,
        marginLeft: 10,
        color: '#707070'
    },
    lend_text: {
        fontSize: 25,
        marginLeft: 10,
        position: 'absolute',
        color: 'white'
    },
    add_button: {
        alignSelf: 'flex-end',
        marginRight: 40
    },
    lend_content: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        marginBottom: 10,
        marginTop: 10
    },
    home_img: {
        position: 'absolute',
        marginRight: 10,
    },
    icon_style: {
        fontSize: 60,
        color: '#2AA4A8'
    },
    footer_view: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    text_footer_view: {
        textAlign: 'center',
        fontSize: 14,
        margin: 10
    },
    settings_image: {
        fontSize: 30,
        marginRight: 10,
        color: '#2AA4A8'
    }
})

export default Home