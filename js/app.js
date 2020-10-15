/*
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
*/
/* NOTE.................Edited Sections feedback.....................
    1) Helper function (isInViewport) has been edited as it seems that the older one
       didn't work on mobile screens. 
    2) I have doubled the time for hidding the navbar to be 4 seconds instead of 2 seconds.   
*/
const t0 = performance.now();

// Define Global Variables...........................................
const sections = document.getElementsByTagName('section'),
      ulEle = document.getElementById('navbar__list'),
      headNav = document.querySelector('.page__header'),
      scrollButton = document.querySelector('button');


// Helper Functions..................................................

// return if an element is in viewport or not.
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= 150 && rect.bottom >= 150
    );
}


// Main Functions....................................................

// build the nav bar.  
function navBuild() {
    const fragment = document.createDocumentFragment();
    for (let i = 1; i <= sections.length; i++){
        const liEle = document.createElement('li');
        const anchorEle = document.createElement('a');
        anchorEle.textContent = sections[i-1].getAttribute('data-nav');
        anchorEle.className = 'menu__link';
        anchorEle.setAttribute('href', `#section${i}`);
        liEle.appendChild(anchorEle);
        fragment.appendChild(liEle);
    }
    ulEle.appendChild(fragment);
}

// add class 'active' to section when near top of viewport, show/hide nav bar, show/hide scroll button.
function activeSec() {
    headNav.style.display = 'block';
    for(let i = 0; i < sections.length; i++){
        // Add class 'active' to section when near top of viewport.
        if(isInViewport(sections[i]) && sections[i] != document.querySelector('.your-active-class')){
            document.querySelector('.your-active-class').classList.remove('your-active-class');
            sections[i].classList.add('your-active-class');
        }
    }
    // show button when the user scrolls below the fold of the page.
    if (document.body.scrollTop > innerHeight || document.documentElement.scrollTop > innerHeight)
                scrollButton.style.display = 'block';
            else
                scrollButton.style.display = 'none';
    // hide nav bar while not scrolling.
    setTimeout(function(){headNav.style.display = 'none';}, 4000);
}

// scroll to anchor ID using scrollTO event.
function scrollToSec(event) {
    event.preventDefault();
    if(event.target.hasAttribute('href')){
        document.querySelector(`${event.target.getAttribute('href')}`).scrollIntoView({behavior: 'smooth'});
    }
}

// scroll to top button.
function scrollTop(){
    window.scrollTo({
        top: document.body.offsetTop,
        behavior: "smooth"
    })
}


// Begin Events......................................................

// build menu.  
window.addEventListener('DOMContentLoaded', navBuild);

// scroll to section on link click. 
ulEle.addEventListener('click', scrollToSec);

// set sections as active.   
window.addEventListener('scroll', activeSec);

// scroll to top button.
scrollButton.addEventListener('click', scrollTop);

const t1 = performance.now();
// test the performance of the code.
console.log (`took ${t1-t0} ms. on loading`);