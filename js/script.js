document.addEventListener('DOMContentLoaded', () => {
    // ... (your existing JS code like mobile nav, form validation, etc.)

    // --- Scroll to Top Button ---
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    // When the user scrolls down 200px from the top of the document, show the button
    window.onscroll = function() {
        scrollFunction();
    };

    function scrollFunction() {
        if (scrollToTopBtn) { // Check if the button exists on the page
            if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
                // scrollToTopBtn.style.display = "block"; // Simple show/hide
                scrollToTopBtn.classList.add("visible"); // Using class for opacity transition
            } else {
                // scrollToTopBtn.style.display = "none"; // Simple show/hide
                scrollToTopBtn.classList.remove("visible");
            }
        }
    }

    // When the user clicks on the button, scroll to the top of the document
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener("click", function() {
            // For smooth scrolling:
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            // For immediate scrolling (less smooth):
            // document.body.scrollTop = 0; // For Safari
            // document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        });
    }

    // --- Highlight Active Navigation Link ---
    function highlightActiveNavLink() {
        const navLinksContainer = document.querySelector(".nav-links");
        if (!navLinksContainer) {
            console.warn("Navigation links container '.nav-links' not found.");
            return;
        }

        const navLinks = navLinksContainer.querySelectorAll("a");
        const currentPageUrl = window.location.href; // Gets the full URL
        const currentPagePath = window.location.pathname; // Gets the path (e.g., /about.html)
        
        // Extract the current page filename (e.g., "about.html" or "index.html")
        // This handles cases where the server might not show ".html" or if it's just "/" for homepage
        let currentPageFilename = currentPagePath.substring(currentPagePath.lastIndexOf('/') + 1);
        if (currentPageFilename === "" || currentPagePath === "/") { // Handle root path for index.html
            currentPageFilename = "index.html";
        }

        navLinks.forEach(link => {
            // Remove 'active' class from all links first to reset
            link.classList.remove('active');

            const linkHref = link.getAttribute('href');
            let linkFilename = linkHref.substring(linkHref.lastIndexOf('/') + 1);
            if (linkFilename === "") { // Handle case where href might just be "/"
                linkFilename = "index.html";
            }
            
            // Check if the link's filename matches the current page's filename
            if (linkFilename === currentPageFilename) {
                link.classList.add('active');
            }
            // Special case: If current page is root ("/") and link is "index.html"
            else if (currentPagePath === "/" && linkFilename === "index.html") {
                link.classList.add('active');
            }
        });
    }

    highlightActiveNavLink();

    // --- Blog Post Like Functionality ---
    const blogPosts = document.querySelectorAll('.blog-post');

    blogPosts.forEach(post => {
        const likeButton = post.querySelector('.like-button');
        const likeCountSpan = post.querySelector('.like-count');
        const postId = post.dataset.postId; // Get the unique post ID

        if (!likeButton || !likeCountSpan || !postId) {
            // console.warn("Like button, count span, or post ID not found for a post.");
            return; // Skip this post if elements are missing
        }

        let likeStorageKey = `postLikes_${postId}`;
        let userLikedStorageKey = `userLiked_${postId}`;

        // Initialize likes from localStorage or default to 0
        let currentLikes = parseInt(localStorage.getItem(likeStorageKey)) || 0;
        likeCountSpan.textContent = `${currentLikes} Like${currentLikes !== 1 ? 's' : ''}`;

        // Check if user previously liked this post and update button style
        if (localStorage.getItem(userLikedStorageKey) === 'true') {
            likeButton.classList.add('liked');
            // Optional: Disable button if you only want one like per session
            // likeButton.disabled = true;
        }

        likeButton.addEventListener('click', () => {
            if (localStorage.getItem(userLikedStorageKey) === 'true') {
                // To implement a toggle like/unlike:
                if (likeButton.classList.contains('liked')) { // If already liked, unlike it
                    currentLikes--;
                    localStorage.removeItem(userLikedStorageKey);
                    likeButton.classList.remove('liked');
                } else { // If not liked, like it
                    currentLikes++;
                    localStorage.setItem(userLikedStorageKey, 'true');
                    likeButton.classList.add('liked');
                }

            } else {
                // User is liking for the first time in this session
                currentLikes++;
                localStorage.setItem(userLikedStorageKey, 'true'); // Mark that user has liked this post
                likeButton.classList.add('liked');
                // Optional: Disable button after one like to prevent multiple clicks
                // likeButton.disabled = true;
            }
            
            localStorage.setItem(likeStorageKey, currentLikes); // Store the new total likes
            likeCountSpan.textContent = `${currentLikes} Like${currentLikes !== 1 ? 's' : ''}`;
        });
    });



    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const successMessage = document.getElementById('successMessage');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Reset messages
        nameError.textContent = '';
        emailError.textContent = '';
        messageError.textContent = '';
        successMessage.textContent = '';

        // Name validation
        if (nameInput.value.trim().length < 2) {
            nameError.textContent = 'Please enter your name (at least 2 characters).';
            isValid = false;
        }

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value.trim())) {
            emailError.textContent = 'Please enter a valid email address.';
            isValid = false;
        }

        // Message validation
        if (messageInput.value.trim().length < 10) {
            messageError.textContent = 'Please enter a message (at least 10 characters).';
            isValid = false;
        }

        if (isValid) {
            // Simulate form submission
            successMessage.textContent = 'Thank you for contacting us! We will get back to you soon.';
            form.reset();
        }
    });


});