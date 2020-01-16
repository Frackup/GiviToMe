// components/AddStuff.js

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

/*TODO:
- Afficher le formulaire d'ajout d'un prêt d'objet
*/

class AddStuff extends React.Component {
    render(){
        return(
            <View style={styles.main_view}>
                <Text style={styles.text_view}>This is the Stuff adding page!!</Text>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    main_view: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    text_view: {
        textAlign: 'center',
        fontSize: 14,
        marginTop: 6
    }
})

export default AddStuff