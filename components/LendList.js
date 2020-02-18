// components/Money.js

import React from 'react'
import { StyleSheet, View, Text, Image, Platform, FlatList, ActivityIndicator } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import MyItem from './MyItem'
//import fakeMoneyData from '../helpers/fakeMoneyData'
import firebase from '../config/Firebase'
import moment from 'moment'

/*TODO:
- Finaliser le branchement firebase
- permettre de supprimer un prêt d'argent ou d'objet
- permettre de parcourir la liste des prêts d'argent ou d'objet réalisés et de l'ordonner selon certains critères 
- (par montant, date, type, ...)
*/

class LendList extends React.Component {

    constructor(props) {
        super(props)
        const type = this.props.route.params?.type ?? 'defaultValue'

        this._addItem = this._addItem.bind(this)

        if (type === 'Money'){
            this.ref = firebase.firestore().collection('money')
        } else if (type === 'Stuff') {
            this.ref = firebase.firestore().collection('stuff')
        } else {
            this.ref = firebase.firestore().collection('people')
        }
        this.unsubscribe = null
        this.state = { 
            moneyList: [],
            stuffList: [],
            peopleList: [],
            isLoading: true
        }
    }

    _onCollectionUpdate = (querySnapshot) => {
        const type = this.props.route.params?.type ?? 'defaultValue'

        if (type === 'Money'){
            const moneyList = [];
            querySnapshot.forEach((money) => {
                const { title, amount, date, people } = money.data()
                moneyList.push({
                key: money.id,
                title,
                amount,
                date: (date.toString().length > 0) ? new Date(date.seconds*1000) : new Date(),
                people
                })
            })
            this.setState({
                moneyList: moneyList,
                isLoading: false,
            })
        } else if (type === 'Stuff'){
            const stuffList = [];
            querySnapshot.forEach((stuff) => {

                const { title, quantity, date, people } = stuff.data()
                stuffList.push({
                key: stuff.id,
                title,
                quantity,
                date: (date.toString().length > 0) ? new Date(date.seconds*1000) : new Date(),
                people
                })
            })
            this.setState({
                stuffList: stuffList,
                isLoading: false,
            })
        } else {
            const peopleList = [];
            querySnapshot.forEach((people) => {

                const { firstName, lastName } = people.data();
                peopleList.push({
                key: people.id,
                firstName,
                lastName
                });
            });
            this.setState({
                peopleList: peopleList,
                isLoading: false,
            });
        }
    }

    _updateNavigationParams() {
        const navigation = this.props.navigation
        const route = this.props.route
        const type = route.params?.type ?? 'defaultValue'

        navigation.setParams({
          addItem: this._addItem
        })

        if (Platform.OS === "ios" && type !== 'People'){
            navigation.setOptions({
                        headerRight: () => <TouchableOpacity style={styles.add_touchable_headerrightbutton}
                                        onPress={() => route.params.addItem()}>
                                        <Image style={styles.add_image}
                                        source={require('../assets/ic_add.png')} />
                        </TouchableOpacity>
                })
            }
    }

    componentDidMount(){
        this._updateNavigationParams()
        this.unsubscribe = this.ref.onSnapshot(this._onCollectionUpdate)
    }

    _addItem(){
        // Créer la fonction pour permettre d'ajouter soit un prêt d'argent ou un prêt d'objet.
        const type = this.props.route.params?.type ?? 'defaultValue'

        if (type === 'Money'){
            this.props.navigation.navigate('AddMoney')
        } else {
            this.props.navigation.navigate('AddStuff')
        }
    }

    //Android dedicated
    _displayFloatingActionButton() {
        const type = this.props.route.params?.type ?? 'defaultValue'

        if (Platform.OS === 'android' && type !== 'People'){
            return(
            <TouchableOpacity style={styles.add_touchable_floatingactionbutton}
                onPress={() => this._addItem()}>
                <Image style={styles.add_image} source={require('../assets/ic_add.png')}/>
            </TouchableOpacity>
            )
        }
    }

    _checkData(){
        this._displayDataList()
        /*
        if (this.props.navigation.getParam('type') === 'Money') {
            return (<Text>This is the Money View</Text>)
        } else if (this.props.navigation.getParam('type') === 'Stuff') {
            return (<Text>This is the Stuff View</Text>)
        } else {
            return (<Text>This is the People View</Text>)
        }
        */
    }

    _displayDetailsForMyItem = (idItem, type) => {
        // TODO : implémenter la page de détail d'un item (myItemPage par exemple ... A créer)
        this.props.navigation.navigate('ItemDetails', { idMyItem: idItem, type: type })
    }

    _displayDataList(){
        const type = this.props.route.params?.type ?? 'defaultValue'

        if (type === 'Money') {
            return this.state.moneyList
        } else if (type === 'Stuff') {
            return this.state.stuffList
        } else {
            return this.state.peopleList
        }
/*
        return(
            <FlatList
                style={styles.list}
                data={mesDonnees}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <MyItem 
                    myItem={item}
                    itemType={this.props.navigation.getParam('type')}
                    displayDetailsForMyItem={this._displayDetailsForMyItem}/>}
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                }}
            />
        )
        */
    }

    render(){
        const type = this.props.route.params?.type ?? 'defaultValue'

        if(this.state.isLoading){
            return(
              <View style={styles.activity}>
                <ActivityIndicator size="large" color="#0000ff"/>
              </View>
            )
        }

        return(
            <FlatList
                style={styles.list}
                data={this._displayDataList()}
                keyExtractor={(item) => item.key.toString()}
                renderItem={({item}) => <MyItem 
                    myItem={item}
                    itemType={type}
                    displayDetailsForMyItem={this._displayDetailsForMyItem}/>}
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                }}
            />
        )
    }
}

const styles=StyleSheet.create({
    main_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    add_touchable_headerrightbutton: {
        marginRight: 8
    },
    add_image: {
        width: 30,
        height: 30
    },
    add_touchable_floatingactionbutton: {
        position: 'absolute',
        width: 60,
        height: 60,
        right: 30,
        bottom: 30,
        borderRadius: 30,
        backgroundColor: '#e91e63',
        justifyContent: 'center',
        alignItems: 'center'
    },
    list: {
        flex: 1
    },
    activity: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
      }
})

export default LendList