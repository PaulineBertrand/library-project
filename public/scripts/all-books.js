function renderAddToWishlistButton() {
    // Iteration 1: set the visibility of `<section class="green-pepper">`
    document.querySelectorAll('.add-wishlist').forEach((addButton) => {
    
        addButton.style.visibility = 'visible';
      
    });
  }