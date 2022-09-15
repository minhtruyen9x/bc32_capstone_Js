import CartProduct from "./CartProduct.js"
import Product from "./Product.js"
const CART_KEY = "Cart Items"

class CartManager {
    constructor() {
        this.items = this.getCartItems() || []
    }

    addItem(item) {
        this.items.push(item)
    }

    deleteItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId)
    }

    increasQuantity(itemId, quantity = 1) {
        const item = this.findItemById(itemId)
        item.quantity += quantity;
    }

    decreaseQuantity(itemId) {
        const item = this.findItemById(itemId)
        if (item.quantity === 1) return
        item.quantity--;
    }

    findItemById(itemId) {
        const item = this.items.find(item => item.id === itemId)
        return item
    }

    clearCart() {
        this.items = []
    }

    saveCartItems() {
        localStorage.setItem(CART_KEY, JSON.stringify(this.items))
    }

    getCartItems() {
        const data = JSON.parse(localStorage.getItem(CART_KEY))
        if (!data) return undefined
        return data.map(item => {
            const { id, productCode, name, price, screen, backCamera, frontCamera, img, desc, brand, views, solds } = item.product
            return new CartProduct(new Product(id, productCode, name, price, screen, backCamera, frontCamera, img, desc, brand, views, solds), item.quantity)
        })
    }
    calcTotalPrice() {
        return this.items.reduce((result, item) => {
            return result + item.calcPrice()
        }, 0)
    }
}


export default CartManager