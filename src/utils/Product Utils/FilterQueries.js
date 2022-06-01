import { database as db } from "../../firebase-config"
import { ref, query, onValue, startAt, orderByChild, startAfter } from "firebase/database"

// const filterBySize = (setData, size) => {

//     const queryFilter = query(ref(db, "data/products"))
//     onValue(queryFilter, (snapshot) => {
//         let data = snapshot.val()
//         //to pop the first object which is undefined
//         data.shift()

//         if(size != "All")
//             data = data.filter((item) => item.size == size)
        
//         setData(data)
//     })
// }

const filterByAll = (setData, filter ) => {

    const queryFilter = query(ref(db, "data/products"))
    onValue(queryFilter, (snapshot) => {
        let data = snapshot.val()
        //to pop the first object which is undefined
        data.shift()

        if (filter.keyword != "All" && filter.keyword != "") {
            data = data.filter((item) => {
                let a = item.name.toLowerCase()
                let b = filter.keyword.toLowerCase()
                return a.includes(b)
            })
        }

        if (filter.tag != "All" && filter.tag != "") {
            data = data.filter((item) => {
                let a = item.tag.toLowerCase()
                let b = filter.tag.toLowerCase()
                return a == b
            })
        }

        data = data.filter((item) =>
            item.price >= filter.price[0] && item.price <= filter.price[1])
        
        if (filter.sizes != "All") {
            data = data.filter((item) => item.sizes.includes(filter.sizes.toLowerCase()))
        }
            
        
        if(filter.color != "")
            data = data.filter((item) => item.colors.includes(filter.color))

        if (filter.category != "All")
            data = data.filter((item) => item.category == filter.category)

        setData(data)
    })
}

const orderByPopular = (setData, data) => {
    let listData = Object.values(data)

    listData.sort((a, b) => a.id - b.id)
    
    setData(listData)
}

const orderByPrice = (setData, byOrder = "increase", data) => {
    //weird bug on the orderByChild, so I just sort this array by myself
    // const queryOrder = query(ref(db, "data/products"))
    // onValue(queryOrder, (snapshot) => {
    //     let data = snapshot.val()
        
    //     if(byOrder == "increase")
    //         data.sort((a, b) => a.price - b.price)
    //     else if (byOrder = "decrease")
    //         data.sort((a, b) => b.price - a.price)
        
    //     //pop out a weird object in data
    //     data.pop()

    //     //callback to the setDataFuncion
    //     setData(data)
    // })

    let listData = Object.values(data)

    if(byOrder == "increase")
        listData.sort((a, b) => a.price - b.price)
    else if (byOrder = "decrease")
        listData.sort((a, b) => b.price - a.price)
        
    setData(listData)
}

const orderByRating = (setData, byOrder = "increase", data) => {
    let listData = Object.values(data)

    if(byOrder == "increase")
        listData.sort((a, b) => a.totalRating - b.totalRating)
    else if (byOrder = "decrease")
        listData.sort((a, b) => b.totalRating - a.totalRating)
        
    setData(listData)
}

export {
    filterByAll,
    orderByPopular,
    orderByPrice,
    orderByRating
};