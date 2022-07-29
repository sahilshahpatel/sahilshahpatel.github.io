Promise.all([
    fetch('/components/work-item/work-item.html')
    .then(stream => stream.text()),
    
    fetch('data/jobs.json')
    .then(stream => stream.json())
]).then(([html, jobs_data]) => {
    class WorkItem extends HTMLElement {
        constructor() {
            super();

            const data = jobs_data[this.dataset.slug];
            this.innerHTML = html;

            if("long" in this.dataset) {
                this.querySelector('slot[name="description"]').name = "description-long";
            }

            this.querySelectorAll('slot').forEach(slot => {
                const injection = data[slot.name];
                if(injection !== undefined) {
                    let tmp = document.createElement("div");
                    tmp.innerHTML = injection;
                    
                    if(injection !== ""){
                        if(tmp.children.length > 0){
                            slot.replaceWith(...tmp.children);
                        } else {
                            slot.replaceWith(tmp.firstChild);
                        }
                    } else {
                        slot.remove();
                    }
                    tmp.remove();
                } else {
                    console.warn(`Missing value for slot ${slot.name} in work item`, data);
                    slot.remove();
                }
            });

            this.querySelector('img[src="slot:logo"]').src = data.logo;
        }
    }

    customElements.define('work-item', WorkItem);
});
