// ---------------- CHAPTERS 
// NAV MENU
// TO TOP BUTTON
// EVENT FORMS
// DYNAMIC FORM Q - DJS
// FORM SUBMISSION


// || Email Validation
/**
 * Generic Email Validator
 * @param {HTMLInputElement} input - The email input element to validate
 * @param {string} customMsg - Optional custom message for type mismatch
 */
export function validateEmail(input, customMsg = "Please enter a valid email address.") {
  if (!input) return true;

  const isValid = input.validity.valid;

  if (!isValid) {
    input.setAttribute('aria-invalid', 'true');
    
    if (input.validity.valueMissing) {
      input.setCustomValidity("This field is required.");
    } else if (input.validity.typeMismatch) {
      input.setCustomValidity(customMsg);
    }
  } else {
    input.setAttribute('aria-invalid', 'false');
    input.setCustomValidity("");
  }

  return isValid;
}

// -------------------------------------------------- || Nav Menu open/close button

document.addEventListener('astro:page-load', () => {
    const primaryNav = document.querySelector('#expanded-navigation');
    const navToggle = document.querySelector('.nav-toggle');

    if (primaryNav && navToggle) {
        navToggle.addEventListener('click', () => {
            const visibility = primaryNav.getAttribute('data-visible');
            
            if (visibility === 'false') {
                primaryNav.setAttribute('data-visible', 'true');
                navToggle.setAttribute('aria-expanded', 'true');
            } else {
                primaryNav.setAttribute('data-visible', 'false');
                navToggle.setAttribute('aria-expanded', 'false');
            }
            
            console.log("Nav visibility:", visibility);
        });
    }
});

// ------------------------------------------------ TOOL KIT

let ToolKit = document.getElementById('tool-kit');
let topButton = document.getElementById("toTop");
// let themeToggle = document.getElementById('themeToggle');

window.onscroll = function() {activeScroll()};

function activeScroll() {
const isScrolled = document.body.scrollTop > 100 || document.documentElement.scrollTop > 100;

    if (isScrolled) {
        topButton.style.opacity = '100%';
    } else {
        topButton.style.opacity = '30%';
        
    }
}

function scrollTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

}

topButton.addEventListener('click', scrollTop)

// EVENT FORMS 

    const selector = document.getElementById('event-type'); 
    const placeholder = document.getElementById('placeholder-form');

    const skateFestival = document.getElementById('festival-form');
    const skateNight = document.getElementById('night-form');
    const skateSocial = document.getElementById('social-form');
    const skateWorkshop = document.getElementById('workshop-form');
    const skateWeekend = document.getElementById('weekend-form');
    const skateGeneral = document.getElementById('general-form');
    
    // --- NEW MAPPING OBJECT SOLUTION ---
    const formMap = {
        'festival-form': skateFestival,
        'night-form': skateNight,
        'social-form': skateSocial,
        'workshop-form': skateWorkshop,
        'weekend-form': skateWeekend,
        'general-form': skateGeneral,
    };

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


// DYNAMIC FORM Q - DJ
        
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
    
// FORM SUBMISSION

