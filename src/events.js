function initEvents(){

    canvas.addEventListener('touchstart',
        (event) => {
            event.preventDefault();
            let touch = event.touches[0];
            cursorX = touch.clientX;
            cursorY = touch.clientY;
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
