function initEvents(){

    let mousedown = false;

    canvas.addEventListener('mousedown',
        (event) => {
            event.preventDefault();
            mousedown = true;
            cursorX = event.clientX;
            cursorY = event.clientY;
            element = parseInt(document.querySelector('select').value);
        }
    );

    canvas.addEventListener('mousemove',
        (event) => {
            event.preventDefault();
            if(mousedown){
                cursorX = event.clientX;
                cursorY = event.clientY;
            }
        }
    );

    canvas.addEventListener('mouseup',
        (event) => {
            event.preventDefault();
            element = -1;
            mousedown = false;
        }
    );

    canvas.addEventListener('touchstart',
        (event) => {
            event.preventDefault();
            let touch = event.touches[0];
            cursorX = touch.clientX;
            cursorY = touch.clientY;
            element = parseInt(document.querySelector('select').value);
        }
    );

    canvas.addEventListener('touchend',
        (event) => {
            event.preventDefault();
            element = -1;
        }
    );


    canvas.addEventListener('touchmove',
        (event) => {
            event.preventDefault();
            let touch = event.touches[0];
            cursorX = touch.clientX;
            cursorY = touch.clientY;
        }
    );

}
