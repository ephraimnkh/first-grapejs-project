const editor = grapesjs.init({
    height: '100%',
    showOffsets: 1,
    noticeOnUnload: 0,
    storageManager: {
        id: 'gjs-',                             // Prefix identifier that will be used inside storing and loading
        type: 'remote',                         // Type of the storage
        stepsBeforeSave: 5,
        urlStore: 'http://localhost:4040/page',
        urlLoad: 'http://localhost:4040/page',
        params: {}, // Custom parameters to pass with the remote storage request, eg. CSRF token
        headers: {}, // Custom headers for the remote storage request
    },
    container: '#gjs',
    fromElement: true,
    plugins: ['gjs-preset-webpage'],
    pluginsOpts: {
        'gjs-preset-webpage': {}
    }
});

// Once the editor is instantiated you can use its API. Before using these methods you should get the module from the instance
const panelManager = editor.Panels;
// Remove buttons from the options panel using an array of ids
const removedButtons = panelManager.removeButton('options', ['sw-visibility', 'preview', 'fullscreen', 'export-template', 'undo', 'redo', 'gjs-open-import-webpage', 'canvas-clear']);
// Add buttons to the options panel
var optionButtons = panelManager.addButton('options', [{
    id: 'save',
    className: 'btn-save',
    label: '<i class="fa fa-cloud-upload"></i>',
    command: 'save-design',
    context: 'system-functions',
    attributes: {
        title: 'Save Changes'
    }
}, {
    id: 'reload',
    className: 'btn-reload',
    label: '<i class="fa fa-refresh"></i>',
    command: 'reload-design',
    context: 'system-functions',
    attributes: {
        title: 'Reload Design'
    }
}, {
    // sw-visibility removed from id as title couldn't be overwritten because grapes sets a title for the button
    id: 'show-component-outlines',
    command: 'sw-visibility',
    context: 'sw-visibility',
    className: 'fa fa-square-o',
    attributes: {
        title: 'Show component outlines'
    },
    // set as active on start
    active: 1,
}, {
    id: 'preview',
    context: 'preview',
    command: e => e.runCommand('preview'),
    className: 'fa fa-eye',
}, {
    id: 'fullscreen',
    command: 'fullscreen',
    context: 'fullscreen',
    className: 'fa fa-arrows-alt',
}, {
    id: 'export-template',
    className: 'fa fa-code',
    command: e => e.runCommand('export-template'),
}, {
    id: 'undo',
    className: 'fa fa-undo',
    command: e => e.runCommand('core:undo'),
    attributes: {
        title: 'Undo'
    }
}, {
    id: 'redo',
    className: 'fa fa-repeat',
    command: e => e.runCommand('core:redo'),
    attributes: {
        title: 'Redo'
    }
}, {
    id: 'gjs-open-import-webpage',
    className: 'fa fa-upload',
    command: e => e.runCommand('gjs-open-import-webpage'),
    attributes: {
        title: 'Import Webpage'
    }
}, {
    id: 'canvas-clear',
    className: 'fa fa-trash',
    command: e => e.runCommand('canvas-clear'),
    attributes: {
        title: 'Clear Canvas'
    }
}]);

editor.Commands.add('reload-design', {
    run: editor => {
        // location.reload();
        editor.load(loadedObject => {});
        editor.on('storage:end:load', (resultObject) => {
            if (resultObject) {
                alert("Design Reloaded");
            }
        });
    }

});

editor.Commands.add('save-design', {
    run: editor => {
        editor.store(savedObject => {
            if (savedObject) alert("Changes Saved");
        });
    }
});

editor.on('storage:error', (err) => {
    alert('Error storing your design: ' + err);
});

// Add title labels to toolbar elements of selected component
editor.on('component:selected', () => {
    // Printed out regular bar to get it for setting new toolbar
    // console.log("Selected Component: " + JSON.stringify(editor.getSelected().get('toolbar')));
    selectedComponent = editor.getSelected().set({ 
        toolbar: [
            { "attributes": { "title": "Go to parent component", "class": "fa fa-arrow-up" }, 
                "command": ed => ed.runCommand('core:component-exit', { force: 1 }) },
            { "attributes": { "title": "Move", "class": "fa fa-arrows gjs-no-touch-actions", "draggable": true }, 
                "command": "tlb-move" },
            { "attributes": { "title": "Duplicate", "class": "fa fa-clone" }, 
                "command": "tlb-clone" },
            { "attributes": { "title": "Delete", "class": "fa fa-trash-o" }, 
                "command": "tlb-delete" }
        ]});
    // alert("component chosen");
});

// editor.on('storage:end:load', (resultObject) => {
//     if (resultObject) {
//         alert("Design Loaded");
//     }
// });