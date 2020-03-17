// components/MyItem.js

import React from 'react'
import { StyleSheet, Image, View, Text, Platform, Animated, TouchableOpacity, TouchableHighlight } from 'react-native'
import Moment from 'react-moment'
import { Ionicons } from '@expo/vector-icons'
import Swipeable from 'react-native-gesture-handler/Swipeable'

class MyItem extends React.Component{

    state= {
        deleteItem: false,
    }

    render(){
        const { myItem, displayDetailsForMyItem, itemType } = this.props
        let showType = false
        let type = ""
        if (itemType === "Stuff") {
            showType = true
            type = myItem.type
        }

        let ptfPrefix
        (Platform.OS === 'android') ? ptfPrefix = 'md-' : ptfPrefix = 'ios-'
        const calIconName = ptfPrefix + 'calendar'
        const titleIconName = ptfPrefix + 'create'
        const pplIconName = ptfPrefix + 'contact'

        return(
            <TouchableHighlight 
                style={styles.main_container}
                //onPress={() => displayDetailsForMyItem(myItem.key)}
            >
                <View style={styles.main_container}>
                    <View style={styles.first_line}>
                        <View style={styles.left_part_container}>
                            <Image style={styles.date_bg} source={require('../assets/icons/list_bg.png')} />
                            <View style={styles.date_container}>
                                <Ionicons name={calIconName} style={styles.top_left_elmnts} />
                                <Moment style={styles.top_left_elmnts} element={Text} format="DD/MM/YYYY" date={myItem.date} />
                            </View>
                        </View>
                        <View style={styles.right_part_container}>
                            <Text style={styles.top_right_elmnts}>{myItem.title}</Text>
                            <Ionicons name={titleIconName} style={styles.top_right_elmnts} />
                        </View>
                    </View>

                    <View style={styles.main_data}>
                        <Text style={styles.main_text}>
                            {(this.props.itemType === 'Money') ? myItem.amount + " €" : myItem.quantity + " Objets"}
                        </Text>
                    </View>

                    <View style={styles.last_row}>
                        <View style={styles.left_part_container}>
                            <Ionicons name={pplIconName} style={styles.btm_left_elmnts} />
                            <Text style={styles.btm_left_elmnts}>{myItem.people}</Text>
                        </View>
                        { showType &&
                        <View style={styles.right_part_container}>
                            <Image style={styles.date_bg} source={require('../assets/icons/list_bg_type.png')} />
                            <View style={styles.date_container}>
                                <Text style={styles.btm_right_elmnts}>{type}</Text>
                                <Ionicons name={calIconName} style={styles.btm_right_elmnts} />
                            </View>
                        </View>
                        }
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}

const styles=StyleSheet.create({
    main_container: {
        height: 100,
        flex: 1,
        marginTop: 2,
        marginBottom: 2,
        backgroundColor: '#465881'
    },
    top_left_elmnts: {
        marginLeft: 10,
        fontSize: 15,
        color: 'white'
    },
    top_right_elmnts: {
        marginRight: 10,
        fontSize: 15,
        color: 'white'
    },
    btm_left_elmnts:{
        marginLeft: 10,
        fontSize: 15,
        color: 'white'
    },
    btm_right_elmnts: {
        marginRight: 10,
        fontSize: 15,
        color: 'white'
    },
    first_line: {
        flexDirection: 'row',
        width: '100%',
        flex: 2,
        marginTop: 4
    },
    date_bg: {
        position: 'absolute'
    },
    date_container: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center'
    },
    left_part_container: {
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    right_part_container: {
        width: '50%',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center'
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
    last_row: {
        flexDirection: 'row',
        flex: 2,
        width: '100%',
        marginBottom: 4
    }
})

export default MyItem