const tableBody = document.querySelector("tBody")
const clearBtn = document.querySelector(".clear-cart")
let cartData = JSON.parse(localStorage.getItem("cart")) || []
// ====================================================================
function render() {
    let list = ""
    for (let i = 0; i < cartData.length; i++){
        list += `
        <tr>
            <td scope="col">${i+1}</td>
            <td scope="col">${cartData[i].title}</td>
            <td scope="col">${cartData[i].publisher}</td>
            <td scope="col"><img src="${cartData[i].image_url}"" class="card-img-top img-fluid" style="width: 100px"></td>
            <td scope="col">${cartData[i].count}</td>
            <td scope="col"><button class="btn btn-danger" onclick="deleteRow(${i})">Remove</button></td>
        </tr>
        `
    }
    tableBody.innerHTML = list
}
render()
// ====================================================================
clearBtn.addEventListener("click", function () {
    localStorage.removeItem("cart")
    cartData = []
    render()
    location.reload()
})
// ====================================================================
function removeClearBtn() {
    cartData.length > 0
        ? (clearBtn.style.display = "block")
        : (clearBtn.style.display = "none")
}
removeClearBtn()
// ====================================================================
function deleteRow(i) {
    cartData[i].count--
    if (cartData[i].count == 0) {
        cartData.splice(i, 1)
    }
    localStorage.setItem("cart",JSON.stringify(cartData))
    render()
    removeClearBtn()
}