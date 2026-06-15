const hamburger = document.querySelector(".hamburgerWrapper");
const webTitle = document.getElementById("webTitle");
const dropDown = document.getElementById("dropdownNav");
const designSelector = document.getElementById("designSelector");
const designNav = document.getElementById("designNav");
const aboutNav = document.getElementById("aboutNav");
const blurNav = document.getElementById("topNavBar");
const navContainer = document.getElementById("navBarContainer");

let menuOpen = false;

document.addEventListener('DOMContentLoaded', () => {
    if(!menuOpen) {
        blurNav.classList.add('navClosed')
    }
});

hamburger.addEventListener('click', () => {
    openNav();
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && menuOpen) {
        closeNav();
        blurNav.classList.add('navClosed');
    }
    else if (event.key === 'Escape' && !menuOpen) {
        openNav();
    }
});

designSelector.addEventListener('click', () => {
    closeNav();
    blurNav.classList.add('navClosed');
});

function closeNav() {
    hamburger.classList.remove('open');
    menuOpen = false;
    webTitle.classList.remove('open')
    dropDown.classList.remove('open')
}

function openNav() {
    if (!menuOpen) {
        hamburger.classList.add('open');
        menuOpen = true;
        webTitle.classList.add('open')
        dropDown.classList.add('open')
    } else {
        closeNav();
        blurNav.classList.add('navClosed');
    }

    if (dropDown.classList.contains('open')) {
        designNav.classList.add('fade-out');
        aboutNav.classList.add('fade-out');
        setTimeout(() => {
            designNav.classList.add('fade-in');
            aboutNav.classList.add('fade-in');
            designNav.classList.remove('fade-out');
            aboutNav.classList.remove('fade-out');
        }, 460);
    }
    else {
        designNav.classList.add('fade-out');
        aboutNav.classList.add('fade-out');
        designNav.classList.remove('fade-in');
        aboutNav.classList.remove('fade-in');
    }

    if (menuOpen) {
        blurNav.classList.remove('navClosed');
    }
}



document.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const viewportHeight = window.innerHeight;

    if (scrollPosition > viewportHeight * 1.0) {
        navDiv();
    } else {
        navContainer.classList.remove('open');
    }
});


function navDiv() {
    navContainer.classList.add('open');
}