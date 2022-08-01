Promise.all([
    fetch('/components/travel-card/travel-card.html')
    .then(stream => stream.text()),
    
    fetch('data/abroad.json')
    .then(stream => stream.json())
]).then(([html, abroad_data]) => {
    class TravelCard extends HTMLElement {
        constructor() {
            super();

            const data = abroad_data[this.dataset.slug];
            this.innerHTML = html;

            this.style.setProperty("--bg-img-url", `url(${data.img.url})`);
            this.style.setProperty("--bg-position", data.img.pos);

            this.querySelectorAll('slot').forEach(slot => {
                const injection = data[slot.name];
                if(injection !== undefined) {
                    let tmp = document.createElement("div");
                    tmp.innerHTML = injection;
                    
                    if(injection !== ""){
                        slot.replaceWith(...tmp.childNodes);
                    } else {
                        slot.remove();
                    }
                    tmp.remove();
                } else {
                    console.warn(`Missing value for slot ${slot.name} in work item`, data);
                    slot.remove();
                }
            });

            this.querySelector('a[href="slot:link"]').href = `/abroad/${this.dataset.slug}.html`;
        }
    }

    customElements.define('travel-card', TravelCard);
});
