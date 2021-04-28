window.onscroll = function() { myFunction() };

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function myFunction() {
    if (window.pageYOffset > sticky) {
        navbar.classList.add("sticky")
    } else {
        navbar.classList.remove("sticky");
    }
}


// const Ham = document.getElementsByClassName('ham')[0]
// const navi = document.getElementsByClassName('nav-bar')[0]

// Ham.addEventListener('click', () => {
//     navi.classList.toggle('active');
// })


$('#ham').click(function() {
    $(this).toggleClass('active');
    $(".nav-bar").toggleClass('active');
});



//Default active on home
// $('#1').addClass("active-bar");



// $('#about').waypoint(function() {
//     $(".nav-bar ul li").children().removeClass("active-bar");
//     $("#2").addClass("active-bar");
// }, { offset: 101 });

// $('#contact').waypoint(function() {
//     $(".nav-bar ul li").children().removeClass("active-bar");
//     $("#3").addClass("active-bar");
// }, { offset: 101 });

// $('#head').waypoint(function() {
//     $(".nav-bar ul li").children().removeClass("active-bar");
//     $("#1").addClass("active-bar");
// }, { offset: 0 });