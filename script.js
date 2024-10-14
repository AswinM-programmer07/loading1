// Form Submission Logic
document.getElementById('userInfoForm')?.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from refreshing the page

    // Collect form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const product = document.getElementById('product').value;
    const offerPrice = parseFloat(document.getElementById('offerPrice').value);
    const sellingPrice = parseFloat(document.getElementById('sellingPrice').value);
    const couponCode = document.getElementById('couponCode').value;

    // Validate selling price
    if (sellingPrice > offerPrice * 0.20) {
        alert('Selling price must not exceed 20% of the offer price.');
        return;
    }

    // Collect selected coupon types
    let couponTypes = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);

    // Ensure at least one coupon type is selected
    if (couponTypes.length === 0) {
        alert('Please select at least one coupon type.');
        return;
    }

    // Create user info object
    const userInfo = {
        name, email, product, offerPrice, sellingPrice, couponTypes,couponCode
    };

    // Store user info in local storage
    localStorage.setItem('currentUser', JSON.stringify(userInfo));

    // Redirect to the category page of the first selected coupon type
    window.location.href = `${couponTypes[0].replace(/\s+/g, '').toLowerCase()}.html`;
});

// Function to dynamically display user info on category pages
if (document.getElementById('couponContainer')) {
    const couponContainer = document.getElementById('couponContainer');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
        const couponTypes = currentUser.couponTypes;

        // Display buttons for the coupon types in the category
        couponTypes.forEach(type => {
            const button = document.createElement('button');
            button.innerText = `View ${currentUser.name}'s ${currentUser.product}`;
            button.onclick = function() {
                window.location.href = `profile.html`; // Redirect to portfolio page
            };
            couponContainer.appendChild(button);
        });
    }
}
