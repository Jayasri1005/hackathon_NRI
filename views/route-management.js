let map;
let routes = [];

document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    loadRoutes();
    setupEventListeners();
});

function initializeMap() {
    map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
}

function loadRoutes() {
    // Simulated route data
    routes = [
        { id: 1, number: "101", startPoint: "City Center", endPoint: "Suburb A", status: "Active" },
        { id: 2, number: "202", startPoint: "Suburb B", endPoint: "Airport", status: "Active" },
        { id: 3, number: "303", startPoint: "Shopping Mall", endPoint: "University", status: "Inactive" }
    ];
    updateRoutesList();
}

function updateRoutesList() {
    const routesList = document.getElementById('routesList');
    routesList.innerHTML = '';
    routes.forEach(route => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${route.number}</td>
            <td>${route.startPoint}</td>
            <td>${route.endPoint}</td>
            <td>${route.status}</td>
            <td>
                <button class="btn btn-sm btn-primary edit-route" data-id="${route.id}">Edit</button>
                <button class="btn btn-sm btn-danger delete-route" data-id="${route.id}">Delete</button>
            </td>
        `;
        routesList.appendChild(row);
    });
}

function setupEventListeners() {
    document.getElementById('newRouteBtn').addEventListener('click', () => openRouteModal());
    document.getElementById('saveRouteBtn').addEventListener('click', saveRoute);
    document.getElementById('routesList').addEventListener('click', handleRouteAction);
}

function openRouteModal(route = null) {
    const modal = new bootstrap.Modal(document.getElementById('routeModal'));
    const modalTitle = document.getElementById('routeModalLabel');
    const routeForm = document.getElementById('routeForm');

    if (route) {
        modalTitle.textContent = 'Edit Route';
        routeForm.elements.routeNumber.value = route.number;
        routeForm.elements.startPoint.value = route.startPoint;
        routeForm.elements.endPoint.value = route.endPoint;
        routeForm.dataset.routeId = route.id;
    } else {
        modalTitle.textContent = 'Create New Route';
        routeForm.reset();
        delete routeForm.dataset.routeId;
    }

    modal.show();
}

function saveRoute() {
    const routeForm = document.getElementById('routeForm');
    const routeData = {
        number: routeForm.elements.routeNumber.value,
        startPoint: routeForm.elements.startPoint.value,
        endPoint: routeForm.elements.endPoint.value,
        status: 'Active'
    };

    if (routeForm.dataset.routeId) {
        // Edit existing route
        const routeIndex = routes.findIndex(r => r.id == routeForm.dataset.routeId);
        if (routeIndex !== -1) {
            routes[routeIndex] = { ...routes[routeIndex], ...routeData };
        }
    } else {
        // Create new route
        const newId = routes.length > 0 ? Math.max(...routes.map(r => r.id)) + 1 : 1;
        routes.push({ id: newId, ...routeData });
    }

    updateRoutesList();
    bootstrap.Modal.getInstance(document.getElementById('routeModal')).hide();
}

function handleRouteAction(event) {
    if (event.target.classList.contains('edit-route')) {
        const routeId = event.target.dataset.id;
        const route = routes.find(r => r.id == routeId);
        if (route) {
            openRouteModal(route);
        }
    } else if (event.target.classList.contains('delete-route')) {
        const routeId = event.target.dataset.id;
        if (confirm('Are you sure you want to delete this route?')) {
            routes = routes.filter(r => r.id != routeId);
            updateRoutesList();
        }
    }
}

