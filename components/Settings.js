// components/Settings.js

import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import TypeData from '../dbaccess/TypeData'

export default class Settings extends React.Component {
    
    constructor(props){
        super(props)

        this.state = { 
            totalTypes: 0,
        }
    }

    _getData() {
        let myTypes = new TypeData();
        myTypes.total().then(val => { this.setState({
            totalTypes: val
            })
        })
        .catch(error => {
            console.error(error)
        })
    }

    componentDidMount(){
        const { navigation } = this.props

        this.focusListener = navigation.addListener('focus', () => {
            this._getData()
        });
    }

    _typesList(){
        this.props.navigation.navigate('TypesList')
    }

    render(){
        
        const ptfType = (Platform.OS === 'android') ? 'md-' : 'ios-'
        const goType = ptfType + 'arrow-dropright'

        return(
            <View style={styles.main_container}>
                <View style={styles.types_view}>
                    <View style={styles.types_header}>
                        <Image source={require('../assets/icons/dash.png')}/>
                        <Text style={styles.types_title}>Nombre de types</Text>
                    </View>
                    <View style={styles.types_content}>
                        <Image source={require('../assets/icons/cadre.png')} style={styles.cadre} />
                        <Text style={styles.types_text}>{this.state.totalTypes}</Text>
                        <TouchableOpacity style={styles.add_button} onPress={() => {this._typesList()}}>
                            <Ionicons name={goType} style={styles.icon_style} />
                        </TouchableOpacity>
                    </View>
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
    title_text: {
        color: 'white'
    },
    types_view: {
        flex: 3,
        justifyContent: 'flex-start'
    },
    types_header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20
    },
    types_title: {
        fontSize: 25,
        marginLeft: 10,
        color: 'white',
    },
    types_text: {
        fontSize: 25,
        marginLeft: 10,
        position: 'absolute',
        color: 'white',
    },
    types_content: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        marginBottom: 10,
        marginTop: 10
    },
    cadre: {
        position: 'absolute',
        marginRight: 10,
    },
    add_button: {
        alignSelf: 'flex-end',
        marginRight: 40
    },
    icon_style: {
        fontSize: 60,
        color: 'white'
    },
})