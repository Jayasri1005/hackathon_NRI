let crewMembers = [];
let crewTeams = [];

document.addEventListener('DOMContentLoaded', function() {
    loadCrewMembers();
    setupEventListeners();
});

function loadCrewMembers() {
    // Simulated crew data - replace with actual data fetching in a real application
    crewMembers = [
        { id: 1, name: 'John Doe', position: 'driver', status: 'offduty' },
        { id: 2, name: 'Jane Smith', position: 'conductor', status: 'offduty' },
        { id: 3, name: 'Mike Johnson', position: 'driver', status: 'offduty' },
        { id: 4, name: 'Sarah Brown', position: 'conductor', status: 'offduty' },
        { id: 5, name: 'Tom Wilson', position: 'driver', status: 'offduty' }
    ];
    updateCrewMembersTable();
    updateCrewTeamsTable();
    populateCrewSelects();
}

function updateCrewMembersTable() {
    const tableBody = document.querySelector('#crewMembersTable tbody');
    tableBody.innerHTML = '';
    crewMembers.forEach(crew => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${crew.id}</td>
            <td>${crew.name}</td>
            <td>${crew.position}</td>
            <td>${crew.status}</td>
            <td>
                <button class="btn btn-sm btn-primary edit-crew" data-id="${crew.id}">Edit</button>
                <button class="btn btn-sm btn-danger delete-crew" data-id="${crew.id}">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function updateCrewTeamsTable() {
    const tableBody = document.querySelector('#crewTeamsTable tbody');
    tableBody.innerHTML = '';
    crewTeams.forEach((team, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${team.name}</td>
            <td>${team.driver.name}</td>
            <td>${team.driver.status}</td>
            <td>${team.conductor.name}</td>
            <td>${team.conductor.status}</td>
            <td>
                <button class="btn btn-sm btn-danger delete-team" data-index="${index}">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function populateCrewSelects() {
    const driverSelect = document.getElementById('driverSelect');
    const conductorSelect = document.getElementById('conductorSelect');
    const crewMemberSelect = document.getElementById('crewMemberSelect');

    driverSelect.innerHTML = '<option value="">Select Driver</option>';
    conductorSelect.innerHTML = '<option value="">Select Conductor</option>';
    crewMemberSelect.innerHTML = '<option value="">Select Crew Member</option>';

    crewMembers.forEach(crew => {
        const option = document.createElement('option');
        option.value = crew.id;
        option.textContent = crew.name;

        if (crew.position === 'driver') {
            driverSelect.appendChild(option.cloneNode(true));
        } else if (crew.position === 'conductor') {
            conductorSelect.appendChild(option.cloneNode(true));
        }

        crewMemberSelect.appendChild(option);
    });
}

function setupEventListeners() {
    document.getElementById('saveCrewBtn').addEventListener('click', addCrewMember);
    document.getElementById('createCrewTeamForm').addEventListener('submit', createCrewTeam);
    document.getElementById('updateStatusForm').addEventListener('submit', updateCrewStatus);
    document.getElementById('crewMembersTable').addEventListener('click', handleCrewAction);
    document.getElementById('crewTeamsTable').addEventListener('click', handleTeamAction);
}

function addCrewMember() {
    const name = document.getElementById('crewName').value;
    const position = document.getElementById('crewPosition').value;
    const status = 'offduty'; // Always set initial status to 'offduty'
    const newId = crewMembers.length > 0 ? Math.max(...crewMembers.map(c => c.id)) + 1 : 1;
    
    crewMembers.push({
        id: newId,
        name: name,
        position: position,
        status: status
    });

    updateCrewMembersTable();
    populateCrewSelects();
    bootstrap.Modal.getInstance(document.getElementById('addCrewModal')).hide();
    document.getElementById('addCrewForm').reset();
}

function createCrewTeam(event) {
    event.preventDefault();
    const crewName = document.getElementById('crewName').value;
    const driverId = document.getElementById('driverSelect').value;
    const conductorId = document.getElementById('conductorSelect').value;

    const driver = crewMembers.find(c => c.id == driverId);
    const conductor = crewMembers.find(c => c.id == conductorId);

    if (driver && conductor) {
        crewTeams.push({ name: crewName, driver, conductor });
        updateCrewTeamsTable();
        event.target.reset();
    }
}

function updateCrewStatus(event) {
    event.preventDefault();
    const crewId = document.getElementById('crewMemberSelect').value;
    const newStatus = document.getElementById('statusSelect').value;

    const crewMember = crewMembers.find(c => c.id == crewId);
    if (crewMember) {
        crewMember.status = newStatus;
        updateCrewMembersTable();
        updateCrewTeamsTable();
        event.target.reset();
    }
}

function handleCrewAction(event) {
    if (event.target.classList.contains('edit-crew')) {
        const crewId = event.target.dataset.id;
        console.log(`Edit crew member ${crewId}`);
        // Implement edit functionality
    } else if (event.target.classList.contains('delete-crew')) {
        const crewId = event.target.dataset.id;
        if (confirm('Are you sure you want to delete this crew member?')) {
            crewMembers = crewMembers.filter(c => c.id != crewId);
            crewTeams = crewTeams.filter(t => t.driver.id != crewId && t.conductor.id != crewId);
            updateCrewMembersTable();
            updateCrewTeamsTable();
            populateCrewSelects();
        }
    }
}

function handleTeamAction(event) {
    if (event.target.classList.contains('delete-team')) {
        const teamIndex = event.target.dataset.index;
        if (confirm('Are you sure you want to delete this crew team?')) {
            crewTeams.splice(teamIndex, 1);
            updateCrewTeamsTable();
        }
    }
}

