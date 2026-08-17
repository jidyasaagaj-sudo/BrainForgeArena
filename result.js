// ======================================================
// QUIZ RESULT
// ======================================================

let score =
    parseInt(
        localStorage.getItem("score")
    ) || 0;


let total =
    parseInt(
        localStorage.getItem("totalQuestions")
    ) || 0;


let subject =
    localStorage.getItem(
        "selectedSubject"
    ) || "Quiz";


let percentage =
    total > 0
        ? ((score / total) * 100)
        : 0;


percentage =
    Number(
        percentage.toFixed(2)
    );


let status =
    percentage >= 60
        ? "PASS"
        : "FAIL";


// ======================================================
// DISPLAY RESULT
// ======================================================

const scoreElement =
    document.getElementById("score");


const percentageElement =
    document.getElementById(
        "percentage"
    );


const statusElement =
    document.getElementById("status");


if (scoreElement) {

    scoreElement.innerText =
        "Score : " +
        score +
        "/" +
        total;

}


if (percentageElement) {

    percentageElement.innerText =
        "Percentage : " +
        percentage +
        "%";

}


if (statusElement) {

    statusElement.innerText =
        "Result : " +
        status;

}


// ======================================================
// BADGE SYSTEM
// ======================================================

let badge = "";


if (percentage >= 90) {

    badge = "🏆 Gold Badge";

}
else if (percentage >= 75) {

    badge = "🥈 Silver Badge";

}
else if (percentage >= 60) {

    badge = "🥉 Bronze Badge";

}
else {

    badge = "📖 Keep Learning";

}


const badgeElement =
    document.getElementById(
        "badge"
    );


if (badgeElement) {

    badgeElement.innerText =
        "Badge : " + badge;

}


localStorage.setItem(
    "latestBadge",
    badge
);


// ======================================================
// SUBJECT PROGRESS
// ======================================================
//
// Progress कमी होणार नाही.
// नवीन score जुन्या score पेक्षा जास्त असेल
// तरच progress update होईल.
// ======================================================

function saveBestProgress(
    key,
    value
) {

    const oldValue =
        parseFloat(
            localStorage.getItem(key)
        ) || 0;


    const newValue =
        Math.max(
            oldValue,
            value
        );


    localStorage.setItem(
        key,
        newValue.toFixed(2)
    );

}


if (subject === "HTML") {

    saveBestProgress(
        "HTMLProgress",
        percentage
    );

}
else if (subject === "CSS") {

    saveBestProgress(
        "CSSProgress",
        percentage
    );

}
else if (subject === "JavaScript") {

    saveBestProgress(
        "JavaScriptProgress",
        percentage
    );

}
else {

    saveBestProgress(
        "WebDevelopmentProgress",
        percentage
    );

}


// ======================================================
// SAVE BEST SCORE
// ======================================================

const oldBest =
    parseFloat(
        localStorage.getItem(
            "bestScore"
        )
    ) || 0;


if (percentage > oldBest) {

    localStorage.setItem(
        "bestScore",
        percentage
    );

}


// ======================================================
// SAVE BASIC RESULT DATA
// ======================================================

localStorage.setItem(
    "score",
    score
);


localStorage.setItem(
    "totalQuestions",
    total
);


localStorage.setItem(
    "courseProgress",
    percentage
);


localStorage.setItem(
    "selectedSubject",
    subject
);


// ======================================================
// CURRENT USER
// ======================================================

let currentUser =
    JSON.parse(
        localStorage.getItem(
            "currentUser"
        )
    );


if (!currentUser) {

    currentUser = {
        name: "Student"
    };

}


// ======================================================
// SAVE ATTEMPT
// ======================================================

let attempts =
    JSON.parse(
        localStorage.getItem(
            "attempts"
        )
    ) || [];


attempts.push({

    name:
        currentUser.name,

    subject:
        subject,

    score:
        score,

    total:
        total,

    percentage:
        percentage,

    status:
        status,

    date:
        new Date().toLocaleString()

});


localStorage.setItem(
    "attempts",
    JSON.stringify(attempts)
);


// ======================================================
// SAVE LEADERBOARD
// ======================================================

let leaderboard =
    JSON.parse(
        localStorage.getItem(
            "leaderboard"
        )
    ) || [];


leaderboard.push({

    name:
        currentUser.name,

    subject:
        subject,

    score:
        score,

    total:
        total,

    percentage:
        percentage

});


localStorage.setItem(
    "leaderboard",
    JSON.stringify(leaderboard)
);


// ======================================================
// CERTIFICATE SYSTEM
// ======================================================
//
// प्रत्येक subject साठी एकच certificate.
// Same subject पुन्हा pass केल्यावर
// certificate count वाढणार नाही.
// ======================================================

let certificatesList =
    JSON.parse(
        localStorage.getItem(
            "certificatesList"
        )
    ) || [];


if (status === "PASS") {

    const alreadyExists =
        certificatesList.some(item => {

            if (typeof item === "string") {

                return item === subject;

            }

            return (
                item &&
                item.subject === subject
            );

        });


    if (!alreadyExists) {

        certificatesList.push({

            subject:
                subject,

            score:
                score,

            total:
                total,

            percentage:
                percentage,

            date:
                new Date().toLocaleString()

        });

    }

}


localStorage.setItem(
    "certificatesList",
    JSON.stringify(
        certificatesList
    )
);


localStorage.setItem(
    "certificates",
    certificatesList.length
);


// ======================================================
// FAIL ATTEMPTS CHECK
// ======================================================

const failedAttempts =
    attempts.filter(attempt => {

        return (
            attempt.subject === subject &&
            attempt.status === "FAIL"
        );

    }).length;


if (failedAttempts >= 3) {

    alert(
        "You have failed 3 attempts in " +
        subject
    );

}


// ======================================================
// POPUP
// ======================================================

if (status === "PASS") {

    const popupText =
        document.getElementById(
            "popupText"
        );


    const popup =
        document.getElementById(
            "popup"
        );


    if (popupText) {

        popupText.innerText =
            "You unlocked " +
            badge;

    }


    if (popup) {

        popup.style.display =
            "block";

    }

}


// ======================================================
// BUTTONS
// ======================================================

function viewHistory() {

    window.location.href =
        "history.html";

}


function goLeaderboard() {

    window.location.href =
        "leaderboard.html";

}


function closePopup() {

    const popup =
        document.getElementById(
            "popup"
        );


    if (popup) {

        popup.style.display =
            "none";

    }

}