// ======================
// REGISTER
// ======================

document
.getElementById("registerForm")
.addEventListener("submit", function(e){

e.preventDefault();

let users =
JSON.parse(
localStorage.getItem("users")
) || [];

let user = {

name:
document.getElementById("regName").value,

email:
document.getElementById("regEmail").value,

password:
document.getElementById("regPassword").value

};

let alreadyExists =
users.find(
u => u.email === user.email
);

if(alreadyExists){

alert("Email already registered");

return;

}

users.push(user);

localStorage.setItem(
"users",
JSON.stringify(users)
);

alert("Registration Successful");

this.reset();

});

// ======================
// LOGIN
// ======================

document
.getElementById("loginForm")
.addEventListener("submit", function(e){

e.preventDefault();

let email =
document.getElementById("loginEmail").value;

let password =
document.getElementById("loginPassword").value;

let users =
JSON.parse(
localStorage.getItem("users")
) || [];

let found =
users.find(
u =>
u.email === email &&
u.password === password
);

if(found){

// LOGIN STREAK

let today =
new Date().toDateString();

let lastLogin =
localStorage.getItem("lastLoginDate");

let streak =
parseInt(
localStorage.getItem("loginStreak")
) || 0;

if(lastLogin !== today){

streak++;

localStorage.setItem(
"loginStreak",
streak
);

localStorage.setItem(
"lastLoginDate",
today
);

}

// SAVE USER

localStorage.setItem(
"currentUser",
JSON.stringify(found)
);

localStorage.setItem(
"studentName",
found.name
);

// CHECK STUDENT DETAILS

let studentDetails =
JSON.parse(
localStorage.getItem("studentDetails")
);

if(studentDetails){

window.location.href =
"dashboard.html";

}
else{

window.location.href =
"user-details.html";

}

}
else{

alert(
"Invalid Email or Password"
);

}

});

// ======================
// LOGOUT
// ======================

function logout(){

localStorage.removeItem(
"currentUser"
);

window.location.href =
"index.html";

}