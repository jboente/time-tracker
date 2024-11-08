let startTime, endTime;
let timer;
let elapsedSeconds = 0;

document.getElementById('start').addEventListener('click', function() {
    if (!startTime) {
        startTime = new Date();
        timer = setInterval(updateTimeDisplay, 1000);
    }
});

document.getElementById('stop').addEventListener('click', function() {
    if (startTime) {
        clearInterval(timer);
        endTime = new Date();
        elapsedSeconds += Math.round((endTime - startTime) / 1000);
        startTime = null;
        updateTimeDisplay();
    }
});

document.getElementById('clear').addEventListener('click', function() {
    clearInterval(timer);
    startTime = null;
    endTime = null;
    elapsedSeconds = 0;
    document.getElementById('task-name').value = '';
    updateTimeDisplay();
});

document.getElementById('commit').addEventListener('click', function() {
    const taskName = document.getElementById('task-name').value;
    if (taskName && elapsedSeconds > 0) {
        const data = {
            taskName: taskName,
            timeSpent: elapsedSeconds
        };
        const date = new Date();
        const fileName = `${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()}_${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}.json`;
        downloadJSON(data, fileName);
        document.getElementById('clear').click();  // Clear the form after committing
    } else {
        alert('Please enter a task name and start the timer.');
    }
});

function updateTimeDisplay() {
    const totalSeconds = elapsedSeconds + (startTime ? Math.round((new Date() - startTime) / 1000) : 0);
    document.getElementById('time-display').innerText = `Time: ${totalSeconds}s`;
}

function downloadJSON(data, fileName) {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

window.addEventListener("beforeunload", function(event) {
    event.preventDefault();
    event.returnValue = ''; // Standard way to trigger a confirmation dialog
});
