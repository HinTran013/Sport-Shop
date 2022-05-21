import { database as db } from "../../firebase-config"
import { ref, query, orderByChild, onValue, orderByValue, get } from "firebase/database"

const orderByPrice = (setData) => {
    //weird bug on the orderByChild, so I just sort this array by myself
    const queryOrder = query(ref(db, "data/products"))
    onValue(queryOrder, (snapshot) => {
        let data = snapshot.val()
        
        data.sort((a, b) => a.price - b.price)
        //pop out a weird object in data
        data.pop()

        //callback to the setDataFuncion
        setData(data)
    })
}

export {
    orderByPrice,
};