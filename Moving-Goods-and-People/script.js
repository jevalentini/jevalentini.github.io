function processPlutoCells(detailElementID)  {                  
var detailElement = document.getElementById(detailElementID);   
var nextDetailElements = Array.from(document.getElementsByTagName("details"));
for (var j = 0; j < nextDetailElements.length; j++) {
  nextDetailElements[j]=nextDetailElements[j].parentNode.parentNode.parentNode;
  //console.log(nextDetailElements)
}
// console.log(nextDetailElements)
const pluto_cell = detailElement.closest("pluto-cell");
var cell_id=  pluto_cell.id;          
//console.log(detailElement)

var auxbody = document.getElementsByTagName("body"); 
// console.log(auxbody)   
var body = auxbody[0]        
//console.log(body)   
var auxmain = body.getElementsByTagName("main")
//console.log(auxmain)
var main = auxmain[0]
//console.log(main)
var auxpluto_notebook=main.getElementsByTagName("pluto-notebook");
//console.log(auxpluto_notebook)
var pluto_notebook=auxpluto_notebook[0];
//console.log(pluto_notebook)
var auxplutoElement=pluto_notebook.getElementsByTagName("pluto-cell");
console.log(auxplutoElement)

var plutoElement;  
var flag=0;
var nextElementReached=0;
for (var i = 0; i < auxplutoElement.length; i++) {            
    for (var j = 0; j < nextDetailElements.length; j++) {
     if(flag!=0){
         //console.log(auxplutoElement[i].id)
         //console.log(nextDetailElements[j].id)
         if(auxplutoElement[i].id==nextDetailElements[j].id){
             nextElementReached=1;
             break;
         }
     }   
    }
    if(nextElementReached==1){
     break;   
    }
    if(flag==1){
        auxplutoElement[i].style.display="none"
    } else if(flag==2){
        auxplutoElement[i].style.display="block"                
    }
    if(auxplutoElement[i].id==cell_id){
        plutoElement=auxplutoElement[i] 
        if(detailElement.open==false){
            flag=1
        } else{
            flag=2
        }

    }
}
//console.log(detailElement)               
//console.log("After pluto-notebook")
//console.log(plutoElement)

const cell = plutoElement.closest("pluto-cell")
const setclass = () => {
    console.log("change!")
    cell.classList.toggle("hide_everything_below", true)
}
const observer = new MutationObserver(setclass)

observer.observe(cell, {
    subtree: false,
    attributeFilter: ["class"],
})
return detailElement
}

function observePlutoCells() {
var targetNode = document.getElementsByTagName("body");
targetNode=targetNode[0]
var observerOptions = { childList: true, subtree: true };        
var observer = new MutationObserver(function (mutationsList, observer) {
  for (var mutation of mutationsList) {
    if (mutation.type === "childList") {
      if (mutation.addedNodes.length > 0) { 
        var flag=0;
        var nextDetailElements = document.getElementsByTagName("details");
        //console.log(nextDetailElements)
        for (var j = 0; j < nextDetailElements.length; j++) {
            console.log(nextDetailElements[j].id)
            var detail=processPlutoCells(nextDetailElements[j].id);
            observeDetailsElement(detail); 
            flag=flag+1;
        }

        console.log(flag)
        console.log(nextDetailElements.length)
        if(flag==(nextDetailElements.length)&&flag>1){
            console.log("getsIn")    
            observer.disconnect(); 
        }
        break;
      }
    }
  }
});
observer.observe(targetNode, observerOptions);
}

function processDetailsState(detailsElement) {          
    var detail=processPlutoCells(detailsElement.id);
}
function observeDetailsElement(detail) {
  var targetDetails = document.getElementById(detail.id);
  var observer = new MutationObserver(function (mutationsList, observer) {
    for (var mutation of mutationsList) {
      if (mutation.type === "attributes" && mutation.attributeName === "open") {
        processDetailsState(targetDetails);
        break;
      }
    }
  });

  observer.observe(targetDetails, { attributes: true });
}
function imgLoad(img) {
	var className="spin_".concat(img.id)
	var spinner = document.getElementsByClassName(className)[0];
	spinner.style.visibility = 'hidden';
	img.style.visibility = 'visible';
}
  document.addEventListener("DOMContentLoaded", function (e) {      
    observePlutoCells();     
  });