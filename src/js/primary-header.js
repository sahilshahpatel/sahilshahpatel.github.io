export const setupNav = () => {
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const navOpen = document.querySelector('.mobile-nav-open');
    const navClose = document.querySelector('.mobile-nav-close');
    const primaryNav = document.querySelector('.primary-nav');

    // Toggle navigation on click
    navToggle.addEventListener('click', () => {
        primaryNav.classList.toggle('open');

        navOpen.classList.toggle('visually-hidden');
        navClose.classList.toggle('visually-hidden');
    });
};