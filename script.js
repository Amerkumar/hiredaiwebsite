// HiredAI Labs - Simple, Clean JavaScript

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const answer = button.nextElementSibling;
        const icon = button.querySelector('.faq-icon');

        // Close other open FAQs
        document.querySelectorAll('.faq-answer').forEach(item => {
            if (item !== answer) {
                item.classList.remove('active');
            }
        });

        document.querySelectorAll('.faq-icon').forEach(item => {
            if (item !== icon) {
                item.classList.remove('active');
            }
        });

        // Toggle current FAQ
        answer.classList.toggle('active');
        if (icon) {
            icon.classList.toggle('active');
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Contact Modal
const contactModal = document.getElementById('contactModal');
const openContactBtn = document.getElementById('openContactBtn');
const openContactBtns = document.querySelectorAll('.open-contact-btn');
const closeModalBtn = document.getElementById('closeModal');
const contactForm = document.getElementById('contactForm');

function openModal() {
    if (contactModal) {
        contactModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    if (contactModal) {
        contactModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

if (openContactBtn) {
    openContactBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });
}

openContactBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });
});

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
}

if (contactModal) {
    contactModal.addEventListener('click', (e) => {
        if (e.target === contactModal) {
            closeModal();
        }
    });
}

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && contactModal && contactModal.classList.contains('active')) {
        closeModal();
    }
});

// Contact Form Submission with EmailJS
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Get form values
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const message = document.getElementById('contactMessage').value;

        // EmailJS send - using same config as dental page
        if (typeof emailjs !== 'undefined') {
            emailjs.send('service_wdbvfs9', 'template_gn0ql9h', {
                from_name: name,
                reply_to: email,
                message: message,
                to_email: 'tech@hiredai.ca'
            })
            .then(function() {
                submitBtn.textContent = 'Sent!';
                contactForm.reset();
                setTimeout(() => {
                    closeModal();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    alert('Thank you! Your message has been sent successfully.');
                }, 1000);
            }, function(error) {
                console.error('EmailJS error:', error);
                // Fallback to mailto
                alert('There was an issue. Opening your email client instead...');
                window.location.href = `mailto:tech@hiredai.ca?subject=Contact from ${name}&body=${encodeURIComponent(message)}%0A%0AFrom: ${email}`;
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                closeModal();
            });
        } else {
            // Fallback if EmailJS not loaded
            window.location.href = `mailto:tech@hiredai.ca?subject=Contact from ${name}&body=${encodeURIComponent(message)}%0A%0AFrom: ${email}`;
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            closeModal();
        }
    });
}
