const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());

// Sample data with the new entries categorized
const data = [
  {
    "product_id": 1,
    "product_name": "Nike Air Max 97",
    "category": "shoes",
    "target_gender": "man",
    "description": "The Nike Air Max 97 is a classic running shoe that has been re-released in a variety of colors and styles. It features a comfortable Air Max cushioning system and a sleek, minimalist design.",
    "price": 120.00,
    "stock": 100,
    "company_name": "Nike",
    "product_images": "https://images.unsplash.com/photo-1579446650032-86effeeb3389",
    "reviews": [
      {
        "author": "John Smith",
        "rating": 5,
        "review": "These shoes are amazing! They're so comfortable and stylish. I highly recommend them."
      },
      {
        "author": "Jane Doe",
        "rating": 4,
        "review": "I love these shoes! They're perfect for running and everyday wear. They're a little bit on the expensive side, but they're worth it."
      }
    ]
  },
  {
    "product_id": 2,
    "product_name": "Adidas Ultraboost 22",
    "category": "shoes",
    "target_gender": "man",
    "description": "The Adidas Ultraboost 22 is a running shoe that features a comfortable Boost cushioning system and a Primeknit upper. It's designed to provide support and energy return for long-distance runs.",
    "price": 180.00,
    "stock": 50,
    "company_name": "Adidas",
    "product_images": "https://images.unsplash.com/photo-1620794341491-76be6eeb6946",
    "reviews": [
      {
        "author": "John Doe",
        "rating": 5,
        "review": "These shoes are amazing! They're so comfortable and supportive. I highly recommend them."
      },
      {
        "author": "Jane Doe",
        "rating": 4,
        "review": "I love these shoes! They're perfect for long runs and everyday wear. They're a little bit on the expensive side, but they're worth it."
      }
    ]
  },
  {
    "product_id": 3,
    "product_name": "Puma Suede Classic",
    "category": "shoes",
    "target_gender": "unisex",
    "description": "The Puma Suede Classic is a classic sneaker that has been around for decades. It features a comfortable suede upper and a rubber sole. It's perfect for everyday wear.",
    "price": 80.00,
    "stock": 100,
    "company_name": "Puma",
    "product_images": "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
    "reviews": [
      {
        "author": "John Doe",
        "rating": 5,
        "review": "These shoes are amazing! They're so comfortable and stylish. I highly recommend them."
      },
      {
        "author": "Jane Doe",
        "rating": 4,
        "review": "I love these shoes! They're perfect for everyday wear. They're a little bit on the expensive side, but they're worth it."
      }
    ]
  },
  {
    "product_id": 4,
    "product_name": "Nike Air Max 270",
    "category": "shoes",
    "target_gender": "unisex",
    "description": "The Nike Air Max 270 is a running shoe that features a comfortable Air Max cushioning system and a React foam midsole. It's designed to provide support and energy return for long-distance runs.",
    "price": 160.00,
    "stock": 50,
    "company_name": "Nike",
    "product_images": "https://images.unsplash.com/photo-1562687782-9f2fd422a334",
    "reviews": [
      {
        "author": "John Smith",
        "rating": 5,
        "review": "These shoes are amazing! They're so comfortable and supportive. I highly recommend them."
      },
      {
        "author": "Jane Doe",
        "rating": 4,
        "review": "I love these shoes! They're perfect for long runs and everyday wear. They're a little bit on the expensive side, but they're worth it."
      }
    ]
  },
  {
    "product_id": 5,
    "product_name": "Adidas Stan Smith",
    "category": "shoes",
    "target_gender": "unisex",
    "description": "The Adidas Stan Smith is a classic tennis shoe that has been around for decades. It features a comfortable leather upper and a rubber sole. It's perfect for everyday wear.",
    "price": 80.00,
    "stock": 100,
    "company_name": "Adidas",
    "product_images": "https://images.unsplash.com/photo-1544441892-794166f1e3be",
    "reviews": [
      {
        "author": "John Smith",
        "rating": 5,
        "review": "These shoes are amazing! They're so comfortable and stylish. I highly recommend them."
      },
      {
        "author": "Jane Doe",
        "rating": 4,
        "review": "I love these shoes! They're perfect for everyday wear. They're a little bit on the expensive side, but they're worth it."
      }
    ]
  },
  {
    "product_id": 6,
    "product_name": "Converse Chuck Taylor All Star",
    "category": "shoes",
    "target_gender": "unisex",
    "description": "The Converse Chuck Taylor All Star is a classic sneaker that has been around for decades. It features a comfortable canvas upper and a rubber sole. It's perfect for everyday wear.",
    "price": 60.00,
    "stock": 100,
    "company_name": "Converse",
    "product_images": "https://images.unsplash.com/photo-1536830220630-ce146cccac84",
    "reviews": [
      {
        "author": "John Smith",
        "rating": 5,
        "review": "These shoes are amazing! They're so comfortable and stylish. I highly recommend them."
      },
      {
        "author": "Jane Doe",
        "rating": 4,
        "review": "I love these shoes! They're perfect for everyday wear. They're a little bit on the expensive side, but they're worth it."
      }]
    },
    {
        "product_id": 7,
        "product_name": "New Balance 574",
        "category": "shoes",
        "target_gender": "unisex",
        "description": "The New Balance 574 is a classic running shoe that has been around for decades. It features a comfortable ENCAP midsole and a durable outsole. It's perfect for everyday wear.",
        "price": 100.00,
        "stock": 100,
        "company_name": "New Balance",
        "product_images": "https://images.unsplash.com/photo-1539185441755-769473a23570",
        "reviews": [
          {
            "author": "John Smith",
            "rating": 5,
            "review": "These shoes are amazing! They're so comfortable and stylish. I highly recommend them."
          },
          {
            "author": "Jane Doe",
            "rating": 4,
            "review": "I love these shoes! They're perfect for everyday wear. They're a little bit on the expensive side, but they're worth it."
          }
        ]
      },
    
      {
        "product_id": 8,
        "product_name": "Puma Suede Classic XXI",
        "category": "shoes",
        "target_gender": "unisex",
        "description": "The Puma Suede Classic XXI is a classic sneaker that has been updated with a modern twist. It features a comfortable suede upper and a rubber sole. It's perfect for everyday wear.",
        "price": 80.00,
        "stock": 100,
        "company_name": "Puma",
        "product_images": "https://images.unsplash.com/photo-1570464197285-9949814674a7",
        "reviews": [
          {
            "author": "John Smith",
            "rating": 5,
            "review": "These shoes are amazing! They're so comfortable and stylish. I highly recommend them."
          },
          {
            "author": "Jane Doe",
            "rating": 4,
            "review": "I love these shoes! They're perfect for everyday wear. They're a little bit on the expensive side, but they're worth it."
          }
        ]
      },
    
      {
        "product_id": 9,
        "product_name": "Vans Old Skool",
        "category": "shoes",
        "target_gender": "unisex",
        "description": "The Vans Old Skool is a classic skate shoe that has been around for decades. It features a comfortable canvas upper and a vulcanized rubber sole. It's perfect for everyday wear.",
        "price": 70.00,
        "stock": 100,
        "company_name": "Vans",
        "product_images": "https://images.unsplash.com/photo-1626379530580-6a58c5cf1d5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
        "reviews": [
          {
            "author": "John Smith",
            "rating": 5,
            "review": "These shoes are amazing! They're so comfortable and stylish. I highly recommend them."
          },
          {
            "author": "Jane Doe",
            "rating": 4,
            "review": "I love these shoes! They're perfect for everyday wear. They're a little bit on the expensive side, but they're worth it."
          }
        ]
      },
      {
        "product_id": 10,
        "product_name": "Apple iPhone 13 Pro",
        "category": "mobile",
        "target_gender": "male",
        "description": "The Apple iPhone 13 Pro is a high-end smartphone that features a powerful A15 Bionic chip, a triple-lens rear camera system, and a Super Retina XDR display.",
        "price": 999.00,
        "stock": 100,
        "company_name": "Apple",
        "product_images": "https://images.unsplash.com/photo-1672906674628-ceafd0cd6b56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80",
          
        "reviews": [
          {
            "author": "John Smith",
            "rating": 5,
            "review": "This phone is amazing! It's so powerful and the camera is incredible. I highly recommend it."
          },
          {
            "author": "Jane Doe",
            "rating": 4,
            "review": "I love this phone! It's perfect for everyday use. It's a little bit on the expensive side, but it's worth it."
          }
        ]
      },
      {
        "product_id": 11,
        "product_name": "Samsung Galaxy S22 Ultra",
        "category": "mobile",
        "target_gender": "male",
        "description": "The Samsung Galaxy S22 Ultra is a high-end smartphone that features a powerful Snapdragon 8 Gen 1 chip, a quad-lens rear camera system, and a Dynamic AMOLED 2X display.",
        "price": 1199.00,
        "stock": 100,
        "company_name": "Samsung",
        "product_images": 
          "https://images.unsplash.com/photo-1675285776817-632fb95aff51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8U2Ftc3VuZyUyMEdhbGF4eSUyMFMyMiUyMFVsdHJhJTIwbW9iaWxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
          
        "reviews": [
          {
            "author": "John Smith",
            "rating": 5,
            "review": "This phone is amazing! It's so powerful and the camera is incredible. I highly recommend it."
          },
          {
            "author": "Jane Doe",
            "rating": 4,
            "review": "I love this phone! It's perfect for everyday use. It's a little bit on the expensive side, but it's worth it."
          }
        ]
      },
      
      {
        "product_id": 12,
        "product_name": "Google Pixel 6 Pro",
        "category": "mobile",
        "target_gender": "male",
        "description": "The Google Pixel 6 Pro is a high-end smartphone that features a powerful Tensor chip, a triple-lens rear camera system, and a 6.7-inch OLED display.",
        "price": 899.00,
        "stock": 100,
        "company_name": "Google",
        "product_images": "https://images.unsplash.com/photo-1659941451212-3958a146611c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8R29vZ2xlJTIwUGl4ZWwlMjA2JTIwUHJvfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
         
        "reviews": [
          {
            "author": "John Smith",
            "rating": 5,
            "review": "This phone is amazing! It's so powerful and the camera is incredible. I highly recommend it."
          },
          {
            "author": "Jane Doe",
            "rating": 4,
            "review": "I love this phone! It's perfect for everyday use. It's a little bit on the expensive side, but it's worth it."
          }
        ]
      },
      {
        "product_id": 13,
        "product_name": "OnePlus 10 Pro",
        "category": "mobile",
        "target_gender": "male",
        "description": "The OnePlus 10 Pro is a high-end smartphone that features a powerful Snapdragon 8 Gen 1 chip, a triple-lens rear camera system, and a Fluid AMOLED 2.0 display.",
        "price": 899.00,
        "stock": 100,
        "company_name": "OnePlus",
        "product_images": 
          "https://images.unsplash.com/photo-1592726664819-98c3e9f8b10c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG9uZXBsdXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
          
        "reviews": [
          {
            "author": "John Smith",
            "rating": 5,
            "review": "This phone is amazing! It's so powerful and the camera is incredible. I highly recommend it."
          },
          {
            "author": "Jane Doe",
            "rating": 4,
            "review": "I love this phone! It's perfect for everyday use. It's a little bit on the expensive side, but it's worth it."
          }
        ]
      },
      {
        "product_id": 14,
        "product_name": "Xiaomi Mi 12 Pro",
        "category": "mobile",
        "target_gender": "male",
        "description": "The Xiaomi Mi 12 Pro is a high-end smartphone that features a powerful Snapdragon 8 Gen 1 chip, a triple-lens rear camera system, and a 6.73-inch AMOLED display.",
        "price": 899.00,
        "stock": 100,
        "company_name": "Xiaomi",
        "product_images": 
          "https://images.unsplash.com/photo-1624434207284-727cf0e6ea8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
          
        "reviews": [
          {
            "author": "John Smith",
            "rating": 5,
            "review": "This phone is amazing! It's so powerful and the camera is incredible. I highly recommend it."
          },
          {
            "author": "Jane Doe",
            "rating": 4,
            "review": "I love this phone! It's perfect for everyday use. It's a little bit on the expensive side, but it's worth it."
          }
        ]
      },
      {
        "product_id": 15,
        "product_name": "Oppo Find X5 Pro",
        "category": "mobile",
        "target_gender": "male",
        "description": "The Oppo Find X5 Pro is a high-end smartphone that features a powerful Snapdragon 8 Gen 1 chip, a triple-lens rear camera system, and a 6.7-inch LTPO AMOLED display.",
        "price": 899.00,
        "stock": 100,
        "company_name": "Oppo",
        "product_images": 
          "https://images.unsplash.com/photo-1649859394614-dc4f7290b7f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8T3BwbyUyMEZpbmQlMjBYNSUyMFByb3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
          
        "reviews": [
          {
            "author": "John Smith",
            "rating": 5,
            "review": "This phone is amazing! It's so powerful and the camera is incredible. I highly recommend it."
          },
          {
            "author": "Jane Doe",
            "rating": 4,
            "review": "I love this phone! It's perfect for everyday use. It's a little bit on the expensive side, but it's worth it."
          }
        ]
      },
      
    
      
      
];

// Endpoint to get data based on the 's' and 'id' query parameters
app.get("/api/data", (req, res) => {
  const category = req.query.s; // Get the value of 's' query parameter
  const productId = req.query.id; // Get the value of 'id' query parameter

  if (category && productId) {
    // If both 's' and 'id' parameters are provided, return the matching item
    const filteredData = data.filter(
      (item) => item.category === category && item.product_id.toString() === productId
    );
    if (filteredData.length > 0) {
      res.json(filteredData[0]); // Return the first matching item
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } else if (category) {
    // If only 's' parameter is provided, filter the data based on the 's' query parameter
    const filteredData = data.filter((item) => item.category === category);
    res.json(filteredData);
  } else if (productId) {
    // If only 'id' parameter is provided, filter the data based on the 'id' query parameter
    const filteredData = data.filter((item) => item.product_id.toString() === productId);
    if (filteredData.length > 0) {
      res.json(filteredData[0]); // Return the first matching item
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } else {
    // If neither 's' nor 'id' parameters are provided, return all data
    res.json(data);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${3000}`);
});
