// Define the checkboxes, progress bar, and progress text elements
const checkboxes = document.querySelectorAll('.task-checkbox');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const progressContainer = document.getElementById('progress-container');

// Function to update the progress bar based on checked checkboxes
function updateProgress() {
    const totalTasks = checkboxes.length;
    const completedTasks = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;

    const percentage = (completedTasks / totalTasks) * 100;

    // Show progress container when the first checkbox is checked
    if (completedTasks > 0) {
        progressContainer.style.display = 'block';
    }

    // Update the width of the progress bar and text
    progressBar.style.width = percentage + '%';
    progressText.textContent = Math.round(percentage) + '% (You need at least 75% to pass)';

    // Check if the user passed or failed
    if (percentage >= 75) {
        progressText.classList.add('pass');
        progressText.classList.remove('fail');
    } else {
        progressText.classList.remove('pass');
        progressText.classList.add('fail');
    }
}

// Function to save the state of checkboxes in localStorage
function saveTasks() {
    checkboxes.forEach(checkbox => {
        localStorage.setItem(checkbox.id, checkbox.checked);
    });
}

// Function to load the state of checkboxes from localStorage
function loadTasks() {
    checkboxes.forEach(checkbox => {
        const savedState = localStorage.getItem(checkbox.id);
        checkbox.checked = savedState === 'true';
    });
}

// Function to reset tasks and clear saved state
function resetTasks() {
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
        localStorage.removeItem(checkbox.id);
    });
    updateProgress(); // Update the progress display after resetting
}

// Function to update images
function updateImages() {
    const imageUrls1 = [
        'https://www.planetofsuccess.com/blog/wp-content/uploads/2019/04/Workout-Motivation-Quotes_5.jpg',
        'https://i.pinimg.com/736x/7b/99/d9/7b99d935a4c7e63cf8c20c3fbdf8a69f.jpg',
        'https://i5.walmartimages.com/seo/EzPosterPrints-Bodybuilding-Men-Girl-Fitness-Workout-Quotes-Motivational-Inspirational-Muscle-Gym-Posters-Wall-Art-Print-Home-Office-MOTIVATION-QUOTE_a798e663-c7c6-4058-a3d0-7711dd93d085.b4634a5fb0e42a3c5f443453a054dd78.jpeg',
        'https://www.wewishes.com/wp-content/uploads/2020/07/Gym-Quotes-12.jpg',
    ];

    const imageUrls2 = [
        'https://cdn.quotesgram.com/img/28/55/1397337102-gym-motivation-success.jpg',
        'https://st3.depositphotos.com/3591429/15366/i/450/depositphotos_153664718-stock-photo-fit-man-showing-muscles.jpg',
        'https://mrwallpaper.com/images/hd/planking-man-with-fitness-quote-jmw5s37citzeacr6.jpg',
        'https://cdn.prod.website-files.com/63d5cc6761dbe779bd7fdbc4/63d86adcef8e496b9d4fb375_5d88256e9d7733393ecca010_fitness-motivation-quotes.jpeg',
    ];

    const currentTime = new Date().getTime();
    const thirtyMinutes = 30 * 60 * 1000;
    const imageIndex = Math.floor((currentTime / thirtyMinutes) % imageUrls1.length);

    document.getElementById('inspiration-img1').src = imageUrls1[imageIndex];
    document.getElementById('inspiration-img2').src = imageUrls2[imageIndex];
}

// Call functions when the page loads
window.onload = function() {
    loadTasks();
    updateImages();
};

// Save the tasks whenever the checkboxes are clicked
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        saveTasks();
        updateProgress(); // Update progress whenever a checkbox is changed
    });
});

// Update images every 30 minutes
setInterval(updateImages, 30 * 60 * 1000); // 30 minutes in milliseconds
