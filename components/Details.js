// components/Money.js

import React from 'react'
import { StyleSheet, View, Text, Image, Platform, FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import MyItem from './MyItem'
import fakeMoneyData from '../helpers/fakeMoneyData'

/*TODO:
- permettre de supprimer un prêt d'argent ou d'objet
- permettre de parcourir la liste des prêts d'argent ou d'objet réalisés et de l'ordonner selon certains critères 
- (par montant, date, type, ...)
*/

class Details extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state

        if (Platform.OS === "ios" && navigation.getParam('type') !== 'People'){
            return {
                headerRight: () => <TouchableOpacity style={styles.add_touchable_headerrightbutton}
                                onPress={() => params.addItem()}>
                                <Image style={styles.add_image}
                                source={require('../assets/ic_add.png')} />
                </TouchableOpacity>
            }
        }
    }

    constructor(props) {
        super(props)
        this._addItem = this._addItem.bind(this)
        this.state = { 
            moneyList: [],
            stuffList: [],
            peopleList: []
        }
    }

    _updateNavigationParams() {
        this.props.navigation.setParams({
          addItem: this._addItem
        })
    }

    componentDidMount(){
        this._updateNavigationParams()
    }

    _addItem(){
        // Créer la fonction pour permettre d'ajouter soit un prêt d'argent ou un prêt d'objet.
        if (this.props.navigation.getParam('type') === 'Money'){
            this.props.navigation.navigate('AddMoney')
        } else {
            this.props.navigation.navigate('AddStuff')
        }
    }

    //Android dedicated
    _displayFloatingActionButton() {
        if (Platform.OS === 'android' && this.props.navigation.getParam('type') !== 'People'){
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

    _displayDetailsForMyItem = (idItem) => {
        this.props.navigation.navigate('myItem', { idMyItem: idMyItem, type: this.props.navigation.getParam('type') })
    }

    _displayDataList(){

        if (this.props.navigation.getParam('type') === 'Money') {
            return this.props.moneyList
        } else if (this.props.navigation.getParam('type') === 'Stuff') {
            return this.props.stuffList
        } else {
            return this.props.peopleList
        }
/*
        return(
            <FlatList
                style={styles.list}
                data={mesDonnees}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <MyItem 
                    myItem={item}
                    displayDetailsForMyItem={this._displayDetailsForMyItem}/>}
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                }}
            />
        )
        */
    }

    render(){
        /*
        return(
            <View style={styles.main_container}>
                {this._checkData()}
                {this._displayFloatingActionButton()}
            </View>
        )*/

        return(
            <FlatList
                style={styles.list}
                data={fakeMoneyData}
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
    }
})

export default Details