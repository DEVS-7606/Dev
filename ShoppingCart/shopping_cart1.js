let totalCart = [];
let custDetails = [];
let custAndOrderDetails = [], SIZE = 20, currentPos = 0, outLoadSub = 0;
let prodPrice = 0;

watchSelect = document.getElementById("brands").value.split("-")
let brand = watchSelect[0], price = +watchSelect[1];

function loadForm(sub) {
    if (sub == "" || sub == null || isNaN(sub)) {
        sub = 0;
    }
    if (sub == -1) {
        sub = currentPos - 1;
        if (sub < 0) sub = 0
    }
    if (sub == -2) {
        sub = currentPos + 1;
        if (sub >= SIZE) sub = SIZE - 1;
    }
    if (sub == -3) {
        sub = SIZE - 1
    }
    currentPos = sub;
    document.customerDetails.goTo.value = sub;

    if (sub > SIZE) {
        sub = 0;
        currentPos = sub;
        document.Mail.record.value = sub;

        alert("Please Enter Valid Input");
    }
    outLoadSub = sub
}

function brandAndprice(BrandAndPrice) {
    brandAndPrice = BrandAndPrice.split("-");
    brand = brandAndPrice[0];
    price = +brandAndPrice[1];
}

let quantity = +document.getElementById("quantity").value;
function Quantity(Quan) {
    quantity = +Quan;
}


let TotPurchasePrice, TotQuantity;
function AddToCart() {
    document.getElementById("CartProduct").innerHTML = "";

    prodPrice = price * quantity;

    let addToCart = { Brand: brand, Price: price, Quantity: quantity, ProductPrice: prodPrice };

    // console.log(addToCart);

    totalCart.push(addToCart);

    for (let j = 0; j < totalCart.length - 1; j++) {
        if (brand == totalCart[j].Brand) {
            totalCart[j].Quantity = quantity;
            totalCart[j].ProductPrice = prodPrice;
            totalCart.pop();

        }

    }
    TotPurchasePrice = 0, TotQuantity = 0
    for (k = 0; k < totalCart.length; k++) {
        TotPurchasePrice += totalCart[k].ProductPrice;
        TotQuantity += totalCart[k].Quantity;
    }

    addToCart = {};

    for (let i = 0; i < totalCart.length; i++) {
        document.getElementById("CartProduct").innerHTML += `${i + 1}). Brand:${totalCart[i].Brand} ,Price:${totalCart[i].Price} ,\n    Quantites:${totalCart[i].Quantity} ,Product Price:${totalCart[i].ProductPrice}\n`;
    }
}
function displayCart() {
    AddToCart()
    document.getElementById("TotDisplay").innerHTML = `Grand Total: ${TotPurchasePrice} | Total Quantity: ${TotQuantity}<br>`;
}

let custName = document.getElementById("customerName");
let custEmail = document.getElementById("customerEmail");
let custNum = document.getElementById("customerNum");
let key;
function validationTest(key, value) {
    let Name, Email, Num;

    if (key == "customerName") {
        Name = value;
        validName = /^[A-Z a-z]+$/;
        if (!validName.test(Name)) {
            document.getElementById("nameError").innerHTML = `Invalid`;
        }
        else {
            document.getElementById("nameError").innerHTML = ``;
        }

    }
    else if (key == "customerEmail") {
        Email = value;
        validEmail = /[a-z 0-9._]+@[a-z A-Z]+\.([a-z]{2,})/;
        if (!validEmail.test(Email)) {
            document.getElementById("emailError").innerHTML = `Invalid`;
        }
        else {
            document.getElementById("emailError").innerHTML = ``;
        }
    }

    else if (key == "customerNum") {
        Num = +value;
        validNum = /^(0|91)?[6-9][0-9]{9}$/;
        if (!validNum.test(Num)) {
            document.getElementById("phoneError").innerHTML = `please add valid number`;
        }
        else {
            document.getElementById("phoneError").innerHTML = ``;
        }
    }
}

function CustomerInfo() {
    document.getElementById("OrderDetails").innerHTML = "";
    let customerDetails = { Name: custName.value, Email: custEmail.value, Number: +custNum.value, };

    custDetails.push(customerDetails);
    // console.log(custDetails);
}

let b = 0;
function displayCustomerInfo() {
    CustomerInfo();
    if (custDetails[b].Name == "" || custDetails[b].Email == "" || custDetails[b].Number == "") {
        alert("Please Enter Detail!!");
        b++;
    } else {
        if (totalCart.length != 0) {
            document.getElementById("OrderDetails").innerHTML += `Name: ${custDetails[b].Name} \nE-mail: ${custDetails[b].Email} \nPhone: ${custDetails[b].Number}\n\n Product Details:\n`;

            for (let i = 0; i < totalCart.length; i++) {
                document.getElementById("OrderDetails").innerHTML += `${i + 1}). Brand:${totalCart[i].Brand} ,Price:${totalCart[i].Price} ,\n    Quantites:${totalCart[i].Quantity} ,Product Price:${totalCart[i].ProductPrice}\n`;
            }
            document.getElementById("OrderDetails").innerHTML += `\nGrand Total: ${TotPurchasePrice} \n Total Quantity: ${TotQuantity}`;
        } else {
            alert("Please Add Item to Cart");
        }
    }
}

function placeOrder() {
    CustomerInfo();
    AddToCart();
    loadForm();
    document.getElementById("OrderDetails").innerHTML = "";
    if (custDetails[b].Name == "" || custDetails[b].Email == "" || custDetails[b].Number == "") {
        alert("Please Enter Detail!!");
        b++;
    } else {
        if (totalCart.length != 0) {
            let UserName = custDetails[b].Name;
            let UserEmail = custDetails[b].Email;
            let UserPhone = +custDetails[b].Number;
            let UserOrderDetails = totalCart;
            let UserTotalPrice = TotPurchasePrice;
            let UserTotalQuantity = TotQuantity;

            let userData = {
                userName: UserName
                , userEmail: UserEmail
                , userPhone: UserPhone
                , userOrdDetails: UserOrderDetails
                , userTotalPrice: UserTotalPrice
                , userTotQuantity: UserTotalQuantity
            }
            // console.log(userData);

            custAndOrderDetails.push(userData);
            console.log(custAndOrderDetails);
            alert("Your Order Is Placed !!!")



            outLoadSub++


            // document.getElementById("OrderDetails").innerHTML += `Name: ${custAndOrderDetails[outLoadSub].userName} \nE-mail: ${custAndOrderDetails[outLoadSub].userEmail} \nPhone: ${custAndOrderDetails[outLoadSub].userPhone}\n\n Product Details::\n`;
            // for (let i = 0; i < totalCart.length; i++) {
            //     document.getElementById("OrderDetails").innerHTML += `${i + 1}). Brand:${custAndOrderDetails[outLoadSub].userOrdDetails[i].Brand} ,Price:${custAndOrderDetails[outLoadSub].userOrdDetails[i].Price} ,\n    Quantites:${custAndOrderDetails[outLoadSub].userOrdDetails[i].Quantity} ,Product Price:${custAndOrderDetails[outLoadSub].userOrdDetails[i].ProductPrice}\n`;
            // }
            // document.getElementById("OrderDetails").innerHTML += `\nGrand Total: ${custAndOrderDetails[outLoadSub].userTotalPrice} \n Total Quantity: ${custAndOrderDetails[outLoadSub].userTotQuantity}`;
        } else {
            alert("Please Add Item to Cart");
        }
    }
}
document.getElementById("OrderDetails").innerHTML = ``;
document.getElementById("customerNum").value = ``;
document.getElementById("customerEmail").value = ``;
document.getElementById("customerName").value = ``;
document.getElementById("CartProduct").value = ``;
document.getElementById("TotDisplay").innerHTML = ``;
TotPurchasePrice = 0;
TotQuantity = 0