const navLinks = document.querySelectorAll(".nav-item:not(:last-child) .nav-link");
const showData = document.querySelector(".show-data");
const cartItem = document.querySelector(".cart");
const cartCountElement = document.querySelector(".cart-count");
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let product = [];
let nav = document.getElementById("nav")
let btnHide = document.querySelector(".btnHide")
cartCountElement.textContent = cart.length
// ====================================================================
const getData = async function (kelma) {
    const response = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${kelma}`);
    const data = await response.json();
    const recipes = data.recipes;
    product = recipes;
    display(recipes);
}
getData("corn");
// ====================================================================
function display(recipes) {
    let productList = ""
    for (let i = 0; i < recipes.length; i++){
        productList += `
        <div class="col-lg-4 col-md-6 mb-4">
        <div class="card">
            <div class="img-parent">
                <img src="${recipes[i].image_url}" class="card-img-top img-fluid" style='height:300px'>
            </div>
            <div class="card-body">
                <h4 class="card-title">${recipes[i].title.slice(0,20)}</h4>
                <h5 class="card-title" style="color:#aaa">${recipes[i].publisher}</h5>
                <h6 class="card-title">${recipes[i].social_rank.toFixed(2)}</h6>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
                    content.</p>
                <div class="d-flex justify-content-between">
                    <button class="btn btn-primary" onclick="addToCart(${i})">Add To Cart</button>
                    <button class="btn btn-secondary" onclick="quickView(${i})">Quick View</button>
                </div>
            </div>
        </div>
    </div>
        `
    }
    showData.innerHTML = productList
}
// ====================================================================
navLinks.forEach(function (element) {
    element.addEventListener("click", function (event) {
        getData(event.target.textContent)
    })
})
// ====================================================================
function addToCart(index) {
    let choosenProdect = product[index];
    let findedProduct = cart.find((item) =>  item.recipe_id === choosenProdect.recipe_id );
    if (findedProduct) {
        findedProduct.count+=1
    }
    else {
        cart.push({...choosenProdect,count:1});
    }
    cartCountElement.textContent = cart.length
    localStorage.setItem("cart", JSON.stringify(cart));
}
// ====================================================================
function quickView(index) {
    let choosenProdect = product[index];
    localStorage.setItem("quickViewProduct", JSON.stringify(choosenProdect));
    location.href = choosenProdect.source_url
}
// ====================================================================
window.onscroll = function () {
    if (window.scrollY > 75) {
        nav.classList.remove("bg-body-tertiary")
        nav.classList.add("headerFixed")
        btnHide.classList.add("btnShow")
    }
    else {
        nav.classList.remove("headerFixed")
        nav.classList.add("bg-body-tertiary")
        btnHide.classList.remove("btnShow")
    }
}
// ====================================================================
btnHide.addEventListener("click", function () {
    window.scroll({
        top: 0,
        behavior:"smooth"
    })
})