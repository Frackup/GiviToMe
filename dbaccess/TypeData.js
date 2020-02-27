// dbaccess/TypeData.js

import firebase from '../config/Firebase'

class TypeData {

    constructor() {
        this.type = firebase.firestore().collection('type');
    }

}

const typeData = new TypeData()
export default typeData