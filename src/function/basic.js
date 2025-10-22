// to calculate the vh minus the header with responsive design in mind
//use JS to grab the height of the header in its current (responsive) state
// pass the value into a css custom property for styling use
const mainHeader = document.getElementById('mainHeader');

function updateSize() {
    const headHeight = mainHeader.offsetHeight;

        document.body.style.setProperty('--js-head-height', `${headHeight}px`);
    
        
    console.log(`updated --js-head-height to: ${headHeight}px`);
}

window.addEventListener('resize', updateSize);
window.onload = updateSize; 

