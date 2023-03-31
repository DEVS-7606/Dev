let totalCart = []
let custAndOrdDetails = []
watchSelect = document.getElementById("brands").value.split("-")
let brand = watchSelect[0], price = +watchSelect[1];
function brandAndprice(BrandAndPrice) {
    brandAndPrice = BrandAndPrice.split("-");
    brand = brandAndPrice[0];
    price = +brandAndPrice[1];
}

let quantity = +document.getElementById("quantity").value;
function Quantity(Quan) {
    quantity = +Quan;
}
let prodPrice = 0;
let TotPurchasePrice = 0, TotQuantity = 0;
function AddToCart() {
    document.getElementById("CartProduct").innerHTML = "";

    prodPrice = price * quantity;

    for (let j = 0; j <= totalCart.length - 1; j++) {
        if (brand == totalCart[j].Brand) {
            totalCart[j].Quantity = quantity;
            totalCart[j].ProductPrice = prodPrice;
            totalCart.pop();
        }
    }


    let addToCart = { Brand: brand, Price: price, Quantity: quantity, ProductPrice: prodPrice };

    totalCart.push(addToCart);

    // TotPurchasePrice += prodPrice;
    // TotQuantity += quantity;

    addToCart = {};

    for (let i = 0; i < totalCart.length; i++) {
        document.getElementById("CartProduct").innerHTML += `${i + 1}). Brand:${totalCart[i].Brand} ,Price:${totalCart[i].Price} ,\n    Quantites:${totalCart[i].Quantity} ,Product Price:${totalCart[i].ProductPrice}\n`;
    }
    // document.getElementById("TotDisplay").innerHTML = `Grand Total: ${TotPurchasePrice} | Total Quantity: ${TotQuantity}<br>`;
}

let custName = document.getElementById("customerName");
let custEmail = document.getElementById("customerEmail");
let custNum = document.getElementById("customerNum");
let key;
found = false;
function validationTest(key, value) {
    document.getElementById("nameError").innerHTML = "";
    document.getElementById("emailError").innerHTML = "";
    document.getElementById("phoneError").innerHTML = "";
    document.getElementById("successful").innerHTML = "";
    let Name, Email, Num;

    if (key == "customerName") {
        Name = value;
    }

    if (key == "customerEmail") {
        Email = value;
    }

    if (key == "customerNum") {
        Num = value;
    }

    validName = /^[A-Z a-z]+$/;
    validEmail = /([a-z]{1,})+[a-z 0-9._]+@[a-z A-Z]+\.([a-z]{2,})/;
    validNum = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    if (!validName.test(Name)) {
        document.getElementById("nameError").innerHTML = `Invalid`;
    }
    else if (!validEmail.test(Email)) {
        document.getElementById("emailError").innerHTML = `Invalid`;
    }
    else if (!validNum.test(Num)) {
        document.getElementById("phoneError").innerHTML = `please add 9 digits only`;
    }
    else {
        document.getElementById("successful").innerHTML = `Successful`;
    }

}

function CustomerInfo() {
    if ((custName || custEmail || custNum) == (" " || null || isNaN(Num) || !isNaN(Name))) {
        alert("please enter all details");
        custName = ""; custEmail = ""; custNum = "";
    }
    document.getElementById("OrderDetails").innerHTML = "";
    let customerDetails = { Name: custName.value, Email: custEmail.value, Number: custNum.value, };

    custAndOrdDetails.push(customerDetails);

    document.getElementById("OrderDetails").innerHTML += `Name: ${custAndOrdDetails[0].Name} \nE-mail: ${custAndOrdDetails[0].Email} \nPhone: ${custAndOrdDetails[0].Number}\n\n Product Details:\n`;

    for (let i = 0; i < totalCart.length; i++) {
        document.getElementById("OrderDetails").innerHTML += `${i + 1}). Brand:${totalCart[i].Brand} ,Price:${totalCart[i].Price} ,\n    Quantites:${totalCart[i].Quantity} ,Product Price:${totalCart[i].ProductPrice}\n`;
    }
    // document.getElementById("OrderDetails").innerHTML += `\nGrand Total: ${TotPurchasePrice} \n Total Quantity: ${TotQuantity}`;

}