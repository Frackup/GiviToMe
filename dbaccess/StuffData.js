// dbaccess/StuffData.js

import firebase from '../config/Firebase'

export default class StuffData {

    constructor() {
        this.stuff = firebase.firestore().collection('stuff');

    }

    // async function puisque react fonctionne de la sorte. Il ne peut donc transmettre de façon dynamique des données
    // entre les classes (sinon il pourrait attendre indéfiniment). Il faut ensuite récupérer la promise de l'autre côté.
    async getStuffData() {
        const stuffList = []

        let query = await this.stuff.get()
        .then(snapshot => {
            if (snapshot.empty) {
            console.log('No stuff data.');
            return stuffList
            }  

            snapshot.forEach(stuff => {
            
                const { title, quantity, date, people, type } = stuff.data()
                stuffList.push({
                    key: stuff.id,
                    title,
                    quantity,
                    date: (date.toString().length > 0) ? new Date(date.seconds*1000) : new Date(),
                    people,
                    type
                })
            })
        })
        .catch(err => {
            console.log('Error getting stuff data : ', err);
        });

        return stuffList
    }

    async totalStuff() {
        let totalQuantity = 0

        let query = await this.stuff.get()
        .then(snapshot => {
            if (snapshot.empty) {
            console.log('No stuff data.')
            return [];
            }  

            snapshot.forEach(stuff => {
                totalQuantity += parseInt(stuff.data().quantity)
            })
        })
        .catch(err => {
            console.log('Error getting stuff data : ', err);
        })
        return totalQuantity
    }

    addStuff(title, quantity, date, people, type) {
        // Ajout du prêt d'objet en BDD
        this.stuff.add({
            title: title,
            quantity: quantity,
            date: date,
            people: people,
            type: type
        }).then((docRef) => {
            console.log("stuff added to db")
        })
        .catch((error) => {
            console.error("Error adding stuff : ", error);
        });
    }

    deleteStuff(key) {
        this.stuff.doc(key).delete()
        .catch((error) => {
            console.error("Error deleting stuff : ", error);
        });
    }
}
