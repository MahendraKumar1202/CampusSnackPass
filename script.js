const menu=[
    {
        name:"Pizza",
        price:200,
        category:"Pizza",
        image:"images/pizza.jpg",
        quantity:0
    },
    {
        name:"Burger",
        price:100,
        category:"Burger",
        image:"images/Burger.jpg",
        quantity:0
    },
    {
        name:"coke",
        price:80,
        category:"Drinks",
        image:"images/coke.jpg",
        quantity:0
    },
    {
        name:"Desserts",
        price:70,
        category:"Desserts",
        image:"images/Desserts.jpg",
        quantity:0
    },
    {
        name:"TEA",
        price:30,
        category:"Drinks",
        image:"images/Tea.jpg",
        quantity:0
    },
    {
        name:"Cofee",
        price:30,
        category:"Drinks",
        image:"images/Cofee.jpg",
        quantity:0
    },
    {
        name:"Fresh Juice",
        price:50,
        category:"Drinks",
        image:"images/Freshjuice.jpg",
        quantity:0

    },
    {
        name:"Veg-Burger",
        price:120,
        category:"Burger",
        image:"images/Vegburger.jpg",
        quantity:0
    },
    {
        name:"Cheese-burger",
        price:200,
        category:"Burger",
        image:"images/cheeseBurger.jpg",
        quantity:0
    },
    {
        name:"Cheese-pizza",
        price:180,
        category:"Pizza",
        image:"images/cheesepizza.jpg",
        quantity:0
    },
];
const menuSection=document.getElementById("menu");
function displaymenu(items)
{
    menuSection.innerHTML="";
    items.forEach(function(x,index){
   menuSection.innerHTML+=`
   <div class="card">
        <img src="${x.image}">
        <h3>${x.name}</h3>
        <p>Rs.${x.price}</p>
        <button class="cartbtn" value="${menu.indexOf(x)}">Add to Cart</button>
        </div>  
   `;
});
}
displaymenu(menu);
setupcartButtons();
const cateogoryButtons=document.querySelectorAll(".categories-btn");
cateogoryButtons.forEach(function(button)
{
    button.addEventListener("click",function()
{
    const category=button.textContent;
    if(category==="All")
    {
        displaymenu(menu);
        setupcartButtons();
        return;
    }
    const filteredmenu=menu.filter(function(x)
{
       return x.category===category;  
});
     displaymenu(filteredmenu);
     setupcartButtons();

});
});
let cart=[];
function setupcartButtons()
{
const cartbuttons=document.querySelectorAll(".cartbtn");
    cartbuttons.forEach(function(button)
{
       button.addEventListener("click",function()
    {
        if(menu[button.value].quantity==0)
        {
        cart.push(menu[button.value]);
        menu[button.value].quantity++;
        displaycart();
        }
        else{
        menu[button.value].quantity++;
        displaycart();
        }
        
    });
});
}
const cartitems=document.getElementById("cart-items");
function displaycart()
{
    cartitems.innerHTML="";
    let sum=0;
    const p=document.getElementById("prices");
    if(cart.length===0)
    {
        cartitems.innerHTML="No Items Selected";
        p.innerHTML="TOTAL PRICE:0";
        return;
    }
           cart.forEach(function(item,index)
    {
        cartitems.innerHTML += `
<div class="cart-row">
    <span>${item.name} : ${item.price} :${item.quantity}</span>
    <button class="rembtn" value=${index}>REMOVE</button>
</div>
`;
        sum+=(item.price)*(item.quantity);
    });
    const rembuttons = document.querySelectorAll(".rembtn");

rembuttons.forEach(function(button)  
{
    button.addEventListener("click", function()
    {
        cart[button.value].quantity=0;
        cart.splice(button.value,1);
        
                displaycart();
    });
});
    p.innerHTML="TOTAL PRICE:"+sum;
    
   
}
const l=document.getElementById("message");
const confirmbtn=document.querySelector(".cnfrm-btn");
   confirmbtn.addEventListener("click",function()
{
    if(cart.length==0){
        l.innerHTML="CART IS EMPTY❌";
        setTimeout(() => {
            l.innerHTML="";
        },5000);
    
    return;
    }
    else{
        const token=Math.floor(1000+Math.random()*9000);
        l.innerHTML="ORDERED SUCCESFULLY❤️ TOKEN NO:"+token;
        cart.forEach(function(item)
    {
       item.quantity=0;
    });
        cart=[];
        displaycart();
    }
    setTimeout(() => {
       l.innerHTML=""; 
    },5000);
});
const clr=document.getElementById("clear");
clr.addEventListener("click",function(){
    cart.forEach(function(item)
{
      item.quantity=0;
});
    cart=[];
    displaycart();
});
const search=document.querySelector(".search");
search.addEventListener("input",function()
{
   const res=menu.filter(function(items)
    {
        return items.name.toLowerCase().includes(search.value.toLowerCase());
    });
    displaymenu(res);
    setupcartButtons();
});
const sort=document.querySelector(".Sort");
sort.addEventListener("click",function()
{
    const ascend=[...menu].sort(function(a,b){

    return a.price-b.price;
    })
    displaymenu(ascend);
    setupcartButtons();
});
