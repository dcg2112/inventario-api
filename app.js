const API_URL = "http://inventory-api.h0cpcfe4egh7bhge.westus2.azurecontainer.io:3000";

// Function to load products and display in the table
async function loadProducts() {
    const response = await fetch(`${API_URL}/products`);
    const products = await response.json();
    const productsTable = document.getElementById("products-table");

    // Clear table before reloading
    productsTable.innerHTML = "";

    products.forEach(product => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.ProductID}</td>
            <td>${product.ProductName}</td>
            <td>${product.Quantity}</td>
            <td>$${product.Price.toFixed(2)}</td>
        `;
        productsTable.appendChild(row);
    });
}

// Function to handle form submission and add a new product
document.getElementById("productForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const productName = document.getElementById("productName").value;
    const quantity = parseInt(document.getElementById("quantity").value);
    const price = parseFloat(document.getElementById("price").value);

    const response = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ProductName: productName, Quantity: quantity, Price: price }),
    });

    if (response.ok) {
        alert("Product added successfully!");
        loadProducts(); // Reload the product list
        e.target.reset(); // Reset the form
    } else {
        alert("Failed to add product. Please try again.");
    }
});

// Initial load of products
loadProducts();
