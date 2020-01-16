// components/AddMoney.js

import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

/*TODO:
- Afficher le formulaire d'ajout d'un prêt d'argent
- Etudier la sauvegarde des données (base téléphone ? Cloud ?)
*/

class AddMoney extends React.Component {
    render(){
        return(
            <View style={styles.main_view}>
                <Text style={styles.text_view}>This is the money adding Page !!</Text>
                <TextInput>Montant</TextInput>
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

export default AddMoney