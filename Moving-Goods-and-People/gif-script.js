function loadGIF() {
    var parentElement_prob = document.getElementById("prob_gif_container");
    var imgElement_prob = document.createElement("img");
    imgElement_prob.src = "transportation_prob.gif"; 
    imgElement_prob.id = "prob_gif_image";
    parentElement_prob.appendChild(imgElement_prob);

    var parentElement_sol = document.getElementById("sol_gif_container");
    var imgElement_sol = document.createElement("img");
    imgElement_sol.src = "transportation.gif"; 
    imgElement_sol.id = "sol_gif_image";
    parentElement_sol.appendChild(imgElement_sol);
}
export{ loadGIF };