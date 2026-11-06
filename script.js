const form = document.getElementById("orderForm");

form.addEventListener("submit", async function(e) {
    e.preventDefault();

    const order = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        service_id: document.getElementById("service_id").value,
        weight: document.getElementById("weight").value,
        delivery_date: document.getElementById("delivery_date").value
    };

    const response = await fetch("/addOrder", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
    });

    const result = await response.json();
    alert(result.message);

    form.reset();
    loadOrders();
});

async function loadOrders() {
    const response = await fetch("/orders");
    const orders = await response.json();

    document.getElementById("orders").innerHTML =
        orders.map(order => `
            <p>
                ${order.name} |
                ${order.service_name} |
                ₹${order.total_amount} |
                ${order.status}
            </p>
        `).join("");
}

loadOrders();