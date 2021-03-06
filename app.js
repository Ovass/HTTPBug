"use strict";

var electron = require( "app" ),
    BrowserWindow = require( "browser-window" ),
    path = require( "path" ),
    lodash = require( "lodash" ),
    os = require( "os" ),
    Menu = require( "menu" );

global.app = {
    "windows": {}
};

var oMenu = [
    {
        "label": "HTTPBug",
        "submenu": [
            {
                "label": "About HTTPBug",
                "selector": "orderFrontStandardAboutPanel:"
            },
            {
                "type": "separator"
            },
            {
                "label": "Services",
                "submenu": []
            },
            {
                "type": "separator"
            },
            {
                "label": "Hide Electron",
                "accelerator": "CmdOrCtrl+H",
                "selector": "hide:"
            },
            {
                "label": "Hide Others",
                "accelerator": "CmdOrCtrl+Shift+H",
                "selector": "hideOtherApplications:"
            },
            {
                "label": "Show All",
                "selector": "unhideAllApplications:"
            },
            {
                "type": "separator"
            },
            {
                "label": "Quit",
                "accelerator": "CmdOrCtrl+Q",
                "selector": "terminate:"
            }
        ]
    },
    {
        "label": "Server",
        "submenu": [
            {
                "label": "New Server",
                "accelerator": "CmdOrCtrl+N",
                "click": function() {
                    console.log( "Create new window!" );
                }
            },
            {
                "type": "separator"
            },
            {
                "label": "Close Server",
                "accelerator": "CmdOrCtrl+W",
                "click": function() {
                    console.log( "Close current window!" );
                }
            },
            {
                "label": "Close All Servers",
                "accelerator": "CmdOrCtrl+Shift+W",
                "click": function() {
                    console.log( "Close current window!" );
                }
            },
        ]
    }
];

electron.on( "window-all-closed", function() {
    return electron.quit(); // TODO: TMP
    if( process.platform !== "darwin" ) {
        electron.quit();
    }
} );

electron.on( "ready", function() {

    // Menu.setApplicationMenu( Menu.buildFromTemplate( oMenu ) );

    var oWindow = new BrowserWindow( {
        "id": lodash.uniqueId(),
        "title": "HTTPBug",
        "icon": path.resolve( __dirname, "assets/icon.png" ),
        "width": 640,
        "height": 480,
        "min-width": 640,
        "min-height": 480,
        "center": true,
        "standard-window": false,
        "resizable": true,
        "frame": false,
        "show": false
    } );

    // oWindow.openDevTools();

    global.app.windows[ oWindow.id ] = oWindow;

    oWindow.on( "closed", function( a, b, c, d ) {
        delete global.app.windows[ this.id ];
        oWindow = null;
    } );

    oWindow.loadUrl( "file://" + __dirname + "/app.html" );

} );
