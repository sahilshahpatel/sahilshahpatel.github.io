const fs = require('fs');
const { exit } = require('process');

const CamelCase = (str) => str.substring(0, 1).toUpperCase() + str.replace(/-./g, c => c. substring(1).toUpperCase()).substring(1);

const componentName = process.argv[2];
const componentCamelName = CamelCase(componentName);
const path = `/components/${componentName}/`;
const fileName = `${path}${componentName}`;

const html = `<link rel="stylesheet" href="${fileName}.css">`;

const js = `
Promise.all([
    fetch('${fileName}.html')
    .then(stream => stream.text()),
    
    // TODO: replace data file
    fetch('data/jobs.json')
    .then(stream => stream.json())
]).then(([html, all_data]) => {
    class ${componentCamelName} extends HTMLElement {
        constructor() {
            super();

            const data = all_data[this.dataset.slug];
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
                        slot.replaceWith(...tmp.childNodes);
                    } else {
                        slot.remove();
                    }
                    tmp.remove();
                } else {
                    console.warn(\`Missing value for slot \${slot.name} in ${componentName}\`, data);
                    slot.remove();
                }
            });

            this.querySelector('img[src="slot:logo"]').src = data.logo;
        }
    }

    customElements.define('${componentName}', ${componentCamelName});
});
`

if(fs.existsSync(`./components/${componentName}`)) {
    console.error("Component with that name already exists.");
    exit(1);
}

fs.mkdirSync(`./components/${componentName}`);

fs.writeFileSync(`./components/${componentName}/${componentName}.css`, "");
fs.writeFileSync(`./components/${componentName}/${componentName}.html`, html);
fs.writeFileSync(`./components/${componentName}/${componentName}.js`, js);