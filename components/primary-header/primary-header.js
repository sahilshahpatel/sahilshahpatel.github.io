
fetch('/components/primary-header/primary-header.html')
.then(stream => stream.text())
.then(html => {
    class PrimaryHeader extends HTMLElement {
        constructor() {
            super();

            // Create element to store slot information
            let data = document.createElement('div');
            data.innerHTML = this.innerHTML;
            const attributes = Array.from(this.attributes);

            this.innerHTML = html;

            this.querySelectorAll('slot').forEach(slot => {
                let injection = data.querySelector(`[slot="${slot.name}"]`);
                if(injection !== null) {
                    slot.replaceWith(injection.cloneNode(true));
                } else {
                    console.warn(`Missing value for slot ${slot.name} in element ${this}`);
                    slot.remove();
                }
            });

            attributes.forEach(attr => {
                this.setAttribute(attr.name, attr.value);
            });

            data.remove();

            
            /* Set up typical JS for this component */
            const navToggle = this.querySelector('.mobile-nav-toggle');
            const navOpen = this.querySelector('.mobile-nav-open');
            const navClose = this.querySelector('.mobile-nav-close');
            const primaryNav = this.querySelector('.primary-nav');

            // Toggle navigation on click
            navToggle.addEventListener('click', () => {
                primaryNav.classList.toggle('open');

                navOpen.classList.toggle('visually-hidden');
                navClose.classList.toggle('visually-hidden');
            });

        }
    }

    customElements.define('primary-header', PrimaryHeader);
});
