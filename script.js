let currentImageIndex = 0;
const images = document.querySelectorAll('.thumbnail'); // Get all the gallery images
function openLightbox() {
 document.getElementById('lightbox').style.display = 'block';
 showImage(currentImageIndex); // Ensure the lightbox opens with the current image
}
function closeLightbox() {
 document.getElementById('lightbox').style.display = 'none';
}
function showImage(index) {
 currentImageIndex = index; // Update the current image index
 document.getElementById('lightboxImage').src = images[currentImageIndex].src;
}
function changeImage(direction) {
 currentImageIndex += direction;
 
 // Wrap around when at the start or end of the images
 if (currentImageIndex < 0) {
 currentImageIndex = images.length - 1;
 } else if (currentImageIndex >= images.length) {
 currentImageIndex = 0;
 }
 
 // Show the new image
 showImage(currentImageIndex);
}
// Set each thumbnail to open the lightbox with its corresponding image
images.forEach((img, index) => {
 img.addEventListener('click', () => showImage(index));
});