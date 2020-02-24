// components/MyItem.js

import React from 'react'
import { StyleSheet, TouchableOpacity, Image, View, Text, Platform, Animated } from 'react-native'
import Moment from 'react-moment'
import { Ionicons } from '@expo/vector-icons'
import Swipeable from 'react-native-gesture-handler/Swipeable'

/* TODO:
- Construire le template de la cellule de mes listes
- Penser que la structure doit s'adapter à l'item affiché (Money, Stuff ou People)
*/

class MyItem extends React.Component{

    state= {
        deleteItem: false
    }

    render(){
        const { myItem, displayDetailsForMyItem } = this.props

        let ptfPrefix
        (Platform.OS === 'android') ? ptfPrefix = 'md-' : ptfPrefix = 'ios-'
        const calIconName = ptfPrefix + 'calendar'
        const titleIconName = ptfPrefix + 'create'
        const pplIconName = ptfPrefix + 'contact'
        const trashIconName = ptfPrefix + 'trash'

        const RightActions = (progress, dragX) => {
            const scale = dragX.interpolate({
              inputRange: [-100, 0],
              outputRange: [0.7, 0]
            })

            return (
                <>
                    <TouchableOpacity onPress={() => this.props.deleteItem(myItem.key, 'toto')}>
                        <View
                            style={{ flex: 1, backgroundColor: 'red', justifyContent: 'center' }}>
                            <Animated.Text
                            style={{
                                color: 'white',
                                paddingHorizontal: 25,
                                fontWeight: '600',
                                transform: [{ scale }]
                            }}>
                            <Ionicons name={trashIconName} size={40} color='#FFFFFF' />
                            </Animated.Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.deleteItem(myItem.key, 'toto')}>
                        <View
                            style={{ flex: 1, backgroundColor: 'orange', justifyContent: 'center' }}>
                            <Animated.Text
                            style={{
                                color: 'white',
                                paddingHorizontal: 20,
                                fontWeight: '600',
                                transform: [{ scale }]
                            }}>
                            <Ionicons name='md-create' size={40} color='#FFFFFF' />
                            </Animated.Text>
                        </View>
                    </TouchableOpacity>
                </>
            )
        }

        return(
            <Swipeable renderRightActions={RightActions}>
                <TouchableOpacity 
                    style={styles.main_container}
                    onPress={() => displayDetailsForMyItem(myItem.key)}>

                    <View style={styles.first_line}>
                        <View style={styles.left_part_container}>
                            <View style={styles.date_container}>
                                <Image style={styles.date_bg} source={require('../assets/icons/list_bg.png')} />
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
                    </View>
                </TouchableOpacity>
            </Swipeable>
        )
    }
}

const styles=StyleSheet.create({
    main_container: {
        height: 100,
        flex: 1,
        marginTop: 2,
        marginBottom: 2
    },
    top_left_elmnts: {
        marginLeft: 10,
        marginTop: 5,
        fontSize: 15,
        color: '#FFFFFF'
    },
    top_right_elmnts: {
        marginRight: 10,
        marginTop: 5,
        fontSize: 15,
        color: '#2AA4A8'
    },
    btm_left_elmnts:{
        marginLeft: 10,
        marginBottom: 5,
        fontSize: 15,
        color: '#2AA4A8'
    },
    btm_right_elmnts: {
        marginRight: 10,
        marginBottom: 5,
        fontSize: 15,
        color: '#FFFFFF'
    },
    first_line: {
        flexDirection: 'row',
        width: '100%',
        flex: 2
    },
    date_bg: {
        position: 'absolute'
    },
    date_container: {
        position: 'absolute',
        flexDirection: 'row'
    },
    left_part_container: {
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    right_part_container: {
        width: '50%',
        justifyContent: 'flex-end',
        flexDirection: 'row'
    },
    main_data: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 6
    },
    main_text: {
        fontSize: 25,
        margin: 10,
        color: '#ED6D6D'
    },
    last_row: {
        flexDirection: 'row',
        flex: 2,
        width: '100%'
    }
})

export default MyItem