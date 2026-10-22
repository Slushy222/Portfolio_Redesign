const hamburger = document.querySelector(".hamburgerWrapper");
const webTitle = document.getElementById("webTitle");
const dropDown = document.getElementById("dropdownNav");
const navItem = document.querySelectorAll(".navItem");
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

navItem[0].addEventListener('click', () => {
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
        navItem.forEach(remove_opacity);
    } else {
        closeNav();
        blurNav.classList.add('navClosed');
    }

    if (dropDown.classList.contains('open')) {
        navItem.forEach(add_fadeOut);
        setTimeout(() => {
            navItem.forEach(add_fadeIn);
            navItem.forEach(remove_fadeOut);
        }, 460);
    }
    else {
        navItem.forEach(add_fadeOut);
        navItem.forEach(remove_fadeIn);
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





function add_fadeIn(element) {
    element.classList.add('fade-in')
}

function remove_fadeIn(element) {
    element.classList.remove('fade-in')
}

function add_fadeOut(element) {
    element.classList.add('fade-out')
}

function remove_fadeOut(element) {
    element.classList.remove('fade-out')
}

function remove_opacity(element) {
    element.style.opacity = 0;
}