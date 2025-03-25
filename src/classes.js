"use strict";

class Sand {
    constructor() {
        this.vertices = vertices;
        this.step = 0;
        this.texture = null;
    }
    stepReset(){
        this.step %= 2;
    }
    draw() {
        // SELECT PROGRAM
        gl.useProgram(program2);

        // UNIFORMS VARIABLES
        gl.uniform1f(program2.widthLocation, canvas.width);
        gl.uniform1f(program2.heightLocation, canvas.height);
        gl.uniform1i(program2.stepLocation, this.step++);
        gl.uniform2fv(program2.spawnLocation, new Float32Array([Math.floor(cursorX),Math.floor(canvas.height-cursorY)]));
        gl.uniform1i(program2.elementLocation, element);
        gl.uniform1i(program2.crayonSizeLocation, crayonSize);

        this.stepReset();

        // PREPARING THE VERTEX BUFFER
        gl.bindBuffer(gl.ARRAY_BUFFER, program2.positionBuffer);
        gl.vertexAttribPointer(program2.positionLocation, 2, gl.FLOAT, false, 4 * 4, 0);
        gl.enableVertexAttribArray(program2.positionLocation);
        gl.vertexAttribPointer(program2.texCoordLocation, 2, gl.FLOAT, false, 4 * 4, 2 * 4);
        gl.enableVertexAttribArray(program2.texCoordLocation);

        // PREPARING THE TEXTURE
/*        if(!this.texture){
        this.texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, canvas.width, canvas.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        }*/
        gl.bindTexture(gl.TEXTURE_2D, framebuffer2.framebuffer.texture);
        // copy texture from current binded framebuffer into current binded texture
//        gl.copyTexImage2D(gl.TEXTURE_2D,0,gl.RGBA,0,0,canvas.width,canvas.height,0);

        // DRAW
        gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);
        gl.drawArrays(gl.TRIANGLES, 0, 6);

        // DELETE TEXTURE (OTHERWISE THE GPU GETS ITS MEMORY FULL)
//        gl.deleteTexture(tex);
    }
};



class Framebuffer {
    constructor() {
        this.vertices = vertices;
        this.framebuffer = gl.createFramebuffer();
        this.framebuffer.texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.framebuffer.texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, canvas.width, canvas.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }
    resize(){
        this.framebuffer.texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.framebuffer.texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, canvas.width, canvas.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }
    bind(){
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.framebuffer.texture, 0);
    }
    unbind(){
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, null, 0);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }
    draw() {
        gl.useProgram(program);
        /////
        gl.bindBuffer(gl.ARRAY_BUFFER, program.positionBuffer);
        gl.vertexAttribPointer(program.positionLocation, 2, gl.FLOAT, false, 4 * 4, 0);
        gl.enableVertexAttribArray(program.positionLocation);
        gl.vertexAttribPointer(program.texCoordLocation, 2, gl.FLOAT, false, 4 * 4, 2 * 4);
        gl.enableVertexAttribArray(program.texCoordLocation);
        //////////
        gl.bindTexture(gl.TEXTURE_2D, this.framebuffer.texture);
        gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
    loadImg(){ // load image that contains a game saved state
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true); //png images are loaded Y axis inverted by default
        gl.bindTexture(gl.TEXTURE_2D, this.framebuffer.texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        canvas.width = img.width;
        canvas.height = img.height;
        gl.viewport(0, 0, canvas.width, canvas.height);
    }
};

