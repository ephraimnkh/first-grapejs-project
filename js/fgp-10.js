const editor = grapesjs.init({
    // Indicate where to init the editor. You can also pass an HTMLElement
    container: '#gjs',
    // Get the content for the canvas directly from the element
    // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
    fromElement: true,
    // Size of the editor
    height: '100%',
    width: 'auto',
    // storageManager: {
    //     id: 'gjs-',             // Prefix identifier that will be used inside storing and loading
    //     type: 'local',          // Type of the storage
    //     autosave: true,         // Store data automatically
    //     autoload: true,         // Autoload stored data on init
    //     stepsBeforeSave: 1,     // If autosave enabled, indicates how many changes are necessary before store method is triggered
    //     storeComponents: true,  // Enable/Disable storing of components in JSON format
    //     storeStyles: true,      // Enable/Disable storing of rules in JSON format
    //     storeHtml: true,        // Enable/Disable storing of components as HTML string
    //     storeCss: true,         // Enable/Disable storing of rules as CSS string
    // }, 
    storageManager: {
        id: 'gjs-',                             // Prefix identifier that will be used inside storing and loading
        type: 'remote',                         // Type of the storage
        stepsBeforeSave: 5,
        // urlStore: 'http://endpoint/store-template/some-id-123',
        // urlLoad: 'http://endpoint/load-template/some-id-123',
        urlStore: 'http://localhost:4040/page',
        urlLoad: 'http://localhost:4040/page',
        params: {}, // Custom parameters to pass with the remote storage request, eg. CSRF token
        headers: {}, // Custom headers for the remote storage request
    },
    blockManager: {
        appendTo: '#blocks',
        blocks: [
            {
                id: 'section', // id is mandatory
                label: '<i class="far fa-square make-it-20"></i>', // You can use HTML/SVG inside labels
                attributes: { class: 'gjs-block-section' },
                content: `<section>
          <h1>This is a simple title</h1>
          <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
        </section>`,
            }, {
                id: 'text',
                label: '<span class="times">T</span>',
                content: '<div data-gjs-type="text">Insert your text here</div>',
            }, {
                id: 'image',
                label: '<i class="fa fa-image make-it-20"></i>',
                // Select the component once it's dropped
                select: true,
                // You can pass components as a JSON instead of a simple HTML string,
                // in this case we also use a defined component type `image`
                content: { type: 'image' },
                // This triggers `active` event on dropped components and the `image`
                // reacts by opening the AssetManager
                activate: true,
            }
        ]
    },
    layerManager: {
        appendTo: '.layers-container'
    },
    // What about the mobile- first approach ? You can achieve it by changing your configurations in this way: 
    // Then check how we set initial device to mobile near the bottom
    // Then check how we commented out active by the Desktop button
    mediaCondition: 'min-width', // default is `max-width`
    deviceManager: {
        devices: [{
            name: 'Mobile',
            width: '320',
            widthMedia: '',
        }, {
            name: 'Desktop',
            width: '',
            widthMedia: '1024',
        }]
    },
    // We define a default panel as a sidebar to contain layers
    panels: {
        defaults: [{
            id: 'layers',
            el: '.panel__right',
            // Make the panel resizable
            resizable: {
                maxDim: 350,
                minDim: 200,
                tc: 0, // Top handler
                cl: 1, // Left handler
                cr: 0, // Right handler
                bc: 0, // Bottom handler
                // Being a flex child we need to change `flex-basis` property
                // instead of the `width` (default)
                keyWidth: 'flex-basis',
            },
        }, {
            id: 'panel-switcher',
            el: '.panel__switcher',
            buttons: [{
                id: 'show-layers',
                active: true,
                label: '<i class="fa fa-bars"></i>',
                command: 'show-layers',
                // Once activated disable the possibility to turn it off
                togglable: false,
            }, {
                id: 'show-style',
                active: true,
                label: '<i class="fa fa-paint-brush"></i>',
                command: 'show-styles',
                togglable: false,
            }, {
                id: 'show-traits',
                active: true,
                label: '<i class="fa fa-cog"></i>',
                command: 'show-traits',
                togglable: false,
            }],
        },
        {
            id: 'panel-devices',
            el: '.panel__devices',
            buttons: [{
                id: 'device-desktop',
                label: '<i class="fa fa-desktop"></i>',
                command: 'set-device-desktop',
                // active: true, commented out active by the Desktop button so that we can set the device ourselves
                togglable: false,
            }, {
                id: 'device-mobile',
                label: '<i class="fa fa-mobile"></i>',
                command: 'set-device-mobile',
                togglable: false,
            }],
        },
        ]
    },
    plugins: ['grapesjs-parser-postcss'],
    // The Selector Manager allows to assign classes and
    // different states (eg. :hover) on components.
    // Generally, it's used in conjunction with Style Manager
    // but it's not mandatory
    selectorManager: {
        appendTo: '.styles-container'
    },
    styleManager: {
        appendTo: '.styles-container',
        sectors: [{
            name: 'Dimension',
            open: false,
            // Use built-in properties
            buildProps: ['width', 'min-height', 'padding'],
            // Use `properties` to define/override single property
            properties: [
                {
                    // Type of the input,
                    // options: integer | radio | select | color | slider | file | composite | stack
                    type: 'integer',
                    name: 'The width', // Label for the property
                    property: 'width', // CSS property (if buildProps contains it will be extended)
                    units: ['px', '%'], // Units, available only for 'integer' types
                    defaults: 'auto', // Default value
                    min: 0, // Min value, available only for 'integer' types
                }
            ]
        }, {
            name: 'Extra',
            open: false,
            buildProps: ['background-color', 'box-shadow', 'custom-prop'],
            properties: [
                {
                    id: 'custom-prop',
                    name: 'Custom Label',
                    property: 'font-size',
                    type: 'select',
                    defaults: '32px',
                    // List of options, available only for 'select' and 'radio'  types
                    options: [
                        { value: '12px', name: 'Tiny' },
                        { value: '18px', name: 'Medium' },
                        { value: '32px', name: 'Big' },
                    ],
                }
            ]
        }]
    },
    traitManager: {
        appendTo: '.traits-container',
    },
});

editor.Panels.addPanel({
    id: 'panel-top',
    el: '.panel__top',
});
editor.Panels.addPanel({
    id: 'basic-actions',
    el: '.panel__basic-actions',
    buttons: [
        {
            id: 'visibility',
            active: true, // active by default
            className: 'btn-toggle-borders',
            label: '<i class="fa fa-eye"></i>',
            command: 'sw-visibility', // Built-in command
        }, {
            id: 'export',
            className: 'btn-open-export',
            label: '<i class="fa fa-code"></i>',
            command: 'export-template',
            context: 'export-template', // For grouping context of buttons from the same panel
        }, {
            id: 'show-json',
            className: 'btn-show-json',
            label: '{}',
            context: 'show-json',
            command(editor) {
                editor.Modal.setTitle('Components JSON')
                    .setContent(`<textarea style="width:100%; height: 250px;">
            ${JSON.stringify(editor.getComponents())}
          </textarea>`)
                    .open();
            },
        }, {
            id: 'save',
            className: 'btn-save',
            label: '<i class="fa fa-floppy-o"></i>',
            command: 'save-design',
            context: 'system-functions',
        }
        , {
            id: 'reload',
            className: 'btn-reload',
            label: '<i class="fa fa-refresh"></i>',
            command: 'reload-design',
            context: 'system-functions',
        }
    ],
});

// Define commands
editor.Commands.add('show-layers', {
    getRowEl(editor) { return editor.getContainer().closest('.editor-row'); },
    getLayersEl(row) { return row.querySelector('.layers-container') },

    run(editor, sender) {
        const lmEl = this.getLayersEl(this.getRowEl(editor));
        lmEl.style.display = '';
    },
    stop(editor, sender) {
        const lmEl = this.getLayersEl(this.getRowEl(editor));
        lmEl.style.display = 'none';
    },
});
editor.Commands.add('show-styles', {
    getRowEl(editor) { return editor.getContainer().closest('.editor-row'); },
    getStyleEl(row) { return row.querySelector('.styles-container') },

    run(editor, sender) {
        const smEl = this.getStyleEl(this.getRowEl(editor));
        smEl.style.display = '';
    },
    stop(editor, sender) {
        const smEl = this.getStyleEl(this.getRowEl(editor));
        smEl.style.display = 'none';
    },
});

editor.Commands.add('show-traits', {
    getTraitsEl(editor) {
        const row = editor.getContainer().closest('.editor-row');
        return row.querySelector('.traits-container');
    },
    run(editor, sender) {
        this.getTraitsEl(editor).style.display = '';
    },
    stop(editor, sender) {
        this.getTraitsEl(editor).style.display = 'none';
    },
});

editor.Commands.add('set-device-desktop', {
    run: editor => editor.setDevice('Desktop')
});
editor.Commands.add('set-device-mobile', {
    run: editor => editor.setDevice('Mobile')
});

editor.Commands.add('reload-design', {
    run: editor => {
        // editor.load(res => console.log('Design loaded'));
        
        location.reload();
        editor.on('storage:end:load', (resultObject) => {
            if (resultObject.hasSomeKey) {
                alert("Design Reloaded");
            }
        });
        // alert("Design Reloaded");
    }

});

editor.Commands.add('save-design', {
    run: editor => {
        editor.store(res => console.log('Saved content with timestamp ', new Date()));
    }
    
});



// Listener for device change
editor.on('change:device', () => console.log('The current device is a', editor.getDevice()));
editor.on('storage:end:load', (resultObject) => {
    if (resultObject.hasSomeKey) {
        alert("Design Loaded");
    }
});

editor.on('storage:end:store', (resultObject) => {
    if (resultObject.hasSomeKey) {
        alert("Saved Content");
    }
});

editor.on('storage:error', (err) => {
    alert('Error storing your design: ' + err);
});

// Set initial device as Mobile
editor.setDevice('Desktop');


editor.on('change:device', () => {
    if (editor.getDevice() === 'Mobile'){
        // Call load somewhere
        editor.store(res => console.log('Store callback'));
    } else {
        console.log("Not storing");
    }
});
