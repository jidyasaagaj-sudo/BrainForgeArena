// ======================================================
// BRAINFO RGE DASHBOARD
// FINAL USER-WISE DATA VERSION
// ======================================================

// ======================================================
// HELPERS
// ======================================================

function getJSON(key, fallback = null) {

    try {

        const data =
            JSON.parse(
                localStorage.getItem(key)
            );

        return data ?? fallback;

    } catch (error) {

        return fallback;

    }

}

function getNumber(key, fallback = 0) {

    const value =
        parseFloat(
            localStorage.getItem(key)
        );

    return Number.isFinite(value)
        ? value
        : fallback;

}

// ======================================================
// CURRENT USER
// ======================================================

const currentUser =
    getJSON("currentUser", null);

const studentName =
    currentUser &&
    currentUser.name
        ? currentUser.name
        : (
            localStorage.getItem("studentName") ||
            "Student"
        );

// DISPLAY CURRENT USER NAME

const studentNameElement =
    document.getElementById("studentName");

if (studentNameElement) {

    studentNameElement.innerText =
        studentName;

}

// ======================================================
// ATTEMPTS - CURRENT USER ONLY
// ======================================================

const allAttempts =
    getJSON("attempts", []);

const attempts =
    Array.isArray(allAttempts)
        ? allAttempts.filter(attempt => {

            if (!currentUser) {
                return false;
            }

            const attemptName =
                String(
                    attempt.name || ""
                )
                .trim()
                .toLowerCase();

            const loggedInName =
                String(
                    currentUser.name || ""
                )
                .trim()
                .toLowerCase();

            return attemptName === loggedInName;

        })
        : [];

// TOTAL ATTEMPTS

const attemptsElement =
    document.getElementById("attempts");

if (attemptsElement) {

    attemptsElement.innerText =
        attempts.length;

}

// ======================================================
// BEST SCORE - CURRENT USER ONLY
// ======================================================

let bestScore = 0;

attempts.forEach(attempt => {

    const percentage =
        parseFloat(
            attempt.percentage
        ) || 0;

    if (percentage > bestScore) {

        bestScore =
            percentage;

    }

});

const bestScoreElement =
    document.getElementById("bestScore");

if (bestScoreElement) {

    bestScoreElement.innerText =
        bestScore.toFixed(2) + "%";

}

// ======================================================
// CERTIFICATES - CURRENT USER ONLY
// ======================================================

// One certificate per passed subject

const certificateSubjects =
    new Set();

attempts.forEach(attempt => {

    const percentage =
        parseFloat(
            attempt.percentage
        ) || 0;

    if (
        percentage >= 60 &&
        attempt.subject
    ) {

        certificateSubjects.add(
            String(
                attempt.subject
            ).trim()
        );

    }

});

const certificateCount =
    certificateSubjects.size;

const certificateElement =
    document.getElementById("certificates");

if (certificateElement) {

    certificateElement.innerText =
        certificateCount;

}

// ======================================================
// COURSES COMPLETED - CURRENT USER ONLY
// ======================================================

// One completed course per passed subject

const completedSubjects =
    new Set();

attempts.forEach(attempt => {

    const percentage =
        parseFloat(
            attempt.percentage
        ) || 0;

    if (
        percentage >= 60 &&
        attempt.subject
    ) {

        completedSubjects.add(
            String(
                attempt.subject
            ).trim()
        );

    }

});

const coursesCompleted =
    completedSubjects.size;

const coursesCompletedElement =
    document.getElementById(
        "coursesCompleted"
    );

if (coursesCompletedElement) {

    coursesCompletedElement.innerText =
        coursesCompleted;

}

// ======================================================
// COURSE PROGRESS - CURRENT USER ONLY
// ======================================================

const userPrefix =
    String(studentName).trim();

const htmlProgress =
    getNumber(
        userPrefix + "_HTMLProgress",
        0
    );

const cssProgress =
    getNumber(
        userPrefix + "_CSSProgress",
        0
    );

const jsProgress =
    getNumber(
        userPrefix + "_JavaScriptProgress",
        0
    );

const webProgress =
    getNumber(
        userPrefix + "_WebDevelopmentProgress",
        0
    );

// ======================================================
// UPDATE PROGRESS FUNCTION
// ======================================================

function updateProgress(
    barId,
    textId,
    value
) {

    const safeValue =
        Math.max(
            0,
            Math.min(
                100,
                Number(value) || 0
            )
        );

    const bar =
        document.getElementById(
            barId
        );

    const text =
        document.getElementById(
            textId
        );

    if (bar) {

        bar.style.width =
            safeValue + "%";

    }

    if (text) {

        text.innerText =
            safeValue.toFixed(2) + "%";

    }

}

// ======================================================
// APPLY PROGRESS
// ======================================================

updateProgress(
    "htmlBar",
    "htmlText",
    htmlProgress
);

updateProgress(
    "cssBar",
    "cssText",
    cssProgress
);

updateProgress(
    "jsBar",
    "jsText",
    jsProgress
);

updateProgress(
    "webBar",
    "webText",
    webProgress
);

// ======================================================
// RECENT QUIZ RESULTS - CURRENT USER ONLY
// ======================================================

const recentResults =
    document.getElementById(
        "recentResults"
    );

if (recentResults) {

    recentResults.innerHTML = "";

    if (attempts.length === 0) {

        recentResults.innerHTML = `

            <tr>

                <td
                    colspan="4"
                    class="empty-row"
                >
                    No quiz attempts yet.
                </td>

            </tr>

        `;

    }
    else {

        attempts
            .slice()
            .reverse()
            .slice(0, 5)
            .forEach(attempt => {

                const percentage =
                    parseFloat(
                        attempt.percentage
                    ) || 0;

                const status =
                    attempt.status ||
                    (
                        percentage >= 60
                            ? "PASS"
                            : "FAIL"
                    );

                const statusClass =
                    status === "PASS"
                        ? "status-pass"
                        : "status-fail";

                recentResults.innerHTML += `

                    <tr>

                        <td>
                            ${attempt.subject || "Quiz"}
                        </td>

                        <td>
                            ${attempt.score || 0}/${attempt.total || 0}
                        </td>

                        <td>
                            ${percentage.toFixed(2)}%
                        </td>

                        <td>

                            <span
                                class="status-badge ${statusClass}"
                            >
                                ${status}
                            </span>

                        </td>

                    </tr>

                `;

            });

    }

}

// ======================================================
// LEADERBOARD
// IMPORTANT: GLOBAL - DO NOT FILTER
// ======================================================

const leaderboard =
    getJSON(
        "leaderboard",
        []
    );

if (Array.isArray(leaderboard)) {

    leaderboard.sort(
        (a, b) => {

            return (
                parseFloat(
                    b.percentage
                ) || 0
            )
            -
            (
                parseFloat(
                    a.percentage
                ) || 0
            );

        }
    );

}

// ======================================================
// TOP PERFORMER
// IMPORTANT: GLOBAL - KEEP AS IS
// ======================================================

const topName =
    document.getElementById(
        "topName"
    );

const topPercent =
    document.getElementById(
        "topPercent"
    );

const topSubject =
    document.getElementById(
        "topSubject"
    );

if (
    Array.isArray(leaderboard) &&
    leaderboard.length > 0
) {

    const top =
        leaderboard[0];

    if (topName) {

        topName.innerText =
            typeof top.name === "string"
                ? top.name
                : "Student";

    }

    if (topPercent) {

        topPercent.innerText =
            (
                parseFloat(
                    top.percentage
                ) || 0
            ).toFixed(2) + "%";

    }

    if (topSubject) {

        topSubject.innerText =
            top.subject ||
            "Quiz";

    }

}
else {

    if (topName) {

        topName.innerText =
            "Student";

    }

    if (topPercent) {

        topPercent.innerText =
            "0%";

    }

    if (topSubject) {

        topSubject.innerText =
            "No quiz yet";

    }

}

// ======================================================
// DASHBOARD LEADERBOARD
// GLOBAL - DO NOT FILTER
// ======================================================

const dashboardLeaderboard =
    document.getElementById(
        "dashboardLeaderboard"
    );

if (dashboardLeaderboard) {

    dashboardLeaderboard.innerHTML = "";

    if (
        !Array.isArray(leaderboard) ||
        leaderboard.length === 0
    ) {

        dashboardLeaderboard.innerHTML = `

            <div class="leaderboard-empty">
                No quiz results yet.
            </div>

        `;

    }
    else {

        leaderboard
            .slice(0, 5)
            .forEach((item, index) => {

                let rankClass = "";

                if (index === 0) {

                    rankClass =
                        "rank-one";

                }
                else if (index === 1) {

                    rankClass =
                        "rank-two";

                }
                else if (index === 2) {

                    rankClass =
                        "rank-three";

                }

                dashboardLeaderboard.innerHTML += `

                    <div
                        class="leaderboard-item"
                    >

                        <div
                            class="
                                leaderboard-rank
                                ${rankClass}
                            "
                        >
                            ${index + 1}
                        </div>

                        <div
                            class="leaderboard-avatar"
                        >
                            👤
                        </div>

                        <div
                            class="leaderboard-name"
                        >

                            <strong>
                                ${item.name || "Student"}
                            </strong>

                            <small>
                                ${item.subject || "Quiz"}
                            </small>

                        </div>

                        <div
                            class="leaderboard-score"
                        >

                            ${
                                (
                                    parseFloat(
                                        item.percentage
                                    ) || 0
                                ).toFixed(2)
                            }%

                        </div>

                    </div>

                `;

            });

    }

}

// ======================================================
// LOGIN STREAK
// ======================================================

const streak =
    parseInt(
        localStorage.getItem(
            "loginStreak"
        )
    ) || 1;

const streakElement =
    document.getElementById(
        "streak"
    );

if (streakElement) {

    streakElement.innerText =
        streak + " Days";

}

// ======================================================
// DARK MODE
// ======================================================

function toggleDarkMode() {

    document.body.classList.toggle(
        "dark-mode"
    );

    const isDark =
        document.body.classList.contains(
            "dark-mode"
        );

    localStorage.setItem(
        "darkMode",
        isDark
            ? "true"
            : "false"
    );

}

if (
    localStorage.getItem(
        "darkMode"
    ) === "true"
) {

    document.body.classList.add(
        "dark-mode"
    );

}

// ======================================================
// MOBILE SIDEBAR
// ======================================================

function toggleSidebar() {

    const sidebar =
        document.getElementById(
            "sidebar"
        );

    if (sidebar) {

        sidebar.classList.toggle(
            "sidebar-open"
        );

    }

}

// ======================================================
// LOGOUT
// ======================================================

function logoutUser() {

    localStorage.removeItem(
        "currentUser"
    );

    localStorage.removeItem(
        "studentName"
    );

    window.location.href =
        "index.html";

}