// ---Logic for questions-answers---------------------------------

const questions = document.querySelectorAll('.question');

questions.forEach((question) => {
  question.addEventListener('click', (e) => {
    // for showing answer
    const answer = e.currentTarget.querySelector('.answer');
    answer.classList.toggle('show');
    // for arrow rotation
    const icon = e.currentTarget.querySelector('img');
    icon.classList.toggle('arrow-down');
    icon.classList.toggle('arrow-up');
    // for turning question text white when clicked
    const questionText = e.currentTarget.querySelector('.question-text');
    questionText.classList.toggle('active');
  });
});

// ---Logic for for scrolling through the reviews with a touch ---------------------------------
var allReviews = document.querySelector('.all-reviews');
var initialX;
var currentX;
var xOffset = 0;

allReviews.addEventListener('touchstart', dragStart);

document.addEventListener('touchmove', drag);

document.addEventListener('touchend', dragEnd);

function dragStart(e) {
  initialX = e.touches[0].clientX - xOffset;
  allReviews.classList.add('active');
}

function drag(e) {
  if (allReviews.classList.contains('active')) {
    currentX = e.touches[0].clientX - initialX;
    var maxMarginLeft =
      allReviews.scrollWidth - allReviews.parentNode.clientWidth;
    var marginLeft = Math.min(Math.max(currentX, -maxMarginLeft), 0);
    allReviews.style.marginLeft = marginLeft + 'px';
    xOffset = marginLeft;
  }
}

function dragEnd(e) {
  if (allReviews.classList.contains('active')) {
    allReviews.classList.remove('active');
  }
}

// --- Logic for smooth nav-link transitions ---------------------------------
const navbar = document.querySelector('header');
const navbarHeight = navbar.offsetHeight;

const navLinks = document.querySelectorAll('.nav__container a');

// Iterate over each link
navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    // Prevent the default click behavior
    event.preventDefault();

    // Get the hash from the link's href
    const hash = link.getAttribute('href');

    // Get the section that corresponds to the hash
    const section = document.querySelector(hash);

    // Calculate the distance from the top of the section to the top of the document
    // Add an offset of navbar height
    const offset = -105;
    const distance = section.offsetTop + offset;

    // Scroll to the section with a smooth animation
    window.scroll({
      top: distance,
      left: 0,
      behavior: 'smooth',
    });
  });
});

// --- Logic for adding act class to the clicked nav-link or when scrolling it's section ---------------------------------

// Get the navbar and the sections

const sections = document.querySelectorAll('section');

// Get the offset position of the navbar
const navbarOffset = navbar.offsetTop;

const navLi = document.querySelectorAll('.secondary');
// add active class to the first nav item on page load
navLi[0].classList.add('act');

window.onscroll = () => {
  var current = '';

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 120) {
      current = section.getAttribute('id');
    }
  });

  navLi.forEach((li) => {
    li.classList.remove('act');
    // check if current is not empty before adding the class
    if (current && li.href.includes(current)) {
      li.classList.add('act');
    }
  });
};
