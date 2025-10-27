// scroll to top button 

let topButton = document.getElementById("toTop");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
        topButton.style.display = "block";
    } else {
        topButton.style.display = "none";
    }
}

function scrollTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

}

topButton.addEventListener('click', scrollTop)





// to calculate the vh minus the header with responsive design in mind
const mainHeader = document.getElementById('mainHeader');

function updateSize() {
    const headHeight = mainHeader.offsetHeight;

        document.body.style.setProperty('--js-head-height', `${headHeight}px`);
    
        
    console.log(`updated --js-head-height to: ${headHeight}px`);
}

window.addEventListener('resize', updateSize);
window.onload = updateSize; 

// next one below //

