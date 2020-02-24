// components/Money.js

import React from 'react'
import { StyleSheet, View, Image, Platform, FlatList, ActivityIndicator } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import MyItem from './MyItem'
import firebase from '../config/Firebase'
import { Ionicons } from '@expo/vector-icons'

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
        this.globalData = firebase.firestore().collection('globalData')

        this.state = { 
            moneyList: [],
            stuffList: [],
            peopleList: [],
            isLoading: true
        }
    }

    _getFirebaseData() {
        const type = this.props.route.params?.type ?? 'defaultValue'

        if (type === 'Money'){
            const moneyList = [];

            let query = this.ref.get()
            .then(snapshot => {
                if (snapshot.empty) {
                console.log('No matching data.');
                return;
                }  

                snapshot.forEach(money => {
                
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
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
        } else if (type === 'Stuff'){
            const stuffList = [];

            let query = this.ref.get()
            .then(snapshot => {
                if (snapshot.empty) {
                console.log('No matching data.');
                return;
                }  

                snapshot.forEach(stuff => {
                
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
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
        }
    }

    _getGlobalData() {
        let query = this.globalData.get()
        .then(snapshot => {
            if (snapshot.empty) {
            console.log('No matching data.');
            return;
            }  

            snapshot.forEach(myData => {
            const { totalMoney, totalQuantity } = myData.data()
            this.setState({
                totalMoney: totalMoney,
                totalQuantity: totalQuantity,
                isLoading: false,
            })
            });
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
    }

    _updateNavigationParams() {
        const navigation = this.props.navigation
        const type = this.props.route.params?.type ?? 'defaultValue'

        let addIconName
        addIconName = ((Platform.OS == 'android') ? 'md-add' : 'ios-add')


        if (Platform.OS === "ios" && type !== 'People'){
            navigation.setOptions({
                        headerRight: () => <TouchableOpacity style={styles.add_touchable_headerrightbutton}
                                        onPress={() => this._addItem()}>
                                        <Ionicons name={addIconName} style={styles.add_image} />
                        </TouchableOpacity>
                })
            }
    }

    componentDidMount(){
        this._updateNavigationParams()
        this._getFirebaseData()
        this._getGlobalData()
    }

    _addItem(){
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
                <Image style={styles.add_image} source={require('../assets/icons/ic_add.png')}/>
            </TouchableOpacity>
            )
        }
    }

    _checkData(){
        this._displayDataList()
    }

    _displayDetailsForMyItem = (idItem, type) => {
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
    }

    _deleteItem = (idItem, type) => {
        alert('Delete button pressed')
        console.log(type)
    }

    render(){
        const type = this.props.route.params?.type ?? 'defaultValue'

        if(this.state.isLoading){
            return(
              <View style={styles.activity}>
                <ActivityIndicator size="large" color="#ED6D6D"/>
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
                    displayDetailsForMyItem={this._displayDetailsForMyItem}
                    deleteItem={(item) => this._deleteItem(item.id, type)}/>}
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                }}
            />
        )
    }
}

const styles=StyleSheet.create({
    total_container: {
        flex: 0.2
    },
    main_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    add_touchable_headerrightbutton: {
        marginRight: 8
    },
    add_image: {
        marginRight: 10,
        fontSize: 30,
        color: '#2AA4A8'
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