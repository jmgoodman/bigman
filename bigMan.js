// first stop: check every second if there's enough content. if not, populate the page with more until a scrollbar appears

addTextFun = function() {
	const el = document.createElement("div");
	el.classList.add("fade-in");
	el.innerHTML = `<p align="center">Big Man struts along, he's licking his wounds,</p>
			<p align="center">Big Man's Bigger Man got in a lick or two.</p>
			<p align="center">Big Man's beat down, got a lot to prove,</p>
			<p align="center">Big Man, little man, beat him black & blue.</p>
			<br>`;
	const element = document.getElementsByTagName("body")[0];
	element.appendChild(el);
};

// first iteration will execute after 5s, then subsequents happen after every 10
var timeOutID = setTimeout(function(){
	addTextFun();

	let intervalID = setInterval(function(){
		if (document.body.offsetHeight < (window.innerHeight+1)){
			addTextFun();
		}
	}, 10000);

}, 5000);


// second step: listeners for mouse button & scrollbar

// saves the state of the mouse button (might be buggy... test what happens if you hold button down, move out of window, release, then come back into the window)
var mouseIsDown = false;

window.addEventListener("mousedown",function(event){
    mouseIsDown=true;
});

window.addEventListener("mouseup",function(event){
    mouseIsDown=false;
});

cbfun = function() {
	 if ( ((this.innerHeight + this.pageYOffset) >= (document.body.offsetHeight-1)) && !mouseIsDown ){
	 	addTextFun();
	 }
};

window.addEventListener("mouseup",cbfun); // at first I wanted to prevent people from auto-progressing the intro crawl (i.e., set another condition above that says the document body has to be larger than the window). Then I realized 1) trying to do so actually broke the scripting *somehow* (why, javascript, are you such a fickle beast?!?!?), but 2) it's actually cooler that the user can click to make it go faster.
window.addEventListener("scroll",cbfun);