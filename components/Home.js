// components/Home.js

/************
Cette page affiche le récapitulatif des assets prêtés et du nombre de personnes impliquées
Une première récupération des informations de base de données se fera à ce niveau pour permettre de calculer les
informations à afficher.

Important d'utiliser ensuite redux pour permettre de conserver et transférer les informations sans effectuer à nouveau
un appel à la DB.
*************/

import React from 'react'
import { StyleSheet, Text, Image, View, Button, TouchableOpacity } from 'react-native'
import Moment from 'react-moment'
import { Ionicons } from '@expo/vector-icons'

/* TODO:
- Il faut ajouter les fonctions pour afficher l'argent total que l'on a prêté.
- Il faut aussi ajouter le nombre d'objets que l'on a prêté.
- Penser à uniformiser en ne chargeant qu'une vue détail (au lieu des 2 vues money et stuff) car elles afficheront toutes 2 une liste
- Voir ensuite pour remplir la vue avec une liste de prêts d'argent ou d'objets en fonction du bouton cliqué.
- Penser aussi à l'action sur le bouton d'ajout qui dépendra du bouton cliqué.
 */
//const navigation = useNavigation()

class Home extends React.Component {

    constructor(props) {
        super(props)
        this._goToSettings = this._goToSettings.bind(this)
    }

    _updateNavigationParams() {
        const navigation = this.props.navigation
        const route = this.props.route

        navigation.setParams({
          goToSettings: this._goToSettings
        })

        console.log(route.params)

        navigation.setOptions({
            headerRight: () => <TouchableOpacity style={styles.settings_touchable_headerrightbutton}
                            onPress={() => route.params.goToSettings()}>
                            <Image style={styles.settings_image}
                            source={require('../assets/icons/ic_settings.png')} />
            </TouchableOpacity>
        })
    }

    componentDidMount(){
        this._updateNavigationParams()
    }

    _checkMoneyDetails(){
        this.props.navigation.navigate('LendList', {type: 'Money'})
    }

    _checkStuffDetails(){
        this.props.navigation.navigate('LendList', {type: 'Stuff'})
    }

    _checkPeopleDetails(){
        this.props.navigation.navigate('LendList', {type: 'People'})
    }

    _goToSettings = () => {
        this.props.navigation.navigate('Settings')
    }

    render(){
        const date = new Date();
        //const { navigation } = this.props;

        return(
            <View style={styles.main_container}>
                <View style={styles.header_view}>
                    <Text style={styles.header_text}>GiViToMe</Text>
                    {/*
                    <Text style={styles.header_text}>Nous sommes le :{' '}
                    {/* TODO: Penser à gérer ensuite les formats de date étrangers}
                        <Moment element={Text} format="DD/MM/YYYY" date={date}/>
                    </Text>
                    */}
                </View>

                <View style={styles.lend_view}>

                        <View style={styles.lend_header}>
                            <Image source={require('../assets/icons/dash.png')}/>
                            <Text style={styles.lend_title}>Money</Text>
                        </View>
                        <View style={styles.lend_content}>
                            <Image source={require('../assets/icons/cadre-home.png')} style={styles.home_img} />
                            <Text style={styles.lend_text}>XXX $</Text>
                            <TouchableOpacity style={styles.add_button} onPress={() => {this.props.navigation.navigate('AddMoney')}}>
                                <Ionicons name='ios-add' size={60} color='#ED6D6D' />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.lend_header}>
                            <Image source={require('../assets/icons/dash.png')}/>
                            <Text style={styles.lend_title}>Stuff</Text>
                        </View>
                        <View style={styles.lend_content}>
                            <Image source={require('../assets/icons/cadre-home.png')} style={styles.home_img} />
                            <Text style={styles.lend_text}>XXX</Text>
                            <TouchableOpacity style={styles.add_button} onPress={() => {this.props.navigation.navigate('AddStuff')}}>
                                <Ionicons name='ios-add' size={60} color='#ED6D6D' />
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
        color: '#ED6D6D'
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
        marginLeft: 10
    },
    lend_text: {
        fontSize: 25,
        marginLeft: 10,
        position: 'absolute'
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
        marginRight: 10
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
        width: 25,
        height: 25,
        marginRight: 10
    }
})

export default Home