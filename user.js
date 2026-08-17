document
.getElementById("studentForm")
.addEventListener("submit", function(e){

e.preventDefault();

const student = {

name:
document.getElementById("name").value,

college:
document.getElementById("college").value,

roll:
document.getElementById("roll").value,

department:
document.getElementById("department").value,

course:
document.getElementById("course").value,

mobile:
document.getElementById("mobile").value

};

localStorage.setItem(
"studentDetails",
JSON.stringify(student)
);

window.location.href =
"course.html";

});