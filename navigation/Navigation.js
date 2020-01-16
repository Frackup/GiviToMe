// navigation/Navigation.js

import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Home from '../components/Home'
import Details from '../components/Details'
import AddMoney from '../components/AddMoney'
import AddStuff from '../components/AddStuff'

const HomeStackNavigator = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            title: 'Home Page'
        }
    },
    Details: {
        screen: Details,
        navigationOptions: {
            title: 'Liste des Prêts'
        }
    },
    AddMoney: {
        screen: AddMoney,
        navigationOptions: {
            title: 'Prêt d\'argent'
        }
    },
    AddStuff: {
        screen: AddStuff,
        navigationOptions: {
            title: 'Prêt d\'objet'
        }
    }
})

export default createAppContainer(HomeStackNavigator)