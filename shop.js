var categories = [];
var cart = [];

$.get("https://fakestoreapi.com/products", function(products) {
  categories = [...(products.map(function(item) {
    return item.id;     
  }))];
  var i = 0;
  $("#root").html(categories.map(function(id) {
    var item = products.find(function(product) {
      return product.id === id;
    });
    var { image, title, price } = item;
    return `
      <div class="box">
        <div class="img-box">
          <img class="images" src="${image}"></img>
        </div>
        <div class="bottom">
          <p>${title}</p>
          <h2>$ ${price}.00</h2>
          <button onclick="addtocart(${i++})">Add to cart</button>
        </div>
      </div>
    `;
  }).join(''));
});

function addtocart(a) {
    $.get("https://fakestoreapi.com/products", function(products) {   
    var product = products[a];

    var duplicateItem = cart.findIndex(function(item) { 
      if( item.id === product.id)
      {
        item.quantity +=1
            //console.log(item.quantity);
      }
      return item.id === product.id;
    });
          console.log('pro-id',product.id)
          console.log('dup',duplicateItem)

    if (duplicateItem === -1) { 
      product.quantity = 1;
      cart.push({...product});
          console.log('qty',product.quantity);
    }
    localStorage.setItem("cart", JSON.stringify(cart)); //save data to LS
    displaycart();
  });
}

function displaycart(a) {
  var j = 0,
  total = 0;
  $("#count").html(cart.length);
  if (cart.length === 0) {
    $("#cartItem").html("Cart is empty");
    $("#total").html("$ " + 0 + ".00");
  } 
  else {
    $("#cartItem").html(cart.map(function(item, index) {
      var { image, title, price, quantity } = item;
      var itemTotal = price * quantity;
      total += itemTotal;
      $("#total").html("$ " + total.toFixed(2));
       return (`
        <div class='cart-item'>
          <div class="row-img">
            <img class="rowing" src=${image}>
          </div>
          <p style='font-size:12px;'>${title}</p>
          <h2 style='font-size:15px;'>${price}.00</h2>        
          <input type="number" class="quantity" min="1" value="${quantity}" data-index="${index}">
          <i class='fa-solid fa-trash' onclick='delElement(${j++})'></i>   
        </div>  
      `);
    }).join(''));
  }
  localStorage.setItem("total", total.toFixed(2)); //total to LS
}

$(document).on('change',function(e){
  var index = $(e.target).data("index");
  var quantity = parseInt(e.target.value); 
  if (quantity > 0) {
    cart[index].quantity = quantity;
    localStorage.setItem('cart', JSON.stringify(cart)); //qty to LS
    displaycart();
  }
})

function delElement(a) {
  cart.splice(a, 1);
  localStorage.setItem("cart", JSON.stringify(cart)); //LS cart updated
  displaycart();
}

$(document).on('click', '#clearCart', function() {
  cart = [];
  displaycart();
});

var storedCart = localStorage.getItem("cart");
if (storedCart) {
  cart = JSON.parse(storedCart);
  displaycart();
}

console.log('hh',cart)
$("#btn1").click(function (e) {
  console.log('helo')
  e.preventDefault();
  if (cart.length == 0){
    swal({
			title: "oops!!!",
			text: "Your cart is empty !!",
			icon: "warning"
		});
  }
  else{
    window.location.href="/bill.html";
  }
});
