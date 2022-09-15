class ProductManager {
    constructor() {
        this.products = []
    }

    add(product) {
        this.products.push(product)
    }

    delete(productId) {
        this.products = this.products.filter(item => item.id !== productId)
    }

    update(productId, product) {
        this.products = this.products.map(item => {
            if (productId === item.id) {
                return product
            }
            return item
        })
    }

    findById(productId) {
        return this.products.find(product => product.id === productId)
    }


}

export default ProductManager