// navigation/Navigation.js

import { NavigationContainer, useRoute, useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import Home from '../components/Home'
import LendList from '../components/LendList'
import AddMoney from '../components/AddMoney'
import AddStuff from '../components/AddStuff'
import Settings from '../components/Settings'
import ItemDetails from '../components/ItemDetails'
import Test from '../components/Test'

const Tab = createBottomTabNavigator()

// Mes différentes stack de vue
const HomeStack = createStackNavigator()
const MoneyStack = createStackNavigator()
const StuffStack = createStackNavigator()
const TestStack = createStackNavigator()

function HomeStackScreen() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home"
            component={Home} 
            options={({route, navigation}) => (
                {headerTitle: 'Home Page', 
                route: {route}, 
                navigation: {navigation}}
            )}
            />
            <HomeStack.Screen name="LendList" 
            component={LendList}
            options={({route, navigation}) => (
                {headerTitle: 'Mes prêts', 
                route: {route}, 
                navigation: {navigation}}
            )}
            />
            <HomeStack.Screen name="AddMoney"
            component={AddMoney} 
            options={({route, navigation}) => (
                {headerTitle: 'Prêt d\'argent', 
                route: {route}, 
                navigation: {navigation}}
            )}
            />
            <HomeStack.Screen name="AddStuff"
            component={AddStuff} 
            options={({route, navigation}) => (
                {headerTitle: 'Prêt d\'objet', 
                route: {route}, 
                navigation: {navigation}}
            )}
            />
            <HomeStack.Screen name="Settings"
            component={Settings} 
            options={({route, navigation}) => (
                {headerTitle: 'Settings', 
                route: {route}, 
                navigation: {navigation}}
            )}
            />
            <HomeStack.Screen name="ItemDetails"
            component={ItemDetails} 
            options={({route, navigation}) => (
                {headerTitle: 'Détails', 
                route: {route}, 
                navigation: {navigation}}
            )}
            />
        </HomeStack.Navigator>
    )
}

function MoneyStackScreen() {
    return(
        <MoneyStack.Navigator>
            <MoneyStack.Screen name="LendList" 
            component={LendList}
            options={({route, navigation}) => (
                {headerTitle: 'Mes prêts', 
                route: {route}, 
                navigation: {navigation}}
            )}
            />
            <MoneyStack.Screen name="AddMoney"
            component={AddMoney} 
            options={({route, navigation}) => (
                {headerTitle: 'Prêt d\'argent', 
                route: {route}, 
                navigation: {navigation}}
            )}
            />
        </MoneyStack.Navigator>
    )
}

function StuffStackScreen() {
    return(
        <StuffStack.Navigator>
            <StuffStack.Screen name="LendList" 
            component={LendList}
            options={({route, navigation}) => (
                {headerTitle: 'Mes prêts', 
                route: {route}, 
                navigation: {navigation}}
            )}
            />
            <StuffStack.Screen name="AddStuff"
            component={AddStuff} 
            options={({route, navigation}) => (
                {headerTitle: 'Prêt d\'objet', 
                route: {route}, 
                navigation: {navigation}}
            )}
            />
        </StuffStack.Navigator>
    )
}

function TestStackScreen() {
    return(
        <TestStack.Navigator>
            <TestStack.Screen name="Test"
            component={Test} 
            options={({route, navigation}) => (
                {headerTitle: 'Test', 
                route: {route}, 
                navigation: {navigation}}
            )}
            />
        </TestStack.Navigator>
    )
}

function App() {
    return(
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
            
                        if (route.name === 'Home') {
                            iconName = 'ios-home'
                        } else if (route.name === 'Money') {
                            iconName = 'ios-cash'
                        } else if (route.name === 'Stuff') {
                            iconName = 'ios-cube'
                        } else if (route.name === 'Test') {
                            iconName = 'ios-beaker'
                        }
            
                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: 'white',
                    activeBackgroundColor: 'red',
                    inactiveTintColor: 'red',
                }}
            >
                <Tab.Screen name='Home' component={HomeStackScreen} />
                <Tab.Screen name='Money' component={MoneyStackScreen} />
                <Tab.Screen name='Stuff' component={StuffStackScreen} />
                <Tab.Screen name='Test' component={TestStackScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default App