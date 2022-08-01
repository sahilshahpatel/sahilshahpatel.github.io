Promise.all([
    fetch('/components/project-card/project-card.html')
    .then(stream => stream.text()),
    
    fetch('data/projects.json')
    .then(stream => stream.json())
]).then(([html, projects_data]) => {
    const linkData = {
        "github": {icon: "bi-github", title: "View source"},
        "demo": {icon: "bi-display", title: "View demo"},
    }

    class ProjectCard extends HTMLElement {
        constructor() {
            super();

            const data = projects_data[this.dataset.slug];
            this.innerHTML = html;

            if("long" in this.dataset) {
                this.querySelector('slot[name="description"]').name = "description-long";
            }

            this.querySelectorAll('slot').forEach(slot => {
                const injection = data[slot.name];
                console.log(typeof(injection), injection);

                switch(typeof(injection)){
                    case "string":
                        let tmp = document.createElement("div");
                        tmp.innerHTML = injection;
                        
                        if(injection !== ""){
                            // This ensures that if the only child is a TextNode it will still get captured
                            slot.replaceWith(...[tmp.firstChild, ...Array.from(tmp.children).slice(1)]);
                        } else {
                            slot.remove();
                        }
                        tmp.remove();
                        break;

                    case "object":
                        switch(slot.name){
                            case "links":
                                let tmp = document.createElement('div');

                                for(let link in injection){
                                    let elt = document.createElement("a");
                                    elt.href = injection[link];
                                    elt.title = linkData[link].title;
                                    
                                    let icon = document.createElement('i');
                                    icon.classList.add(linkData[link].icon);

                                    elt.appendChild(icon);
                                    tmp.appendChild(elt);
                                }

                                slot.replaceWith(...tmp.childNodes);
                                break;
                        }
                        break;

                    case "undefined":
                        console.warn(`Missing value for slot ${slot.name} in project-card`, data);
                        break;
                    
                    default:
                        console.warn(`Unknown type of ${typeof(injection)} for slot ${slot.name} in project-card`, data);
                }
            });

            this.querySelectorAll('img[src^="slot:"]').forEach(elt => {
                elt.src = data[elt.src.substring(5)];
            });

            this.querySelectorAll('a[href="slot:page-link"').forEach(elt => {
                elt.href = `/projects/${this.dataset.slug}`;
            })
        }
    }

    customElements.define('project-card', ProjectCard);
});
