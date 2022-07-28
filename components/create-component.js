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
                let injection = data.querySelector(\`[slot="\${slot.name}"]\`);
                if(injection !== null) {
                    slot.replaceWith(injection.cloneNode(true));
                } else {
                    console.warn(\`Missing value for slot \${slot.name} in element \${this}\`);
                    slot.remove();
                }
            });

            attributes.forEach(attr => {
                this.setAttribute(attr.name, attr.value);
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