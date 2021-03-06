// components/Money.js

import React from 'react'
import { StyleSheet, View, Image, Platform, ActivityIndicator, Text, TouchableOpacity } from 'react-native'
import MyItem from './MyItem'
import { Ionicons } from '@expo/vector-icons'
import StuffData from '../dbaccess/StuffData'
import MoneyData from '../dbaccess/MoneyData'
import { SwipeListView } from 'react-native-swipe-list-view'

/*TODO:
- PErmettre d'éditer un prêt
*/

export default class LendList extends React.Component {

    constructor(props) {
        super(props)

        this.state = { 
            dataList: [],
            isLoading: true
        }
    }

    _initData() {
        const type = this.props.route.params?.type ?? 'defaultValue'
        let myObject

        if (type === 'Money'){
            myObject = new MoneyData()
        } else {
            myObject = new StuffData()
        }

        this.setState({
            mydataObject: myObject
        })

        myObject.getData().then(val => {
            this.setState({
                dataList: val,
                isLoading: false,
            })
        })

        myObject.total().then(val => {
            this.setState({
                total: val
            })
        })
    }

    _updateNavigationParams() {
        const navigation = this.props.navigation

        let addIconName
        addIconName = ((Platform.OS == 'android') ? 'md-add' : 'ios-add')


        if (Platform.OS === "ios"){
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
        this._initData()
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
        if (Platform.OS === 'android'){
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

    _deleteItem = (itemKey) => {
        const type = this.props.route.params?.type ?? 'defaultValue'
        const typeSup = (type === 'Money') ? "d'argent" : "d'objet"

        console.log('toto :',itemKey)
        this.state.mydataObject.delete(itemKey)
        this.setState({
            dataList: this.state.dataList.filter(item => item.key != itemKey)
        })

        alert('Prêt ' + typeSup + ' supprimé')
    }

    _closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    }

    _deleteRow = (rowMap, data) => {
        this._closeRow(rowMap, data.item.key);
        this._deleteItem(data.item.key)
    }

    _onRowDidOpen = rowKey => {
        //console.log('This row opened', rowKey);
    }

    _renderHiddenItem = (data, rowMap) => {
        let ptfPrefix
        (Platform.OS === 'android') ? ptfPrefix = 'md-' : ptfPrefix = 'ios-'

        const editIconName = ptfPrefix + 'create'
        const deleteIconName = ptfPrefix + 'trash'

        return (
            <View style={styles.rowBack}>
                <Text style={styles.backTextWhite}>Left</Text>
                <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]}
                    onPress={() => this._closeRow(rowMap, data.item.key)} 
                    >
                    <Text style={styles.backTextWhite}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.backRightBtn, styles.backRightBtnRight]}
                    onPress={() => this._deleteRow(rowMap, data)} 
                    >
                    <Ionicons name={deleteIconName} style={styles.icon} />
                </TouchableOpacity>
            </View>
        )
    }

    render(){
        const type = this.props.route.params?.type ?? 'defaultValue'

        if(this.state.isLoading){
            return(
              <View style={styles.activity}>
                <ActivityIndicator size="large" color="#FB5B5A"/>
              </View>
            )
        }

        return(
            <View style={styles.main_container}>
                <View style={styles.title_container}>
                    <Image source={require('../assets/icons/cadre.png')} style={styles.cadre} />
                    <Text style={styles.header_text}>
                        {(type === 'Money') ? this.state.total + ' €' : this.state.total}
                    </Text>
                </View>
                <View style={styles.main_container}>
                    <SwipeListView
                        data={this.state.dataList}
                        renderItem={({item}) => <MyItem 
                            myItem={item}
                            itemType={type}
                            deleteItem={this._deleteItem}/>}
                        renderHiddenItem={this._renderHiddenItem}
                        leftOpenValue={75}
                        rightOpenValue={-150}
                        previewRowKey={'0'}
                        previewOpenValue={-40}
                        previewOpenDelay={3000}
                        onRowDidOpen={this._onRowDidOpen}
                    />
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: '#003F5C'
    },
    icon:{
        fontSize: 35,
        color: 'white'
    },
    title_container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 40
    },
    header_text: {
        textAlign: 'center',
        fontSize: 35,
        color: 'white',
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
    activity: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#003F5C'
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#003F5C',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
        marginTop: 2,
        marginBottom: 2
    },
    backRightBtnLeft: {
        backgroundColor: 'grey',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
})