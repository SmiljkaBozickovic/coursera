const menuToggle = document.querySelector('.menu-toggle');
const headerContainer = document.querySelector('.header-container');

if (menuToggle && headerContainer) {
    menuToggle.addEventListener('click', function () {
        const isOpen = headerContainer.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
}

const projectFilters = document.querySelectorAll('.project-filter');
const projectCards = document.querySelectorAll('.project-card');

function filterProjects(category) {
    projectCards.forEach(function (card) {
        card.hidden = category !== 'all' && card.dataset.category !== category;
    });

    projectFilters.forEach(function (filter) {
        filter.setAttribute('aria-pressed', String(filter.dataset.filter === category));
    });
}

projectFilters.forEach(function (filter) {
    filter.addEventListener('click', function () {
        filterProjects(filter.dataset.filter);
    });
});

const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxCaption = document.querySelector('.lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');

function openLightbox(image) {
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = image.alt;
    lightbox.showModal();
    lightboxClose.focus();
}

function closeLightbox() {
    lightbox.close();
}

document.querySelectorAll('.project-image-button img').forEach(function (image) {
    image.closest('button').addEventListener('click', function () {
        openLightbox(image);
    });
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', function (event) {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    const formFields = [
        {
            field: contactForm.querySelector('#full-name'),
            error: contactForm.querySelector('#full-name-error'),
            requiredMessage: 'Please enter your name.'
        },
        {
            field: contactForm.querySelector('#email'),
            error: contactForm.querySelector('#email-error'),
            requiredMessage: 'Please enter your email address.',
            invalidMessage: 'Please enter a valid email address.'
        },
        {
            field: contactForm.querySelector('#message'),
            error: contactForm.querySelector('#message-error'),
            requiredMessage: 'Please enter a message.'
        }
    ];

    function validateField(item) {
        let errorMessage = '';

        if (!item.field.value.trim()) {
            errorMessage = item.requiredMessage;
        } else if (item.field.type === 'email' && item.field.validity.typeMismatch) {
            errorMessage = item.invalidMessage;
        }

        item.error.textContent = errorMessage;
        item.field.setAttribute('aria-invalid', String(Boolean(errorMessage)));
        return !errorMessage;
    }

    formFields.forEach(function (item) {
        item.field.addEventListener('input', function () {
            validateField(item);
        });
    });

    contactForm.noValidate = true;

    contactForm.addEventListener('submit', function (event) {
        const invalidFields = formFields.filter(function (item) {
            return !validateField(item);
        });

        if (invalidFields.length > 0) {
            event.preventDefault();
            invalidFields[0].field.focus();
        }
    });
}
