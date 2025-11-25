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
        const placeholder = document.getElementById('placeholder-form');

        // References to the individual form containers
        const skateFestival = document.getElementById('festival-form');
        const skateNight = document.getElementById('night-form');
        const skateSocial = document.getElementById('social-form');
        const skateWorkshop = document.getElementById('workshop-form');
        const skateWeekend = document.getElementById('weekend-form');
        const skateGeneral = document.getElementById('general-form');
        
        // --- NEW MAPPING OBJECT SOLUTION ---
        // This object maps the dropdown's 'value' attribute directly to the HTML element.
        const formMap = {
            'festival-form': skateFestival,
            'night-form': skateNight,
            'social-form': skateSocial,
            'workshop-form': skateWorkshop,
            'weekend-form': skateWeekend,
            'general-form': skateGeneral,
        };

        // We can get the array of all forms from the map's values for easy iteration
        const allForms = Object.values(formMap);
            
        function toggleForms() {
            // value selected in the dropdown
            const selectedType = selector.value;
            
            // 1. Hide the placeholder initially
            placeholder.classList.add('hidden');

            // 2. Loop through all forms and hide them
            allForms.forEach(form => {
                if (form) { 
                    form.classList.add('hidden');
                }
            });

            // 3. Determine which form to show based on the selection
            // We use the mapping object for O(1) direct lookup, eliminating the IF/ELSE chain.
            let formToShow = formMap[selectedType];
            
            // Check if 'none' was selected (or an invalid type)
            if (!formToShow) { 
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
            if (selector) { 
                selector.addEventListener('change', toggleForms);
            }
        };


// DYNAMIC SECTION - DJS - SKATE NIGHT
        
const field = document.getElementById("dynamic-fields-container");
// const dynamic = document.getElementsByClassName("dynamic-field");  
const addButton = document.getElementById("add-field-button");

addButton.addEventListener('click', ()=>{

    const wrapper = document.createElement("div");
    wrapper.classList.add("span-full");
    wrapper.classList.add("dynamic-field");

    const newInput1 = document.createElement("input");
    newInput1.type="text";
    newInput1.classList.add("field-box");
    newInput1.classList.add("small-fit");
    newInput1.placeholder = "DJ name";

    const newInput2 = document.createElement("input");
    newInput2.type="text";
    newInput2.classList.add("field-box");
    newInput2.classList.add("small-fit");
    newInput2.placeholder = "Socials / URL";

    // const newInput3 = document.createElement("input");
    // newInput3.type="text";
    // newInput3.classList.add("field-box");
    // newInput3.placeholder = "tester space";

    const removeButton = document.createElement("button");
    removeButton.innerText = "X";
    removeButton.classList.add("remove-field-btn");

    wrapper.appendChild(newInput1);
    wrapper.appendChild(newInput2);
    // wrapper.appendChild(newInput3);
    wrapper.appendChild(removeButton);

    field.appendChild(wrapper);

    removeButton.addEventListener("click", ()=>{
        field.removeChild(wrapper);
    })

});
    
// Form submission

// Conceptual outline of the Astro API route logic
export async function POST({ request }) {
    // 1. Parse the request body (which is multipart/form-data)
    // This part requires a library or native Node.js feature depending on your Astro adapter.
    const formData = await request.formData(); 
    const file = formData.get('eventImage');
    const eventName = formData.get('eventName');

    // 2. Upload the file to Cloudinary
    // You would use the Cloudinary SDK here to upload the 'file' object.
    const uploadResult = await cloudinary.uploader.upload(file);
    const imageUrl = uploadResult.secure_url; // Get the resulting URL

    // 3. Write data to Google Sheet
    // Use a library like 'google-spreadsheet' to open your sheet 
    // and append a row with eventName and imageUrl.

    // 4. Respond to the user
    return new Response(JSON.stringify({ success: true, url: imageUrl }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}