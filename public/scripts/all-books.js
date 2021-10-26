// function renderAddToWishlistButton() {
//     document.querySelectorAll('.add-wishlist').forEach((addButton) => {
    
//         addButton.style.visibility = 'visible';
      
//     });
//   }
console.log("im in public/scripts")
const borrowButtons = document.querySelectorAll(".borrow-button")
borrowButtons.forEach((borrowButton) => {
    borrowButton.addEventListener('click', () => {
        console.log("yo")
        borrowButton.classList.remove("active")
    })
})
