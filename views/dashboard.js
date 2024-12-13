document.addEventListener('DOMContentLoaded', function() {
    // Simulate real-time updates
    setInterval(updateDashboard, 5000);
});

function updateDashboard() {
    // Update active routes
    const activeRoutes = document.getElementById('activeRoutes');
    activeRoutes.textContent = Math.floor(Math.random() * 10) + 20;

    // Update buses in service
    const busesInService = document.getElementById('busesInService');
    busesInService.textContent = Math.floor(Math.random() * 20) + 70;

    // Update on-duty crew
    const onDutyCrew = document.getElementById('onDutyCrew');
    onDutyCrew.textContent = Math.floor(Math.random() * 30) + 80;

    // Simulate new alerts
    const alertsList = document.getElementById('alertsList');
    if (Math.random() > 0.7) {
        const newAlert = document.createElement('li');
        newAlert.className = 'list-group-item list-group-item-' + getRandomAlertType();
        newAlert.textContent = generateRandomAlert();
        alertsList.prepend(newAlert);

        // Remove oldest alert if there are more than 5
        if (alertsList.children.length > 5) {
            alertsList.removeChild(alertsList.lastChild);
        }
    }
}

function getRandomAlertType() {
    const types = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'];
    return types[Math.floor(Math.random() * types.length)];
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

