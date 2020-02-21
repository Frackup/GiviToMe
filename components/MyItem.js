// components/MyItem.js

import React from 'react'
import { StyleSheet, TouchableOpacity, Image, View, Text, Platform } from 'react-native'
import Moment from 'react-moment'
import { Ionicons } from '@expo/vector-icons'

/* TODO:
- Construire le template de la cellule de mes listes
- Penser que la structure doit s'adapter à l'item affiché (Money, Stuff ou People)
*/

class MyItem extends React.Component{

    _peopleRendering(){
        const { myItem, itemType, displayDetailsForMyItem } = this.props
        return(
            <TouchableOpacity 
                style={styles.main_container}
                onPress={() => displayDetailsForMyItem(myItem.id, itemType)}>
                <View style={styles.image_container}>
                    <Image style={styles.image} source={require('../assets/icons/ic_people.png')}/>
                </View>
                <View style={styles.main_data_view}>
                    <Text style={styles.main_text}>Prénom</Text>
                    <Text style={styles.main_text}>Nom</Text>
                </View>
                <View style={styles.content_container}>
                    <View style={styles.line_in_content}>
                        <Image style={styles.icon} source={require('../assets/icons/ic_money.png')}/>
                        <Text style={styles.title_text}>X XXX €</Text>
                    </View>
                    <View style={styles.line_in_content}>
                        <Image style={styles.icon} source={require('../assets/icons/ic_box.png')}/>
                        <Text style={styles.title_text}>X XXX objets</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    _stuffOrMoneyRendering(){
        const { myItem, displayDetailsForMyItem } = this.props
        return(
            <TouchableOpacity 
                style={styles.main_container}
                onPress={() => displayDetailsForMyItem(myItem.key)}>
                <View style={styles.image_container}>
                    <Image style={styles.image} source={require('../assets/icons/ic_money.png')}/>
                </View>
                <View style={styles.main_data_view}>
                    <Text style={styles.main_text}>
                        {(this.props.itemType === 'Money') ? myItem.amount + " €" : myItem.quantity + " Objets"}
                    </Text>
                </View>
                <View style={styles.content_container}>
                    <View style={styles.line_in_content}>
                        <Image style={styles.icon} source={require('../assets/icons/ic_people.png')}/>
                        <Text style={styles.title_text}>{myItem.title}</Text>
                    </View>
                    <View style={styles.line_in_content}>
                        <Image style={styles.icon} source={require('../assets/icons/ic_box.png')}/>
                        <Moment style={styles.title_text} element={Text} format="DD/MM/YYYY" date={myItem.date}/>
                    </View>
                    <View style={styles.line_in_content}>
                        <Image style={styles.icon} source={require('../assets/icons/ic_people.png')}/>
                        <Text style={styles.title_text}>{myItem.people}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    _stuffOrMoneyRendering2(){
        const { myItem, displayDetailsForMyItem } = this.props

        let ptfPrefix
        (Platform.OS === 'android') ? ptfPrefix = 'md-' : ptfPrefix = 'ios-'
        const calIconName = ptfPrefix + 'calendar'
        const titleIconName = ptfPrefix + 'create'
        const pplIconName = ptfPrefix + 'contact'

        return(
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
        )
    }

    render(){
        return(
            <View style={styles.main_container}>
                {(this.props.itemType === 'People') ? this._peopleRendering() : this._stuffOrMoneyRendering2()}
            </View>
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
    image: {
        width: 45,
        height: 45,
        margin: 5,
    },
    image_container: {
        justifyContent: "center",
        alignItems: "center",
        flex: 2.5
    },
    main_data_view:{
        margin: 5,
        flex: 2.5,
        alignItems: "center",
        justifyContent: "center"
    },
    main_text2: {
        fontSize: 14,
        margin: 10,
    },
    icon: {
        width: 20,
        height: 20,
        margin: 5
    },
    numeric_data: {

    },
    content_container: {
        margin: 5,
        flex: 5,
        justifyContent: "center"
    },
    line_in_content: {
        flexDirection: 'row',
        alignItems: "center"
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
        fontSize: 35,
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