"use strict";

// Globals
let canvas;
let gl;
let program;
let program2;
let cursorX;
let cursorY;
let element = -1; // -1 , no element to print
let crayonSize = 1;

let downloadLink = document.createElement('a');
downloadLink.setAttribute('download', 'Image.png');
let capture = false;
let imageLoaded = false ;
let img = new Image();

// vertices for the background x,y
const vertices = new Float32Array([
    -1, 1, 0.0, 1.0,
    -1, -1, 0.0, 0.0,
    1, 1, 1.0, 1.0,
    -1, -1, 0.0, 0.0,
    1, 1, 1.0, 1.0,
    1, -1, 1.0, 0.0,
]);
