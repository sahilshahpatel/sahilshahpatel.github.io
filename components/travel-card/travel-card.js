fetch('/components/travel-card/travel-card.html')
.then(stream => stream.text())
.then(html => {
    class TravelCard extends HTMLElement {
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

            this.querySelector('a').href = data.querySelector('[slot="link"]').href;

            data.remove();
        }
    }

    customElements.define('travel-card', TravelCard);
});