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


// Nav Menu open/close button

const primaryNav = document.querySelector('#mainNav');
const navToggle = document.querySelector('.mobileNavToggle');

navToggle.addEventListener('click', () => {
    const visibility = primaryNav.getAttribute('data-visible');
        if (visibility === 'false') {
            primaryNav.setAttribute('data-visible', 'true');
            navToggle.setAttribute('aria-expanded', 'true');
        } else if (visibility === 'true') {
            primaryNav.setAttribute('data-visible', 'false');
            navToggle.setAttribute('aria-expanded', 'false');
        }

    console.log(visibility);
});



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

