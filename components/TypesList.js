// /components/TypesList.js

import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image, FlatList } from 'react-native'
import TypeData from '../dbaccess/TypeData'
import { Ionicons } from '@expo/vector-icons'
import { SwipeListView } from 'react-native-swipe-list-view';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default class TypesList extends React.Component {
    
    constructor(props) {
        super(props)

        this.state = {
            dataList: [],
            total: 0,
            isLoading: true
        }
    }

    _initData(){
        let myTypes = new TypeData()

        myTypes.getData().then(val => {
            this.setState({
                dataList: val,
                isLoading: false,
            })
        })

        myTypes.total().then(val => {
            this.setState({
                total: val
            })
        })
    }

    _updateNavigationParams() {
        const navigation = this.props.navigation
        const type = this.props.route.params?.type ?? 'defaultValue'

        const addIconName = ((Platform.OS == 'android') ? 'md-add' : 'ios-add')


        if (Platform.OS === "ios"){
            navigation.setOptions({
                        headerRight: () => <TouchableOpacity style={styles.add_touchable_headerrightbutton}
                                        onPress={() => this._addType()}>
                                        <Ionicons name={addIconName} style={styles.add_image} />
                        </TouchableOpacity>
                })
            }
    }

    componentDidMount(){
        this._initData()
        this._updateNavigationParams()
    }

    _addType = () => {
        // pop up pour ajouter un type
        alert('Adding type')
    }

    //Android dedicated
    _displayFloatingActionButton() {
        const type = this.props.route.params?.type ?? 'defaultValue'

        if (Platform.OS === 'android'){
            return(
            <TouchableOpacity style={styles.add_touchable_floatingactionbutton}
                onPress={() => this._addType()}>
                <Image style={styles.add_image} source={require('../assets/icons/ic_add.png')}/>
            </TouchableOpacity>
            )
        }
    }

    _deleteItem() {
        alert('Deleted')
    }

    _renderItem = data => {
        return(
            <TouchableHighlight style={styles.cell_container}>
                <Text style={styles.main_text}>{data.item.label}</Text>
            </TouchableHighlight>
        )
    }

    _closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey]._closeRow();
        }
    }

    _deleteRow = (rowMap, rowKey) => {
        this._closeRow(rowMap, rowKey);
        this._deleteItem()
    }

    _onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
    }

    _renderHiddenItem = (data, rowMap) => {
        return (
            <View style={styles.rowBack}>
                <Text>Left</Text>
                <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]}
                    onPress={() => this._closeRow(rowMap, data.item.index)} 
                    >
                    <Text style={styles.backTextWhite}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.backRightBtn, styles.backRightBtnRight]}
                    onPress={() => this._deleteRow(rowMap, data.item.index)} 
                    >
                    <Text style={styles.backTextWhite}>Delete</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
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
                        {this.state.total}
                    </Text>
                </View>
                <View style={styles.main_container}>
                    <SwipeListView
                                data={this.state.dataList}
                                renderItem={this._renderItem}
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

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: '#003F5C'
    },
    cell_container: {
        height: 100,
        flex: 1,
        marginTop: 2,
        marginBottom: 2,
        backgroundColor: '#465881',
        justifyContent: 'center',
        alignItems: 'center'
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
    main_data: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 6
    },
    main_text: {
        fontSize: 25,
        margin: 10,
        color: '#FB5B5A'
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        marginTop: 2,
        marginBottom: 2,
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
        backgroundColor: 'blue',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
})