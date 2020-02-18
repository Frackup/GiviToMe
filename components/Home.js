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
import { CommonActions } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'

/* TODO:
- Il faut ajouter les fonctions pour afficher l'argent total que l'on a prêté.
- Il faut aussi ajouter le nombre d'objets que l'on a prêté.
- Penser à uniformiser en ne chargeant qu'une vue détail (au lieu des 2 vues money et stuff) car elles afficheront toutes 2 une liste
- Voir ensuite pour remplir la vue avec une liste de prêts d'argent ou d'objets en fonction du bouton cliqué.
- Penser aussi à l'action sur le bouton d'ajout qui dépendra du bouton cliqué.
 */
//const navigation = useNavigation()

class Home extends React.Component {

    /*static navigationOptions = () => {
        //const { params } = navigation.state
        //route = navigation.state
        return {
            headerRight: () => <TouchableOpacity style={styles.settings_touchable_headerrightbutton}
                            onPress={() => navigation.goToSettings()}>
                            <Image style={styles.settings_image}
                            source={require('../assets/ic_settings.png')} />
            </TouchableOpacity>
        }
    }*/

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
                            source={require('../assets/ic_settings.png')} />
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
                    <Text style={styles.header_text}>Nous sommes le :{' '}
                    {/* TODO: Penser à gérer ensuite les formats de date étrangers */}
                        <Moment element={Text} format="DD/MM/YYYY" date={date}/>
                    </Text>
                </View>
                <View style={styles.lend_view}>
                    <Text style={styles.title_lend_text}>Vos prêts :</Text>
                    <View style={styles.money_stuff_view}>
                        <View style={styles.money_view}>
                            <View style={styles.money_data_view}>
                                <Image source={require('../assets/ic_money.png')} style={styles.home_img} />
                                <Text>XXX $</Text>
                            </View>
                            <Button title='Money' onPress={() => {this._checkMoneyDetails()}}/>
                        </View>
                        <View style={styles.stuff_view}>
                            <View style={styles.stuff_data_view}>
                                <Image source={require('../assets/ic_box.png')} style={styles.home_img} />
                                <Text>XXX objets</Text>
                            </View>
                            <Button title='Stuff' onPress={() => {this._checkStuffDetails()}}/>
                        </View>
                    </View>
                    <View style={styles.people_view}>
                        <View style={styles.people_data_view}>
                            <Image source={require('../assets/ic_people.png')} style={styles.home_img} />
                            <Text>XXX people</Text>
                        </View>
                        <Button title='People' onPress={() => {this._checkPeopleDetails()}}/>
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
        flex: 1.5,
        justifyContent: 'space-evenly'
    },
    header_text: {
        textAlign: 'center',
        fontSize: 14,
        marginTop: 10
    },
    lend_view: {
        flex: 3,
        justifyContent: 'flex-start'
    },
    title_lend_text:{
        textAlign: 'center',
        fontSize: 14,
        marginTop: 10,
        marginBottom: 30
    },
    money_stuff_view: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    money_view: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        margin: 10
    },
    money_data_view: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    stuff_view: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        margin: 10
    },
    stuff_data_view: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    people_view: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        margin: 10
    },
    people_data_view: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    home_img: {
        width: 40,
        height: 40,
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
    settings_touchable_headerrightbutton: {
        marginRight: 8
    },
    settings_image: {
        width: 30,
        height: 30
    }
})

export default Home