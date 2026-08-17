let currentUser =
JSON.parse(
localStorage.getItem("currentUser")
) || {};

let student =
JSON.parse(
localStorage.getItem("studentDetails")
) || {};

let attempts =
JSON.parse(
localStorage.getItem("attempts")
) || [];

let latestAttempt =
attempts[attempts.length - 1];


if(latestAttempt){

    // =========================
    // STUDENT NAME
    // =========================

    document.getElementById(
        "studentName"
    ).innerText =
        currentUser.name ||
        student.name ||
        "Student";


    // =========================
    // SUBJECT
    // =========================

    document.getElementById(
        "subjectName"
    ).innerText =
        latestAttempt.subject ||
        "Quiz";


    // =========================
    // SCORE
    // =========================

    document.getElementById(
        "scoreText"
    ).innerText =
        "Score : "
        + latestAttempt.score +
        "/"
        + latestAttempt.total +
        " | "
        + latestAttempt.percentage +
        "%";


    // =========================
    // PASS / FAIL
    // =========================

    let percentage =
        parseFloat(
            latestAttempt.percentage
        ) || 0;

    let status =
        percentage >= 60
            ? "PASS"
            : "FAIL";


    // Existing status element असेल तर त्यात दाखवेल
    let statusElement =
        document.getElementById("statusText");


    // नसल्यास नवीन element तयार करेल
    if(!statusElement){

        statusElement =
            document.createElement("h3");

        statusElement.id =
            "statusText";

        let scoreElement =
            document.getElementById(
                "scoreText"
            );

        scoreElement.after(
            statusElement
        );

    }


    statusElement.innerText =
        "Status : " + status;


    // =========================
    // DATE
    // =========================

    document.getElementById(
        "dateText"
    ).innerText =
        "Date : "
        + new Date().toLocaleDateString();


    // =========================
    // CERTIFICATE ID
    // =========================

    document.getElementById(
        "certificateId"
    ).innerText =
        "Certificate ID : BF-"
        +
        Math.floor(
            100000 +
            Math.random() * 900000
        );

}