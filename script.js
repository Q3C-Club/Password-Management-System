let passwords = [];
let editIndex = -1;

function generatePassword() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let password = "";
    for (let i = 0; i < 12; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    document.getElementById("password").value = password;
}

function addOrEditPassword() {
    const siteName = document.getElementById("siteName").value;
    const password = document.getElementById("password").value;

    if (!siteName || !password) {
        alert("Please fill out both fields.");
        return;
    }

    if (editIndex === -1) {
        // Add new password
        passwords.push({ siteName, password });
    } else {
        // Edit existing password
        passwords[editIndex] = { siteName, password };
        editIndex = -1;
        document.getElementById("addEditBtn").innerText = "Add Password";
    }

    document.getElementById("siteName").value = "";
    document.getElementById("password").value = "";
    renderPasswordList();
}

function renderPasswordList() {
    const passwordList = document.getElementById("passwordList");
    passwordList.innerHTML = "";

    passwords.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "password-item";
        div.innerHTML = `
            <span><strong>${item.siteName}</strong>: ${item.password}</span>
            <button class="edit-btn" onclick="editPassword(${index})">Edit</button>
        `;
        passwordList.appendChild(div);
    });
}

function editPassword(index) {
    document.getElementById("siteName").value = passwords[index].siteName;
    document.getElementById("password").value = passwords[index].password;
    editIndex = index;
    document.getElementById("addEditBtn").innerText = "Save Changes";
}