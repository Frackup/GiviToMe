// dbaccess/StuffAccess.js

import firebase from '../config/Firebase'

class StuffAccess {

    constructor() {
        this.stuff = firebase.firestore().collection('stuff');
    }

    getStuffData(){
        const stuffList = [];

        let query = this.stuff.get()
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

        console.log('stufflist : ' + stuffList)
        return stuffList
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

const stuffAccess = new StuffAccess();
export default stuffAccess
