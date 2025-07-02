const slides = document.querySelectorAll(".slide"); //selects all (images) that have .slide class
let slideIndex = 0;
let intervalId = null;

document.addEventListener("DOMContentLoaded", initializeSlider); // whenever DOM is loaded completely start with initializeSlider function.

function initializeSlider() {
  // this is the first function the program starts with
  if (slides.length > 0) {
    //if the slides (if at all it is an array the length should be if the length is greater than 0 )
    slides[slideIndex].classList.add("displaySlide"); //take the first element add a display class to it, in which it sets display to block that is it occupies entire space
    intervalId = setInterval(nextSlide, 5000); //setInterval will run nextSlide function every 5 seconds we've added intervalId incase we want to clear it using clearInterval
  }
}
//nextSlide function calls the showSlide function that takes the incremented index
function showSlide(index) {
  slideIndex = (index + slides.length) % slides.length; //doing this incase the index number exceeds the length
  slides.forEach((slide) => {
    //remove all the display class for the slide class if they are present
    slide.classList.remove("displaySlide");
  });
  slides[slideIndex].classList.add("displaySlide"); //after removing add display class of the passed slideIndex
}
//when the user explicitly clickd on the previous arrow button this function will work same as the nextSlide function
function prevSlide() {
  clearInterval(intervalId);
  slideIndex--;
  showSlide(slideIndex);
  intervalId = setInterval(nextSlide, 5000); // Restart the interval
}
//initialize slider calls this function after every 5 seconds
function nextSlide() {
  clearInterval(intervalId); // we clear the interval that was set in initialzerslider function
  slideIndex++; //we increment the slideIndex from 0 to 1
  showSlide(slideIndex);
  intervalId = setInterval(nextSlide, 5000); // after showSlide displays the image now after 5 seconds this same function gets called and increments the slideIndex passes the same index so that next image gets displayed
}
