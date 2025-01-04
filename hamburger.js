const hamburger = document.querySelector(".hamburgerWrapper");
const webTitle = document.getElementById("webTitle");
const dropDown = document.getElementById("dropdownNav");
const designDropDown = document.getElementById("designDropdown");
const designSelector = document.getElementById("designSelector");
const designNav = document.getElementById("designNav");
const aboutNav = document.getElementById("aboutNav");
const projectItems = document.querySelectorAll('.projectList a');

let menuOpen = false;
let designOpen = false;


hamburger.addEventListener('click', () => {
    if (!menuOpen) {
        hamburger.classList.add('open');
        menuOpen = true;
        webTitle.classList.add('open')
        dropDown.classList.add('open')
    } else {
        closeNav();
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
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && menuOpen) {
        closeNav();
    }
});

designSelector.addEventListener('click', () => {
    if (!designOpen) {
        designOpen = true;
        designDropDown.style.display = "flex";
    }
    else {
        designOpen = false;
        checkDesignOpen();
    }
});

function checkDesignOpen() {
    if (!designOpen) {
        designDropDown.style.display = "none";
    }
}

function closeNav() {
    hamburger.classList.remove('open');
    menuOpen = false;
    webTitle.classList.remove('open')
    dropDown.classList.remove('open')
    designOpen = false;
    setTimeout(() => {
        checkDesignOpen();
    }, 200);
}

document.querySelectorAll('.sectionNumber').forEach(number => {
    number.style.opacity = '0';
});

projectItems.forEach(navItem => {
    navItem.addEventListener('mouseenter', () => {
        const number = navItem.querySelector('.sectionNumber');
        if (number) {
            number.style.opacity = '1';
        }
    });

    navItem.addEventListener('mouseleave', () => {
        const number = navItem.querySelector('.sectionNumber');
        if (number) {
            number.style.opacity = '0';
        }
    });
});