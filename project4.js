"use strict";

var canvas;
var gl;

var points = [];
var colors = [];

var near = 0.3;
var far = 9.5;
var radius = 4.0;
var theta  = 0.0;
var phi    = 0.0;

var  fovy = 80.0;  // Field-of-view in Y direction angle (in degrees)
var  aspect = 1.0;       // Viewport aspect ratio

var modelViewMatrix, projectionMatrix;
var modelViewMatrixLoc, projectionMatrixLoc;
var eye;
var camera = 2;

const at = vec3(0.0, 0.0, 0.0);
const up = vec3(0.0, 1.0, 0.0);

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    var theCoffeeTable = coffeeTable(1, 1, 1, -0.1,0,-0.2);
    points = theCoffeeTable.TriangleVertices;
    colors = theCoffeeTable.TriangleVertexColors;

    var theLamp = lamp(1.5, 1.8, -1.6);
    points = points.concat(theLamp.TriangleVertices);
    colors = colors.concat(theLamp.TriangleVertexColors);

    var theSideTable = sideTable(1.5,1.2,-1.8);
    points = points.concat(theSideTable.TriangleVertices);
    colors = colors.concat(theSideTable.TriangleVertexColors);

    var thePlantPot = plantPot();
    thePlantPot.translate(1.5, 1.6,-1.5);
    points = points.concat(thePlantPot.TriangleVertices);
    colors = colors.concat(thePlantPot.TriangleVertexColors);

    var tree = theTree(1,1,1,-1.5, 1.5, 0.0);
    points = points.concat(tree.TriangleVertices);
    colors = colors.concat(tree.TriangleVertexColors);

    var wallDecoration = theSphereCrap(1,1,1,-0.2,2.3, -1.8);
    points = points.concat(wallDecoration.TriangleVertices);
    colors = colors.concat(wallDecoration.TriangleVertexColors);

    var rightCouch = couch(1.5, 1.2, -0.8);
    points = points.concat(rightCouch[0]);
    colors = colors.concat(rightCouch[1]);

    var backCouch = couch2(-0.1, 0.9, -1.3);
    points = points.concat(backCouch[0]);
    colors = colors.concat(backCouch[1]);

    var theWindows = blinds(0.0,1.9,-1.6);
    points = points.concat(theWindows[0]);
    colors = colors.concat(theWindows[1]);

    var theRug = rug();
    points = points.concat(theRug.TriangleVertices);
    colors = colors.concat(theRug.TriangleVertexColors);

    gl.viewport( 0, 0, canvas.width, canvas.height );

    aspect =  canvas.width/canvas.height;

    gl.clearColor( 0.937, 0.894, 0.835, 1.0 );

    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // color buffer
    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    // vertex buffer
    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    modelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );
    projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );

    render();
}

var render = function()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // set eye of camera
    eye = vec3(radius * Math.sin((theta + 25.0)* Math.PI/180.0) * Math.cos((phi + 95.0) * Math.PI/180.0),
        radius * Math.sin((theta + 25.0)* Math.PI/180.0) * Math.sin((phi + 95.0) * Math.PI/180.0), radius * Math.cos((theta + 25.0)* Math.PI/180.0));

    modelViewMatrix = lookAt(eye, at , up);
    projectionMatrix = perspective(fovy, aspect, near, far);

    gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
    gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );

    gl.drawArrays( gl.TRIANGLES, 0, points.length);

    requestAnimFrame( render );

}