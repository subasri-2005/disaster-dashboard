// Ensure the DOM is fully loaded before executing scripts
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    initMap();
    updateShelterInfo();
}

// Initialize Google Maps
function initMap() {
    const map = new google.maps.Map(document.getElementById("mapContainer"), {
        center: { lat: 37.7749, lng: -122.4194 }, // Centered on San Francisco, CA
        zoom: 10,
    });

    // Add markers for disaster-related zones
    const disasterZones = [
        { lat: 37.7749, lng: -122.4194, title: "Disaster Location" },
        { lat: 37.7849, lng: -122.4094, title: "Food Available Zone" },
        { lat: 37.7649, lng: -122.4294, title: "Clothes Need Zone" },
        { lat: 37.7549, lng: -122.4394, title: "Baby Care Zone" }
    ];

    disasterZones.forEach(zone => {
        new google.maps.Marker({
            position: { lat: zone.lat, lng: zone.lng },
            map: map,
            title: zone.title,
        });
    });
}

// Data structures to hold information
let neederLocations = [];
let emergencyContacts = [];
let volunteers = [];
let shelterInfo = [
    { name: "Shelter A", availability: "20 beds available" },
    { name: "Shelter B", availability: "15 beds available" }
];

// Function to update needer locations
function updateNeederLocations() {
    const neederLocationsDiv = document.getElementById("neederLocations");
    neederLocationsDiv.innerHTML = neederLocations.map(loc => `<p>Latitude: ${loc.latitude}, Longitude: ${loc.longitude}</p>`).join('');
}

// Function to handle communication form submission
document.getElementById("communicationForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const message = document.getElementById("message").value;
    const communicationBoard = document.getElementById("communicationBoard");
    communicationBoard.innerHTML += `<p>${message}</p>`;
    document.getElementById("communicationForm").reset();
});

// Function to handle food request form submission
document.getElementById("foodRequestForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const foodRequest = document.getElementById("foodRequest").value;
    alert(`Food request sent: ${foodRequest}`);
    document.getElementById("foodRequestForm").reset();
});

// Function to handle clothes request form submission
document.getElementById("clothesRequestForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const clothesRequest = document.getElementById("clothesRequest").value;
    alert(`Clothes request sent: ${clothesRequest}`);
    document.getElementById("clothesRequestForm").reset();
});

// Function to handle provider form submission
document.getElementById("providerForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const providerName = document.getElementById("providerName").value;
    const providerMessage = document.getElementById("providerMessage").value;
    const providerRequestsDiv = document.getElementById("providerRequests");
    providerRequestsDiv.innerHTML += `<p>${providerName}: ${providerMessage}</p>`;
    document.getElementById("providerForm").reset();
});

// Function to handle emergency contact form submission
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const contactName = document.getElementById("contactName").value;
    const contactInfo = document.getElementById("contactInfo").value;
    const contactsList = document.getElementById("contactsList");
    contactsList.innerHTML += `<li>${contactName}: ${contactInfo}</li>`;
    document.getElementById("contactForm").reset();
});

// Function to handle volunteer registration form submission
document.getElementById("volunteerForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const volunteerName = document.getElementById("volunteerName").value;
    const volunteerSkills = document.getElementById("volunteerSkills").value;
    volunteers.push({ name: volunteerName, skills: volunteerSkills });
    updateVolunteerList();
    document.getElementById("volunteerForm").reset();
});

// Function to update volunteer list
function updateVolunteerList() {
    const volunteersList = document.getElementById("volunteersList");
    volunteersList.innerHTML = volunteers.map(volunteer => `<p>${volunteer.name} - Skills: ${volunteer.skills}</p>`).join('');
}

// Function to share current location
document.getElementById("shareLocationButton").addEventListener("click", function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            neederLocations.push({ latitude, longitude });
            updateNeederLocations();
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

// Function to update shelter info
function updateShelterInfo() {
    const shelterContainer = document.getElementById("shelterContainer");
    shelterContainer.innerHTML = shelterInfo.map(shelter => `<p>${shelter.name}: ${shelter.availability}</p>`).join('');
}
