// || scroll to top button 

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


// || Nav Menu open/close button

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

// || header text shrink on scroll //
window.addEventListener('scroll', () => {
    document.querySelector('pageTitle').style.fontsize=((document.body.scrollTop *.05)+14)+'px';
})

// || next one below //

