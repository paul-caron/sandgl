function initEvents(){

    let select =  document.querySelector('select');
    select.addEventListener('change', (e)=>{
        element = parseInt(select.value);
    });


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
