// components/Money.js

import React from 'react'
import { StyleSheet, View, Image, Platform, FlatList, ActivityIndicator, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import MyItem from './MyItem'
import { Ionicons } from '@expo/vector-icons'
import StuffData from '../dbaccess/StuffData'
import MoneyData from '../dbaccess/MoneyData'

/*TODO:
- permettre de parcourir la liste des prêts d'argent ou d'objet réalisés et de l'ordonner selon certains critères 
- (par montant, date, type, ...)
- PErmettre d'éditer un prêt
*/

class LendList extends React.Component {

    constructor(props) {
        super(props)

        this.state = { 
            moneyList: [],
            stuffList: [],
            peopleList: [],
            isLoading: true
        }
    }

    _getData() {
        const type = this.props.route.params?.type ?? 'defaultValue'

        if (type === 'Money'){
            let myMoney = new MoneyData()
            myMoney.getMoneyData().then(val => {
                this.setState({
                    moneyList: val,
                    isLoading: false,
                })
            })
            
        } else if (type === 'Stuff'){
            let myStuff = new StuffData()
            myStuff.getStuffData().then(val => {
                this.setState({
                    stuffList: val,
                    isLoading: false,
                })
            })
        }
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
        this._getData()
    }

    _addItem = () => {
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
        if (type === 'Money') {
            let myMoney = new MoneyData()

            myMoney.deleteMoney(idItem)
            this.setState({
                moneyList: this.state.moneyList.filter(item => item.key != idItem)
            })
        } else {
            let myStuff = new StuffData()

            myStuff.deleteStuff(idItem)
            this.setState({
                stuffList: this.state.stuffList.filter(item => item.key != idItem)
            })
        }

        alert(type + ' deleted')
        
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
            <View style={styles.main_container}>
                <View style={styles.title_container}>
                    <Image source={require('../assets/icons/cadre.png')} style={styles.cadre} />
                    <Text style={styles.header_text}>XXX €</Text>
                </View>
                <FlatList
                    style={styles.list}
                    data={this._displayDataList()}
                    keyExtractor={(item) => item.key.toString()}
                    renderItem={({item}) => <MyItem 
                        myItem={item}
                        itemType={type}
                        displayDetailsForMyItem={this._displayDetailsForMyItem}
                        deleteItem={this._deleteItem}/>}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                    }}
                />
            </View>
        )
    }
}

const styles=StyleSheet.create({
    main_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#003F5C'
    },
    title_container: {
        justifyContent: "center",
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 40
    },
    header_text: {
        textAlign: 'center',
        fontSize: 35,
        color: '#FFFFFF',
    },
    cadre: {
        position: 'absolute',
        marginRight: 10,
    },
    add_touchable_headerrightbutton: {
        marginRight: 8
    },
    add_image: {
        marginRight: 10,
        fontSize: 30,
        color: 'white'
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