// dbaccess/GlobalData.js

import firebase from '../config/Firebase'

class GlobalData {

    constructor() {
        this.global = firebase.firestore().collection('globalData');
    }

    getGlobal() {
        const dataList = [];

        let query = this.global.get()
        .then(snapshot => {
            if (snapshot.empty) {
            console.log('No global data.');
            return dataList
            }

            snapshot.forEach(myData => {

                const { totalMoney, totalQuantity } = myData.data()
                dataList.push({
                    totalM: totalMoney,
                    totalQ: totalQuantity
                })
            });
        })
        .catch(err => {
            console.log('Error getting globalData', err);
        });

        console.log ('data : ' + dataList)
        return dataList
    }

}

const globalData = new GlobalData()
export default globalData