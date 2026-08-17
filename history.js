// ==========================================
// ATTEMPT HISTORY
// ==========================================

function loadHistory() {

    let attempts =
        JSON.parse(
            localStorage.getItem("attempts")
        ) || [];


    let body =
        document.getElementById(
            "historyBody"
        );


    let count =
        document.getElementById(
            "attemptCount"
        );


    body.innerHTML = "";


    // Attempt count

    count.innerText =
        attempts.length +
        (attempts.length === 1
            ? " Attempt"
            : " Attempts");


    // No attempts

    if (attempts.length === 0) {

        body.innerHTML = `

            <tr>

                <td
                    colspan="5"
                    class="no-results">

                    No Quiz Attempts Found

                </td>

            </tr>

        `;

        return;
    }


    // Latest attempt first

    attempts.reverse();


    // Display attempts

    attempts.forEach(function(attempt) {

        let percentage =
            parseFloat(
                attempt.percentage || 0
            );


        let statusClass =
            attempt.status === "PASS"
                ? "pass-status"
                : "fail-status";


        body.innerHTML += `

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
                        class="status-badge ${statusClass}">

                        ${attempt.status || "N/A"}

                    </span>

                </td>

                <td>
                    ${attempt.date || "-"}
                </td>

            </tr>

        `;

    });

}


// ==========================================
// DARK MODE
// ==========================================

function toggleDarkMode() {

    document.body.classList.toggle(
        "dark-mode"
    );


    let mode =
        document.body.classList.contains(
            "dark-mode"
        );


    localStorage.setItem(
        "darkMode",
        mode
    );

}


// ==========================================
// LOAD DARK MODE
// ==========================================

if (
    localStorage.getItem("darkMode") === "true"
) {

    document.body.classList.add(
        "dark-mode"
    );

}


// ==========================================
// START
// ==========================================

loadHistory();
