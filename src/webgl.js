async function initWebGL(){

    canvas = document.getElementById('webglCanvas');
    gl = canvas.getContext('webgl');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    if (!gl) {
        console.error("WebGL not supported");
        throw "No WebGL context";
    }

    // Vertex shader program
    const vsfetch = await fetch("src/framebufferVertexShader");
    const vertexShaderSource = await vsfetch.text();

    // Fragment shader program
    const fsfetch = await fetch("src/framebufferFragmentShader");
    const fragmentShaderSource = await fsfetch.text();

    // Vertex shader program
    const vsfetch2 = await fetch("src/sandVertexShader");
    const vertexShaderSource2 = await vsfetch2.text();

    // Fragment shader program
    const fsfetch2 = await fetch("src/sandFragmentShader");
    const fragmentShaderSource2 = await fsfetch2.text();

    // Shader compilation and linking utility functions
    function compileShader(source, type) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error("ERROR compiling shader: " + gl.getShaderInfoLog(shader));
        }
        return shader;
    }

    function createProgram(vertexShader, fragmentShader) {
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error("ERROR linking program: " + gl.getProgramInfoLog(program));
        }
        return program;
    }

    // Create shaders and programs
    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
    program = createProgram(vertexShader, fragmentShader);

    // Create shaders and programs
    const vertexShader2 = compileShader(vertexShaderSource2, gl.VERTEX_SHADER);
    const fragmentShader2 = compileShader(fragmentShaderSource2, gl.FRAGMENT_SHADER);
    program2 = createProgram(vertexShader2, fragmentShader2);

    // Get locations of the attributes and uniforms
    program.positionLocation = gl.getAttribLocation(program, "a_position");
    program.texCoordLocation = gl.getAttribLocation(program, "a_texCoord");
    program.textureLocation = gl.getUniformLocation(program, "u_texture");

    // Get locations of the attributes and uniforms
    program2.positionLocation = gl.getAttribLocation(program, "a_position");
    program2.texCoordLocation = gl.getAttribLocation(program, "a_texCoord");
    program2.textureLocation = gl.getUniformLocation(program, "u_texture");

    // Create buffer and load data
    program.positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, program.positionBuffer);
    gl.vertexAttribPointer(program.positionLocation, 2, gl.FLOAT, false, 4 * 4, 0);
    gl.enableVertexAttribArray(program.positionLocation);
    gl.vertexAttribPointer(program.texCoordLocation, 2, gl.FLOAT, false, 4 * 4, 2 * 4);
    gl.enableVertexAttribArray(program.texCoordLocation);

    // WebGL Rendering Settings
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(1.0, 0.0, 0.0, 1.0);

}
