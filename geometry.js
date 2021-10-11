/*           gemometry.js

    Simple geometry package using MV.js
    Supports:

            cube object
            cylinder object
            sphere object

            material object
            light object

            texture object
*/

"use strict";


/*   Cube object

     Usage: var myCube = cube(side_length)
            var myCube = cube() gives side of length 1

    cube is centered at origin with sides aligned with axes

    Attributes:  The following each have 36 values for rendering 12 triangles
                  comprising the cube

                TextureCoordinates
                TriangleVertices
                TriangleVertexColors
                TriangleFaceColors
                TriangleNormals

                The following are for rendering by elements

                Indices
                Vertices
                Elements


                VertexColors   (8 primary colors)
    Methods:

                translate(dx, dy, dz)
                scale(sz, sy, sz)
                rotate(angle, [axisx, axisy, axisz])
*/

function cube(s) {

    var data = {};

    var size;
    if (!s) size = 0.5;
    else size = s/2;



    var cubeVertices = [
        [ -size, -size,  size, 1.0 ],
        [ -size,  size,  size, 1.0 ],
        [  size, size, size, 1.0 ],
        [  size, -size,  size, 1.0 ],
        [ -size, -size, -size, 1.0 ],
        [ -size,  size, -size, 1.0 ],
        [ size,  size, -size, 1.0  ],
        [ size, -size, -size, 1.0 ]
    ];

    var cubeFaceNormals = [
        [ 0, 0, 1],
        [ 1, 0, 0],
        [ 0, -1, 0],
        [ 0, 1, 0],
        [ 0, 0, -1],
        [ -1 , 0, 0]
    ];

    var cubeIndices = [

        [ 1, 0, 3, 2],
        [ 2, 3, 7, 6],
        [ 3, 0, 4, 7],
        [ 6, 5, 1, 2],
        [ 4, 5, 6, 7],
        [ 5, 4, 0, 1]
    ];

    var cubeVertexColors = [
/*
        [ 1.0, 0.0, 0.0, 1.0 ],     // 0 red
        [ 1.0, 1.0, 0.0, 1.0 ],     // 1 yellow
        [ 0.0, 1.0, 0.0, 1.0 ],     // 2 green
        [ 0.0, 0.0, 1.0, 1.0 ],     // 3 blue
        [ 1.0, 0.0, 1.0, 1.0 ],     // 4 magenta
        [ 0.0, 1.0, 1.0, 1.0 ],     // 5 cyan
        [ 0.7, 1.0, 1.0, 1.0 ],     // 6 light blue
        [ 0.0, 0.0, 0.0, 1.0 ],     // 7 black
        [0.169, 0.114, 0.055, 1.0]  // 8 dark brown
        */
        [ 0.3, 0.2, 0.0, 1.0 ],
        [ 0.3, 0.2, 0.0, 1.0 ],
        [ 0.3, 0.2, 0.0, 1.0 ],
        [ 0.3, 0.2, 0.0, 1.0 ],
        [ 0.3, 0.2, 0.0, 1.0 ],
        [ 0.3, 0.2, 0.0, 1.0 ],
        [ 0.5, 0.5, 0.5, 1.0 ],
        [ 0.0, 0.0, 0.0, 1.0 ], //brown addition from kara
        [ 0.5, 0.3, 0.1, 1.0 ],
            //[.824, .706, .549]
    ];

    // begin kara's addition
    var yellow = [
        [ 1.0, 1.0, 0.0, 1.0 ],
        [ 1.0, 1.0, 0.0, 1.0 ],
        [ 1.0, 1.0, 0.0, 1.0 ],
        [ 1.0, 1.0, 0.0, 1.0 ],
        [ 1.0, 1.0, 0.0, 1.0 ],
        [ 1.0, 1.0, 0.0, 1.0 ],
        [ 1.0, 1.0, 0.0, 1.0 ],
        [ 1.0, 1.0, 0.0, 1.0 ]
    ]

    var blue = [
        [0.0, 0.8, 0.8, 1.0],
        [0.0, 0.8, 0.8, 1.0],
        [0.0, 0.8, 0.8, 1.0],
        [0.0, 0.8, 0.8, 1.0],
        [0.5, 0.5, 0.5, 1.0],
        [0.0, 0.8, 0.8, 1.0],
        [0.0, 0.8, 0.8, 1.0],
        [0.0, 0.8, 0.8, 1.0]
    ]

    var white = [
        [ 1.0, 1.0, 1.0, 1.0 ],
        [ 1.0, 1.0, 1.0, 1.0 ],
        [ 1.0, 1.0, 1.0, 1.0 ],
        [ 1.0, 1.0, 1.0, 1.0 ],
        [0.5, 0.5, 0.5, 1.0],
        [ 1.0, 1.0, 1.0, 1.0 ],
        [ 1.0, 1.0, 1.0, 1.0 ],
        [ 1.0, 1.0, 1.0, 1.0 ]
    ]
    // end kara's addition

    var lightTan = [
        [.851, .753, .62],
        [.851, .753, .62],
        [.851, .753, .62],
        [.851, .753, .62],
        [.851, .753, .62],
        [.851, .753, .62],
        [.851, .753, .62],
        [.851, .753, .62]
    ]

    var cubeElements = [
        1, 0, 3,
        3, 2, 1,

        2, 3, 7,
        7, 6, 2,

        3, 0, 4,
        4, 7, 3,

        6, 5, 1,
        1, 2, 6,

        4, 5, 6,
        6, 7, 4,

        5, 4, 0,
        0, 1, 5
    ];

    var cubeTexElements = [
        1, 0, 3,
        3, 2, 1,

        1, 0, 3,
        3, 2, 1,

        0, 1, 2,
        2, 3, 0,

        2, 1, 0,
        0, 3, 2,

        3, 2, 1,
        1, 0, 3,

        2, 3, 0,
        0, 1, 2
    ];

    var cubeNormalElements = [
        0, 0, 0,
        0, 0, 0,
        1, 1, 1,
        1, 1, 1,
        2, 2, 2,
        2, 2, 2,
        3, 3, 3,
        3, 3, 3,
        4, 4, 4,
        4, 4, 4,
        5, 5, 5,
        5, 5, 5

    ];

    var faceTexCoord = [
        [ 0, 0],
        [ 0, 1],
        [ 1, 1],
        [ 1, 0]
    ];

    var cubeTriangleVertices = [];
    var cubeTriangleVertexColors = [];
    var cubeTriangleYellow = [];
    var cubeTriangleBlue = [];
    var cubeTriangleWhite = [];
    var cubeTriangleLightTan = [];
    var cubeTriangleFaceColors = [];
    var cubeTextureCoordinates = [];
    var cubeTriangleNormals = [];

    for ( var i = 0; i < cubeElements.length; i++ ) {
        cubeTriangleVertices.push( cubeVertices[cubeElements[i]] );
        cubeTriangleVertexColors.push( cubeVertexColors[cubeElements[i]] );
        cubeTextureCoordinates.push( faceTexCoord[cubeTexElements[i]]);
        cubeTriangleNormals.push(cubeFaceNormals[cubeNormalElements[i]]);
        cubeTriangleYellow.push(yellow[cubeElements[i]]);
        cubeTriangleBlue.push(blue[cubeElements[i]]);
        cubeTriangleWhite.push(white[cubeElements[i]]);
        cubeTriangleLightTan.push(lightTan[cubeElements[i]]);
    }

    for ( var i = 0; i < cubeElements.length; i++ ) {
        cubeTriangleFaceColors[i] = cubeVertexColors[1+Math.floor((i/6))];
    }

    function translate(x, y, z){

        for(i=0; i<cubeVertices.length; i++) {
            cubeVertices[i][0] += x;
            cubeVertices[i][1] += y;
            cubeVertices[i][2] += z;
        };
        /*
        for(i=0; i<cubeTriangleVertices.length; i++) {
          cubeTriangleVertices[i][0] += x;
          cubeTriangleVertices[i][1] += y;
          cubeTriangleVertices[i][2] += z;
        };
     */
        //console.log(cubeVertices.length);
        //console.log(cubeTriangleVertices.length);
    }

    function scale(sx, sy, sz){

        for(i=0; i<cubeVertices.length; i++) {
            cubeVertices[i][0] *= sx;
            cubeVertices[i][1] *= sy;
            cubeVertices[i][2] *= sz;
        };
        for(i=0; i<cubeFaceNormals.length; i++) {
            cubeFaceNormals[i][0] /= sx;
            cubeFaceNormals[i][1] /= sy;
            cubeFaceNormals[i][2] /= sz;
        };

        /*
            for(i=0; i<cubeTriangleVertices.length; i++) {
                cubeTriangleVertices[i][0] *= sx;
                cubeTriangleVertices[i][1] *= sy;
                cubeTriangleVertices[i][2] *= sz;
                cubeTriangleNormals[i][0] /= sx;
                cubeTriangleNormals[i][1] /= sy;
                cubeTriangleNormals[i][2] /= sz;
            };
        */
    }

    function radians( degrees ) {
        return degrees * Math.PI / 180.0;
    }

    function rotate( angle, axis) {

        var d = Math.sqrt(axis[0]*axis[0] + axis[1]*axis[1] + axis[2]*axis[2]);

        var x = axis[0]/d;
        var y = axis[1]/d;
        var z = axis[2]/d;

        var c = Math.cos( radians(angle) );
        var omc = 1.0 - c;
        var s = Math.sin( radians(angle) );

        var mat = [
            [ x*x*omc + c,   x*y*omc - z*s, x*z*omc + y*s ],
            [ x*y*omc + z*s, y*y*omc + c,   y*z*omc - x*s ],
            [ x*z*omc - y*s, y*z*omc + x*s, z*z*omc + c ]
        ];

        for(i=0; i<cubeVertices.length; i++) {
            var t = [0, 0, 0];
            for( var j =0; j<3; j++)
                for( var k =0 ; k<3; k++)
                    t[j] += mat[j][k]*cubeVertices[i][k];
            for( var j =0; j<3; j++) cubeVertices[i][j] = t[j];
        };


        for(i=0; i<cubeFaceNormals.length; i++) {
            var t = [0, 0, 0];
            for( var j =0; j<3; j++)
                for( var k =0 ; k<3; k++)
                    t[j] += mat[j][k]*cubeFaceNormals[i][k];
            for( var j =0; j<3; j++) cubeFaceNormals[i][j] = t[j];
        };

    }

    // begin kayla's addition
    function cubeColor(colorIndex) {
        for ( var i = 0; i < cubeElements.length; i++ ) {
            cubeTriangleFaceColors[i] = cubeVertexColors[colorIndex];
        }
    }

    //82.4, 70.6, 54.9
    // end kayla's addition

    data.Indices = cubeIndices;
    data.VertexColors = cubeVertexColors;
    data.Vertices = cubeVertices;
    data.Elements = cubeElements;
    data.FaceNormals = cubeFaceNormals;
    data.TextureCoordinates = cubeTextureCoordinates;
    data.TriangleVertices = cubeTriangleVertices;
    data.TriangleVertexColors = cubeTriangleVertexColors;
    data.TriangleFaceColors = cubeTriangleFaceColors;
    data.TriangleNormals = cubeTriangleNormals;
    data.ColorYellow = cubeTriangleYellow;
    data.ColorBlue = cubeTriangleBlue;
    data.ColorWhite = cubeTriangleWhite;
    data.ColorLightTan = cubeTriangleLightTan;
    data.translate = translate;
    data.scale = scale;
    data.rotate = rotate;
    data.cubeColor = cubeColor;
    //data.lightTanCube = lightTanCube;
    //data.brownCube = brownCube;

    return data;

}
//_________________________________________________________

/*     Cylinder Object

      Usage: var myCylinder = cylinder(numSlices, numStacks, caps);

      Cylinder aligned with y-axis with base on plane y = 0

      slices = divisions around cylinder
      stacks = divisions along y
      caps = true then generate top and bottom caps

      default: cylinder(36, 1, true)

      Attributes:  The following each have  values for rendering the triangles
                    comprising the cylinder

                  TextureCoordinates
                  TriangleVertices
                  TriangleVertexColors
                  TriangleFaceColors
                  TriangleNormals

      Methods:

                  translate(dx, dy, dz)
                  scale(sz, sy, sz)
                  rotate(angle, [axisx, axisy, axisz])


*/

function cylinder(numSlices, numStacks, caps) {

    var slices = 36;
    if(numSlices) slices = numSlices;
    var stacks = 1;
    if(numStacks) stacks = numStacks;
    var capsFlag = true;
    if(caps==false) capsFlag = caps;

    var data = {};

    var top = 0.5;
    var bottom = -0.5;
    var radius = 0.5;
    var topCenter = [0.0, top, 0.0];
    var bottomCenter = [0.0, bottom, 0.0];


    var sideColor = [0.396, 0.263, 0.129, 1.0];
    var topColor = [0.824, 0.706, 0.549, 1.0];
    var bottomColor = [0.824, 0.706, 0.549, 1.0];


    var cylinderVertexCoordinates = [];
    var cylinderNormals = [];
    var cylinderVertexColors = [];
    var cylinderTextureCoordinates = [];

// side

    for(var j=0; j<stacks; j++) {
        var stop = bottom + (j+1)*(top-bottom)/stacks;
        var sbottom = bottom + j*(top-bottom)/stacks;
        var topPoints = [];
        var bottomPoints = [];
        var topST = [];
        var bottomST = [];
        for(var i =0; i<slices; i++) {
            var theta = 2.0*i*Math.PI/slices;
            topPoints.push([radius*Math.sin(theta), stop, radius*Math.cos(theta), 1.0]);
            bottomPoints.push([radius*Math.sin(theta), sbottom, radius*Math.cos(theta), 1.0]);
        };

        topPoints.push([0.0, stop, radius, 1.0]);
        bottomPoints.push([0.0,  sbottom, radius, 1.0]);


        for(var i=0; i<slices; i++) {
            var a = topPoints[i];
            var d = topPoints[i+1];
            var b = bottomPoints[i];
            var c = bottomPoints[i+1];
            var u = [b[0]-a[0], b[1]-a[1], b[2]-a[2]];
            var v = [c[0]-b[0], c[1]-b[1], c[2]-b[2]];

            var normal = [
                u[1]*v[2] - u[2]*v[1],
                u[2]*v[0] - u[0]*v[2],
                u[0]*v[1] - u[1]*v[0]
            ];

            var mag = Math.sqrt(normal[0]*normal[0] + normal[1]*normal[1] + normal[2]*normal[2])
            normal = [normal[0]/mag, normal[1]/mag, normal[2]/mag];
            cylinderVertexCoordinates.push([a[0], a[1], a[2], 1.0]);
            cylinderVertexColors.push(sideColor);
            cylinderNormals.push([normal[0], normal[1], normal[2]]);
            cylinderTextureCoordinates.push([(i+1)/slices, j*(top-bottom)/stacks]);

            cylinderVertexCoordinates.push([b[0], b[1], b[2], 1.0]);
            cylinderVertexColors.push(sideColor);
            cylinderNormals.push([normal[0], normal[1], normal[2]]);
            cylinderTextureCoordinates.push([i/slices, (j-1)*(top-bottom)/stacks]);

            cylinderVertexCoordinates.push([c[0], c[1], c[2], 1.0]);
            cylinderVertexColors.push(sideColor);
            cylinderNormals.push([normal[0], normal[1], normal[2]]);
            cylinderTextureCoordinates.push([(i+1)/slices, (j-1)*(top-bottom)/stacks]);

            cylinderVertexCoordinates.push([a[0], a[1], a[2], 1.0]);
            cylinderVertexColors.push(sideColor);
            cylinderNormals.push([normal[0], normal[1], normal[2]]);
            cylinderTextureCoordinates.push([(i+1)/slices, j*(top-bottom)/stacks]);

            cylinderVertexCoordinates.push([c[0], c[1], c[2], 1.0]);
            cylinderVertexColors.push(sideColor);
            cylinderNormals.push([normal[0], normal[1], normal[2]]);
            cylinderTextureCoordinates.push([(i+1)/slices, (j-1)*(top-bottom)/stacks]);

            cylinderVertexCoordinates.push([d[0], d[1], d[2], 1.0]);
            cylinderVertexColors.push(sideColor);
            cylinderNormals.push([normal[0], normal[1], normal[2]]);
            cylinderTextureCoordinates.push([(i+1)/slices, j*(top-bottom)/stacks]);
        };
    };

    var topPoints = [];
    var bottomPoints = [];
    for(var i =0; i<slices; i++) {
        var theta = 2.0*i*Math.PI/slices;
        topPoints.push([radius*Math.sin(theta), top, radius*Math.cos(theta), 1.0]);
        bottomPoints.push([radius*Math.sin(theta), bottom, radius*Math.cos(theta), 1.0]);
    };
    topPoints.push([0.0, top, radius, 1.0]);
    bottomPoints.push([0.0,  bottom, radius, 1.0]);

    if(capsFlag) {

//top

        for(i=0; i<slices; i++) {
            normal = [0.0, 1.0, 0.0];
            var a = [0.0, top, 0.0, 1.0];
            var b = topPoints[i];
            var c = topPoints[i+1];
            cylinderVertexCoordinates.push([a[0], a[1], a[2], 1.0]);
            cylinderVertexColors.push(topColor);
            cylinderNormals.push(normal);
            cylinderTextureCoordinates.push([0, 1]);

            cylinderVertexCoordinates.push([b[0], b[1], b[2], 1.0]);
            cylinderVertexColors.push(topColor);
            cylinderNormals.push(normal);
            cylinderTextureCoordinates.push([0, 1]);

            cylinderVertexCoordinates.push([c[0], c[1], c[2], 1.0]);
            cylinderVertexColors.push(topColor);
            cylinderNormals.push(normal);
            cylinderTextureCoordinates.push([0, 1]);
        };

//bottom

        for(i=0; i<slices; i++) {
            normal = [0.0, -1.0, 0.0];
            var a = [0.0, bottom, 0.0, 1.0];
            var b = bottomPoints[i];
            var c = bottomPoints[i+1];
            cylinderVertexCoordinates.push([a[0], a[1], a[2], 1.0]);
            cylinderVertexColors.push(bottomColor);
            cylinderNormals.push(normal);
            cylinderTextureCoordinates.push([0, 1]);

            cylinderVertexCoordinates.push([b[0], b[1], b[2], 1.0]);
            cylinderVertexColors.push(bottomColor);
            cylinderNormals.push(normal);
            cylinderTextureCoordinates.push([0, 1]);

            cylinderVertexCoordinates.push([c[0], c[1], c[2], 1.0]);
            cylinderVertexColors.push(bottomColor);
            cylinderNormals.push(normal);
            cylinderTextureCoordinates.push([0, 1]);
        };

    };
    function translate(x, y, z){
        for(var i=0; i<cylinderVertexCoordinates.length; i++) {
            cylinderVertexCoordinates[i][0] += x;
            cylinderVertexCoordinates[i][1] += y;
            cylinderVertexCoordinates[i][2] += z;
        };
    }

    function scale(sx, sy, sz){
        for(var i=0; i<cylinderVertexCoordinates.length; i++) {
            cylinderVertexCoordinates[i][0] *= sx;
            cylinderVertexCoordinates[i][1] *= sy;
            cylinderVertexCoordinates[i][2] *= sz;
            cylinderNormals[i][0] /= sx;
            cylinderNormals[i][1] /= sy;
            cylinderNormals[i][2] /= sz;
        };
    }

    function radians( degrees ) {
        return degrees * Math.PI / 180.0;
    }

    function rotate( angle, axis) {

        var d = Math.sqrt(axis[0]*axis[0] + axis[1]*axis[1] + axis[2]*axis[2]);

        var x = axis[0]/d;
        var y = axis[1]/d;
        var z = axis[2]/d;

        var c = Math.cos( radians(angle) );
        var omc = 1.0 - c;
        var s = Math.sin( radians(angle) );

        var mat = [
            [ x*x*omc + c,   x*y*omc - z*s, x*z*omc + y*s ],
            [ x*y*omc + z*s, y*y*omc + c,   y*z*omc - x*s ],
            [ x*z*omc - y*s, y*z*omc + x*s, z*z*omc + c ]
        ];

        for(var i=0; i<cylinderVertexCoordinates.length; i++) {
            var u = [0, 0, 0];
            var v = [0, 0, 0];
            for( var j =0; j<3; j++)
                for( var k =0 ; k<3; k++) {
                    u[j] += mat[j][k]*cylinderVertexCoordinates[i][k];
                    v[j] += mat[j][k]*cylinderNormals[i][k];
                };
            for( var j =0; j<3; j++) {
                cylinderVertexCoordinates[i][j] = u[j];
                cylinderNormals[i][j] = v[j];
            };
        };
    }

    data.TriangleVertices = cylinderVertexCoordinates;
    data.TriangleNormals = cylinderNormals;
    data.TriangleVertexColors = cylinderVertexColors;
    data.TextureCoordinates = cylinderTextureCoordinates;
    data.rotate = rotate;
    data.translate = translate;
    data.scale = scale;
    return data;

}

//_____________________________________________________________


/*    Sphere object

      Usage: var mySphere = sphere(numSubdivisions);

      Sphere of radius 0.5 generated by recursive subdivision of tetrahedron
        producing 4**(numsubdivisions+1) triangles

     default: sphere(3)

      Attributes:  The following each have  values for rendering the triangles
              apporoximating the sphere

            TextureCoordinates
            TriangleVertices
            TriangleVertexColors
            TriangleFaceColors
            TriangleNormals

Methods:

            translate(dx, dy, dz)
            scale(sz, sy, sz)
            rotate(angle, [axisx, axisy, axisz])


*/

function sphere(numSubdivisions) {

    var subdivisions = 3;
    if(numSubdivisions) subdivisions = numSubdivisions;


    var data = {};

//var radius = 0.5;

    var sphereVertexCoordinates = [];
    var sphereVertexCoordinatesNormals = [];
    var sphereVertexColors = [];
    var sphereTextureCoordinates = [];
    var sphereNormals = [];

    var va = vec4(0.0, 0.0, -1.0,1);
    var vb = vec4(0.0, 0.942809, 0.333333, 1);
    var vc = vec4(-0.816497, -0.471405, 0.333333, 1);
    var vd = vec4(0.816497, -0.471405, 0.333333,1);

    function triangle(a, b, c) {

        sphereVertexCoordinates.push([a[0],a[1], a[2], 1]);
        sphereVertexCoordinates.push([b[0],b[1], b[2], 1]);
        sphereVertexCoordinates.push([c[0],c[1], c[2], 1]);

        // normals are vectors

        sphereNormals.push([a[0],a[1], a[2]]);
        sphereNormals.push([b[0],b[1], b[2]]);
        sphereNormals.push([c[0],c[1], c[2]]);

        sphereVertexColors.push([(1+a[0])/2.0, (1+a[1])/2.0, (1+a[2])/2.0, 1.0]);
        sphereVertexColors.push([(1+b[0])/2.0, (1+b[1])/2.0, (1+b[2])/2.0, 1.0]);
        sphereVertexColors.push([(1+c[0])/2.0, (1+c[1])/2.0, (1+c[2])/2.0, 1.0]);

        sphereTextureCoordinates.push([0.5*Math.acos(a[0])/Math.PI, 0.5*Math.asin(a[1]/Math.sqrt(1.0-a[0]*a[0]))/Math.PI]);
        sphereTextureCoordinates.push([0.5*Math.acos(b[0])/Math.PI, 0.5*Math.asin(b[1]/Math.sqrt(1.0-b[0]*b[0]))/Math.PI]);
        sphereTextureCoordinates.push([0.5*Math.acos(c[0])/Math.PI, 0.5*Math.asin(c[1]/Math.sqrt(1.0-c[0]*c[0]))/Math.PI]);

        //sphereTextureCoordinates.push([0.5+Math.asin(a[0])/Math.PI, 0.5+Math.asin(a[1])/Math.PI]);
        //sphereTextureCoordinates.push([0.5+Math.asin(b[0])/Math.PI, 0.5+Math.asin(b[1])/Math.PI]);
        //sphereTextureCoordinates.push([0.5+Math.asin(c[0])/Math.PI, 0.5+Math.asin(c[1])/Math.PI]);

    }



    function divideTriangle(a, b, c, count) {
        if ( count > 0 ) {

            var ab = mix( a, b, 0.5);
            var ac = mix( a, c, 0.5);
            var bc = mix( b, c, 0.5);

            ab = normalize(ab, true);
            ac = normalize(ac, true);
            bc = normalize(bc, true);

            divideTriangle( a, ab, ac, count - 1 );
            divideTriangle( ab, b, bc, count - 1 );
            divideTriangle( bc, c, ac, count - 1 );
            divideTriangle( ab, bc, ac, count - 1 );
        }
        else {
            triangle( a, b, c );
        }
    }


    function tetrahedron(a, b, c, d, n) {
        divideTriangle(a, b, c, n);
        divideTriangle(d, c, b, n);
        divideTriangle(a, d, b, n);
        divideTriangle(a, c, d, n);
    }

    tetrahedron(va, vb, vc, vd, subdivisions);


    function translate(x, y, z){
        for(var i=0; i<sphereVertexCoordinates.length; i++) {
            sphereVertexCoordinates[i][0] += x;
            sphereVertexCoordinates[i][1] += y;
            sphereVertexCoordinates[i][2] += z;
        };
    }

    function scale(sx, sy, sz){
        for(var i=0; i<sphereVertexCoordinates.length; i++) {
            sphereVertexCoordinates[i][0] *= sx;
            sphereVertexCoordinates[i][1] *= sy;
            sphereVertexCoordinates[i][2] *= sz;
            sphereNormals[i][0] /= sx;
            sphereNormals[i][1] /= sy;
            sphereNormals[i][2] /= sz;
        };
    }

    function radians( degrees ) {
        return degrees * Math.PI / 180.0;
    }

    function rotate( angle, axis) {

        var d = Math.sqrt(axis[0]*axis[0] + axis[1]*axis[1] + axis[2]*axis[2]);

        var x = axis[0]/d;
        var y = axis[1]/d;
        var z = axis[2]/d;

        var c = Math.cos( radians(angle) );
        var omc = 1.0 - c;
        var s = Math.sin( radians(angle) );

        var mat = [
            [ x*x*omc + c,   x*y*omc - z*s, x*z*omc + y*s ],
            [ x*y*omc + z*s, y*y*omc + c,   y*z*omc - x*s ],
            [ x*z*omc - y*s, y*z*omc + x*s, z*z*omc + c ]
        ];

        for(var i=0; i<sphereVertexCoordinates.length; i++) {
            var u = [0, 0, 0];
            var v = [0, 0, 0];
            for( var j =0; j<3; j++)
                for( var k =0 ; k<3; k++) {
                    u[j] += mat[j][k]*sphereVertexCoordinates[i][k];
                    v[j] += mat[j][k]*sphereNormals[i][k];
                };
            for( var j =0; j<3; j++) {
                sphereVertexCoordinates[i][j] = u[j];
                sphereNormals[i][j] = v[j];
            };
        };
    }
//for(var i =0; i<sphereVertexCoordinates.length; i++) console.log(sphereTextureCoordinates[i]);

    data.TriangleVertices = sphereVertexCoordinates;
    data.TriangleNormals = sphereNormals;
    data.TriangleVertexColors = sphereVertexColors;
    data.TextureCoordinates = sphereTextureCoordinates;
    data.rotate = rotate;
    data.translate = translate;
    data.scale = scale;
    return data;

}

//______________________________________________________________________

/*
          Gold Colored materialAmbient

          Useage: myMaterial = goldMaterial();
*/

function goldMaterial() {
    var data  = {};
    data.materialAmbient = vec4( 1.0, 0.0, 1.0, 1.0 );
    data.materialDiffuse = vec4( 1.0, 0.8, 0.0, 1.0);
    data.materialSpecular = vec4( 1.0, 0.8, 0.0, 1.0 );
    data.materialShininess = 100.0;
    return data;
}

//_________________________________________________________________________________

/*
          Light Object

          Usage: var myLight = light0()

          Distant light with ambient, diffuse and specular components
*/
function light0() {
    var data = {};
    data.lightPosition = [0.0, 0.0, 10.0, 0.0 ];;
    data.lightAmbient = [0.2, 0.2, 0.2, 1.0 ];
    data.lightDiffuse = [ 1.0, 1.0, 1.0, 1.0 ];
    data.lightSpecular = [1.0, 1.0, 1.0, 1.0 ];
    data.lightShineness = 10;
    return data;
}

//_________________________________________________________________________________

/*
      Checkerboard texture

      Usage: var myTexture = checkerboardTexture(size, rows, columns)

      creates a size x size texture with a checkerboard of nrows x ncolumns

      default: checkerboard(128, 8 8)
*/


function checkerboardTexture(size, rows, columns)
{
    var texSize = 128;
    if(size)  texSize = size;

    var nrows = 8;
    if(rows) nrows = rows;
    var ncolumns = nrows;
    if(columns) ncolumns = columns;

    // Create a checkerboard pattern using floats

    var image = new Uint8Array(4*texSize*texSize);

    for ( var i = 0; i < texSize; i++ )
        for ( var j = 0; j < texSize; j++ ) {
            var patchx = Math.floor(i/(texSize/ncolumns));
            var patchy = Math.floor(j/(texSize/nrows));

            var c = (patchx%2 !== patchy%2 ? 255 : 0);

            image[4*i*texSize+4*j] = c;
            image[4*i*texSize+4*j+1] = c;
            image[4*i*texSize+4*j+2] = c;
            image[4*i*texSize+4*j+3] = 255;
        }

    var texture = gl.createTexture();
    gl.activeTexture( gl.TEXTURE0 );
    gl.bindTexture( gl.TEXTURE_2D, texture );
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, texSize, texSize, 0,
        gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap( gl.TEXTURE_2D );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
        gl.NEAREST_MIPMAP_LINEAR );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );

    return texture;
}

//begin kayla's addition
function coffeeTable(sxin, syin, szin, txin, tyin, tzin) {

    var data = {};

    var s_x = 1;
    if(sxin) s_x = sxin;
    var s_y = 1;
    if(syin) s_y = syin;
    var s_z = 1;
    if(szin) s_z = szin;

    var t_x = 0;
    if(txin) t_x = txin;
    var t_y = 0;
    if(tyin) t_y = tyin;
    var t_z = 0;
    if(tzin) t_z = tzin;

    var colors = [];
    var points = [];
    var coffeeTableVertices = [];
    //var coffeeTableElements = [];
    var coffeeTableNormals = [];

    var leftBottomLeg = cube();
    leftBottomLeg.scale(0.05 * s_x, 0.05 * s_y, 1.1 * s_z);
    leftBottomLeg.translate(-1.025 + t_x, 0.0 + t_y, 0.0 + t_z);
    //leftBottomLeg.cubeColor(8);
    colors = leftBottomLeg.TriangleVertexColors;
    points = leftBottomLeg.TriangleVertices;
    //coffeeTableElements = leftBottomLeg.Elements;
    coffeeTableNormals = leftBottomLeg.FaceNormals;
    coffeeTableVertices = leftBottomLeg.Vertices;

    var leftBottomLeg2 = cube();
    leftBottomLeg2.scale(0.05 * s_x, 0.05 * s_y, 1.1 * s_z);
    leftBottomLeg2.translate(-0.95 + t_x, 0.0 + t_y, 0.0 + t_z);
    colors = colors.concat(leftBottomLeg2.TriangleVertexColors);
    points = points.concat(leftBottomLeg2.TriangleVertices);
    coffeeTableNormals = coffeeTableNormals.concat(leftBottomLeg2.FaceNormals);
    coffeeTableVertices = coffeeTableVertices.concat(leftBottomLeg2.Vertices);


    var leftBackLeg = cube();
    leftBackLeg.scale(0.05 * s_x, 0.65 * s_y, 0.05 * s_z);
    leftBackLeg.translate(-1.025 + t_x,0.35 + t_y, -0.525 + t_z);
    colors = colors.concat(leftBackLeg.TriangleVertexColors);
    points = points.concat(leftBackLeg.TriangleVertices);
    coffeeTableNormals = coffeeTableNormals.concat(leftBackLeg.FaceNormals);
    coffeeTableVertices = coffeeTableVertices.concat(leftBackLeg.Vertices);

    var leftBackLeg2 = cube();
    leftBackLeg2.scale(0.05 * s_x, 0.65 * s_y, 0.05 * s_z);
    leftBackLeg2.translate(-0.95 + t_x,0.35 + t_y, -0.525 + t_z);
    colors = colors.concat(leftBackLeg2.TriangleVertexColors);
    points = points.concat(leftBackLeg2.TriangleVertices);
    coffeeTableNormals = coffeeTableNormals.concat(leftBackLeg2.FaceNormals);
    coffeeTableVertices = coffeeTableVertices.concat(leftBackLeg2.Vertices);

    var leftFrontLeg = cube();
    leftFrontLeg.scale(0.05 * s_x, 0.65 * s_y, 0.05 * s_z);
    leftFrontLeg.translate(-1.025 + t_x, 0.35 + t_y, 0.525 + t_z);
    colors = colors.concat(leftFrontLeg.TriangleVertexColors);
    points = points.concat(leftFrontLeg.TriangleVertices);
    coffeeTableNormals = coffeeTableNormals.concat(leftFrontLeg.FaceNormals);
    coffeeTableVertices = coffeeTableVertices.concat(leftFrontLeg.Vertices);

    var leftFrontLeg2 = cube();
    leftFrontLeg2.scale(0.05 * s_x, 0.65 * s_y, 0.0 * s_z);
    leftFrontLeg2.translate(-0.95 + t_x, 0.35 + t_y, 0.55 + t_z);
    //leftFrontLeg2.brownCube();
    colors = colors.concat(leftFrontLeg2.TriangleVertexColors);
    points = points.concat(leftFrontLeg2.TriangleVertices);
    coffeeTableNormals = coffeeTableNormals.concat(leftFrontLeg2.FaceNormals);
    coffeeTableVertices = coffeeTableVertices.concat(leftFrontLeg2.Vertices);

    var leftTopLeg = cube();
    leftTopLeg.scale(0.05 * s_x, 0.05 * s_y, 1.1 * s_z);
    leftTopLeg.translate(-1.025 + t_x, 0.65 + t_y, 0.0 + t_z);
    colors = colors.concat(leftTopLeg.TriangleVertexColors);
    points = points.concat(leftTopLeg.TriangleVertices);
    coffeeTableNormals = coffeeTableNormals.concat(leftTopLeg.FaceNormals);
    coffeeTableVertices = coffeeTableVertices.concat(leftTopLeg.Vertices);

    var leftTopLeg2 = cube();
    leftTopLeg2.scale(0.05 * s_x, 0.05 * s_y, 1.1 * s_z);
    leftTopLeg2.translate(-0.95 + t_x, 0.65 + t_y,0.0 + t_z);
    colors = colors.concat(leftTopLeg2.TriangleVertexColors);
    points = points.concat(leftTopLeg2.TriangleVertices);
    coffeeTableNormals = coffeeTableNormals.concat(leftTopLeg2.FaceNormals);
    coffeeTableVertices = coffeeTableVertices.concat(leftTopLeg2.Vertices);

    var rightBottomLeg = cube();
    rightBottomLeg.scale(0.05 * s_x,0.05 * s_y,1.1 * s_z);
    rightBottomLeg.translate(1.025 + t_x, 0.0 + t_y,0.0 + t_z);
    colors = colors.concat(rightBottomLeg.TriangleVertexColors);
    points = points.concat(rightBottomLeg.TriangleVertices);
    coffeeTableNormals = coffeeTableNormals.concat(rightBottomLeg.FaceNormals);
    coffeeTableVertices = coffeeTableVertices.concat(rightBottomLeg.Vertices);

    var rightBottomLeg2 = cube();
    rightBottomLeg2.scale(0.05 * s_x,0.05 * s_y,1.1 * s_z);
    rightBottomLeg2.translate(0.95 + t_x, 0.0 + t_y,0.0 + t_z);
    colors = colors.concat(rightBottomLeg2.TriangleVertexColors);
    points = points.concat(rightBottomLeg2.TriangleVertices);
    coffeeTableNormals = coffeeTableNormals.concat(rightBottomLeg2.FaceNormals);
    coffeeTableVertices = coffeeTableVertices.concat(rightBottomLeg2.Vertices);

    var rightBackLeg = cube();
    rightBackLeg.scale(0.05 * s_x, 0.65 * s_y, 0.05 * s_z);
    rightBackLeg.translate(1.025 + t_x,0.35 + t_y, -0.525 + t_z);
    colors = colors.concat(rightBackLeg.TriangleVertexColors);
    points = points.concat(rightBackLeg.TriangleVertices);
    coffeeTableNormals = coffeeTableNormals.concat(rightBackLeg.FaceNormals);
    coffeeTableVertices = coffeeTableVertices.concat(rightBackLeg.Vertices);

    var rightBackLeg2 = cube();
    rightBackLeg2.scale(0.05 * s_x, 0.65 * s_y, 0.05 * s_z);
    rightBackLeg2.translate(0.95 + t_x,0.35 + t_y, -0.525 + t_z);
    colors = colors.concat(rightBackLeg2.TriangleVertexColors);
    points = points.concat(rightBackLeg2.TriangleVertices);
    coffeeTableNormals = coffeeTableNormals.concat(rightBackLeg2.FaceNormals);
    coffeeTableVertices = coffeeTableVertices.concat(rightBackLeg2.Vertices);

    var rightFrontLeg = cube();
    rightFrontLeg.scale(0.05 * s_x, 0.65 * s_y, 0.05 * s_z);
    rightFrontLeg.translate(1.025 + t_x, 0.35 + t_y, 0.525 + t_z);
    colors = colors.concat(rightFrontLeg.TriangleVertexColors);
    points = points.concat(rightFrontLeg.TriangleVertices);
    coffeeTableNormals = coffeeTableNormals.concat(rightFrontLeg.FaceNormals);
    coffeeTableVertices = coffeeTableVertices.concat(rightFrontLeg.Vertices);

    var rightFrontLeg2 = cube();
    rightFrontLeg2.scale(0.05 * s_x, 0.65 * s_y, 0.05 * s_z);
    rightFrontLeg2.translate(0.95 + t_x, 0.35 + t_y, 0.525 + t_z);
    colors = colors.concat(rightFrontLeg2.TriangleVertexColors);
    points = points.concat(rightFrontLeg2.TriangleVertices);
    coffeeTableNormals = coffeeTableNormals.concat(rightFrontLeg2.FaceNormals);
    coffeeTableVertices = coffeeTableVertices.concat(rightFrontLeg2.Vertices);

    var rightTopLeg = cube();
    rightTopLeg.scale(0.05 * s_x, 0.05 * s_y, 1.1 * s_z);
    rightTopLeg.translate(1.025 + t_x, 0.65 + t_y,0.0 + t_z);
    colors = colors.concat(rightTopLeg.TriangleVertexColors);
    points = points.concat(rightTopLeg.TriangleVertices);
    coffeeTableNormals = coffeeTableNormals.concat(rightTopLeg.FaceNormals);
    coffeeTableVertices = coffeeTableVertices.concat(rightTopLeg.Vertices);

    var rightTopLeg2 = cube();
    rightTopLeg2.scale(0.05 * s_x, 0.05 * s_y, 1.1 * s_z);
    rightTopLeg2.translate(0.95 + t_x, 0.65 + t_y,0.0 + t_z);
    colors = colors.concat(rightTopLeg2.TriangleVertexColors);
    points = points.concat(rightTopLeg2.TriangleVertices);
    coffeeTableNormals = coffeeTableNormals.concat(rightTopLeg2.FaceNormals);
    coffeeTableVertices = coffeeTableVertices.concat(rightTopLeg2.Vertices);

    var tableTop = cube();
    tableTop.scale(1.85 * s_x,0.15 * s_y,1.1 * s_z);
    tableTop.cubeColor(8);
    tableTop.translate(0.0 + t_x, 0.6 + t_y,0.0 + t_z);
    colors = colors.concat(tableTop.TriangleFaceColors);
    points = points.concat(tableTop.TriangleVertices);
    coffeeTableNormals = coffeeTableNormals.concat(tableTop.FaceNormals);
    coffeeTableVertices = coffeeTableVertices.concat(tableTop.Vertices);

    /*
    function scale(sx, sy, sz){

        for(i=0; i<coffeeTableVertices.length; i++) {
            coffeeTableVertices[i][0] *= sx;
            coffeeTableVertices[i][1] *= sy;
            coffeeTableVertices[i][2] *= sz;
        };
        for(i=0; i<coffeeTableNormals.length; i++) {
            coffeeTableNormals[i][0] /= sx;
            coffeeTableNormals[i][1] /= sy;
            coffeeTableNormals[i][2] /= sz;
        };


            //for(i=0; i<cubeTriangleVertices.length; i++) {
                //cubeTriangleVertices[i][0] *= sx;
                //cubeTriangleVertices[i][1] *= sy;
                //cubeTriangleVertices[i][2] *= sz;
                //cubeTriangleNormals[i][0] /= sx;
                //cubeTriangleNormals[i][1] /= sy;
                //cubeTriangleNormals[i][2] /= sz;
            //};

    }*/


    data.TriangleVertices = points;
    data.TriangleVertexColors = colors;
    //data.Elements = coffeeTableElements;
    data.FaceNormals = coffeeTableNormals;
    data.Vertices = coffeeTableVertices;
    //data.scale = scale;

    return data;
}

function lamp(txin, tyin, tzin) {
    var data = {};

    var t_x = 0;
    if(txin) t_x = txin;
    var t_y = 0;
    if(tyin) t_y = tyin;
    var t_z = 0;
    if(tzin) t_z = tzin;

    var colors = [];
    var points = [];

    var bottomPole = cylinder(72, 3, true);

    var lampshade1 = cylinder(46, 3, true);
    var lampshade2 = cylinder(46, 3, true);
    var lampshade3 = cylinder(46, 3, true);

    var cord1 = cylinder(32, 3, true);
    var cord2 = cylinder(32, 3, true);
    var cord3 = cylinder(32, 3, true);

    var topPole1 = cylinder(72, 3, true);
    var topPole2 = cylinder(72, 3, true);
    var topPole3 = cylinder(72, 3, true);

    bottomPole.scale(0.05, 1.0, 0.05);
    bottomPole.translate(0.0 + t_x, 0.0 + t_y, 0.0 + t_z);

    lampshade1.scale(0.3, 0.2, 0.3);
    lampshade1.rotate(-2, [1,0,0]);
    lampshade1.translate(0.49 + t_x, 0.45 + t_y, 0.0 + t_z);

    lampshade2.scale(0.3, 0.2, 0.3);
    lampshade2.rotate(-3, [1,0,0]);
    lampshade2.translate(-0.09 + t_x, 0.65 + t_y, 0.21 + t_z);

    lampshade3.scale(0.3, 0.2, 0.3);
    lampshade3.rotate(-3, [1,0,0]);
    lampshade3.translate(-0.5 + t_x, 0.35 + t_y, 0 + t_z);

    cord1.scale(0.02, 0.13, 0.02);
    cord1.translate(0.49 + t_x, 0.6 + t_y, 0 + t_z);

    cord2.scale(0.02, 0.13, 0.02);
    cord2.translate(-0.09 + t_x, 0.8 + t_y, 0.21 + t_z);

    cord3.scale(0.02, 0.13, 0.02);
    cord3.translate(-0.5 + t_x, 0.5 + t_y, 0 + t_z);

    topPole1.scale(0.03, 0.5, 0.03);
    topPole1.rotate(-70, [0,0,1]);
    topPole1.translate(0.26 + t_x,0.58 + t_y,0 + t_z);

    topPole2.scale(0.03, 0.45, 0.03);
    topPole2.rotate(10, [0,0,1]);
    topPole2.rotate(30, [1,0,0]);
    topPole2.translate(-0.04 + t_x, 0.68 + t_y, 0.1 + t_z);

    topPole3.scale(0.03, 0.5, 0.03);
    topPole3.rotate(80, [0,0,1]);
    topPole3.translate(-0.26 + t_x, 0.53 + t_y, 0 + t_z);


    colors = bottomPole.TriangleVertexColors;
    points = bottomPole.TriangleVertices;

    colors = colors.concat(lampshade1.TriangleVertexColors);
    points = points.concat(lampshade1.TriangleVertices);

    colors = colors.concat(lampshade2.TriangleVertexColors);
    points = points.concat(lampshade2.TriangleVertices);

    colors = colors.concat(lampshade3.TriangleVertexColors);
    points = points.concat(lampshade3.TriangleVertices);

    colors = colors.concat(cord1.TriangleVertexColors);
    points = points.concat(cord1.TriangleVertices);

    colors = colors.concat(cord2.TriangleVertexColors);
    points = points.concat(cord2.TriangleVertices);

    colors = colors.concat(cord3.TriangleVertexColors);
    points = points.concat(cord3.TriangleVertices);

    colors = colors.concat(topPole1.TriangleVertexColors);
    points = points.concat(topPole1.TriangleVertices);

    colors = colors.concat(topPole2.TriangleVertexColors);
    points = points.concat(topPole2.TriangleVertices);

    colors = colors.concat(topPole3.TriangleVertexColors);
    points = points.concat(topPole3.TriangleVertices);

    data.TriangleVertices = points;
    data.TriangleVertexColors = colors;

    return data;
}

function sideTable(txin, tyin, tzin) {
    var data = {};

    var t_x = 0;
    if(txin) t_x = txin;
    var t_y = 0;
    if(tyin) t_y = tyin;
    var t_z = 0;
    if(tzin) t_z = tzin;

    var colors = [];
    var points = [];

    var tableTop = cube();
    tableTop.scale(1.05, 0.1, 1.05);
    tableTop.translate(0.0 + t_x, 0.0 + t_y, 0.0 + t_z);
    points = tableTop.TriangleVertices;
    colors = tableTop.TriangleVertexColors;

    var tableShelf = cube();
    tableShelf.scale(0.75, 0.1, 0.75);
    tableShelf.translate(0.0 + t_x, -0.25 + t_y, 0.0 + t_z);
    points = points.concat(tableShelf.TriangleVertices);
    colors = colors.concat(tableShelf.TriangleVertexColors);

    var frontLeftLeg1 = cylinder();
    frontLeftLeg1.scale(0.1, 0.5, 0.1);
    frontLeftLeg1.translate(-0.32 + t_x, -0.5 + t_y, 0.32 + t_z);
    points = points.concat(frontLeftLeg1.TriangleVertices);
    colors = colors.concat(frontLeftLeg1.TriangleVertexColors);

    var frontLeftLeg2 = cylinder();
    frontLeftLeg2.scale(0.1, 0.3, 0.1);
    frontLeftLeg2.rotate(45, [1,0,1]);
    frontLeftLeg2.translate(-0.39 + t_x, -0.12 + t_y, 0.35 + t_z);
    points = points.concat(frontLeftLeg2.TriangleVertices);
    colors = colors.concat(frontLeftLeg2.TriangleVertexColors);

    var frontRightLeg1 = cylinder();
    frontRightLeg1.scale(0.1, 0.5, 0.1);
    frontRightLeg1.translate(0.32 + t_x, -0.5 + t_y, 0.32 + t_z);
    points = points.concat(frontRightLeg1.TriangleVertices);
    colors = colors.concat(frontRightLeg1.TriangleVertexColors);

    var frontRightLeg2 = cylinder();
    frontRightLeg2.scale(0.1, 0.3, 0.1);
    frontRightLeg2.rotate(-45, [0,1,1]);
    frontRightLeg2.translate(0.39 + t_x, -0.12 + t_y, 0.35 + t_z);
    points = points.concat(frontRightLeg2.TriangleVertices);
    colors = colors.concat(frontRightLeg2.TriangleVertexColors);

    var backLeftLeg1 = cylinder();
    backLeftLeg1.scale(0.1, 0.5, 0.1);
    backLeftLeg1.translate(-0.32 + t_x, -0.5 + t_y, -0.32 + t_z);
    points = points.concat(backLeftLeg1.TriangleVertices);
    colors = colors.concat(backLeftLeg1.TriangleVertexColors);

    var backLeftLeg2 = cylinder();
    backLeftLeg2.scale(0.1, 0.3, 0.1);
    backLeftLeg2.rotate(45, [0,1,1]);
    backLeftLeg2.translate(-0.39 + t_x, -0.12 + t_y, -0.35 + t_z);
    points = points.concat(backLeftLeg2.TriangleVertices);
    colors = colors.concat(backLeftLeg2.TriangleVertexColors);

    var backRightLeg1 = cylinder();
    backRightLeg1.scale(0.1, 0.5, 0.1);
    backRightLeg1.translate(0.32 + t_x, -0.5 + t_y, -0.32 + t_z);
    points = points.concat(backRightLeg1.TriangleVertices);
    colors = colors.concat(backRightLeg1.TriangleVertexColors);

    var backRightLeg2 = cylinder();
    backRightLeg2.scale(0.1, 0.3, 0.1);
    backRightLeg2.rotate(-45,[1,0,1])
    backRightLeg2.translate(0.39 + t_x, -0.12 + t_y, -0.35 + t_z);
    points = points.concat(backRightLeg2.TriangleVertices);
    colors = colors.concat(backRightLeg2.TriangleVertexColors);

    data.TriangleVertices = points;
    data.TriangleVertexColors = colors;

    return data;
}

function plantPot() {

    var data = {};

    var plantPotVertices = [
        [-0.3, -0.1, 0.0, 1.0],   //0
        [0.0, -0.1, 0.0, 1.0],    //1
        [-0.3, -0.3, 0.0, 1.0],  //2
        [0.0, -0.3, 0.0, 1.0],   //3
        /*
        [-0.29, -0.331623, 0.0, 1.0], //4
        [-0.28, -0.344721, 0.0, 1.0], //5
        [-0.27, -0.354772, 0.0, 1.0], //6
        [-0.26, -0.363246, 0.0, 1.0], //7
        [-0.25, -0.370711, 0.0, 1.0], //8
        [-0.24, -0.37746, 0.0, 1.0],  //9
        [-0.23, -0.383666, 0.0, 1.0], //10
        [-0.22, -0.389443, 0.0, 1.0], //11
        [-0.21, -0.394868, 0.0, 1.0], //12
        [-0.2, -0.4, 0.0, 1.0],        //13

        [0.0, -0.4, 0.0, 1.0],         //14
        [0.2, -0.4, 0.0, 1.0],          //15

        [0.21, -0.394868, 0.0, 1.0],  //16
        [0.22, -0.389443, 0.0, 1.0],  //17
        [0.23, -0.383666, 0.0, 1.0],  //18
        [0.24, -0.37746, 0.0, 1.0],   //19
        [0.25, -0.370711, 0.0, 1.0],  //20
        [0.26, -0.363246, 0.0, 1.0],  //21
        [0.27, -0.354772, 0.0, 1.0],  //22
        [0.28, -0.344721, 0.0, 1.0],  //23
        [0.29, -0.331623, 0.0, 1.0],  //24
        [0.3, -0.3, 0.0, 1.0],        //25

        [0.3, -0.1, 0.0, 1.0],        //26
         */
    ];

    for(i = -0.29; i < -0.19; i += 0.01) {
        var y = -1 * Math.sqrt(0.1 * i + 0.03) - 0.3;
        plantPotVertices.push([i, y, 0.0, 1.0]);
    } //4-13

    plantPotVertices.push([0.0, -0.4, 0.0, 1.0]); //14
    plantPotVertices.push([0.2, -0.4, 0.0, 1.0]); //15

    // use square root function to form rounded sides
    for(i = 0.21; i < 0.3; i += 0.01) {
        var y2 = -1 * Math.sqrt(-1 * 0.1 * i + 0.03) - 0.3;
        plantPotVertices.push([i, y2, 0.0, 1.0]);
    } //16-24

    plantPotVertices.push([0.3, -0.3, 0.0, 1.0]); //25

    plantPotVertices.push([0.3, -0.1, 0.0, 1.0]); //26

    //back of pot
    plantPotVertices.push([-0.3, -0.1, -0.1, 1.0]); //27
    plantPotVertices.push([0.0, -0.1, -0.1, 1.0]);  //28
    plantPotVertices.push([-0.3, -0.3, -0.1, 1.0]); //29
    plantPotVertices.push([0.0, -0.3, -0.1, 1.0]);  //30

    // use square root function to form rounded sides
    for(i = -0.29; i < -0.19; i += 0.01) {
        var y3 = -1 * Math.sqrt(0.1 * i + 0.03) - 0.3;
        plantPotVertices.push([i, y3, -0.1, 1.0]);
    } //31-40

    plantPotVertices.push([0.0, -0.4, -0.1, 1.0]); //41
    plantPotVertices.push([0.2, -0.4, -0.1, 1.0]); //42

    for(i = 0.21; i < 0.3; i += 0.01) {
        var y4 = -1 * Math.sqrt(-1 * 0.1 * i + 0.03) - 0.3;
        plantPotVertices.push([i, y4, -0.1, 1.0]);
    } //43-51

    plantPotVertices.push([0.3, -0.3, -0.1, 1.0]); //52

    plantPotVertices.push([0.3, -0.1, -0.1, 1.0]); //53

    var plantPotVertexColors = [
        /*
                [ 1.0, 0.0, 0.0, 1.0 ],  // red
                [ 1.0, 1.0, 0.0, 1.0 ],  // yellow
                [ 0.0, 1.0, 0.0, 1.0 ],  // green
                [ 0.0, 0.0, 1.0, 1.0 ],  // blue
                [ 1.0, 0.0, 1.0, 1.0 ],  // magenta
                [ 0.0, 1.0, 1.0, 1.0 ],  // cyan
                */
        [ 0.3, 0.2, 0.0, 1.0 ],
        [ 0.35, 0.2, 0.0, 1.0 ],
        [ 0.3, 0.15, 0.0, 1.0 ],
        [ 0.4, 0.25, 0.0, 1.0 ],
        [ 0.38, 0.2, 0.0, 1.0 ],
        [ 0.4, 0.4, 0.4, 1.0 ],
        [ 0.0, 0.0, 0.0, 1.0 ] //brown
    ];

    var plantPotElements = [
        // front of plant pot
        //left side
        0, 1, 2,
        1, 2, 3,

        2, 3, 4,
        3, 4, 5,
        3, 5, 6,
        3, 6, 7,
        3, 7, 8,
        3, 8, 9,
        3, 9, 10,
        3, 10, 11,
        3, 11, 12,
        3, 12, 13,

        3, 13, 14,

        //right side
        3, 14, 15,

        3, 15, 16,
        3, 16, 17,
        3, 17, 18,
        3, 18, 19,
        3, 19, 20,
        3, 20, 21,
        3, 21, 22,
        3, 22, 23,
        3, 23, 24,
        3, 24, 25,

        3, 25, 1,
        25, 1, 26,

        //back of pot
        27, 28, 29,
        28, 29, 30,

        29, 30, 31,
        30, 31, 32,
        30, 32, 33,
        30, 33, 34,
        30, 34, 35,
        30, 35, 36,
        30, 36, 37,
        30, 37, 38,
        30, 38, 39,
        30, 39, 40,

        30, 40, 41,

        30, 41, 42,

        30, 42, 43,
        30, 43, 44,
        30, 44, 45,
        30, 45, 46,
        30, 46, 47,
        30, 47, 48,
        30, 48, 49,
        30, 49, 50,
        30, 50, 51,
        30, 51, 52,

        30, 52, 28,
        52, 28, 53,

        // right side of pot
        53, 26, 52,
        26, 25, 52,

        52, 25, 51,
        25, 51, 24,
        51, 24, 50,
        24, 50, 23,
        50, 23, 49,
        23, 49, 22,
        49, 22, 48,
        22, 48, 21,
        48, 21, 47,
        21, 47, 20,
        47, 20, 46,
        20, 46, 19,
        46, 19, 45,
        19, 45, 18,
        45, 18, 44,
        18, 44, 17,
        44, 17, 43,
        17, 43, 16,
        43, 16, 42,
        16, 42, 15,
        42, 15, 41,
        15, 41, 14, //
        41, 14, 40,
        14, 40, 13,
        40, 13, 39,
        13, 39, 12,
        39, 12, 38,
        12, 38, 11,
        38, 11, 37,
        11, 37, 10,
        37, 10, 36,
        10, 36, 9,
        36, 9, 35,
        9, 35, 8,
        35, 8, 34,
        8, 34, 7,
        34, 7, 33,
        7, 33, 6,
        33, 6, 32,
        6, 32, 5,
        32, 5, 31,
        5, 31, 4,

        2, 29, 4,
        29,4, 31,

        0, 27, 2,
        27, 2, 29
    ];

    var plantPotTriangleVertices = [];
    var plantPotTriangleVertexColors = [];

    for(var i = 0; i < plantPotElements.length; i++) {
        plantPotTriangleVertices.push(plantPotVertices[plantPotElements[i]]);
        if(plantPotElements[i] >= plantPotVertexColors.length ) {
            var a = i % 6;
            plantPotTriangleVertexColors.push(plantPotVertexColors[plantPotElements[a]]);
        }
        else {plantPotTriangleVertexColors.push(plantPotVertexColors[plantPotElements[i]])};

    }

    function translate(x, y, z) {
        for(i = 0; i < plantPotVertices.length; i++) {
            plantPotVertices[i][0] += x;
            plantPotVertices[i][1] += y;
            plantPotVertices[i][2] += z;
        }
    }

    data.VertexColors = plantPotVertexColors;
    data.Vertices = plantPotVertices;
    data.Elements = plantPotElements;
    data.TriangleVertices = plantPotTriangleVertices;
    data.TriangleVertexColors = plantPotTriangleVertexColors;
    data.translate = translate;

    return data;
}

function rug(txin, tyin, tzin) {
    var data = {};

    var t_x = 0;
    if(txin) t_x = txin;
    var t_y = 0;
    if(tyin) t_y = tyin;
    var t_z = 0;
    if(tzin) t_z = tzin;

    var colors = [];
    var points = [];

    var theRug = cube();
    theRug.scale(6.0, 0.1, 10.0);
    theRug.translate(0.5 + t_x, -0.1 + t_y, -4.5 + t_z);
    colors = theRug.TriangleVertexColors;
    points = theRug.TriangleVertices;

    data.TriangleVertices = points;
    data.TriangleVertexColors = colors;

    return data;

}
//end kayla's addition

// begin ethan's addition
function theTree(sxin, syin, szin, txin, tyin, tzin) {

    var data =  {};

    var s_x = 1;
    if(sxin) s_x = sxin;
    var s_y = 1;
    if(syin) s_y = syin;
    var s_z = 1;
    if(szin) s_z = szin;

    var t_x = 0;
    if(txin) t_x = txin;
    var t_y = 0;
    if(tyin) t_y = tyin;
    var t_z = 0;
    if(tzin) t_z = tzin;

    var colors = [];
    var points = [];

    var thePot = cylinder(60,10,false);
    thePot.scale(.3 * s_x,.25 * s_y,.3 * s_z);
    thePot.translate(0.0 + t_x,-.5 + t_y,0.0 + t_z);
    colors = thePot.TriangleVertexColors;
    points = thePot.TriangleVertices;

    var mainBranch1 = cylinder(7, 4, true);
    mainBranch1.scale(.03 * s_x,.8 * s_y,.03 * s_z)
    mainBranch1.translate(0.0 + t_x,-.2 + t_y,0.0 + t_z)
    colors = colors.concat(mainBranch1.TriangleVertexColors);
    points = points.concat(mainBranch1.TriangleVertices);

    var lowerBranch2 = cylinder(5, 4, true);
    lowerBranch2.scale(.01 * s_x,.01 * s_y,.3 * s_z);
    lowerBranch2.rotate(130, [0,1,1]);
    lowerBranch2.translate(.06 + t_x,-.1 + t_y,.02 + t_z);
    colors = colors.concat(lowerBranch2.TriangleVertexColors);
    points = points.concat(lowerBranch2.TriangleVertices);

    var lowerBranch3 = cylinder(5, 4, true);
    lowerBranch3.scale(.01 * s_x,.01 * s_y,.3 * s_z);
    lowerBranch3.rotate(90, [0,1,0]);
    lowerBranch3.rotate(-40, [0,0,1]);
    lowerBranch3.translate(-.1 + t_x,0.01 + t_y,.0 + t_z);
    colors = colors.concat(lowerBranch3.TriangleVertexColors);
    points = points.concat(lowerBranch3.TriangleVertices);

    var lowerBranch4 = cylinder(5, 4, true);
    lowerBranch4.scale(.01 * s_x,.01 * s_y,.3 * s_z);
    lowerBranch4.rotate(45, [0,1,0])
    lowerBranch4.rotate(55, [0,0,1])
    lowerBranch4.translate(0.05 + t_x,.07 + t_y,.1 + t_z);
    colors = colors.concat(lowerBranch4.TriangleVertexColors);
    points = points.concat(lowerBranch4.TriangleVertices);

    var lowerBranch5 = cylinder(5, 4, true);
    lowerBranch5.scale(.01 * s_x,.01 * s_y,.3 * s_z);
    lowerBranch5.rotate(135, [0,1,0]);
    lowerBranch5.rotate(35, [0,0,1]);
    lowerBranch5.translate(.08 + t_x,.01 + t_y,-.08 + t_z);
    colors = colors.concat(lowerBranch5.TriangleVertexColors);
    points = points.concat(lowerBranch5.TriangleVertices);

    var lowerBranch6 = cylinder(5, 4, true);
    lowerBranch6.scale(.01 * s_x,.01 * s_y,.3 * s_z);
    lowerBranch6.rotate(-35, [0,1,0]);
    lowerBranch6.rotate(-75,[0,0,1]);
    lowerBranch6.translate(-.01 + t_x,-.08 + t_y,.09 + t_z);
    colors = colors.concat(lowerBranch6.TriangleVertexColors);
    points = points.concat(lowerBranch6.TriangleVertices)

    var lowerBranch7 = cylinder(5, 4, true);
    lowerBranch7.scale(.01 * s_x,.01 * s_y,.3 * s_z);
    lowerBranch7.rotate(-50, [0,1,0]);
    lowerBranch7.rotate(-33,[0,0,1]);
    lowerBranch7.translate(-.08 + t_x,.12 + t_y,.09 + t_z);
    colors = colors.concat(lowerBranch7.TriangleVertexColors);
    points = points.concat(lowerBranch7.TriangleVertices)

    var lowerBranch8 = cylinder(5, 4, true);
    lowerBranch8.scale(.01 * s_x,.01 * s_y,.3 * s_z);
    lowerBranch8.rotate(60, [0,1,0]);
    lowerBranch8.rotate(-40, [0,0,1]);
    lowerBranch8.translate(-.1 + t_x,0.2 + t_y,-.07 + t_z);
    colors = colors.concat(lowerBranch8.TriangleVertexColors);
    points = points.concat(lowerBranch8.TriangleVertices);

    var lowerBranch9 = cylinder(5, 4, true);
    lowerBranch9.scale(.01 * s_x,.01 * s_y,.3 * s_z);
    lowerBranch9.rotate(115, [0,1,0]);
    lowerBranch9.rotate(45,[0,0,1]);
    lowerBranch9.translate(.08 + t_x,.16 + t_y,-.06 + t_z);
    colors = colors.concat(lowerBranch9.TriangleVertexColors);
    points = points.concat(lowerBranch9.TriangleVertices);

    var lowerBranch10 = cylinder(5, 4, true);
    lowerBranch10.scale(.01 * s_x,.01 * s_y,.3 * s_z);
    lowerBranch10.rotate(170, [0,1,0]);
    lowerBranch10.rotate(45,[0,0,1]);
    lowerBranch10.translate(.01 + t_x,-0.08 + t_y,-.11 + t_z);
    colors = colors.concat(lowerBranch10.TriangleVertexColors);
    points = points.concat(lowerBranch10.TriangleVertices);

    var lowerBranch11 = cylinder(5, 4, true);
    lowerBranch11.scale(.01 * s_x,.01 * s_y,.3 * s_z);
    lowerBranch11.rotate(140, [0,1,0]);
    lowerBranch11.rotate(60,[0,0,1]);
    lowerBranch11.translate(.04 + t_x,.2 + t_y,-.11 + t_z);
    colors = colors.concat(lowerBranch11.TriangleVertexColors);
    points = points.concat(lowerBranch11.TriangleVertices);

    var lowerBranch12 = cylinder(5, 4, true);
    lowerBranch12.scale(.01 * s_x,.01 * s_y,.3 * s_z);
    lowerBranch12.rotate(90, [0,1,0]);
    lowerBranch12.rotate(-40, [0,0,1]);
    lowerBranch12.translate(-.1 + t_x,.23 + t_y,.0 + t_z);
    colors = colors.concat(lowerBranch12.TriangleVertexColors);
    points = points.concat(lowerBranch12.TriangleVertices);

    var lowerBranch13 = cylinder(5, 4, true);
    lowerBranch13.scale(.01 * s_x,.01 * s_y,.3 * s_z);
    lowerBranch13.rotate(60, [0,1,0]);
    lowerBranch13.rotate(-40, [0,0,1]);
    lowerBranch13.translate(-.1 + t_x,0.05 + t_y,-.07 + t_z);
    colors = colors.concat(lowerBranch13.TriangleVertexColors);
    points = points.concat(lowerBranch13.TriangleVertices);

    var lowerBranch14 = cylinder(5, 4, true);
    lowerBranch14.scale(.01 * s_x,.01 * s_y,.3 * s_z);
    lowerBranch14.rotate(45, [0,1,0])
    lowerBranch14.rotate(55, [0,0,1])
    lowerBranch14.translate(0.05 + t_x,.23 + t_y,.1 + t_z);
    colors = colors.concat(lowerBranch14.TriangleVertexColors);
    points = points.concat(lowerBranch14.TriangleVertices);

    var topBranch1 = cylinder(5, 4, true);
    topBranch1.scale(.01 * s_x,.01 * s_y,.3 * s_z);
    topBranch1.rotate(65, [0,1,0])
    topBranch1.rotate(90, [0,0,1])
    topBranch1.translate(0.0 + t_x,.29 + t_y,.06 + t_z);
    colors = colors.concat(topBranch1.TriangleVertexColors);
    points = points.concat(topBranch1.TriangleVertices);

    var topBranch2 = cylinder(5, 4, true);
    topBranch2.scale(.01 * s_x,.01 * s_y,.3 * s_z);
    topBranch2.rotate(120, [0,1,0])
    topBranch2.rotate(90, [0,0,1])
    topBranch2.translate(0.0 + t_x,.29 + t_y,-.06 + t_z);
    colors = colors.concat(topBranch2.TriangleVertexColors);
    points = points.concat(topBranch2.TriangleVertices);

    var topBranch3 = cylinder(5, 4, true);
    topBranch3.scale(.01 * s_x,.01 * s_y,.3 * s_z);
    topBranch3.rotate(140, [0,1,1])
    topBranch3.translate(0.05 + t_x,.29 + t_y,.01 + t_z);
    colors = colors.concat(topBranch3.TriangleVertexColors);
    points = points.concat(topBranch3.TriangleVertices);

    var topBranch4 = cylinder(5, 4, true);
    topBranch4.scale(.01 * s_x,.01 * s_y,.3 * s_z);
    topBranch4.rotate(-140, [0,1,1])
    topBranch4.translate(-0.05 + t_x,.29 + t_y,.01 + t_z);
    colors = colors.concat(topBranch4.TriangleVertexColors);
    points = points.concat(topBranch4.TriangleVertices)

    data.TriangleVertices = points;
    data.TriangleVertexColors = colors;

    return data;
}

function theSphereCrap(sxin, syin, szin, txin, tyin, tzin) {
    var data =  {};

    var s_x = 1;
    if(sxin) s_x = sxin;
    var s_y = 1;
    if(syin) s_y = syin;
    var s_z = 1;
    if(szin) s_z = szin;

    var t_x = 0;
    if(txin) t_x = txin;
    var t_y = 0;
    if(tyin) t_y = tyin;
    var t_z = 0;
    if(tzin) t_z = tzin;

    var colors = [];
    var points = [];


    var mediumSphere = sphere(5);
    mediumSphere.scale(.095 * s_x, .095 * s_y, .095 * s_z);
    mediumSphere.translate(-.5 + t_x,0.0 + t_y,0.0 + t_z);


    var mirror = sphere(5);
    mirror.scale(.05 * s_x,.05 * s_y,.001 * s_z);
    mirror.translate(-.5 + t_x,0.0 + t_y,0.1 + t_z);

    var smallSphere = sphere(5);
    smallSphere.scale(.078 * s_x,.078 * s_y,.078 * s_z);
    smallSphere.translate(-.33 + t_x,-.1 + t_y,0.0 + t_z);

    var largeSphere = sphere(5);
    largeSphere.scale(.1 * s_x, .1 * s_y, .1 * s_z);
    largeSphere.translate(-.35 + t_x,0.15 + t_y,0.0 + t_z);

    var smallSphere1 = sphere(5);
    smallSphere1.scale(.078 * s_x,.078 * s_y,.078 * s_z);
    smallSphere1.translate(-.18 + t_x,.25 + t_y,0.0 + t_z);

    var mediumSphere2 = sphere(5);
    mediumSphere2.scale(.095 * s_x, .095 * s_y, .095 * s_z);
    mediumSphere2.translate(-.19 + t_x,0.02 + t_y,0.0 + t_z);

    var mirror2 = sphere(5);
    mirror2.scale(.05 * s_x,.05 * s_y,.001 * s_z);
    mirror2.translate(-.19 + t_x,0.02 + t_y,0.1 + t_z);

    var mediumSphere3 = sphere(5);
    mediumSphere3.scale(.095 * s_x, .095 * s_y, .095 * s_z);
    mediumSphere3.translate(-.02 + t_x,0.13 + t_y,0.0 + t_z);

    var mirror3 = sphere(5);
    mirror3.scale(.05 * s_x,.05 * s_y,.001 * s_z);
    mirror3.translate(-.02 + t_x,0.13 + t_y,0.1 + t_z);

    var smallSphere2 = sphere(5);
    smallSphere2.scale(.078 * s_x,.078 * s_y,.078 * s_z);
    smallSphere2.translate(-.03 + t_x,-.09 + t_y,0.0 + t_z);

    var largeSphere2 = sphere(5);
    largeSphere2.scale(.1 * s_x, .1 * s_y, .1 * s_z);
    largeSphere2.translate(.18 + t_x,0.04 + t_y,0.0 + t_z);

    var largeSphere3 = sphere(5);
    largeSphere3.scale(.1 * s_x, .1 * s_y, .1 * s_z);
    largeSphere3.translate(.15 + t_x,-.17 + t_y,0.0 + t_z);

    var mediumSphere4 = sphere(5);
    mediumSphere4.scale(.095 * s_x, .095 * s_y, .095 * s_z);
    mediumSphere4.translate(.35 + t_x,-.09 + t_y,0.0 + t_z);


    var mirror4 = sphere(5);
    mirror4.scale(.05 * s_x,.05 * s_y,.001 * s_z);
    mirror4.translate(.35 + t_x,-.09 + t_y,0.1 + t_z);

    var smallSphere3 = sphere(5);
    smallSphere3.scale(.078 * s_x,.078 * s_y,.078 * s_z);
    smallSphere3.translate(.29 + t_x,.21 + t_y,0.0 + t_z);

    var smallSphere4 = sphere(5);
    smallSphere4.scale(.078 * s_x,.078 * s_y,.078 * s_z);
    smallSphere4.translate(.42 + t_x,.09 + t_y,0.0 + t_z);

    var smallSphere5 = sphere(5);
    smallSphere5.scale(.078,.078,.078);
    smallSphere5.translate(.54 + t_x,-.06 + t_y,0.0 + t_z);





    colors = mediumSphere.TriangleVertexColors;
    points = mediumSphere.TriangleVertices;

    colors = colors.concat(mirror.TriangleVertexColors);
    points = points.concat(mirror.TriangleVertices);

    //myMaterial = goldMaterial();

    colors = colors.concat(smallSphere.TriangleVertexColors);
    points = points.concat(smallSphere.TriangleVertices);

    colors = colors.concat(largeSphere.TriangleVertexColors);
    points = points.concat(largeSphere.TriangleVertices);

    colors = colors.concat(smallSphere1.TriangleVertexColors);
    points = points.concat(smallSphere1.TriangleVertices);

    colors = colors.concat(mediumSphere2.TriangleVertexColors);
    points = points.concat(mediumSphere2.TriangleVertices);

    // The mirror in the middle of the spheres
    colors = colors.concat(mirror2.TriangleVertexColors);
    points = points.concat(mirror2.TriangleVertices);

    colors = colors.concat(mediumSphere3.TriangleVertexColors);
    points = points.concat(mediumSphere3.TriangleVertices);

    // The mirror in the middle of the spheres
    colors = colors.concat(mirror3.TriangleVertexColors);
    points = points.concat(mirror3.TriangleVertices);

    colors = colors.concat(smallSphere2.TriangleVertexColors);
    points = points.concat(smallSphere2.TriangleVertices);

    colors = colors.concat(largeSphere2.TriangleVertexColors);
    points = points.concat(largeSphere2.TriangleVertices);

    colors = colors.concat(largeSphere3.TriangleVertexColors);
    points = points.concat(largeSphere3.TriangleVertices);

    colors = colors.concat(mediumSphere4.TriangleVertexColors);
    points = points.concat(mediumSphere4.TriangleVertices);

    // The mirror in the middle of the spheres
    colors = colors.concat(mirror4.TriangleVertexColors);
    points = points.concat(mirror4.TriangleVertices);

    colors = colors.concat(smallSphere3.TriangleVertexColors);
    points = points.concat(smallSphere3.TriangleVertices);

    colors = colors.concat(smallSphere4.TriangleVertexColors);
    points = points.concat(smallSphere4.TriangleVertices);

    colors = colors.concat(smallSphere5.TriangleVertexColors);
    points = points.concat(smallSphere5.TriangleVertices);


    data.TriangleVertices = points;
    data.TriangleVertexColors = colors;
    //data.translateTable = translateTable;

    return data;

}
// end ethan's addtion

// begin kara's addtion
var pointsArray = [];
var colorsArray = [];

function couch(   t_x, t_y, t_z){
    var base = cube(1);
    base.scale(1,.5,.5);
    base.rotate(90, [0,1,0]);
    base.translate(0+t_x,-0.3+t_y,0+t_z)

    var base1 = cube(1);
    base1.scale(1,.5,.5);
    base1.rotate(90, [0,1,0]);
    base1.translate(0+t_x,-0.3+t_y,1+t_z)

    var top0 = cube(1);
    top0.scale(.99, .35, .2);
    top0.rotate(90, [0,1,0]);
    top0.translate(0.14+t_x,0.1+t_y, 0.0+t_z );

    var top1 = cube(1);
    top1.scale(.99, .35, .2);
    top1.rotate(90, [0,1,0]);
    top1.translate(0.14+t_x,0.1+t_y, 1.0+t_z )

    var side1 = cube(.5);
    side1.scale(.5, .8, .2);
    side1.rotate(90, [1,0,0]);
    side1.rotate(90, [0,1,0]);
    side1.translate(-0.1+t_x, 0+t_y, -0.2+t_z);

    var side2 = cube(.5);
    side2.scale(.5, .8, .2);
    side2.rotate(90, [1,0,0]);
    side2.rotate(90, [0,1,0]);
    side2.translate(-0.1+t_x, 0+t_y, 1.6+t_z)


    colorsArray = base.TriangleVertexColors;
    pointsArray = base.TriangleVertices;
    colorsArray = colorsArray.concat(base1.TriangleVertexColors);
    pointsArray = pointsArray.concat(base1.TriangleVertices);
    colorsArray = colorsArray.concat(top0.ColorBlue);
    pointsArray = pointsArray.concat(top0.TriangleVertices);
    colorsArray = colorsArray.concat(top1.ColorBlue);
    pointsArray = pointsArray.concat(top1.TriangleVertices);
    colorsArray = colorsArray.concat(side1.TriangleVertexColors);
    pointsArray = pointsArray.concat(side1.TriangleVertices);
    colorsArray = colorsArray.concat(side2.TriangleVertexColors);
    pointsArray = pointsArray.concat(side2.TriangleVertices);

    return [pointsArray, colorsArray];
}

function couch2( t_x, t_y, t_z){
    //scale, rotate, translate

    var secbase = cube(1);
    secbase.scale(1,.5,.5);
    secbase.rotate(180, [0,1,0]);
    secbase.translate(-.6+t_x,0+t_y,0+t_z);

    var secbase1 = cube(1);
    secbase1.scale(1,.5,.5);
    secbase1.rotate(180, [0,1,0]);
    secbase1.translate(0.4+t_x,0+t_y,0+t_z);

    var sectop = cube(1);
    sectop.scale(.99, .35, .2);
    sectop.rotate(180, [0,1,0]);
    sectop.translate(-0.6+t_x,.4+t_y, -0.1+t_z );

    var sectop1 = cube(1);
    sectop1.scale(.99, .35, .2);
    sectop1.rotate(180, [0,1,0]);
    sectop1.translate(0.4+t_x,.4+t_y, -0.1+t_z );

    var secside1 = cube(.5);
    secside1.scale(.5, .8, .2);
    secside1.rotate(90, [1,0,0]);
    secside1.rotate(180, [0,1,0]);
    secside1.translate(.85+t_x, .3+t_y, -0.1+t_z);

    var secside2 = cube(.5);
    secside2.scale(.5, .8, .2);
    secside2.rotate(90, [1,0,0]);
    secside2.rotate(180, [0,1,0]);
    secside2.translate(-1.05+t_x, .3+t_y, -0.1+t_z);

    var pillow = cube(.3)
    pillow.scale(.8, .8, .2);
    pillow.translate(.6+t_x, .37+t_y, t_z)

    var pillow2 = cube(.3)
    pillow2.scale(.8, .8, .2);
    pillow2.translate(-.8+t_x, .37+t_y, t_z);


    colorsArray = colorsArray.concat(secbase.TriangleVertexColors);
    pointsArray = pointsArray.concat(secbase.TriangleVertices);
    colorsArray = colorsArray.concat(secbase1.TriangleVertexColors);
    pointsArray = pointsArray.concat(secbase1.TriangleVertices);
    colorsArray = colorsArray.concat(sectop.TriangleVertexColors);
    pointsArray = pointsArray.concat(sectop.TriangleVertices);
    colorsArray = colorsArray.concat(sectop1.TriangleVertexColors);
    pointsArray = pointsArray.concat(sectop1.TriangleVertices);
    colorsArray = colorsArray.concat(secside1.TriangleVertexColors);
    pointsArray = pointsArray.concat(secside1.TriangleVertices);
    colorsArray = colorsArray.concat(secside2.TriangleVertexColors);
    pointsArray = pointsArray.concat(secside2.TriangleVertices);
    colorsArray = colorsArray.concat(pillow.ColorYellow);
    pointsArray = pointsArray.concat(pillow.TriangleVertices);
    colorsArray = colorsArray.concat(pillow2.ColorYellow);
    pointsArray = pointsArray.concat(pillow2.TriangleVertices);


    return [pointsArray, colorsArray];
}



function blinds (  t_x, t_y, t_z){
    var blind = cube(.2);
    for (var i=0; i<15; i++){
        blind = cube(.2);
        blind.scale(2, .3, .1);
        blind.rotate(180, [0, 1, 0]);
        blind.translate(-1.3+t_x, (i/16)+t_y, -.1+t_z)

        colorsArray = colorsArray.concat(blind.ColorWhite);
        pointsArray = pointsArray.concat(blind.TriangleVertices);
    }

    for ( i=0; i<15; i++){
        blind = cube(.2);
        blind.scale(2, .3, .1);
        blind.rotate(180, [0, 1, 0]);
        blind.translate(1.1+t_x, (i/16)+t_y, -.1+t_z)

        colorsArray = colorsArray.concat(blind.ColorWhite);
        pointsArray = pointsArray.concat(blind.TriangleVertices);
    }

    return [pointsArray, colorsArray];
}
// end kara's addition

