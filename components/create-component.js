const fs = require('fs');
const { exit } = require('process');

const CamelCase = (str) => str.substring(0, 1).toUpperCase() + str.replace(/-./g, c => c. substring(1).toUpperCase()).substring(1);

const componentName = process.argv[2];
const componentCamelName = CamelCase(componentName);
const path = `/components/${componentName}/`;
const fileName = `${path}${componentName}`;

const html = `<link rel="stylesheet" href="${fileName}.css">`;

const js = `
fetch('${fileName}.html')
.then(stream => stream.text())
.then(html => {
    class ${componentCamelName} extends HTMLElement {
        constructor() {
            super();

            // Create element to store slot information
            let data = document.createElement('div');
            data.innerHTML = this.innerHTML;
            const attributes = Array.from(this.attributes);

            this.innerHTML = html;

            this.querySelectorAll('slot').forEach(slot => {
                const injection = data[slot.name];
                if(injection !== undefined) {
                    let tmp = document.createElement("div");
                    tmp.innerHTML = injection;
                    
                    if(injection !== ""){
                        slot.replaceWith(tmp.firstChild);
                    } else {
                        slot.remove();
                    }
                    tmp.remove();
                } else {
                    console.warn(\`Missing value for slot \${slot.name} in ${componentName}\`, data);
                    slot.remove();
                }
            });

            this.querySelectorAll('[src^="slot:"]').forEach(elt => {
                Array.from(elt.attributes).forEach(attr => {
                    if(attr.nodeValue.startsWith("slot:")){
                        const key = attr.nodeValue.substring(5);
                        elt.setAttribute(attr.name, data[key]);
                    }
                });
            });

            data.remove();
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