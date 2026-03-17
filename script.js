let total = 0;

async function onScanSuccess(decodedText){

let barcode = decodedText;

try{

let response = await fetch("https://world.openfoodfacts.org/api/v0/product/" + barcode + ".json");

let data = await response.json();

if(data.status === 1){

let name = data.product.product_name || "Unknown Product";

let price = Math.floor(Math.random()*100)+20;

addItem(name,price);

}else{

alert("Product not found");

}

}catch(error){

alert("Internet required for product lookup");

}

}

function addItem(name,price){

let cart = document.getElementById("cart");

let li = document.createElement("li");

li.innerHTML = name + " - ₹" + price +
" <button onclick='removeItem(this,"+price+")'>Remove</button>";

cart.appendChild(li);

total += price;

document.getElementById("total").textContent = total;

}

function removeItem(btn,price){

btn.parentElement.remove();

total -= price;

document.getElementById("total").textContent = total;

}

let scanner = new Html5QrcodeScanner(
"reader",
{fps:10,qrbox:250});

scanner.render(onScanSuccess);
