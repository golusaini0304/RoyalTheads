from flask import Flask, render_template

app = Flask(__name__)

products = [
    {
        "id": 1,
        "name": "Signature Oversized Tee",
        "category": "Men",
        "price": 799,
        "old_price": 1199,
        "rating": 4.8,
        "reviews": 126,
        "badge": "BESTSELLER",
        "image": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
        "description": "Premium heavyweight cotton oversized t-shirt designed for a modern streetwear look."
    },
    {
        "id": 2,
        "name": "Premium Denim Jacket",
        "category": "Men",
        "price": 1499,
        "old_price": 1999,
        "rating": 4.9,
        "reviews": 89,
        "badge": "TRENDING",
        "image": "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85",
        "description": "A timeless denim jacket with a premium finish for effortless everyday styling."
    },
    {
        "id": 3,
        "name": "Elegant Midi Dress",
        "category": "Women",
        "price": 1299,
        "old_price": 1799,
        "rating": 4.9,
        "reviews": 154,
        "badge": "NEW",
        "image": "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=85",
        "description": "Elegant silhouette with a refined finish, perfect for special occasions."
    },
    {
        "id": 4,
        "name": "Essential Women's Top",
        "category": "Women",
        "price": 699,
        "old_price": 999,
        "rating": 4.7,
        "reviews": 97,
        "badge": "SALE",
        "image": "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85",
        "description": "Minimal everyday top made for comfortable and stylish outfits."
    },
    {
        "id": 5,
        "name": "Classic Oxford Shirt",
        "category": "Men",
        "price": 899,
        "old_price": 1299,
        "rating": 4.8,
        "reviews": 112,
        "badge": "POPULAR",
        "image": "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=900&q=85",
        "description": "Clean Oxford shirt with a premium look suitable for casual and formal styling."
    },
    {
        "id": 6,
        "name": "Kids Premium Hoodie",
        "category": "Kids",
        "price": 599,
        "old_price": 899,
        "rating": 4.8,
        "reviews": 63,
        "badge": "KIDS",
        "image": "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=900&q=85",
        "description": "Soft and comfortable hoodie designed for everyday kids fashion."
    },
    {
        "id": 7,
        "name": "Women's Tailored Blazer",
        "category": "Women",
        "price": 1899,
        "old_price": 2499,
        "rating": 4.9,
        "reviews": 71,
        "badge": "PREMIUM",
        "image": "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=900&q=85",
        "description": "Sharp tailored blazer that brings a sophisticated premium feel to your wardrobe."
    },
    {
        "id": 8,
        "name": "Urban Cargo Pants",
        "category": "Men",
        "price": 1099,
        "old_price": 1599,
        "rating": 4.7,
        "reviews": 84,
        "badge": "HOT",
        "image": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85",
        "description": "Modern cargo pants combining comfort, utility and streetwear style."
    }
]


@app.route("/")
def home():
    return render_template("index.html", products=products)


if __name__ == "__main__":
    app.run(debug=True)