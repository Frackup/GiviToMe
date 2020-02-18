// navigation/Navigation.js

import { NavigationContainer, useRoute, useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StyleSheet, Image } from 'react-native'
import React from 'react'
import Home from '../components/Home'
import LendList from '../components/LendList'
import AddMoney from '../components/AddMoney'
import AddStuff from '../components/AddStuff'
import Settings from '../components/Settings'
import ItemDetails from '../components/ItemDetails'
import Test from '../components/Test'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function App() {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home"
                component={Home} 
                options={({route, navigation}) => (
                    {headerTitle: 'Home Page', 
                    route: {route}, 
                    navigation: {navigation}}
                )}
                />
                <Stack.Screen name="LendList" 
                component={LendList}
                options={({route, navigation}) => (
                    {headerTitle: 'Mes prêts', 
                    route: {route}, 
                    navigation: {navigation}}
                )}
                />
                <Stack.Screen name="AddMoney"
                component={AddMoney} 
                options={({route, navigation}) => (
                    {headerTitle: 'Prêt d\'argent', 
                    route: {route}, 
                    navigation: {navigation}}
                )}
                />
                <Stack.Screen name="AddStuff"
                component={AddStuff} 
                options={({route, navigation}) => (
                    {headerTitle: 'Prêt d\'objet', 
                    route: {route}, 
                    navigation: {navigation}}
                )}
                />
                <Stack.Screen name="Settings"
                component={Settings} 
                options={({route, navigation}) => (
                    {headerTitle: 'Settings', 
                    route: {route}, 
                    navigation: {navigation}}
                )}
                />
                <Stack.Screen name="ItemDetails"
                component={ItemDetails} 
                options={({route, navigation}) => (
                    {headerTitle: 'Détails', 
                    route: {route}, 
                    navigation: {navigation}}
                )}
                />
                <Stack.Screen name="Test"
                component={Test} 
                options={({route, navigation}) => (
                    {headerTitle: 'Test', 
                    route: {route}, 
                    navigation: {navigation}}
                )}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App