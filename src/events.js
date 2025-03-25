function initEvents(){

    let mousedown = false;

    let saveButton = document.querySelector("#save");
    saveButton.addEventListener('click', (e)=>{
        e.preventDefault();
        capture = true;
    });


    let reader = new FileReader();
    reader.onload = function(e) {
        img.src = e.target.result;
        img.onload = function() {
            imageLoaded = true;
        };
    };

    let inputFile = document.querySelector("#inputFile");
    inputFile.addEventListener('change', (e)=>{
        e.preventDefault();
        let file = e.target.files[0];
        reader.readAsDataURL(file);
    });

    let cs = document.querySelector("#crayonSize");
    cs.addEventListener('change', (e) => {
        e.preventDefault();
        crayonSize = cs.value;
    });

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
