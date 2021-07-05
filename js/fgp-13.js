const editor = grapesjs.init({
    // Indicate where to init the editor. You can also pass an HTMLElement
    container: '#gjs',
    // Get the content for the canvas directly from the element
    // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
    fromElement: true,
    // Size of the editor
    height: '100%',
    width: 'auto',
    storageManager: {
        id: 'gjs-',             // Prefix identifier that will be used inside storing and loading
        type: 'local',          // Type of the storage
        autosave: true,         // Store data automatically
        autoload: true,         // Autoload stored data on init
        stepsBeforeSave: 1,     // If autosave enabled, indicates how many changes are necessary before store method is triggered
        storeComponents: true,  // Enable/Disable storing of components in JSON format
        storeStyles: true,      // Enable/Disable storing of rules in JSON format
        storeHtml: true,        // Enable/Disable storing of components as HTML string
        storeCss: true,         // Enable/Disable storing of rules as CSS string
    },
    assetManager: {
        // Default assets
        // eg. [
        //  'https://...image1.png',
        //  'https://...image2.png',
        //  {type: 'image', src: 'https://...image3.png', someOtherCustomProp: 1},
        //  ..
        // ]
        assets: [
            'http://placehold.it/350x250/78c5d6/fff/image1.jpg',
            // Pass an object with your properties
            {
                type: 'image',
                src: 'http://placehold.it/350x250/459ba8/fff/image2.jpg',
                height: 350,
                width: 250
            },
            {
                // As the 'image' is the base type of assets, omitting it will
                // be set as `image` by default
                src: 'http://placehold.it/350x250/79c267/fff/image3.jpg',
                height: 350,
                width: 250
            },
        ],
        // assets: [],
        // Content to add where there is no assets to show
        // eg. 'No <b>assets</b> here, drag to upload'
        noAssets: '<br>Nothing in here, howabout you drag something to upload',

        // Upload endpoint, set `false` to disable upload
        // upload: 'https://endpoint/upload/assets',
        // upload: false,
        upload: 0,

        // The name used in POST to pass uploaded files
        uploadName: 'files',

        // Custom headers to pass with the upload request
        headers: {},

        // Custom parameters to pass with the upload request, eg. csrf token
        params: {},

        // The credentials setting for the upload request, eg. 'include', 'omit'
        credentials: 'omit',

        // Allow uploading multiple files per request.
        // If disabled filename will not have '[]' appended
        multiUpload: true,

        // If true, tries to add automatically uploaded assets.
        // To make it work the server should respond with a JSON containing assets
        // in a data key, eg:
        // {
        //  data: [
        //    'https://.../image.png',
        //    ...
        //    {src: 'https://.../image2.png'},
        //    ...
        //  ]
        // }
        autoAdd: 1,

        // Text on upload input
        uploadText: 'Drop your files here or just click to upload',

        // Label for the add button
        addBtnText: 'Add that image',

        // Custom uploadFile function
        // @example
        // uploadFile: (e) => {
        //   var files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
        //   // ...send somewhere
        // }
        uploadFile: '',

        // Handle the image url submit from the built-in 'Add image' form
        // @example
        // handleAdd: (textFromInput) => {
        //   // some check...
        //   editor.AssetManager.add(textFromInput);
        // }
        handleAdd: '',

        // Enable an upload dropzone on the entire editor (not document) when dragging
        // files over it
        dropzone: 1,

        // Open the asset manager once files are been dropped via the dropzone
        openAssetsOnDrop: 1,

        // Any dropzone content to append inside dropzone element
        dropzoneContent: 'Drop here your assets',

        // Default title for the asset manager modal
        modalTitle: 'This is your Asset Manager please Select an Image',
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



// Listener for device change
editor.on('change:device', () => console.log('The current device is a', editor.getDevice()));

// Set initial device as Mobile
editor.setDevice('Mobile');

// This command shows only assets with `image` type
// Command will break double click on element and you'll have to do the below
// editor.runCommand('open-assets');

// Give access to dev console to editor
// window.editor = editor;

//Code to run in console after giveing it access to the editor and selecting an image in the canvas
// editor.runCommand('open-assets', {
//     target: editor.getSelected()
// });

// Asset Manager Customization
// Get the Asset Manager module first
const am = editor.AssetManager;

// If you leave uncommented it keeps adding
// am.add([
//     {
//         // You can pass any custom property you want
//         category: 'c1',
//         src: 'http://placehold.it/350x250/78c5d6/fff/image1.jpg',
//     }, {
//         category: 'c1',
//         src: 'http://placehold.it/350x250/459ba8/fff/image2.jpg',
//     }, {
//         category: 'c2',
//         src: 'http://placehold.it/350x250/79c267/fff/image3.jpg',
//     }
//     // ...
// ]);

// Now if you call the render(), without an argument, you will see all the assets rendered
// without any argument
// am.render();

// console.log(am.getAll().length) // <- 3
// console.log(am.getAllVisible().length); // <- 3

// now let's show only assets form the first category
// const assets = am.getAll();

// am.render(assets.filter(
//     asset => asset.get('category') == 'c1'
// ));

// console.log(am.getAll().length); // Still have 3 assets
// console.log(am.getAllVisible().length); // but only 2 are shown

// // If you want to customize the asset manager container you can get its HTMLElement
// am.getContainer().insertAdjacentHTML('afterbegin', '<div><button type="button">Click</button></div>');

// It's up to you tell the editor how to recognize your type and for this purpose you should to use isType() method. 
// Let's see now an example of how we'd start to defining a type like svg-icon
// With this snippet you can already add SVGs, the asset manager will assign the appropriate type
am.addType('svg-icon', {
    // You can also add a model to the addType definition to group the business logic of your asset, but usually it's optional.
    model: {
        // With `default` you define model's default properties
        defaults: {
            type: 'svg-icon',
            svgContent: '',
            name: 'Default SVG Name',
        },

        // You can call model's methods inside views:
        // const name = this.model.getName();
        getName() {
            return this.get('name');
        }
    },
    // The SVG asset won't render correctly at first because we haven't yet configured its view but below is a view configuration
    view: {
        // `getPreview()` and `getInfo()` are just few helpers, you can
        // override the entire template with `template()`
        // Check the base `template()` here:
        // https://github.com/artf/grapesjs/blob/dev/src/asset_manager/view/AssetView.js
        getPreview() {
            return `<div style="text-align: center">${this.model.get('svgContent')}</div>`;
        },
        getInfo() {
            // You can use model's properties if you passed them:
            // am.add({
            //  type: 'svg-icon',
            //  svgContent: '<svg ...',
            //  name: 'Some name'
            //  })
            //  ... then
            //  this.model.get('name');
            return '<div>SVG description</div>';
        },
        // custom svg- icon asset is ready to use after adding the below.
        // In our case the target is the selected component
        updateTarget(target) {
            const svg = this.model.get('svgContent');

            // Just to make things bit interesting, if it's an image type
            // I put the svg as a data uri, content otherwise
            if (target.get('type') == 'image') {
                // Tip: you can also use `data:image/svg+xml;utf8,<svg ...` but you
                // have to escape few chars
                target.set('src', `data:mime/type;base64,${btoa(svg)}`);
            } else {
                target.set('content', svg);
            }
        },
    },
    // `value` is for example the argument passed in `am.add(VALUE);`
    isType(value) {
        // The condition is intentionally simple
        if (value.substring(0, 5) == '<svg ') {
            return {
                type: 'svg-icon',
                svgContent: value
            };
        }
        // Maybe you pass the `svg-icon` object already
        else if (typeof value == 'object' && value.type == 'svg-icon') {
            return value;
        }
    }
});
// Add some random SVG
am.add(`<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M22,9 C22,8.4 21.5,8 20.75,8 L3.25,8 C2.5,8 2,8.4 2,9 L2,15 C2,15.6 2.5,16 3.25,16 L20.75,16 C21.5,16 22,15.6 22,15 L22,9 Z M21,15 L3,15 L3,9 L21,9 L21,15 Z"></path>
  <polygon points="4 10 5 10 5 14 4 14"></polygon>
</svg>`);
// The default open - assets command shows only image assets, so to render svg - icon run this
am.render(am.getAll().filter(
    asset => asset.get('type') == 'svg-icon'
));

// Extending asset types is basically the same as adding them, you can choose what type to extend and how.
// svgIconType will contain the definition (model, view, isType)
const svgIconType = am.getType('svg-icon');

// Add new type and extend another one
am.addType('svg-icon2', {
    view: svgIconType.view.extend({
        getInfo() {
            return '<div>SVG2 description</div>';
        },
    }),
    // The `isType` is important, but if you omit it the default one will be added
    // isType(value) {
    //  if (value && value.type == id) {
    //    return {type: value.type};
    //  }
    // };
});
// You can also extend the already defined types(to be sure to load assets with the old type extended create a plugin for your definitions)
am.addType('image', {
    // As you adding on top of an already defined type you can avoid indicating
    // `am.getType('image').view.extend({...` the editor will do it by default
    // but you can eventually extend some other type
    view: {
        // If you want to see more methods to extend check out
        // https://github.com/artf/grapesjs/blob/dev/src/asset_manager/view/AssetImageView.js
        onRemove(e) {
            e.stopPropagation();
            const model = this.model;

            if (confirm('Are you sure?')) {
                model.collection.remove(model);
            }
        }
    },
});

// Add a new block on the fly
var blockManager = editor.BlockManager;

// 'my-first-block' is the ID of the block
blockManager.add('my-first-block', {
    label: 'Simple block',
    content: '<div class="my-block">This is a simple block</div>',
});

// Update a block on the fly
blockManager.get('my-first-block').set({
    label: 'Updated simple block',
    attributes: {
        title: 'My title'
    }
});

blockManager.add('my-map-block', {
    label: 'Simple map block',
    content: {
        type: 'map', // Built-in 'map' component
        style: {
            height: '350px'
        },
        removable: false, // Once inserted it can't be removed
    }
});
// In the example above you're defining a row component which will accept only elements which match 
// '.row-cell' selector and cells which could be dragged only inside '.row' elements. 
// We're also defining the custom name which will be seen inside the Layers panel.
blockManager.add('the-row-block', {
    label: '2 Columns',
    content: '<div class="row" data-gjs-droppable=".row-cell" data-gjs-custom-name="Row">' +
        '<div class="row-cell" data-gjs-draggable=".row"></div>' +
        '<div class="row-cell" data-gjs-draggable=".row"></div>' +
        '</div>',
});