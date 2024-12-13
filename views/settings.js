document.addEventListener('DOMContentLoaded', function() {
    setupFormListeners();
    setupDataManagementListeners();
});

function setupFormListeners() {
    document.getElementById('accountForm').addEventListener('submit', function(event) {
        event.preventDefault();
        updateAccount();
    });

    document.getElementById('configForm').addEventListener('submit', function(event) {
        event.preventDefault();
        saveConfiguration();
    });
}

function setupDataManagementListeners() {
    document.getElementById('exportDataBtn').addEventListener('click', exportData);
    document.getElementById('importDataBtn').addEventListener('click', importData);
    document.getElementById('resetDataBtn').addEventListener('click', resetData);
}

function updateAccount() {
    const email = document.getElementById('email').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword !== confirmPassword) {
        alert('New password and confirmation do not match.');
        return;
    }

    // In a real application, you would send this data to the server
    console.log('Updating account:', { email, newPassword });
    alert('Account updated successfully!');
}

function saveConfiguration() {
    const language = document.getElementById('language').value;
    const timezone = document.getElementById('timezone').value;
    const notifications = document.getElementById('notifications').checked;

    // In a real application, you would send this data to the server
    console.log('Saving configuration:', { language, timezone, notifications });
    alert('Configuration saved successfully!');
}

function exportData() {
    // In a real application, this would trigger a data export process
    console.log('Exporting system data');
    alert('System data export initiated. You will receive a download link shortly.');
}

function importData() {
    // In a real application, this would open a file dialog and handle the import process
    console.log('Importing system data');
    alert('Please select a file to import system data.');
}

function resetData() {
    if (confirm('Are you sure you want to reset all system data? This action cannot be undone.')) {
        // In a real application, this would trigger a data reset process
        console.log('Resetting system data');
        alert('System data has been reset successfully.');
    }
}

