
// sticky navbar start

window.onscroll = function() {myFunction()};
var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    navbar.classList.add("sticky");
    
  } else {
    navbar.classList.remove("sticky");
  }
}

// sticky navbar end

// owlCarousel start

var owl = $('#featured');
owl.owlCarousel({
    items:3,
    loop:true,
    margin:10,
    autoplay:true,
    autoplayTimeout:3500,
    autoplayHoverPause:true
});
    
var owl = $('#testimonial');
owl.owlCarousel({
    items:2,
    loop:true,
    margin:10,
    autoplay:true,
    autoplayTimeout:3500,
    autoplayHoverPause:true
});
    


