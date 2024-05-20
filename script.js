// Get elements
const cartButton = document.querySelector('.cart-button');
const cartBadge = document.querySelector('.cart-badge');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.close');
const buyButton = document.querySelector('.buy-btn');
const cartItemsList = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const itemsGrid = document.querySelector('.items-grid');
const searchBar = document.getElementById('search-bar');

let items = [
    { id: 1, name: 'Enchanted Necklace', price: 49.99, image: 'images/Enchanted Necklace.webp' },
    { id: 2, name: 'Mystic Wand', price: 79.99, image: 'images/Mystic Wand.jpg' },
    { id: 3, name: 'Dragon Egg', price: 150.00, image: 'images/Dragon Egg.avif' },
    { id: 4, name: 'Fairy Dust', price: 19.99, image: 'images/Fairy Dust.jpg' },
    { id: 5, name: 'Crystal Ball', price: 99.99, image: 'images/Crystal Ball.jpg' },
    { id: 6, name: 'Potion of Healing', price: 29.99, image: 'images/Potion of Healing.png' },
    { id: 7, name: 'Phoenix Feather', price: 199.99, image: 'images/Phoenix Feather.jpg' },
    { id: 8, name: 'Magic Carpet', price: 499.99, image: 'images/Magic Carpet.png' },
    { id: 9, name: 'Invisibility Cloak', price: 299.99, image: 'images/Invisibility Cloak.png' },
    { id: 10, name: 'Elixir of Immortality', price: 1999.99, image: 'images/Elixir of Immortality.jpg' },
    { id: 11, name: 'Wizards Staff', price: 149.99, image: 'images/Wizards Staff.png' },
    { id: 12, name: 'Unicorn Horn', price: 399.99, image: 'images/Unicorn Horn.avif' },
];

let cart = [];

// Function to fill items grid
function fillItemsGrid(itemsToDisplay) {
    itemsGrid.innerHTML = ''; // Clear the grid before filling it
    for (const item of itemsToDisplay) {
        let itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h2>${item.name}</h2>
            <p>$${item.price}</p>
            <button class="add-to-cart-btn" data-id="${item.id}">Add to cart</button>
        `;
        itemsGrid.appendChild(itemElement);
    }
    
    // Add event listeners to "Add to cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Function to toggle modal visibility
function toggleModal() {
    modal.classList.toggle('show-modal');
}

// Function to add items to the cart
function addToCart(event) {
    const itemId = parseInt(event.target.getAttribute('data-id'));
    const item = items.find(item => item.id === itemId);
    
    // Check if the item is already in the cart
    const cartItem = cart.find(cartItem => cartItem.id === itemId);
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    
    updateCartUI();
}

// Function to remove items from the cart
function removeFromCart(event) {
    const itemId = parseInt(event.target.getAttribute('data-id'));
    const cartItemIndex = cart.findIndex(cartItem => cartItem.id === itemId);

    if (cartItemIndex > -1) {
        const cartItem = cart[cartItemIndex];
        cartItem.quantity -= 1;
        if (cartItem.quantity === 0) {
            cart.splice(cartItemIndex, 1);
        }
    }
    
    updateCartUI();
}

// Function to handle buying items in the cart
function buyItems() {
    if (cart.length === 0) {
        alert('Cannot buy. Your cart is empty.');
    } else {
        alert('Purchase successful!');
        cart = [];
        updateCartUI();
        toggleModal();
    }
}

// Function to update the cart UI
function updateCartUI() {
    // Update cart items list
    cartItemsList.innerHTML = '';
    let total = 0;
    cart.forEach(cartItem => {
        total += cartItem.price * cartItem.quantity;
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${cartItem.name} - $${cartItem.price} x ${cartItem.quantity} = $${(cartItem.price * cartItem.quantity).toFixed(2)}
            <button class="remove-from-cart-btn" data-id="${cartItem.id}">Remove</button>
        `;
        cartItemsList.appendChild(listItem);
    });

    // Add event listeners to "Remove" buttons
    const removeFromCartButtons = document.querySelectorAll('.remove-from-cart-btn');
    removeFromCartButtons.forEach(button => {
        button.addEventListener('click', removeFromCart);
    });

    // Update total price
    cartTotal.textContent = `$${total.toFixed(2)}`;

    // Update cart badge
    cartBadge.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Function to filter items based on search input
function filterItems(event) {
    const searchTerm = event.target.value.toLowerCase();
    const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchTerm));
    fillItemsGrid(filteredItems);
}

// Call fillItemsGrid function when page loads
fillItemsGrid(items);

// Add event listeners to existing buttons
cartButton.addEventListener('click', toggleModal);
modalClose.addEventListener('click', toggleModal);
buyButton.addEventListener('click', buyItems);
searchBar.addEventListener('input', filterItems);
