// dbaccess/MoneyData.js

import firebase from '../config/Firebase'

class MoneyData {

    constructor() {
        this.money = firebase.firestore().collection('money');
    }

    getMoneyData(){
        const moneyList = [];

        let query = this.money.get()
        .then(snapshot => {
            if (snapshot.empty) {
            console.log('No money data.');
            return;
            }  

            snapshot.forEach(money => {
            
                const { title, amount, date, people } = money.data()
                moneyList.push({
                    key: money.id,
                    title,
                    amount,
                    date: (date.toString().length > 0) ? new Date(date.seconds*1000) : new Date(),
                    people
                })
            })
        })
        .catch(err => {
            console.log('Error getting money data : ', err);
        });

        return moneyList
    }

    addMoney(title, amount, date, people) {
        // Ajout du prêt d'argent en BDD
        this.money.add({
            title: title,
            amount: amount,
            date: date,
            people: people
        }).then((docRef) => {
            console.log("money added to db")
        })
        .catch((error) => {
            console.error("Error adding money : ", error);
        });
    }

    deleteMoney(key) {
        this.money.doc(key).delete()
        .catch((error) => {
            console.error("Error deleting money : ", error);
        });
    }

}

const moneyData = new MoneyData()
export default moneyData