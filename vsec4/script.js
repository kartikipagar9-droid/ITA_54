
document.getElementById("employeeForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get values
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let phone = document.getElementById("phone").value.trim();
    let department = document.getElementById("department").value;

    let valid = true;

    // Clear old messages
    document.querySelectorAll("small").forEach(function(item) {
        item.innerHTML = "";
    });

    document.getElementById("successMessage").innerHTML = "";

    // Name validation
    if (name.length < 2) {
        document.getElementById("nameError").innerHTML =
            "Please enter a valid name.";
        valid = false;
    }

    // Email validation
    if (!email.includes("@") || !email.includes(".")) {
        document.getElementById("emailError").innerHTML =
            "Please enter a valid email.";
        valid = false;
    }

    // Password validation
    if (password.length < 8 ||
    password == password.toLowerCase() ||
    password == password.toUpperCase() ||
    !password.match(/[0-9]/) ||
    !password.match(/[@#$!%^&*]/)) {

    alert("Enter a strong password!");
    valid = false;
}

    // Phone validation
    if (phone.length !== 10 || isNaN(phone)) {
        document.getElementById("phoneError").innerHTML =
            "Please enter a 10-digit phone number.";
        valid = false;
    }

    // Department validation
    if (department === "") {
        document.getElementById("departmentError").innerHTML =
            "Please select a department.";
        valid = false;
    }

    // Display result
    if (valid) {
        document.getElementById("successMessage").innerHTML =
            "Employee registered successfully!";

        document.getElementById("employeeForm").reset();
    }
});
