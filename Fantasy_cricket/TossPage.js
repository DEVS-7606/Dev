function toss() {
    let T1 = document.getElementById("team1").value;
    let T2 = document.getElementById("team2").value;
    let TossRes = Math.floor(Math.random() * 10) + 1;
    console.log(TossRes);
    if (T1 == " " && T2 == " ") {
        alert("PLease Enter Name of both the teams");
    }
    else if (TossRes % 2 == 0) {
        console.log(T1);
        document.getElementById("tossOut").innerHTML = `${T1} won the Toss`;
        document.getElementById("TossBtn").disabled = true;
    } else {
        console.log(T2);
        document.getElementById("tossOut").innerHTML = `${T2} won the Toss`;
        document.getElementById("TossBtn").disabled = true;
    }
}