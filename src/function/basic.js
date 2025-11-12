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

// EVENT SUBMISSION FORMS 

        const selector = document.getElementById('event-type');
        
        // References to the individual form containers
        const placeholder = document.getElementById('placeholder-form');

        const skateFestival = document.getElementById('festival-form');
        const skateNight = document.getElementById('night-form');
        const skateSocial = document.getElementById('social-form');
        const skateWorkshop = document.getElementById('workshop-form');
        const skateGeneral = document.getElementById('general-form');
        
        // event type array
        const allForms = [skateFestival, skateGeneral, skateNight, skateSocial, skateWorkshop];
        

        function toggleForms() {
            // value selected in the dropdown
            const selectedType = selector.value;
            
            // 1. Hide the placeholder initially
            placeholder.classList.add('hidden');

            // 2. Loop through all forms and hide them
            allForms.forEach(form => {
                form.classList.add('hidden');
            });

            // 3. Determine which form to show based on the selection
            let formToShow = null;
            if (selectedType === 'festival-form') {
                formToShow = skateFestival;
            } else if (selectedType === 'night-form') {
                formToShow = skateNight;
            } else if (selectedType === 'workshop-form') {
                formToShow = skateWorkshop;
            } else if (selectedType === 'social-form') {
                formToShow = skateSocial;
            } else if (selectedType === 'general-form') {
                formToShow = skateGeneral;
            } 
            else {
                // If 'none' or unhandled, show the placeholder again
                placeholder.classList.remove('hidden');
                return; // Exit the function
            }

            // 4. Show the selected form
            if (formToShow) {
                
                // First, reset opacity, then remove 'hidden'
                formToShow.style.opacity = 0;
                formToShow.classList.remove('hidden');
                
                setTimeout(() => {
                    formToShow.style.opacity = 1;
                }, 10); 
            }
        }
        
        // Event Listener: Call the function every time the dropdown selection changes
        window.onload = () => {
             selector.addEventListener('change', toggleForms);
        };
        
        // Execute once on load to ensure initial state is correct (only placeholder visible)
        // toggleForms(); // Removed initial call since placeholder is handled by default

// || next one below //

