// Sample tour data
const tours = [
    { 
        name: "Gurez Valley", 
        date: " 2025", 
        abouttheplace: "We've explored Gurez Valley multiple times, captivated by its stunning landscapes, serene rivers, and welcoming locals. We're eagerly planning another visit in 2025 to create more unforgettable memories.",
        image: "gurez valley.jpg"
    },
    { 
        name: "Ladakh", 
        date: "2025", 
        abouttheplace: "Ladakh is a stunning region in northern India, known for its dramatic landscapes, high-altitude deserts, and serene monasteries. I've visited several times and always been amazed by its breathtaking beauty. I’m excited to explore Ladakh again in 2025, eager to experience its unique charm once more.",
        image: "https://media.istockphoto.com/id/1218830644/photo/beautiful-lake.webp?b=1&s=170667a&w=0&k=20&c=UknVe9ZullBVMA6MQ_wG-SHzqYIR0H6BVVS4p6-tQ40="
    },
    // { 
    //     name: "New York City Experience", 
    //     date: "October 10, 2024", 
    //     price: "$1200",
    //     image: "https://source.unsplash.com/500x300/?newyork"
    // },
    // { 
    //     name: "Safari in Kenya", 
    //     date: "November 20, 2024", 
    //     title: "$1800",
    //     image: "https://source.unsplash.com/500x300/?safari"
    // }
];

// Function to display tours
function displayTours() {
    const toursList = document.getElementById('tours-list');
    tours.forEach(tour => {
        const tourElement = document.createElement('div');
        tourElement.className = 'tour-card';
        tourElement.innerHTML = `
            <div class="tour-image" style="background-image: url('${tour.image}')"></div>
            <div class="tour-content">
                <h3>${tour.name}</h3>
                <p>Date: ${tour.date}</p>
                <p>About The palace: ${tour.abouttheplace}</p>
            </div>
        `;
        toursList.appendChild(tourElement);
    });
}

// Handle form submission
// document.getElementById('interest-form').addEventListener('submit', function(e) {
//     e.preventDefault();
//     const name = document.getElementById('name').value;
//     const email = document.getElementById('email').value;
//     const tour = document.getElementById('tour').value;
//     const message = document.getElementById('message').value;

//     // Here you would typically send this data to a server
//     // For this example, we'll just log it to the console
//     console.log('Form submitted:', { name, email, tour, message });
//     alert('Thank you for your interest! We will contact you soon.');
//     this.reset();
// });

// Hamburger menu functionality
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('nav ul li a').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Initialize the page
window.onload = function() {
    displayTours();
};