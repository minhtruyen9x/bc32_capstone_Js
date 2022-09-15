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

            // duyệt mảng data để duyệt qua các filter của object filter
            data.forEach(item => {
                // cấu trúc filterObject   
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
                    // Mặc định dữ liệu nào không phù hợp trong quá trình filter sẽ bỏ qua( return ) và tiếp tục xét
                    // dữ liệu tiếp theo 

                    // filter theo kiểu checkbox thì giá trị sẽ là 1 mảng các giá trị hợp lệ
                    if (Array.isArray(filter[type])) {
                        let count = 0;
                        for (const value of filter[type]) {
                            if (item[type] !== value) {
                                count++;
                            }
                        }
                        if (count === filter[type].length) return
                    }

                    // filter theo kiểu sort,range thì giá trị sẽ là 1object có 
                    // {key: value } key :là kiểu sort hay kiểu range(lớn hơn hoặc bé hơn), 
                    //               value: là giá trị sortup hay sortdown, hoặc giá trị của kiểu so sánh range
                    else if (typeof filter[type] === "object") {
                        const greaterValue = filter[type].$gt || Number.MIN_VALUE
                        const lesserValue = filter[type].$lt || Number.MAX_VALUE
                        isSort = filter[type].$sort ? { [type]: filter[type].$sort } : false

                        if (item[type] < greaterValue) {
                            console.log("không cho vào mảng")
                            return
                        }
                        if (item[type] > lesserValue) {
                            console.log("không cho vào mang")
                            return
                        }
                    }

                    // filter theo kiểu 1 cặp ,key : value hợp lệ
                    else {
                        if (item[type] !== filter[type]) return
                    }
                }
                items.push(item)
            })

            if (items.length !== 0) {
                // kiểm tra xem có cần sort hay không nếu có thì sort trước khi trả về data
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

// Test thử : apiGetProductByValue({ views: { $gt: 1 } }).then(data => console.log(data))

export { apiGetProducts, apiGetProductByID, apiAddProduct, apiUpdateProduct, apiDeleteProduct, apiGetProductByValue }





