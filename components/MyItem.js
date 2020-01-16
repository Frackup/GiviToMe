// components/MyItem.js

import React from 'react'
import { StyleSheet, TouchableOpacity, Image, View, Text } from 'react-native'

/* TODO:
- Construire le template de la cellule de mes listes
- Penser que la structure doit s'adapter à l'item affiché (Money, Stuff ou People)
*/

class MyItem extends React.Component{

    _peopleRendering(){
        const { myItem, displayDetailsForMyItem } = this.props
        return(
            <TouchableOpacity 
                style={styles.main_container}
                onPress={() => displayDetailsForMyItem(myItem.id)}>
                <View style={styles.image_container}>
                    <Image style={styles.image} source={require('../assets/ic_people.png')}/>
                </View>
                <View style={styles.main_data_view}>
                    <Text style={styles.main_text}>Prénom</Text>
                    <Text style={styles.main_text}>Nom</Text>
                </View>
                <View style={styles.content_container}>
                    <View style={styles.line_in_content}>
                        <Image style={styles.icon} source={require('../assets/ic_money.png')}/>
                        <Text style={styles.title_text}>X XXX €</Text>
                    </View>
                    <View style={styles.line_in_content}>
                        <Image style={styles.icon} source={require('../assets/ic_box.png')}/>
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
                onPress={() => displayDetailsForMyItem(myItem.id)}>
                <View style={styles.image_container}>
                    <Image style={styles.image} source={require('../assets/ic_money.png')}/>
                </View>
                <View style={styles.main_data_view}>
                    <Text style={styles.main_text}>
                        {(this.props.itemType === 'Money') ? myItem.amount + " €" : myItem.quantity + " Objets"}
                    </Text>
                </View>
                <View style={styles.content_container}>
                    <View style={styles.line_in_content}>
                        <Image style={styles.icon} source={require('../assets/ic_people.png')}/>
                        <Text style={styles.title_text}>{myItem.title}</Text>
                    </View>
                    <View style={styles.line_in_content}>
                        <Image style={styles.icon} source={require('../assets/ic_box.png')}/>
                        <Text style={styles.title_text}>{myItem.date}</Text>
                    </View>
                    <View style={styles.line_in_content}>
                        <Image style={styles.icon} source={require('../assets/ic_people.png')}/>
                        <Text style={styles.title_text}>{myItem.people}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render(){
        return(
            <View style={styles.main_container}>
                {(this.props.itemType === 'People') ? this._peopleRendering() : this._stuffOrMoneyRendering()}
            </View>
        )
    }
}

const styles=StyleSheet.create({
    main_container: {
        height: 100,
        flexDirection: "row",
        flex: 1
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
    main_text: {
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
})

export default MyItem