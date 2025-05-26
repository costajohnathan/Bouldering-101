document.addEventListener('DOMContentLoaded', () => {

    // --- Scroll to Top Button ---
    const scrollBtn = document.getElementById('scrollToTopBtn');
    window.addEventListener('scroll', () => {
        scrollBtn.classList.toggle('visible', window.scrollY > 200);
    });
    scrollBtn?.addEventListener('click', () =>
        window.scrollTo({ top: 0, behavior: 'smooth' })
    );

    // --- Highlight Active Navigation Link ---
    (() => {
        const links = document.querySelectorAll('.nav-links a');
        const page = location.pathname.split('/').pop() || 'index.html';
        links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === page));
    })();

    // --- Blog Post Like Functionality ---
    document.querySelectorAll('.blog-post').forEach(post => {
        const btn = post.querySelector('.like-button');
        const count = post.querySelector('.like-count');
        const key = `postLikes_${post.dataset.postId}`;
        let likes = parseInt(localStorage.getItem(key)) || 0;
        const userKey = `userLiked_${post.dataset.postId}`;

      // initialize
        count.textContent = `${likes} Like${likes !== 1 ? 's' : ''}`;
        if (localStorage.getItem(userKey) === 'true') btn.classList.add('liked');

        btn?.addEventListener('click', () => {
        if (localStorage.getItem(userKey) === 'true') {
            likes--; localStorage.removeItem(userKey); btn.classList.remove('liked');
        } else {
            likes++; localStorage.setItem(userKey, 'true'); btn.classList.add('liked');
        }
        localStorage.setItem(key, likes);
        count.textContent = `${likes} Like${likes !== 1 ? 's' : ''}`;
        });
    });

    // --- Contact Form Validation ---
    (() => {
        const form = document.getElementById('contactForm');
        const showError = (el, msg) => el.textContent = msg;
        form?.addEventListener('submit', e => {
        e.preventDefault();
        let valid = true;
        const name = form.name, email = form.email, message = form.message;
        [name, email, message].forEach(input => showError(document.getElementById(input.id + 'Error'), ''));
        if (name.value.trim().length < 2) { showError(name.nextElementSibling, 'Enter at least 2 characters.'); valid = false; }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { showError(email.nextElementSibling, 'Valid email required.'); valid = false; }
        if (message.value.trim().length < 10) { showError(message.nextElementSibling, '10 characters min.'); valid = false; }

        if (valid) {
            document.getElementById('successMessage').textContent = 'Thanks! We will get back to you soon.';
            form.reset();
        }
        });
    })();

});
