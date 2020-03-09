// dbaccess/TypeData.js

import firebase from '../config/Firebase'

export default class TypeData {

    constructor() {
        this.type = firebase.firestore().collection('type');
    }

    // async function puisque react fonctionne de la sorte. Il ne peut donc transmettre de façon dynamique des données
    // entre les classes (sinon il pourrait attendre indéfiniment). Il faut ensuite récupérer la promise de l'autre côté.
    async getTypeData() {
        const typeList = []

        let query = await this.type.get()
        .then(snapshot => {
            if (snapshot.empty) {
            console.log('No type data.');
            return typeList
            }  

            snapshot.forEach(type => {
            
                const { label } = type.data()
                typeList.push({
                    key: type.id,
                    label
                })
            })
        })
        .catch(err => {
            console.log('Error getting type data : ', err);
        });

        return typeList
    }

    async totalTypes() {
        let totalTypes = 0

        let query = await this.type.get()
        .then(snapshot => {
            if (snapshot.empty) {
            console.log('No type data.')
            return [];
            }  

            snapshot.forEach(type => {
                totalTypes ++
            })
        })
        .catch(err => {
            console.log('Error getting type data : ', err);
        })
        return totalTypes
    }

    addType(label) {
        // Ajout du prêt d'objet en BDD
        this.type.add({
            label: label
        }).then((docRef) => {
            console.log("type added to db")
        })
        .catch((error) => {
            console.error("Error adding type : ", error);
        });
    }

    deleteType(key) {
        this.type.doc(key).delete()
        .catch((error) => {
            console.error("Error deleting type : ", error);
        });
    }

}