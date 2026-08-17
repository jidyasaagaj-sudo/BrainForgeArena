// ==========================================
// LEADERBOARD
// ==========================================

function loadLeaderboard() {

    let leaderboard =
        JSON.parse(
            localStorage.getItem("leaderboard")
        ) || [];

    let body =
        document.getElementById(
            "leaderboardBody"
        );

    body.innerHTML = "";


    // No results

    if (leaderboard.length === 0) {

        body.innerHTML = `
            <tr>
                <td colspan="5" class="no-results">
                    No Quiz Results Found
                </td>
            </tr>
        `;

        return;
    }


    // Sort highest percentage first

    leaderboard.sort(function(a, b) {

        return (
            parseFloat(b.percentage || 0) -
            parseFloat(a.percentage || 0)
        );

    });


    // Display results

    leaderboard.forEach(function(item, index) {

        let percentage =
            parseFloat(item.percentage || 0);


        let rankClass = "";

        if (index === 0) {
            rankClass = "gold-rank";
        }
        else if (index === 1) {
            rankClass = "silver-rank";
        }
        else if (index === 2) {
            rankClass = "bronze-rank";
        }


        body.innerHTML += `

            <tr>

                <td>
                    <span class="rank ${rankClass}">
                        ${index + 1}
                    </span>
                </td>

                <td>
                    ${item.name || "Student"}
                </td>

                <td>
                    ${item.subject || "Quiz"}
                </td>

                <td>
                    ${item.score || 0}/${item.total || 0}
                </td>

                <td class="percentage-value">
                    ${percentage.toFixed(2)}%
                </td>

            </tr>

        `;

    });

}


// ==========================================
// CERTIFICATE
// ==========================================

function goCertificate() {

    window.location.href =
        "certificate.html";

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
// LOAD SAVED DARK MODE
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

loadLeaderboard();