class CartProduct {
    constructor(product, quantity) {
        this.id = product.id
        this.product = product
        this.quantity = quantity || 1
    }
    calcPrice() {
        return this.product.price * this.quantity
    }
}

export default CartProduct