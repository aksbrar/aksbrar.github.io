function userForm() {
    const firstName = document.getElementById("fname").value;
    const lastName = document.getElementById("lname").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const province = document.getElementById("province").value;
    
    // Check validation
    if(!firstName || !lastName || !email || !address) {
        alert("Please fill in all fields!");
        return;
    }

    let membership = "";
    if (document.getElementById("premium").checked) membership = "Premium";
    else if (document.getElementById("standard").checked) membership = "Standard";
    else if (document.getElementById("basic").checked) membership = "Basic";

    const outputDiv = document.getElementById("output");
    outputDiv.style.display = "block"; 
    
    // Add fade in animation reset
    outputDiv.style.animation = 'none';
    outputDiv.offsetHeight; /* trigger reflow */
    outputDiv.style.animation = 'fadeIn 0.5s ease';

    outputDiv.innerHTML = `
        <h3 style="margin-bottom:10px; color:#FF6B8B;"><i class="fa-solid fa-check-circle"></i> Success!</h3>
        <p><strong>Member:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Location:</strong> ${city}, ${province}</p>
        <p><strong>Tier:</strong> ${membership}</p>
    `;
}

function myExcelFuns() {
    const numberStr = document.getElementById("numbers").value;
    const outputDiv = document.getElementById("output");
    outputDiv.classList.remove("hidden");
    outputDiv.style.display = "block";

    if (!numberStr || numberStr.trim() === "") {
        outputDiv.innerHTML = "<p style='color:#ff4d4d'><i class='fa-solid fa-triangle-exclamation'></i> Please enter numbers.</p>";
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
        outputDiv.innerHTML = "<p style='color:#ff4d4d'><i class='fa-solid fa-triangle-exclamation'></i> No valid numbers found.</p>";
        return;
    }

    let result = 0;
    let icon = "";
    let label = "";

    if (document.getElementById("sum").checked) {
        result = finalNumericArray.reduce((a, b) => a + b, 0);
        label = "Total Sum";
        icon = "fa-plus";
    } else if (document.getElementById("avg").checked) {
        const total = finalNumericArray.reduce((a, b) => a + b, 0);
        result = (total / finalNumericArray.length).toFixed(2);
        label = "Average";
        icon = "fa-divide";
    } else if (document.getElementById("max").checked) {
        result = Math.max(...finalNumericArray);
        label = "Maximum";
        icon = "fa-arrow-up";
    } else {
        result = Math.min(...finalNumericArray);
        label = "Minimum";
        icon = "fa-arrow-down";
    }

    outputDiv.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
                <p style="color:#d1d1e0; font-size:0.9rem;">${label}</p>
                <h2 style="color:#fff; margin:0;">${result}</h2>
            </div>
            <i class="fa-solid ${icon}" style="font-size:2rem; opacity:0.2;"></i>
        </div>
        <p style="margin-top:10px; font-size:0.8rem; opacity:0.6;">Based on ${finalNumericArray.length} entries</p>
    `;
}

function toggleTheme() {
    document.body.classList.toggle("light-mode");
    const btnIcon = document.querySelector("#themeBtn i");
    if(document.body.classList.contains("light-mode")) {
        btnIcon.classList.remove("fa-moon");
        btnIcon.classList.add("fa-sun");
    } else {
        btnIcon.classList.remove("fa-sun");
        btnIcon.classList.add("fa-moon");
    }
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