document.addEventListener('DOMContentLoaded', function() {
    // Simulate real-time updates
    setInterval(updateDashboard, 5000);
});

function updateDashboard() {
    // Update active routes
    const activeRoutes = document.querySelector('#system-status .status-card:nth-child(2) .status-number');
    activeRoutes.textContent = Math.floor(Math.random() * 10) + 20;

    // Update buses in service
    const busesInService = document.querySelector('#system-status .status-card:nth-child(3) .status-number');
    busesInService.textContent = Math.floor(Math.random() * 20) + 70;

    // Update on-duty crew
    const onDutyCrew = document.querySelector('#system-status .status-card:nth-child(4) .status-number');
    onDutyCrew.textContent = Math.floor(Math.random() * 30) + 80;

    // Simulate new alerts
    const alertsList = document.querySelector('#alerts ul');
    if (Math.random() > 0.7) {
        const newAlert = document.createElement('li');
        newAlert.className = 'alert-item';
        newAlert.textContent = 'New alert: ' + generateRandomAlert();
        alertsList.prepend(newAlert);

        // Remove oldest alert if there are more than 5
        if (alertsList.children.length > 5) {
            alertsList.removeChild(alertsList.lastChild);
        }
    }
}

function generateRandomAlert() {
    const alerts = [
        "Traffic congestion on Route 7",
        "Weather advisory: Expect delays",
        "Bus #2048 requires immediate maintenance",
        "Crew member reported sick for night shift",
        "Passenger overflow on Route 3"
    ];
    return alerts[Math.floor(Math.random() * alerts.length)];
}

