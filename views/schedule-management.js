let calendar;

document.addEventListener('DOMContentLoaded', function() {
    initializeCalendar();
    loadFormOptions();
    setupEventListeners();
});

function initializeCalendar() {
    const calendarEl = document.getElementById('calendar');
    calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'timeGridWeek',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: [
            // Sample events
            {
                title: 'Route 101 - Bus A1',
                start: '2023-05-01T08:00:00',
                end: '2023-05-01T16:00:00'
            },
            {
                title: 'Route 202 - Bus B2',
                start: '2023-05-02T09:00:00',
                end: '2023-05-02T17:00:00'
            }
        ],
        editable: true,
        selectable: true,
        select: function(info) {
            // Handle date selection
            console.log('Selected ' + info.startStr + ' to ' + info.endStr);
        },
        eventClick: function(info) {
            // Handle event click
            console.log('Event: ' + info.event.title);
        }
    });
    calendar.render();
}

function loadFormOptions() {
    // Simulated data - replace with actual data fetching in a real application
    const routes = ['101', '202', '303'];
    const buses = ['A1', 'B2', 'C3'];
    const crews = ['Crew 1', 'Crew 2', 'Crew 3'];

    populateSelect('linkedRoute', routes);
    populateSelect('linkedBus', buses);
    populateSelect('linkedCrew', crews);
    populateSelect('unlinkedCrew', crews);
}

function populateSelect(id, options) {
    const select = document.getElementById(id);
    options.forEach(option => {
        const el = document.createElement('option');
        el.textContent = option;
        el.value = option;
        select.appendChild(el);
    });
}

function setupEventListeners() {
    document.getElementById('linkedDutyForm').addEventListener('submit', handleLinkedDutySubmit);
    document.getElementById('unlinkedDutyForm').addEventListener('submit', handleUnlinkedDutySubmit);
}

function handleLinkedDutySubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const dutyData = Object.fromEntries(formData.entries());
    
    // Add the linked duty to the calendar
    calendar.addEvent({
        title: `Route ${dutyData.linkedRoute} - Bus ${dutyData.linkedBus}`,
        start: dutyData.linkedStartTime,
        end: dutyData.linkedEndTime
    });

    // Reset the form
    event.target.reset();
}

function handleUnlinkedDutySubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const dutyData = Object.fromEntries(formData.entries());
    
    // Add the unlinked duty to the calendar
    calendar.addEvent({
        title: `${dutyData.unlinkedType} - ${dutyData.unlinkedCrew}`,
        start: dutyData.unlinkedStartTime,
        end: dutyData.unlinkedEndTime,
        color: getDutyTypeColor(dutyData.unlinkedType)
    });

    // Reset the form
    event.target.reset();
}

function getDutyTypeColor(type) {
    switch (type) {
        case 'rest':
            return '#28a745';
        case 'training':
            return '#ffc107';
        case 'standby':
            return '#17a2b8';
        default:
            return '#007bff';
    }
}

