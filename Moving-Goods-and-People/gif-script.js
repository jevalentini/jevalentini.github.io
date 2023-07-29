function loadGIF(){
	var parentElement = document.getElementById("sol_gif_container");
	const imgElement = document.createElement("img");
	imgElement.src = "transportation.gif"; 
	imgElement.id = "sol_gif_image";
	parentElement.appendChild(imgElement);
}
export { loadGIF };