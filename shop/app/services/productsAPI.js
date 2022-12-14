function apiGetProducts(searchTerm) {
    return axios(
        {
            url: "https://62f50942535c0c50e7684902.mockapi.io/capstone-products",
            method: "GET",
            params: {
                name: searchTerm
            }
        })
        .catch(error => {
            console.log("There is something wrong with call request at Folder services/productsAPI.js !")
            return Promise.reject()
        })
}

function apiGetProductByID(id) {
    return axios(
        {
            url: `https://62f50942535c0c50e7684902.mockapi.io/capstone-products/${id}`,
            method: "GET"
        })
        .catch(error => {
            console.log("There is something wrong with call request at Folder services/productsAPI.js !")
            return Promise.reject()
        })
}

function apiAddProduct(product) {
    console.log(product)
    return axios(
        {
            url: "https://62f50942535c0c50e7684902.mockapi.io/capstone-products",
            method: "POST",
            data: product
        })
        .catch(error => {
            console.log("There is something wrong with call request at Folder services/productsAPI.js !")
            return Promise.reject()
        })
}

function apiUpdateProduct(product, id) {
    return axios(
        {
            url: `https://62f50942535c0c50e7684902.mockapi.io/capstone-products/${id}`,
            method: "PUT",
            data: product
        })
        .catch(error => {
            console.log("There is something wrong with call request at Folder services/productsAPI.js !")
            return Promise.reject()
        })
}

function apiDeleteProduct(id) {
    return axios(
        {
            url: `https://62f50942535c0c50e7684902.mockapi.io/capstone-products/${id}`,
            method: "DELETE"
        })
        .catch(error => {
            console.log("There is something wrong with call request!")
            return Promise.reject()
        })
}

function apiGetProductByValue({ ...filter }) {
    return axios(
        {
            url: "https://62f50942535c0c50e7684902.mockapi.io/capstone-products",
            method: "GET"
        })
        .catch(error => {
            console.log("There is something wrong with call request at Folder services/productsAPI.js !")
            return Promise.reject()
        })
        .then(res => {
            const { data } = res
            const items = []
            let isSort = false

            // duy???t m???ng data ????? duy???t qua c??c filter c???a object filter
            data.forEach(item => {
                // c???u tr??c filterObject   
                //             {
                //                 key:value,
                //                 key: [value,value]
                //                 key:{
                //                     $gt:value,
                //                     $lt:value,
                //                     $sort: "up"
                //                     $sort: "down"
                //                 }
                //             }
                for (const type in filter) {
                    // M???c ?????nh d??? li???u n??o kh??ng ph?? h???p trong qu?? tr??nh filter s??? b??? qua( return ) v?? ti???p t???c x??t
                    // d??? li???u ti???p theo 

                    // filter theo ki???u checkbox th?? gi?? tr??? s??? l?? 1 m???ng c??c gi?? tr??? h???p l???
                    if (Array.isArray(filter[type])) {
                        let count = 0;
                        for (const value of filter[type]) {
                            if (item[type] !== value) {
                                count++;
                            }
                        }
                        if (count === filter[type].length) return
                    }

                    // filter theo ki???u sort,range th?? gi?? tr??? s??? l?? 1object c?? 
                    // {key: value } key :l?? ki???u sort hay ki???u range(l???n h??n ho???c b?? h??n), 
                    //               value: l?? gi?? tr??? sortup hay sortdown, ho???c gi?? tr??? c???a ki???u so s??nh range
                    else if (typeof filter[type] === "object") {
                        const greaterValue = filter[type].$gt || Number.MIN_VALUE
                        const lesserValue = filter[type].$lt || Number.MAX_VALUE
                        isSort = filter[type].$sort ? { [type]: filter[type].$sort } : false

                        if (item[type] < greaterValue) {
                            console.log("kh??ng cho v??o m???ng")
                            return
                        }
                        if (item[type] > lesserValue) {
                            console.log("kh??ng cho v??o mang")
                            return
                        }
                    }

                    // filter theo ki???u 1 c???p ,key : value h???p l???
                    else {
                        if (item[type] !== filter[type]) return
                    }
                }
                items.push(item)
            })

            if (items.length !== 0) {
                // ki???m tra xem c?? c???n sort hay kh??ng n???u c?? th?? sort tr?????c khi tr??? v??? data
                if (isSort) {
                    items.sort((a, b) => {
                        const [typeSort] = Object.keys(isSort)
                        if (isSort[typeSort] === "sortup") {
                            return a[typeSort] - b[typeSort]
                        }
                        else if (isSort[typeSort] === "sortdown") {
                            return b[typeSort] - a[typeSort]
                        }
                    })
                }
                res.data = items
                return Promise.resolve(res)
            }
            else {
                return Promise.reject("NOT FOUND")
            }
        })
}

// Test th??? : apiGetProductByValue({ views: { $gt: 1 } }).then(data => console.log(data))

export { apiGetProducts, apiGetProductByID, apiAddProduct, apiUpdateProduct, apiDeleteProduct, apiGetProductByValue }





