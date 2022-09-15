import ProductManager from "../model/ProductManager.js"
import CartManager from "../model/CartManager.js";
import CartProduct from "../model/CartProduct.js";
import { getProductByID, getProductByValue, getProducts } from "../model/Product.js";

let productManager = new ProductManager()
let cartManager = new CartManager()

//=====================================================
//       Tạo hàm render các sản phẩm ra giao diện
//         từ thông tin nhận được khi gọi API
//=====================================================

// Hàm render ra các sản phẩm ra giao diện
function renderProducts(products) {
    let htmls = products.reduce((result, product) => {
        return result + `
            <div class="col-6 col-sm-4 col-lg-3 product" data-id=${product.id}>
                <h4 class="product__type"><a href="#">${product.brand}</a></h4>
                <h3 class="product__name">
                    <a class="text-overflow" href="#">${product.name}</a>
                </h3>
                <div class="product__img">
                    <a href="#">
                        <img src="${product.img}"
                            alt="">
                    </a>
                </div>
                <div class="product__price-wrap">
                    <div class="product__price">
                        <span class="product__price-discount">$${product.price}</span>
                        <span class="product__price-normal">$3500.00</span>
                    </div>
                    <span class="product__cart-icon" data-cart-type="addCart">
                        <i class='bx bx-cart-download'></i>
                    </span>
                </div>
                <div class="product__interact">
                    <div class="product__preview-icon" data-toggle="modal"
                        data-target="#previewModal">
                        <i class='bx bx-show-alt'></i>
                        View
                    </div>
                    <div class="product__like-icon">
                        <i class='bx bx-heart'></i>
                        Wishlist
                    </div>
                </div>
                <div class="product__discount-label">🔥🔥</div>
                <div class="product__overlay"></div>
            </div>
        `
    }, "")
    if (!htmls) htmls = "<div class='product__empty'>Nothing found</div>"
    productManager.products = products
    dom("#products").innerHTML = htmls
}

// Hàm render ra preview modal ra giao diện để xem nhiều thông tin hơn
function renderPreview(product) {
    const { id, productCode, name, price, screen, backCamera, frontCamera, img, desc, brand } = product
    const htmls = `
        <div class="preview" data-id=${id}>
            <div class="container-fluid preview__wrap">
                <div class="row">
                    <div class="col-12 col-lg-5 mb-lg-4">
                        <img onerror="this.src='../../assets/img/error.png.webp'" class="preview__img" src="${img}"
                            alt="">
                        <div class="preview__img-slide">
                            <img src="../../assets/img/error.png.webp" alt="">
                            <img src="../../assets/img/error.png.webp" alt="">
                            <img src="../../assets/img/error.png.webp" alt="">
                            <img src="../../assets/img/error.png.webp" alt="">
                            <img src="../../assets/img/error.png.webp" alt="">
                        </div>
                    </div>
                    <div class="col-12 col-lg-7">
                        <div class="preview__info">
                            <div class="preview__title">
                                <h4 class="preview__type">${brand}</h4>
                                <h3 class="preview__name">${name}</h3>
                            </div>
                            <div class="preview__subtitle">
                                <p class="preview__address">Poduct SKU: <span>N/A</span></p>
                                <p class="preview__available">Available: <span>In stock</span></p>
                            </div>
                            <div class="preview__desc">
                                <p>${desc}</p>
                            </div>
                        </div>
                        <div class="preview__interact">
                            <div class="preview__like-icon preview__icon">
                                <i class='bx bx-heart'></i>
                                Wishlist
                            </div>
                            <div class="preview__compare-icon preview__icon">
                                <i class='bx bx-git-compare'></i>
                                compare
                            </div>
                        </div>
                        <div class="preview__price">
                            <span class="preview__price-discount">$${price}</span>
                            <span class="preview__price-base">$150.00</span>
                        </div>
                        <div class="preview__quantity-wrap">
                            <div class="preview__quantity">
                                <h4>Quantity</h4>
                                <div class="preview__quantity-control">
                                    <input type="number" min="1" step="1" value="1" readonly id="inputAdd">
                                    <button onclick="this.parentNode.querySelector('input').stepUp()"><i
                                            class='bx bx-plus'></i></button>
                                    <button onclick="this.parentNode.querySelector('input').stepDown()"><i
                                            class='bx bx-minus'></i></button>
                                </div>
                            </div>
                            <button class="preview__add-cart" data-cart-type="addCart">
                                <i class='bx bx-cart-download'></i>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                    <div class="col-5">
                    </div>
                </div>
            </div>
            <div class="preview__close" data-toggle="modal" data-target="#previewModal">
                <i class='bx bx-x'></i>
            </div>
        </div>`
    dom("#previewModal").innerHTML = htmls
}

// Hàm render ra các product có trong cart, đồng thời cập nhật 1 số thông tin phụ ra giao diện
function renderCart(cartManager) {
    dom("#shoppingQuantity").innerText = cartManager.items.length
    dom("#shoppingTotal").innerText = `$${cartManager.calcTotalPrice()}`
    dom("#cartTotal").innerText = `$${cartManager.calcTotalPrice()}`

    const htmls = cartManager.items.reduce((result, item) => {
        const { product, quantity } = item
        return result + `
            <li class="cart__item" data-id="${item.id}">
                <div class="cart__item-img">
                    <a href="#">
                        <img src="${product.img}"
                            alt="">
                    </a>
                </div>
                <div class="cart__item-info">
                    <div class="cart__item-wrap">
                        <p class="cart__item-name text-overflow">${product.name}</p>
                        <p class="cart__item-total">$${item.calcPrice()}</p>
                    </div>
                    <div class="cart__item-wrap">
                        <p class="cart__item-price divider">$${product.price}</p>
                        <p class="cart__item-stock">In Stock</p>
                    </div>
                    <div class="cart__item-wrap">
                        <div class="cart__item-quantity">
                            <button class="decrease" data-cart-type="decreaseCart">
                                <i class='bx bx-minus'></i>
                            </button>
                            <span>${quantity}</span>
                            <button class="increase" data-cart-type="increaseCart">
                                <i class='bx bx-plus'></i>
                            </button>
                        </div>
                        <div class="cart__item-remove" data-cart-type="deleteCart">
                            <i class='bx bxs-box'></i>
                            delete
                        </div>
                    </div>
                </div>
            </li>`
    }, '')
    dom("#cartList").innerHTML = htmls
}



//=====================================================
//       Xử lý render ra giao diện lúc mới khởi tạo
//=====================================================
function displayProduct() {
    getProducts()
        .then(products => {
            renderProducts(products)
        })
}

displayProduct()
renderCart(cartManager)



//=====================================================
//       Xử lý các chức năng filter product
//=====================================================
document.addEventListener("click", (e) => {
    const element = e.target.closest('[data-filter-type]')
    if (!element) return

    // Lấy các giá trị input check box hay radio để filter
    const filterCheckELs = domAll("[data-filter-type]:checked")
    const filterCheckValue = [...filterCheckELs].reduce((result, filterCheckEL) => {
        const dataFilterType = filterCheckEL.dataset.filterType
        if (result[dataFilterType]) {
            if (!Array.isArray(result[dataFilterType])) {
                result[dataFilterType] = [result[dataFilterType]]
            }
            return {
                ...result,
                [dataFilterType]: [...result[dataFilterType], filterCheckEL.value]
            }
        } else {
            return {
                ...result,
                [dataFilterType]: filterCheckEL.value
            }
        }
    }, [])
    // Lấy các giá trị filter theo kiểu sort(mặc định chỉ có 1 kiểu giá trị được sort, 
    // cái nào có class active sẽ được cho vào để sort) để filter
    const filterSortEl = dom("[data-filter-type][data-filter-style='sort'].active")
    const filterSortType = filterSortEl.dataset.filterType
    const filterElValue = filterSortEl.value

    const filterSortValue = {
        [filterSortType]: {
            $sort: filterElValue
        }
    }

    // console.log(filterCheckValue, filterSortValue)
    const filterValue = { ...filterCheckValue, ...filterSortValue }

    getProductByValue(filterValue)
        .then(products => {
            renderProducts(products)
        })
        .catch(error => {
            renderProducts([])

        })
})


//===========================================================
//       Xử lý chức năng tìm kiếm sản phẩm bằng ô tìm kiếm
//==========================================================

function debounce(cb, delay = 300) {
    let timeout
    return (searchTerm) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            cb(searchTerm)
        }, delay)
    }
}

const updateSearch = debounce((searchTerm) => {
    // console.log(searchTerm)
    getProducts(searchTerm)
        .then(products => {
            renderProducts(products)
        })
})

dom("#searchInput").addEventListener("input", function (e) {
    const searchTerm = this.value
    updateSearch(searchTerm)
})


//=====================================================
//       Xử lý các chức năng thêm xóa cart item
//=====================================================
document.addEventListener("click", (e) => {
    const element = e.target.closest('[data-cart-type]')
    if (!element) return

    const actionType = element.dataset.cartType

    if (actionType === "addCart") {
        const productId = element.closest("[data-id]").dataset.id
        const productQuantityEl = dom("#inputAdd")

        getProductByID(productId)
            .then(product => {
                const isValid = cartManager.findItemById(productId)
                if (isValid) {
                    cartManager.increasQuantity(productId, +productQuantityEl.value)
                }
                else {
                    const cartItem = new CartProduct(product, +productQuantityEl.value)
                    cartManager.addItem(cartItem)
                }
                renderCart(cartManager)
            })
            .finally(() => {
                cartManager.saveCartItems()
            })
        return
    }

    if (actionType === "deleteCart") {
        const cartId = element.closest("[data-id]").dataset.id
        cartManager.deleteItem(cartId)
        renderCart(cartManager)
        cartManager.saveCartItems()
        return
    }

    if (actionType === "increaseCart") {
        const cartId = element.closest("[data-id]").dataset.id
        cartManager.increasQuantity(cartId)
        renderCart(cartManager)
        cartManager.saveCartItems()
        return
    }

    if (actionType === "decreaseCart") {
        const cartId = element.closest("[data-id]").dataset.id
        cartManager.decreaseQuantity(cartId)
        renderCart(cartManager)
        cartManager.saveCartItems()
        return
    }

    if (actionType === "clearCart") {
        cartManager.clearCart()
        renderCart(cartManager)
        cartManager.saveCartItems()
        return
    }
})



//=====================================================
//       Xử lý render ra phần preview modal
//=====================================================
document.querySelector("#products").addEventListener("click", (e) => {
    const element = e.target.closest("[data-target='#previewModal']")
    if (!element) return

    const productId = element.closest("[data-id]").dataset.id
    const product = productManager.findById(productId)
    renderPreview(product)
})







//  Helper Function

function dom(selector) {
    return document.querySelector(selector)
}
function domAll(selector) {
    return document.querySelectorAll(selector)
}