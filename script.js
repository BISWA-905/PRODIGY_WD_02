let timer;
let isRunning = false;
let isPaused = false;
let seconds = 0;
let minutes = 0;
let hours = 0;
let recordedTimes = [];

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        document.getElementById("startStop").textContent = "Start";
    } else {
        timer = setInterval(updateDisplay, 1000);
        document.getElementById("startStop").textContent = "Stop";
    }
    isRunning = !isRunning;
}

function updateDisplay() {
    if (!isPaused) {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
            if (minutes === 60) {
                minutes = 0;
                hours++;
            }
        }
        document.getElementById("display").textContent = formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds);
    }
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    isPaused = false;
    seconds = 0;
    minutes = 0;
    hours = 0;
    document.getElementById("display").textContent = "00:00:00";
    document.getElementById("startStop").textContent = "Start";
    recordedTimes = [];
    updateRecordedTimes();
}

function pauseResume() {
    if (isRunning) {
        isPaused = !isPaused;
        document.getElementById("pauseResume").textContent = isPaused ? "Resume" : "Pause";
    }
}

function record() {
    if (isRunning && !isPaused) {
        recordedTimes.push(formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds));
        updateRecordedTimes();
    }
}

function updateRecordedTimes() {
    const recordedTimesContainer = document.getElementById("recordedTimes");
    recordedTimesContainer.innerHTML = "<strong>Recorded Times:</strong>";
    recordedTimes.forEach((time, index) => {
        const recordItem = document.createElement("div");
        recordItem.textContent = `${index + 1}. ${time}`;
        recordedTimesContainer.appendChild(recordItem);
    });
}

function formatTime(time) {
    return time < 10 ? "0" + time : time;
}
