var carts = document.querySelectorAll(".cart-button");
var products = [
    {
   id: 1,
   name: "Brown Brim",
   image: "https://i.ibb.co/ZYW3VTp/brown-brim.png",		
   price: 25,
   inCart:0
},
{
   id: 2,
   name: "Blue Beanie",
   image: "https://i.ibb.co/ypkgK0X/blue-beanie.png",			
   price: 18,
   inCart:0
},
{
   id: 3,
   name: "Brown Cowboy",
   image: "https://i.ibb.co/QdJwgmp/brown-cowboy.png",				
   price: 35,
   inCart:0
},
{
   id: 4,
   name: "Grey Brim",
   image:"https://i.ibb.co/RjBLWxB/grey-brim.png",	
   price: 25,
   inCart:0
},
{
   id: 5,
   name: "Adidas NMD",
   image: "https://i.ibb.co/0s3pdnc/adidas-nmd.png",		
   price: 220,
   inCart:0
},
{
   id: 6,
   name: "Adidas Yeezy",
   image:"https://i.ibb.co/dJbG1cT/yeezy.png",
   price: 280,
   inCart:0
},
{
   id: 7,
   name: "Black Converse",
   image:"https://i.ibb.co/bPmVXyP/black-converse.png",
   price: 110,
   inCart:0
},
{
   id: 8,
   name: "Nike White AirForce",
   image:"https://i.ibb.co/1RcFPk0/white-nike-high-tops.png",
   price: 160,
   inCart:0
},
{
   id: 9,
   name: "Black Jean Shearling",
   image:"https://i.ibb.co/XzcwL5s/black-shearling.png",
   price: 125,
   inCart:0
},
{
   id: 10,
   name: "Blue Jean Jacket",
   image:"https://i.ibb.co/mJS6vz0/blue-jean-jacket.png",
   price: 90,
   inCart:0
},
{
   id: 11,
   name: "Grey Jean Jacket",
   image:"https://i.ibb.co/N71k1ML/grey-jean-jacket.png",
   price: 90,
   inCart:0
},
{
   id: 12,
   name: "Brown Shearling",
   image:"https://i.ibb.co/s96FpdP/brown-shearling.png",
   price: 165,
   inCart:0
},
{
   id: 13,
   name: "Blue Tanktop",
   image:"https://i.ibb.co/7CQVJNm/blue-tank.png",	
   price: 25,
   inCart:0
},
{
   id: 14,
   name: "Floral Blouse",
   image:"https://i.ibb.co/4W2DGKm/floral-blouse.png",
   price: 20,
   inCart:0
},
{
   id: 15,
   name: "Floral Dress",
   image:"https://i.ibb.co/KV18Ysr/floral-skirt.png",				
   price: 80,
   inCart:0
},
{
   id: 16,
   name: "Red Dots Dress",
   image:"https://i.ibb.co/N3BN1bh/red-polka-dot-dress.png",
   price: 80,
   inCart:0
},
{
   id: 17,
   name: "Camo Down Vest",
   image:"https://i.ibb.co/xJS0T3Y/camo-vest.png",	
   price: 325,
   inCart:0
},
{
   id: 18,
   name: "Floral T-shirt",
   image:"https://i.ibb.co/qMQ75QZ/floral-shirt.png",				
   price: 20,
   inCart:0
},
{
   id: 19,
   name: "Black & White Longsleeve",
   image:"https://i.ibb.co/55z32tw/long-sleeve.png",			
   price: 25,
   inCart:0
},
{
   id: 20,
   name: "Pink T-shirt",
   image:"https://i.ibb.co/RvwnBL8/pink-shirt.png",		
   price: 25,
   inCart:0
}
];

for (let i = 0; i < carts.length; i++){
    carts[i].addEventListener("click", ()=>{
        cartNumbers(products[i]);
        totalCost(products[i]);
    });
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem("cartNumbers");

    if(productNumbers){
        document.querySelector(".cart-count").textContent = productNumbers;
    }
}

function cartNumbers(product, action){
    let productNumbers = localStorage.getItem("cartNumbers");
    productNumbers = parseInt(productNumbers);

    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    
     if (action){
         localStorage.setItem("cartNumbers", productNumbers - 1);
         document.querySelector(".cart-count").textContent = productNumbers - 1;
     } else if ( productNumbers ){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart-count').textContent = productNumbers + 1;
     } else {
         localStorage.setItem("cartNumbers", 1);
         document.querySelector(".cart-count").textContent = 1;
     }

     setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    
    if(cartItems !== null){

         if (cartItems[product.name] === undefined){
             cartItems = {
                 ...cartItems,
                 [product.name]:product
             }
         }

        cartItems[product.name].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.name]:product
        }
    }

    localStorage.setItem("productsInCart",JSON.stringify(cartItems));
}

function totalCost(product, action){

 	var cartCost = localStorage.getItem("totalCost");

     if( action ) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost - product.price)
    } else if(cartCost !== null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else{
        localStorage.setItem("totalCost", product.price); 
    }
}

function displayCart(){
	let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    
    let cartCost = localStorage.getItem("totalCost");
    cartCost = parseInt(cartCost);

    let productContainer = document.querySelector(".output");
    
	if( cartItems && productContainer ){
       productContainer.innerHTML = "";
       Object.values(cartItems).map(item =>{
       	productContainer.innerHTML += `
            <div class="cart-header">
            
                 <div class="product">
                     <img src = "${item.image}" />
                 </div>

                 <span class="description">${item.name}</span>
                 
                 <span class="quantity"><span class="decrease"><</span>
                 
                 <span class="value">${item.inCart}</span> 

                 <span class="increase">></span></span>
                 
                 <span class="price">${item.price}</span>

                 <span class="remove">✕</span>

            </div>
        `

    });
    let y = localStorage.getItem("totalCost");
    document.getElementById('amount').innerText = y;
    deleteButtons();
    manageQuantity();
	}
};

function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.decrease');
    let increaseButtons = document.querySelectorAll('.increase');
    let currentQuantity = 0;
    let currentProduct = '';
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    for(let i=0; i < decreaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            currentQuantity = decreaseButtons[i].parentElement.querySelector('.value').textContent;
            currentQuantity = parseInt(currentQuantity)
            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.textContent;

            if( cartItems[currentProduct].inCart > 1 ) {
                cartItems[currentProduct].inCart -= 1;
                    if(cartItems[currentProduct].inCart == 0) {
                        delete decreaseButtons[i].parentElement.parentElement;
                    } else {
                        cartNumbers(cartItems[currentProduct], "decrease");
                    totalCost(cartItems[currentProduct], "decrease");
                    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                    displayCart();
                    }
            }
        });

        increaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = increaseButtons[i].parentElement.querySelector('.value').textContent;
            currentQuantity = parseInt(currentQuantity)
            currentProduct = increaseButtons[i].parentElement.previousElementSibling.textContent;

            cartItems[currentProduct].inCart += 1;
            cartNumbers(cartItems[currentProduct]);
            totalCost(cartItems[currentProduct]);
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart();
        });
    }
}


function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.remove');
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartCost = localStorage.getItem("totalCost");
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productName;

    for(let i=0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.children[1].textContent;
            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
            localStorage.setItem('totalCost', cartCost - ( cartItems[productName].price * cartItems[productName].inCart));

            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadCartNumbers();
        })
    }
}


onLoadCartNumbers();
displayCart();
