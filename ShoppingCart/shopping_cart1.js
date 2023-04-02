let totalCart = [], custDetails = [], custAndOrderDetails = [], currentPos = 0, prodPrice = 0, customerArray = 0;

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
        if (custAndOrderDetails.length == 0) {
            sub = 0;
        } else if (sub > custAndOrderDetails.length) {
            sub = custAndOrderDetails.length - 1;
        }
    }
    if (sub == -3) {
        sub = custAndOrderDetails.length - 1;
        if (custAndOrderDetails.length == 0) {
            sub = 0;
        }
    }
    currentPos = sub;
    document.customerDetails.goTo.value = sub;

    if (sub >= custAndOrderDetails.length) {
        sub = 0;
        currentPos = sub;
        document.customerDetails.goTo.value = sub;
        alert("Please Enter Valid Input");
    }

    if (custAndOrderDetails.length != 0) {
        document.getElementById("OrderDetails").innerHTML = "";
        document.getElementById("OrderDetails").innerHTML += `Name: ${custAndOrderDetails[currentPos].userName} \nE-mail: ${custAndOrderDetails[currentPos].userEmail} \nPhone: ${custAndOrderDetails[currentPos].userPhone}\n\n Product Details::\n`;
        for (let i = 0; i < custAndOrderDetails[currentPos].userOrdDetails.length; i++) {
            document.getElementById("OrderDetails").innerHTML += `${i + 1}). Brand:${custAndOrderDetails[currentPos].userOrdDetails[i].Brand} ,Price:${custAndOrderDetails[currentPos].userOrdDetails[i].Price} ,\n    Quantites:${custAndOrderDetails[currentPos].userOrdDetails[i].Quantity} ,Product Price:${custAndOrderDetails[currentPos].userOrdDetails[i].ProductPrice}\n`;
        }
        document.getElementById("OrderDetails").innerHTML += `\nGrand Total: ${custAndOrderDetails[currentPos].userTotalPrice} \n Total Quantity: ${custAndOrderDetails[currentPos].userTotQuantity}`;
        document.getElementById("goToInp").value = 0;
    } else {
        return;
    }
}
function GoTo(value) {
    let GoToInp = +value - 1;

    if (GoToInp == -1) {
        alert("No Record Found")
        document.getElementById("goToInp").value = 0;
        return;
    }
    else if (GoToInp > custAndOrderDetails.length) {
        alert("No Record Found")
        document.getElementById("goToInp").value = 0;
    } else {
        loadForm(GoToInp);
    }
}
//     let GoToInp = +document.getElementById("goToInp").value;
//     if (custAndOrderDetails.length != 0 && custAndOrderDetails.length != 1) {
//         document.getElementById("OrderDetails").innerHTML = "";
//         document.getElementById("OrderDetails").innerHTML += `Name: ${custAndOrderDetails[GoToInp].userName} \nE-mail: ${custAndOrderDetails[GoToInp].userEmail} \nPhone: ${custAndOrderDetails[GoToInp].userPhone}\n\n Product Details::\n`;
//         for (let i = 0; i < custAndOrderDetails[GoToInp].userOrdDetails.length; i++) {
//             document.getElementById("OrderDetails").innerHTML += `${i + 1}). Brand:${custAndOrderDetails[GoToInp].userOrdDetails[i].Brand} ,Price:${custAndOrderDetails[GoToInp].userOrdDetails[i].Price} ,\n    Quantites:${custAndOrderDetails[GoToInp].userOrdDetails[i].Quantity} ,Product Price:${custAndOrderDetails[GoToInp].userOrdDetails[i].ProductPrice}\n`;
//         }
//         document.getElementById("OrderDetails").innerHTML += `\nGrand Total: ${custAndOrderDetails[GoToInp].userTotalPrice} \n Total Quantity: ${custAndOrderDetails[GoToInp].userTotQuantity}`;
//     } else {
//         return;
//     }
// }
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
    document.getElementById("OrderDetails").innerHTML = "";
    document.getElementById("goToInp").innerHTML = ``;
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
    document.getElementById("goToInp").innerHTML = ``;
    let customerDetails = { Name: custName.value, Email: custEmail.value, Number: +custNum.value, };

    custDetails.push(customerDetails);
    // console.log(custDetails);

    customerDetails = {};
}

function displayCustomerInfo() {
    CustomerInfo();
    if (custDetails[0] == "" || custDetails[0].Name == "" || custDetails[0].Email == "" || custDetails[0].Number == "") {
        alert("Please Enter Detail!!");
        custDetails = [];
    } else {
        if (totalCart.length != 0) {
            document.getElementById("OrderDetails").innerHTML += `Name: ${custDetails[0].Name} \nE-mail: ${custDetails[0].Email} \nPhone: ${custDetails[0].Number}\n\n Product Details:\n`;

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
    // AddToCart();
    // loadForm();
    document.getElementById("OrderDetails").innerHTML = "";
    if (custDetails[0] == "" || custDetails[0].Name == "" || custDetails[0].Email == "" || custDetails[0].Number == "") {
        alert("Please Enter Detail!!");
        custDetails = [];
    } else {
        if (totalCart.length != 0) {
            let UserName = custDetails[0].Name;
            let UserEmail = custDetails[0].Email;
            let UserPhone = +custDetails[0].Number;
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

            userData = {};

            alert("Your Order Is Placed !!!")



            // outLoadSub++

            document.getElementById("OrderDetails").innerHTML = ``;
            document.getElementById("customerNum").value = ``;
            document.getElementById("customerEmail").value = ``;
            document.getElementById("customerName").value = ``;
            document.getElementById("CartProduct").innerHTML = ``;
            document.getElementById("TotDisplay").innerHTML = ``;
            document.getElementById("goToInp").innerHTML = ``;
            TotPurchasePrice = 0;
            TotQuantity = 0;
            totalCart = [];
            custDetails = [];
            // console.log(totalCart);
            // console.log(custDetails);
        } else {
            alert("Please Add Item to Cart");
        }
    }
}
