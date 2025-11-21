function userForm() {
    const firstName = document.getElementById("fname").value;
    const lastName = document.getElementById("lname").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const province = document.getElementById("province").value;
    
    let membership = "";
    if (document.getElementById("premium").checked) {
        membership = "Premium";
    } else if (document.getElementById("standard").checked) {
        membership = "Standard";
    } else if (document.getElementById("basic").checked) {
        membership = "Basic";
    }

    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = `
        <p><strong>Full Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Address:</strong> ${address}, ${city}, ${province}</p>
        <p><strong>Membership:</strong> ${membership}</p>
    `;
}

function myExcelFuns() {
    const numberStr = document.getElementById("numbers").value;
    
    if (!numberStr || numberStr.trim() === "") {
        alert("Please enter some numbers separated by spaces.");
        return;
    }

    const numberArr = numberStr.trim().split(" ");
    const finalNumericArray = [];

    for (let i = 0; i < numberArr.length; i++) {
        if (numberArr[i] !== "" && !isNaN(numberArr[i])) {
            finalNumericArray.push(Number(numberArr[i]));
        }
    }

    if (finalNumericArray.length === 0) {
        alert("No valid numbers found.");
        return;
    }

    let result = 0;

    if (document.getElementById("sum").checked) {
        let total = 0;
        for (let i = 0; i < finalNumericArray.length; i++) {
            total += finalNumericArray[i];
        }
        result = total;
    } else if (document.getElementById("avg").checked) {
        let total = 0;
        for (let i = 0; i < finalNumericArray.length; i++) {
            total += finalNumericArray[i];
        }
        result = total / finalNumericArray.length;
    } else if (document.getElementById("max").checked) {
        result = Math.max(...finalNumericArray);
    } else {
        result = Math.min(...finalNumericArray);
    }

    document.getElementById("output").innerHTML = `Result: ${result}`;
}

function toggleTheme() {
    document.body.classList.toggle("dark-mode");
}

document.addEventListener("DOMContentLoaded", function() {
    const sendBtn = document.getElementById("sendBtn");
    if (sendBtn) {
        sendBtn.addEventListener("click", function(event) {
            event.preventDefault();
            userForm();
        });
    }

    const calcBtn = document.getElementById("calcBtn");
    if (calcBtn) {
        calcBtn.addEventListener("click", function() {
            myExcelFuns();
        });
    }
    
    const themeBtn = document.getElementById("themeBtn");
    if(themeBtn) {
        themeBtn.addEventListener("click", toggleTheme);
    }
});