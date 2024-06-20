const tableElement = document.getElementById("eventTable");
tableElement.hidden = true;

let startedTimestamp = new Date().valueOf();
let finishedTimestamp;

function millisToSeconds(milliseconds) {
    return Math.floor(milliseconds / 1000);
}

function getGameStartedData() {
    startedTimestamp = new Date().valueOf();
    return {type: "gameStarted", game: "Sample game"};
}

function getGameEndedData() {
    const score = document.getElementById("scoreInput").value;
    finishedTimestamp = new Date().valueOf();

    const gameDuration = finishedTimestamp - startedTimestamp;
    return {
        type: "gameProgress",
        score,
        scoreType: "seconds",
        gameDurationSeconds: millisToSeconds(gameDuration),
        endOfRun: true,
        game: "Sample game"
    };
}

function handleGameStart() {
    const data = getGameStartedData();
    document.getElementById("endRunButton").disabled = false;
    document.getElementById("startGameButton").disabled = true;

    document.getElementById("startBanner").hidden = true;
    document.getElementById("endBanner").hidden = false;

    appendToTable(data);

    window.top.postMessage(data, "*");
}

function handleGameEnd() {
    const data = getGameEndedData();
    appendToTable(data);

    window.top.postMessage(data, "*");
}

function appendToTable(data) {
    document.getElementById("eventTable").hidden = tableElement.rows.length < 1;

    let newRow = document.createElement("tr");
    let firstCell = document.createElement("td");
    let secondCell = document.createElement("td");

    firstCell.innerHTML = data.type;
    secondCell.innerHTML = JSON.stringify(data);
    newRow.append(firstCell);
    newRow.append(secondCell);

    document.getElementById("rows").appendChild(newRow);
}
