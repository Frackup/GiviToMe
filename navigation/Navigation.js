// navigation/Navigation.js

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Platform } from 'react-native'
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
                headerTintColor: '#707070',
                route: {route}, 
                navigation: {navigation}}
            )}
            />
            <HomeStack.Screen name="LendList" 
            component={LendList}
            options={({route, navigation}) => (
                {headerTitle: 'Mes prêts', 
                headerTintColor: '#707070',
                route: {route}, 
                navigation: {navigation}}
            )}
            />
            <HomeStack.Screen name="AddMoney"
            component={AddMoney} 
            options={({route, navigation}) => (
                {headerTitle: 'Prêt d\'argent', 
                headerTintColor: '#707070',
                route: {route}, 
                navigation: {navigation}}
            )}
            />
            <HomeStack.Screen name="AddStuff"
            component={AddStuff} 
            options={({route, navigation}) => (
                {headerTitle: 'Prêt d\'objet',
                headerTintColor: '#707070', 
                route: {route}, 
                navigation: {navigation}}
            )}
            />
            <HomeStack.Screen name="Settings"
            component={Settings} 
            options={({route, navigation}) => (
                {headerTitle: 'Settings', 
                headerTintColor: '#707070',
                route: {route}, 
                navigation: {navigation}}
            )}
            />
            <HomeStack.Screen name="ItemDetails"
            component={ItemDetails} 
            options={({route, navigation}) => (
                {headerTitle: 'Détails', 
                headerTintColor: '#707070',
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
            initialParams={{ type: 'Money' }}
            options={({route, navigation}) => (
                {headerTitle: 'Mes prêts', 
                headerTintColor: '#707070',
                route: {route}, 
                navigation: {navigation}}
            )}
            />
            <MoneyStack.Screen name="AddMoney"
            component={AddMoney} 
            options={({route, navigation}) => (
                {headerTitle: 'Prêt d\'argent', 
                headerTintColor: '#707070',
                route: {route}, 
                navigation: {navigation}}
            )}
            />
            <MoneyStack.Screen name="ItemDetails"
            component={ItemDetails} 
            options={({route, navigation}) => (
                {headerTitle: 'Détails', 
                headerTintColor: '#707070',
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
            initialParams={{ type: 'Stuff' }}
            options={({route, navigation}) => (
                {headerTitle: 'Mes prêts', 
                headerTintColor: '#707070',
                route: {route}, 
                navigation: {navigation}}
            )}
            />
            <StuffStack.Screen name="AddStuff"
            component={AddStuff} 
            options={({route, navigation}) => (
                {headerTitle: 'Prêt d\'objet',
                headerTintColor: '#707070', 
                route: {route}, 
                navigation: {navigation}}
            )}
            />
            <StuffStack.Screen name="ItemDetails"
            component={ItemDetails} 
            options={({route, navigation}) => (
                {headerTitle: 'Détails', 
                headerTintColor: '#707070',
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
                headerTintColor: '#707070',
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
                        let prefix;

                        (Platform.OS === 'android')? prefix = 'md-' : prefix = 'ios-'
            
                        if (route.name === 'Home') {
                            iconName = 'home'
                        } else if (route.name === 'Money') {
                            iconName = 'cash'
                        } else if (route.name === 'Stuff') {
                            iconName = 'cube'
                        } else if (route.name === 'Test') {
                            iconName = 'beaker'
                        }

                        iconName = prefix + iconName
            
                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: 'white',
                    activeBackgroundColor: '#ED6D6D',
                    inactiveTintColor: '#ED6D6D',
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