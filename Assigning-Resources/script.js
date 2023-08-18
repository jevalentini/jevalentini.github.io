
	function objLoad() {
		var spinner = parent.document.getElementsByClassName("spin_nbAssignment")[0];
		spinner.style.visibility = 'hidden';
		var obj = document.getElementById("pluto_Assignment");
		obj.style.visibility = 'visible';
	}
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
                if(flag==(nextDetailElements.length)&&flag>0){
                    watchSliders();
		    objLoad()
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

      document.addEventListener("DOMContentLoaded", function (e) {
        observePlutoCells();
      });
      function watchSliders(){              
        const sliderARE = document.getElementById('ARE').getElementsByTagName("input")[0];
        const sliderABE = document.getElementById('ABE').getElementsByTagName("input")[0];
        const sliderAYE = document.getElementById('AYE').getElementsByTagName("input")[0];

        let currentValueARE = sliderARE.value;
        let currentValueABE = sliderABE.value;
        let currentValueAYE = sliderAYE.value;
        let hash = currentValueARE.concat(currentValueABE,currentValueAYE);
	let hash2 ="feasible"
	if((parseInt(currentValueARE) + parseInt(currentValueABE) + parseInt(currentValueAYE))<9){
	  hash2 ="inf_less9";
	} else if(parseInt(currentValueARE)<3){
	  hash2 ="inf_redless3";
	} else if(parseInt(currentValueABE)<2){
	  hash2 ="inf_blueless2";
	}
        displayAttachedToSliders(hash,hash2)  
        sliderARE.addEventListener('input', (event) => {
          console.log(currentValueARE)
	  hash=currentValueARE.concat(currentValueABE,currentValueAYE);
	  hash2 ="feasible"
	  if((parseInt(currentValueARE) + parseInt(currentValueABE) + parseInt(currentValueAYE))<9){
	    hash2 ="inf_less9";
	  } else if(parseInt(currentValueARE)<3){
	    hash2 ="inf_redless3";
	  } else if(parseInt(currentValueABE)<2){
	    hash2 ="inf_blueless2";
	  }
	  undisplayAttachedToSliders(hash,hash2)

          currentValueARE = event.target.value;

	  hash=currentValueARE.concat(currentValueABE,currentValueAYE);
	  hash2 ="feasible"
	  if((parseInt(currentValueARE) + parseInt(currentValueABE) + parseInt(currentValueAYE))<9){
	    hash2 ="inf_less9";
	  } else if(parseInt(currentValueARE)<3){
	    hash2 ="inf_redless3";
	  } else if(parseInt(currentValueABE)<2){
	    hash2 ="inf_blueless2";
	  }
          console.log(currentValueARE)
	  displayAttachedToSliders(hash,hash2)
        });

        sliderABE.addEventListener('input', (event) => {
          console.log(currentValueABE)
	  hash=currentValueARE.concat(currentValueABE,currentValueAYE);
	  hash2 ="feasible"
	  if((parseInt(currentValueARE) + parseInt(currentValueABE) + parseInt(currentValueAYE))<9){
	    hash2 ="inf_less9";
	  } else if(parseInt(currentValueARE)<3){
	    hash2 ="inf_redless3";
	  } else if(parseInt(currentValueABE)<2){
	    hash2 ="inf_blueless2";
	  }
	  undisplayAttachedToSliders(hash,hash2)

          currentValueABE = event.target.value;

	  hash=currentValueARE.concat(currentValueABE,currentValueAYE);
	  hash2 ="feasible"
	  if((parseInt(currentValueARE) + parseInt(currentValueABE) + parseInt(currentValueAYE))<9){
	    hash2 ="inf_less9";
	  } else if(parseInt(currentValueARE)<3){
	    hash2 ="inf_redless3";
	  } else if(parseInt(currentValueABE)<2){
	    hash2 ="inf_blueless2";
	  }
          console.log(currentValueABE)
	  displayAttachedToSliders(hash,hash2)
        });
          
        sliderAYE.addEventListener('input', (event) => {
          console.log(currentValueAYE)
          hash=currentValueARE.concat(currentValueABE,currentValueAYE);
	  hash2 ="feasible"
	  if((parseInt(currentValueARE) + parseInt(currentValueABE) + parseInt(currentValueAYE))<9){
	    hash2 ="inf_less9";
	  } else if(parseInt(currentValueARE)<3){
	    hash2 ="inf_redless3";
	  } else if(parseInt(currentValueABE)<2){
	    hash2 ="inf_blueless2";
	  }
          undisplayAttachedToSliders(hash,hash2)

          currentValueAYE = event.target.value;

	  hash=currentValueARE.concat(currentValueABE,currentValueAYE);
	  hash2 ="feasible"
	  if((parseInt(currentValueARE) + parseInt(currentValueABE) + parseInt(currentValueAYE))<9){
	    hash2 ="inf_less9";
	  } else if(parseInt(currentValueARE)<3){
	    hash2 ="inf_redless3";
	  } else if(parseInt(currentValueABE)<2){
	    hash2 ="inf_blueless2";
	  }
          console.log(currentValueAYE)  
          displayAttachedToSliders(hash,hash2)
        });

      }
      function displayAttachedToSliders(hash,hash2){
		console.log("display");          
		console.log(hash);
		var displayMode="block";  
		var resourceDisplay=document.getElementById("resources_1".concat(hash));
		resourceDisplay.style.display=displayMode;
		if(hash2=="feasible"){
		  var solDisplay =document.getElementById("sol_1".concat(hash));
		  solDisplay.style.display=displayMode;
		  var solDisplay4 =document.getElementById("last_row_feasible");
		  solDisplay4.style.display=displayMode;
		} else{
		  console.log(hash2);
		  var solDisplay3 =document.getElementById("inf_img");
		  solDisplay3.style.display=displayMode;
		  console.log(hash2);
		  var solDisplay2 =document.getElementById(hash2);
		  solDisplay2.style.display=displayMode;
		  var solDisplay4 =document.getElementById("last_row_feasible");
		  solDisplay4.style.display="none";
		}
	
		var descDisplay =document.getElementById("description_1".concat(hash));
		descDisplay.style.display=displayMode;
		
		console.log("before model");         
		var modDisplay =document.getElementById("model_1".concat(hash));
		modDisplay.style.display=displayMode;
		console.log("after model"); 
		var resDisplay =document.getElementById("result_1".concat(hash)).closest("div");
		resDisplay.style.display=displayMode;
      }
        
      function undisplayAttachedToSliders(hash,hash2){
		console.log("undisplay");          
		console.log(hash);
		var displayMode="none";   
		var resourceDisplay=document.getElementById("resources_1".concat(hash));
		resourceDisplay.style.display=displayMode;    

		if(hash2=="feasible"){
		  var solDisplay =document.getElementById("sol_1".concat(hash));
		  solDisplay.style.display=displayMode;
		  var solDisplay4 =document.getElementById("last_row_feasible");
		  solDisplay4.style.display=displayMode;
		} else{
		  var solDisplay =document.getElementById("inf_img");
		  solDisplay.style.display=displayMode;
		  console.log(hash2);
		  var solDisplay2 =document.getElementById(hash2);
		  solDisplay2.style.display=displayMode;
		  var solDisplay4 =document.getElementById("last_row_feasible");
		  solDisplay4.style.display="none";
		}

		var descDisplay =document.getElementById("description_1".concat(hash));
		descDisplay.style.display=displayMode;
		var modDisplay =document.getElementById("model_1".concat(hash));
		modDisplay.style.display=displayMode;
		var resDisplay =document.getElementById("result_1".concat(hash)).closest("div");
		resDisplay.style.display=displayMode;   
      }

	window.addEventListener('beforeunload', function(event) {
		console.log("leaving");
    		sliderARE.removeEventListener('input', (event));
    		sliderABE.removeEventListener('input', (event));
    		sliderAYE.removeEventListener('input', (event));
	});