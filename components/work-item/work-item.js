fetch('/components/work-item/work-item.html')
.then(stream => stream.text())
.then(html => {
    class WorkItem extends HTMLElement {
        constructor() {
            super();

            // Create element to store slot information
            let data = document.createElement('div');
            data.innerHTML = this.innerHTML;
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

            data.remove();
        }
    }

    customElements.define('work-item', WorkItem);
});
