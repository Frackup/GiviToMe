// navigation/Navigation.js

import { createAppContainer } from 'react-navigation'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { StyleSheet, Image } from 'react-native'
import React from 'react'
import Home from '../components/Home'
import LendList from '../components/LendList'
import AddMoney from '../components/AddMoney'
import AddStuff from '../components/AddStuff'
import Settings from '../components/Settings'
import Test from '../components/Test'

const HomeStackNavigator = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            title: 'Home Page'
        }
    },
    LendList: {
        screen: LendList,
        navigationOptions: {
            title: 'Mes Prêts'
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
    },
    Settings: {
        screen: Settings,
        navigationOptions: {
            title: 'Settings'
        }
    }
})

const TestStackNavigator = createStackNavigator({
    Test: {
        screen: Test,
        navigationOptions: {
            title: 'Test'
        }
    }
})

const MoneyListStackNavigator = createStackNavigator({
    MoneyList: {
        screen: LendList,
        navigationOptions: {
            title: 'Argent prêté',
            type: 'Money'
        }
    }
})

const StuffListStackNavigator = createStackNavigator({
    StuffList: {
        screen: LendList,
        navigationOptions: {
            title: 'Objets prêtés',
            type: 'Stuff'
        }
    }
})

const GiviToMeTabNavigator = createBottomTabNavigator({
    Home: {
        screen: HomeStackNavigator,
        navigationOptions: {
            tabBarIcon: () => {
                return <Image
                    source={require('../assets/ic_home.png')}
                    style={styles.icon}/>
            }
        }
    },
    Test: {
        screen: TestStackNavigator,
    },
    MoneyList: {
        screen: MoneyListStackNavigator,
        navigationOptions: {
            tabBarIcon: () => {
                return <Image
                    source={require('../assets/ic_coins.png')}
                    style={styles.icon}/>
            }
        }
    },
    StuffList: {
        screen: StuffListStackNavigator,
        navigationOptions: {
            tabBarIcon: ({focused}) => {
                return <Image
                    source={require('../assets/ic_boxes.png')}
                    active={focused}
                    style={styles.icon}/>
            }
        }
    }
    
},
{
    tabBarOptions: {
        activeBackgroundColor: '#DDDDDD',
        inactiveBackgroundColor: '#FFFFFF',
        activeTintColor: '#FFFFFF',
        showLabel: true,
        showIcon: true
    }
})

const styles = StyleSheet.create({
    icon: {
        width: 28,
        height: 28
    }
})

export default createAppContainer(GiviToMeTabNavigator)