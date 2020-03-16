// components/Test.js

import React from 'react'
import { StyleSheet, View, Image, Platform, Animated, ActivityIndicator, Text } from 'react-native'
import { TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import StuffData from '../dbaccess/StuffData'
import MoneyData from '../dbaccess/MoneyData'
import Moment from 'react-moment'
import MyItem from './MyItem'
import SwipeValueBasedUi from '../functions/SwipeValueBasedUI'

import { SwipeListView } from 'react-native-swipe-list-view';

/*TODO:
- permettre de parcourir la liste des prêts d'argent ou d'objet réalisés et de l'ordonner selon certains critères 
- (par montant, date, type, ...)
- PErmettre d'éditer un prêt
*/

class Test extends React.Component {

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
        const type = 'Money'

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
        this._initData()
    }

    _addItem = () => {
        const type = 'Money'

        if (type === 'Money'){
            this.props.navigation.navigate('AddMoney')
        } else {
            this.props.navigation.navigate('AddStuff')
        }
    }

    //Android dedicated
    _displayFloatingActionButton() {
        const type = 'Money'

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

    _deleteItem = (idItem, type) => {
        this.state.mydataObject.delete(idItem)
        this.setState({
            dataList: this.state.moneyList.filter(item => item.key != idItem)
        })

        alert(type + ' deleted')        
    }

    _closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey]._closeRow();
        }
    }

    _deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        this._deleteItem()
    }

    _onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
    }

    _renderItem = data => {
        return(
            <TouchableHighlight
                //onPress={() => console.log('You touched me')}
                style={styles.rowFront}
                underlayColor={'#AAAJJJ'}
            >
                <View>
                    <Text>I am {data.item.title} in a SwipeListView</Text>
                </View>
            </TouchableHighlight>
        )
    }

    _renderHiddenItem = (data, rowMap) => {
        return (
            <View style={styles.rowBack}>
                <Text style={styles.toto}>Left</Text>
                <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]}
                    onPress={() => this._closeRow(rowMap, data.item.index)} >
                    <Text style={styles.backTextWhite}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.backRightBtn, styles.backRightBtnRight]}
                    onPress={() => this._deleteRow(rowMap, data.item.index)} >
                    <Text style={styles.backTextWhite}>Delete</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render(){
        const type = 'Money'

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
                            displayDetailsForMyItem={this._displayDetailsForMyItem}
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
                {/*
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
                */}
            </View>
        )
    }
}

const styles=StyleSheet.create({
    toto: {
        color: 'white'
    },
    main_container: {
        flex: 1,
        backgroundColor: '#003F5C'
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
    list: {
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
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
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
    },
    backRightBtnLeft: {
        alignSelf: 'flex-end',
        backgroundColor: 'blue',
        //right: 55,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
    trash: {
        height: 25,
        width: 25,
    },
})

export default Test