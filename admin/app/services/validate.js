import Validator from "../../modules/Validator.js"


// Các hàm validate cho từng input trong form
// function validateAccount() {
//     let isValid = validate("#TaiKhoan", emptyRule())
//     if (isValid) return true
//     return false
// }

const validateCode = new Validator({
    formInput: "#productCode",
    formMess: ".errorMess",
    rules: [
        Validator.emptyRule("Yêu cầu nhập mã sản phẩm"),
    ]
})

const validateName = new Validator({
    formInput: "#productName",
    formMess: ".errorMess",
    rules: Validator.emptyRule("Chưa nhập tên sản phẩm")
})

const validatePrice = new Validator({
    formInput: "#productPrice",
    formMess: ".errorMess",
    rules: [
        Validator.emptyRule("Chưa nhập giá sản phẩm"),
        Validator.numRule("Giá trị không phù hợp (0-9)")
    ]
})

const validateBrand = new Validator({
    formInput: "#productBrand",
    formMess: ".errorMess",
    rules: [
        Validator.emptyRule("Chưa chọn loại hãng sản xuất"),
        Validator.typeRule(
            ["Iphone", "Samsung", "Nokia", "Xiaomi", "Asus"],
            "Vui lòng chọn loại hãng phù hợp")
    ]
})

const validateBackCamera = new Validator({
    formInput: "#productBackCamera",
    formMess: ".errorMess",
    rules: Validator.emptyRule("Chưa nhập thông tin")
})

const validateFrontCamera = new Validator({
    formInput: "#productFrontCamera",
    formMess: ".errorMess",
    rules: Validator.emptyRule("Chưa nhập thông tin")
})

const validateImage = new Validator({
    formInput: "#productImg",
    formMess: ".errorMess",
    rules: Validator.emptyRule("Chưa nhập đường dẫn url")
})

const validateDesc = new Validator({
    formInput: "#productDesc",
    formMess: ".errorMess",
    rules: Validator.emptyRule("Chưa nhập mô tả sản phẩm")
})






const validationForm = function () {

    return new Promise((resolve, reject) => {
        const isValid =
            validateName.validate() &
            validatePrice.validate() &
            validateBrand.validate() &
            validateBackCamera.validate() &
            validateFrontCamera.validate() &
            validateImage.validate() &
            validateDesc.validate() &
            validateCode.validate()


        if (isValid) {
            resolve(true)
        }
        else {
            reject(false)
        }
    })
}
// function validateSameAccount() {
//     return new Promise((resolve, reject) => {
//         const accountEl = dom("#TaiKhoan")
//         const spanEl = accountEl.closest(".form-group").querySelector(".form-message")

//         getUser()
//             .then(users => {
//                 let errorMess = sameIDRule(accountEl.value.trim(), users, "account")
//                 if (errorMess) {
//                     if (spanEl.innerText) {
//                         reject()
//                         return
//                     }
//                     spanEl.innerText = errorMess
//                     reject()
//                 }
//                 else {
//                     spanEl.innerText = ''
//                     resolve()
//                 }
//             })
//             .catch(() => {
//             })
//     })

// }

// function validateName() {
//     let isValid = validate("#HoTen", [emptyRule(), characterRule()])
//     if (isValid) return true
//     return false
// }

// function validateAvatar() {
//     let isValid = validate("#HinhAnh", emptyRule())
//     if (isValid) return true
//     return false
// }

// function validateRole() {
//     let isValid = validate("#loaiNguoiDung", [emptyRule(), typeRule(['GV', 'HV'])])
//     if (isValid) return true
//     return false
// }

// function validateLanguage() {
//     let isValid = validate("#loaiNgonNgu", [emptyRule(), typeRule(['ITALIAN', 'FRENCH', 'JAPANESE', 'CHINESE', 'RUSSIAN', 'SWEDEN', 'SPANISH'])])
//     if (isValid) return true
// }

// function validateDescription() {
//     let isValid = validate("#MoTa", [emptyRule(), rangeCharactorRule(1, 60)])
//     if (isValid) return true
// }

// // Hàm reset để reset các thông báo lỗi do phần validate đã thêm vào DOM
function resetError() {
    document.querySelectorAll(".form__group").forEach(formGroup => {
        formGroup.querySelector(".errorMess").innerText = ""
        formGroup.classList.remove("invalid")
    })
}

export default validationForm

export { validateName, resetError }