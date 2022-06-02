// detects when you've scrolled to the bottom of the page, then does a thing
window.onscroll = function(ev) {
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
        alert("you're at the bottom of the page");
    }
};

// does the same thing, but now it re-scrolls to a set position (but jitters if holding the thumb and scrolling it directly)
window.addEventListener('scroll', function(event)
{
    if ((this.innerHeight + this.pageYOffset) >= (document.body.offsetHeight-1))
    {
        console.log('scrolled');
        this.scrollTo(0,200);
    }
});

// listens for if a click is released, THEN does the thing
window.addEventListener("click", function(event){
    console.log("clicked!");
});


// event "integral"
window.mouseisdown = false

window.addEventListener("mousedown",function(event){
    this.mouseisdown=true;
    console.log("mouse is down");
});

window.addEventListener("mouseup",function(event){
    this.mouseisdown=false;
    console.log("mouse is up");
});

// adds new text to bottom of screen
var tag = document.createElement("p"); // <p></p>
var text = document.createTextNode("TEST TEXT"); 
tag.appendChild(text); // <p>TEST TEXT</p>
var element = document.getElementsByTagName("body")[0];
element.appendChild(tag); // <body> <p>TEST TEXT</p> </body>





// this is my attempt to generate a mouseclick-scroll event listening hierarchy (to avoid scrolling while the mouse button is held down, basically)
var mouseIsDown = false;

window.addEventListener("mousedown",function(event){
    mouseIsDown=true;
});

window.addEventListener("mouseup",function(event){
    mouseIsDown=false;
});


cbfun = function(event){
    if ( ((this.innerHeight + this.pageYOffset) >= (document.body.offsetHeight-1)) && !mouseIsDown ){
        let tag = document.createElement("p"); // <p></p> (use "let" to keep things local in scope!)
        tag.appendChild(document.createTextNode("TEST TEXT")); // <p>TEST TEXT</p>
        tag.appendChild(document.createElement("br"));
        tag.appendChild(document.createElement("br"));
        tag.appendChild(document.createTextNode("test text"));
        let element = document.getElementsByTagName("body")[0];
        element.appendChild(tag); // <body> <p>TEST TEXT</p> </body>
        this.scrollBy(0,-200);
    }
};

window.addEventListener("mouseup",cbfun);
window.addEventListener("scroll",cbfun);

// excellent. now to populate a page with enough content to make scrolling non-awkward (25% scale minimum)
while (document.body.offsetHeight < 10000) {
    let tag = document.createElement("p"); // <p></p> (use "let" to keep things local in scope!)
    tag.appendChild(document.createTextNode("TEST TEXT")); // <p>TEST TEXT</p>
    tag.appendChild(document.createElement("br"));
    tag.appendChild(document.createElement("br"));
    tag.appendChild(document.createTextNode("test text"));
    let element = document.getElementsByTagName("body")[0];
    element.appendChild(tag); // <body> <p>TEST TEXT</p> </body>
}

// hmmm having it jump back *seamlessly* and having that work across all browsers and devices sounds like a big ol' pain in the butt
// so having a "jump back instead of appending new text" optiion may not be the way to go
// besides, appending new text endlessly will probably not crash anything unless somebody REALLY tries to make it happen
// so:
//     make a template HTML page which includes a couple js scripts
//     first script will slowly "fade in" copies of the text upon page load until well overflowing
//     second script will detect keyboad & mouse events to determine when to begin populating with more text
// may wanna check this out:
//     https://api.jquery.com/category/effects/
// alternatively there seems to be a css answer:
//     https://stackoverflow.com/questions/11679567/using-css-for-a-fade-in-effect-on-page-load/16188533#16188533