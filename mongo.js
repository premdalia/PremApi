  // // index.js (your backend entry file)
  const express = require('express');
  const cors = require('cors');
  const mongoose = require('mongoose');
  const user = require('./user'); // Assign the result of require to a variable
  const app = express(); // Create an instance of Express
  const Jwt = require('jsonwebtoken');
  const JwtKey='E-commerce';
  app.use(express.json());
  app.use(cors());
  require('dotenv').config();

  // const mongourl =
  
  //   process.env.MONGODB_URI;



  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((e) => console.log('Error connecting to MongoDB:', e));

  // const User =mongoose.model("UserInfo");

  app.post('/register', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const existingUser = await user.findOne({ username });
  
      if (existingUser) {
        return res.status(400).json({ msg: 'User already exists' });
      }
  
      const newUser = new user({ username, password });
      await newUser.save();
  
      Jwt.sign({ username }, JwtKey, (err, token) => {
        if (err) {
          console.error('Error signing token:', err);
          return res.status(500).json({ msg: 'Token signing error' });
        }
        
        const userObj = { username }; 
        res.json({ userObj, auth: token });
      });
  
    } catch (error) {
      console.error('Error adding a user:', error);
      res.status(500).json({ msg: 'Internal server error' });
    }
  });
  // for login 
  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const userObj = await user.findOne({ username });
      if (!userObj || userObj.password !== password) {
        return res.status(401).json({ msg: 'Invalid credentials //' });
      }
      Jwt.sign({ userObj }, JwtKey, (err, token) => {
        if (err) {
          console.error('Error signing token:', err);
          return res.status(500).json({ msg: 'Token signing error' });
        }
        res.send({userObj,auth:token})
        // return res.json({ msg: 'Successfully signed in', token });
      });
      
      
    } catch (error) {
      console.error('Error signing in:', error);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  });


  
app.get('/', (req, res) => {
  const { s: category, id: productId, sub: subcategory, g: target_gender, cn: company_name, min: minPrice, max: maxPrice } = req.query;

  const filterParams = {
      category,
      productId,
      subcategory,
      target_gender,
      company_name,
      minPrice: minPrice ? parseFloat(minPrice) : 0,
      maxPrice: maxPrice ? parseFloat(maxPrice) : Number.MAX_VALUE
  };

  const filteredData = data.filter(item => meetsFilterCriteria(item, filterParams));

  if (filteredData.length > 0) {
      // Return an array of objects containing product details including the product name
      const products = filteredData.map(item => ({
          product_id: item.product_id,
          product_name: item.product_name,
          category: item.category,
          subcategory: item.subcategory,
          target_gender: item.target_gender,
          description: item.description,
          price: item.price,
          stock: item.stock,
          company_name: item.company_name,
          product_images: item.product_images,
          reviews: item.reviews
      }));
      res.json(products); // Return all matching products
  } else {
      res.status(404).json({ error: "Items not found" });
  }
});

function meetsFilterCriteria(item, { category, productId, subcategory, target_gender, company_name, minPrice, maxPrice }) {
  return (
      (!category || item.category === category) &&
      (!productId || item.product_id.toString() === productId) &&
      (!subcategory || item.subcategory === subcategory) &&
      (!target_gender || (Array.isArray(target_gender) ? target_gender.includes(item.target_gender) : item.target_gender === target_gender)) &&
      (!company_name || item.company_name === company_name) &&
      (item.price >= minPrice && item.price <= maxPrice)
  );
}

app.listen(5000, () => {
  console.log('Server started on http://localhost:5000');
});




  // app.post('/add-visited', async (req, res) => {
  //   const { username, visitedItem } = req.body;
  
  //   try {
  //     const userObj = await user.findOne({ username });
  
  //     if (!userObj) {
  //       return res.status(404).json({ msg: 'User not found' });
  //     }
  
  //     userObj.recentlyVisited.push(visitedItem);
  //     await userObj.save();
  
  //     res.json({ msg: 'Visited item added successfully' });
  //   } catch (error) {
  //     console.error('Error adding visited item:', error);
  //     res.status(500).json({ msg: 'Internal server error' });
  //   }
  // });
  

  // ... (Start the server and other necessary code)
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
        {
          "product_id": 52,
          "product_name": "The Alchemist",
          "category": "books",
          "description": "The Alchemist is a story about a young shepherd named Santiago who travels from his homeland in Spain to the Egyptian desert in search of treasure buried near the Pyramids. Along the way, he meets a variety of people who teach him about life, love, and the importance of following one's dreams.",
          "price": 19.99,
          "old_price": 24.99,
          "stock": 100,
          "company_name": "HarperCollins",
          "image": "https://rukminim2.flixcart.com/image/612/612/l0igvww0/book/h/d/x/the-alchemist-original-imagcaky5hgdyzyg.jpeg?q=70",
          "reviews": [
            {
              "author": "John Smith",
              "rating": 5,
              "review": "This book is amazing! It's so inspiring and thought-provoking. I highly recommend it."
            },
            {
              "author": "Jane Doe",
              "rating": 4,
              "review": "I love this book! It's a great story with a lot of wisdom to offer."
            }
          ]
        },
        {
          "product_id": 53,
          "product_name": "To Kill a Mockingbird",
          "category": "books",
          "description": "To Kill a Mockingbird is a novel by Harper Lee that was published in 1960. It won the Pulitzer Prize and was adapted into an Academy Award-winning film in 1962. The novel tells the story of a young girl named Scout who learns about racism and courage from her father, Atticus Finch, a lawyer who defends a black man accused of rape.",
          "price": 15.99,
          "old_price": 19.99,
          "stock": 100,
          "company_name": "HarperCollins",
          "image": "https://rukminim2.flixcart.com/image/612/612/kkr72q80/regionalbooks/s/i/o/to-kill-a-mockingbird-original-imagyf9vuhjv4nwg.jpeg?q=70",
          "reviews": [
            {
              "author": "John Smith",
              "rating": 5,
              "review": "This book is a classic for a reason! It's so well-written and thought-provoking. I highly recommend it."
            },
            {
              "author": "Jane Doe",
              "rating": 4,
              "review": "I love this book! It's a powerful story about racism and justice."
            }
          ]
        },
        {
          "product_id": 62,
          "product_name": "The Hitchhiker's Guide to the Galaxy",
          "category": "books",
          "description": "The Hitchhiker's Guide to the Galaxy is a comedy science fiction series created by Douglas Adams. The series follows the adventures of Arthur Dent, a hapless Englishman, following the destruction of the Earth by the Vogons, a race of unpleasant and bureaucratic aliens.",
          "price": 12.99,
          "old_price": 14.99,
          "stock": 100,
          "company_name": "Pan Books",
          "image": "https://rukminim2.flixcart.com/image/612/612/kzpw2vk0/book/e/f/6/the-ultimate-hitchhiker-s-guide-to-the-galaxy-original-imagbnsp6nwscput.jpeg?q=70",
          "reviews": [
            {
              "author": "John Smith",
              "rating": 5,
              "review": "This book is hilarious! It's a must-read for any fan of science fiction or comedy."
            },
            {
              "author": "Jane Doe",
              "rating": 4,
              "review": "I love this book! It's so clever and thought-provoking."
            }
          ]
        },
        {
          "product_id": 63,
          "product_name": "The Lord of the Rings",
          "category": "books",
          "description": "The Lord of the Rings is an epic high fantasy trilogy written by English philologist and University of Oxford professor J. R. R. Tolkien. The story began as a sequel to Tolkien's 1937 fantasy novel The Hobbit, but eventually developed into a much larger work. Written in stages between 1937 and 1949, with much of it being written during World War II, it was originally published in three volumes in 1954 and 1955.",
          "price": 22.99,
          "old_price": 25.99,
          "stock": 100,
          "company_name": "Allen & Unwin",
          "image": "https://rukminim2.flixcart.com/image/612/612/l1ch4sw0/book/g/m/y/the-lord-of-the-rings-a-reader-s-companion-original-imagcxu79tzft2j8.jpeg?q=70",
          "reviews": [
            {
              "author": "John Smith",
              "rating": 5,
              "review": "This book is an epic masterpiece! It's one of the greatest fantasy novels ever written."
            },
            {
              "author": "Jane Doe",
              "rating": 4,
              "review": "I love this book! It's an amazing story with unforgettable characters."
            }
          ]
        },
        {
          "product_id": 72,
          "product_name": "The Book Thief",
          "category": "books",
          "description": "The Book Thief is a historical novel by Markus Zusak set in Nazi Germany. The story is narrated by Death, who tells the story of Liesel Meminger, a young girl who is sent to live with foster parents in Molching during World War II. Liesel learns to read and steals books, which she shares with her foster father.",
          "price": 13.99,
          "old_price": 15.99,
          "stock": 100,
          "company_name": "Knopf Books",
          "image": "https://rukminim2.flixcart.com/image/612/612/xif0q/book/y/7/l/the-book-thief-original-imaghh84nr3cdjz9.jpeg?q=70",
          "reviews": [
            {
              "author": "John Smith",
              "rating": 5,
              "review": "This book is a beautiful and heartbreaking story. It's a must-read for anyone who loves historical fiction or coming-of-age stories."
            },
            {
              "author": "Jane Doe",
              "rating": 4,
              "review": "I love this book! It's a powerful story about the importance of words and the power of the human spirit."
            }
          ]
        },
        {
          "product_id": 73,
          "product_name": "The Curious Incident of the Dog in the Night-Time",
          "category": "books",
          "description": "The Curious Incident of the Dog in the Night-Time is a novel by Mark Haddon. The novel is narrated by Christopher John Francis Boone, a fifteen-year-old boy with autism who sets out to solve the mystery of who killed his neighbor's dog.",
          "price": 12.99,
          "old_price": 14.99,
          "stock": 100,
          "company_name": "Doubleday",
          "image": "https://rukminim2.flixcart.com/image/612/612/ki4w0i80-0/book/b/d/g/the-curious-incident-of-the-dog-in-the-night-time-original-imafxzdhhta4cqqc.jpeg?q=70",
          "reviews": [
            {
              "author": "John Smith",
              "rating": 5,
              "review": "This book is a fascinating and unique look at the world from the perspective of someone with autism. It's a must-read for anyone who wants to understand autism better."
            },
            {
              "author": "Jane Doe",
              "rating": 4,
              "review": "I love this book! It's a well-written and thought-provoking story that will stay with you long after you finish reading it."
            }
          ]
        },
        {
          "product_id": 82,
          "product_name": "The Kite Runner",
          "category": "books",
          "description": "The Kite Runner is a novel by Khaled Hosseini set in Afghanistan. The story is narrated by Amir, a young boy who befriends Hassan, a Hazara boy who is his father's servant. Amir's father disowns Hassan after he is accused of stealing, and Amir grows up to be a wealthy man who is haunted by his past.",
          "price": 14.99,
          "old_price": 16.99,
          "stock": 100,
          "company_name": "Riverhead Books",
          "image": "https://rukminim2.flixcart.com/image/612/612/xif0q/regionalbooks/0/q/e/the-kite-runner-book-original-imae9mgxhztnr3vs.jpeg?q=70",
          "reviews": [
            {
              "author": "John Smith",
              "rating": 5,
              "review": "This book is a beautiful and heartbreaking story. It's a must-read for anyone who loves coming-of-age stories or stories set in Afghanistan."
            },
            {
              "author": "Jane Doe",
              "rating": 4,
              "review": "I love this book! It's a powerful story about friendship, betrayal, and redemption."
            }
          ]
        },
        {
          "product_id": 83,
          "product_name": "1984",
          "category": "books",
          "description": "1984 is a dystopian novel by George Orwell. The novel is set in Airstrip One, a province of Oceania, a totalitarian state where the government controls every aspect of people's lives. The protagonist, Winston Smith, works for the Thought Police, but he begins to question the government and eventually becomes involved in a rebellion.",
          "price": 11.99,
          "old_price": 13.99,
          "stock": 100,
          "company_name": "Secker & Warburg",
          "image": "https://rukminim2.flixcart.com/image/612/612/kgqvlow0/book/9/0/1/1984-original-imafwwgwuzswhadz.jpeg?q=70",
          "reviews": [
            {
              "author": "John Smith",
              "rating": 5,
              "review": "This book is a classic for a reason! It's a thought-provoking and chilling look at a possible future."
            },
            {
              "author": "Jane Doe",
              "rating": 4,
              "review": "I love this book! It's a powerful story about the dangers of totalitarianism."
            }
          ]
  
        },
        {
          "product_id": 5001,
          "product_name": "Elegant Black Dress",
          "category": "dresses",
          "subcategory": "clothes",
          "target_gender": "woman",
          "description": "An elegant black dress perfect for formal occasions and evening events. The dress features a flattering A-line silhouette with a V-neckline and 3/4 sleeves.",
          "price": 120,
          "stock": 30,
          "company_name": "FashionElite",
          "product_images": "https://rukminim2.flixcart.com/image/612/612/xif0q/dress/i/5/w/m-dv333-daevish-original-imaga8zhya5kgvgw-bb.jpeg?q=70",
          "reviews": [
            {
              "author": "Sophia Miller",
              "rating": 5,
              "review": "This dress is absolutely stunning! It fits perfectly and makes me feel like a queen."
            },
            {
              "author": "Emma Johnson",
              "rating": 4,
              "review": "Love the dress, but the sleeves are a bit tight. Overall, it's a beautiful piece."
            }
          ]
        },
        {
          "product_id": 5002,
          "product_name": "Men's Classic White Shirt",
          "category": "shirts",
          "subcategory": "clothes",
  
          "target_gender": "man",
          "description": "A classic white shirt for men, perfect for both formal and casual occasions. The shirt is made of high-quality cotton and features a regular fit.",
          "price": 45,
          "stock": 50,
          "company_name": "Men'sStyleCo",
          "product_images": "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/q/r/d/s-st2-vebnor-original-imagpv9ahx6dukkr.jpeg?q=70",
          "reviews": [
            {
              "author": "John Smith",
              "rating": 5,
              "review": "The shirt fits perfectly and looks great. I'm very happy with this purchase."
            },
            {
              "author": "Michael Brown",
              "rating": 4,
              "review": "Nice shirt, but the fabric could be a bit softer. Still, it's a good buy."
            }
          ]
        },
        {
          "product_id": 5003,
          "product_name": "Casual Denim Jacket",
          "category": "jackets",
          "subcategory": "clothes",
  
          "target_gender": "unisex",
          "description": "A trendy denim jacket for casual everyday wear. The jacket has a classic design with front button closures and multiple pockets.",
          "price": 70,
          "stock": 40,
          "company_name": "DenimVibe",
          "product_images": "https://rukminim2.flixcart.com/image/612/612/xif0q/jacket/m/f/n/m-no-denim-jacket-for-women-and-girls-qtsy-original-imagagtkegejahxg-bb.jpeg?q=70",
          "reviews": [
            {
              "author": "Laura Adams",
              "rating": 5,
              "review": "Love this denim jacket! It's comfortable and goes well with any outfit."
            },
            {
              "author": "David Lee",
              "rating": 4,
              "review": "The jacket is stylish, but the sleeves are a bit short for me. Still, I like it."
            }
          ]
        },
        {
          "product_id": 5004,
          "product_name": "Athletic Yoga Leggings",
          "category": "leggings",
          "subcategory": "clothes",
  
          "target_gender": "woman",
          "description": "High-performance yoga leggings designed for maximum comfort and flexibility during workouts. The leggings have a moisture-wicking fabric and a supportive waistband.",
          "price": 55,
          "stock": 60,
          "company_name": "ActiveFit",
          "product_images": "https://rukminim2.flixcart.com/image/612/612/xif0q/legging/5/z/t/xl-20476280-her-by-invictus-original-imagq5e2cwatzxrf.jpeg?q=70",
          "reviews": [
            {
              "author": "Sarah Turner",
              "rating": 5,
              "review": "These leggings are perfect for yoga and other workouts. They're so comfortable!"
            },
            {
              "author": "Emily Martinez",
              "rating": 4,
              "review": "Great leggings, but the waistband could be a bit tighter. Overall, they're good."
            }
          ]
        },
        {
          "product_id": 5005,
          "product_name": "Stylish Linen Shirt",
          "category": "shirts",
          "subcategory": "clothes",
  
          "target_gender": "man",
          "description": "A stylish linen shirt for men, perfect for summer and casual occasions. The shirt features a relaxed fit and a button-down collar.",
          "price": 60,
          "stock": 70,
          "company_name": "LinenFusion",
          "product_images": "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/i/x/n/xl-hlzs000028-highlander-original-imagqy4f8rntvnqv.jpeg?q=70",
          "reviews": [
            {
              "author": "Alex Johnson",
              "rating": 5,
              "review": "This linen shirt is perfect for hot days. It's comfortable and looks great."
            },
            {
              "author": "Daniel White",
              "rating": 4,
              "review": "Nice shirt, but it wrinkles easily. Apart from that, I'm happy with it."
            }
          ]
        },
        {
          "product_id": 5006,
          "product_name": "Floral Maxi Dress",
          "category": "dresses",
          "subcategory": "clothes",
  
          "target_gender": "woman",
          "description": "A beautiful floral maxi dress, perfect for summer and beach outings. The dress features a flowy design with a halter neck and a cinched waist.",
          "price": 90,
          "stock": 35,
          "company_name": "SummerGlow",
          "product_images": "https://rukminim2.flixcart.com/image/612/612/xif0q/dress/4/d/g/l-gr5759-black-harpa-original-imafwyv3vfe8wngb-bb.jpeg?q=70",
          "reviews": [
            {
              "author": "Olivia Turner",
              "rating": 5,
              "review": "This dress is stunning! The floral print and fit are perfect for summer."
            },
            {
              "author": "Jessica Clark",
              "rating": 4,
              "review": "Lovely dress, but the neckline is a bit low for my liking. Still, it's pretty."
            }
          ]
        },
        {
          "product_id": 5007,
          "product_name": "Men's Casual Polo Shirt",
          "category": "shirts",
          "subcategory": "clothes",
  
          "target_gender": "man",
          "description": "A comfortable and casual polo shirt for men, suitable for various everyday activities. The shirt is made of breathable fabric and features a classic polo collar.",
          "price": 35,
          "stock": 80,
          "company_name": "CasualTrend",
          "product_images": "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/j/m/2/xxl-ifst-37-tclast-original-imagqz6nkusznnnt.jpeg?q=70",
          "reviews": [
            {
              "author": "John Davis",
              "rating": 4,
              "review": "Nice polo shirt, but the size runs a bit small. Still, it's a good purchase."
            },
            {
              "author": "Michael Adams",
              "rating": 5,
              "review": "I love this polo shirt! It's comfortable and perfect for casual outings."
            }
          ]
        },
        {
          "product_id": 5008,
          "product_name": "Cozy Oversized Sweater",
          "category": "sweaters",
          "subcategory": "clothes",
  
          "target_gender": "woman",
          "description": "A cozy oversized sweater for women, ideal for staying warm during colder days. The sweater features a loose fit and a stylish cable-knit pattern.",
          "price": 75,
          "stock": 90,
          "company_name": "CozyChic",
          "product_images": "https://rukminim2.flixcart.com/image/612/612/xif0q/sweater/g/7/3/xxl-mc-sw-3481-orn-mansicollections-original-imagqy7jqkgkgtzu.jpeg?q=70",
          "reviews": [
            {
              "author": "Laura Martinez",
              "rating": 4,
              "review": "The sweater is warm and comfy, but it sheds a bit. Other than that, I like it."
            },
            {
              "author": "Sophia Turner",
              "rating": 5,
              "review": "I absolutely adore this oversized sweater! It's my go-to piece for winter."
            }
          ]
        },
        {
          "product_id": 5009,
          "product_name": "Classic Tailored Suit",
          "category": "suits",
          "subcategory": "clothes",
  
          "target_gender": "man",
          "description": "A classic tailored suit for men, suitable for formal events and business occasions. The suit includes a jacket and trousers with a timeless design.",
          "price": 250,
          "stock": 25,
          "company_name": "TailorMasters",
          "product_images": "https://rukminim2.flixcart.com/image/612/612/xif0q/blazer/u/p/b/38-18240652-mr-bowerbird-original-imaghmt5jshkdxjh.jpeg?q=70",
          "reviews": [
            {
              "author": "Daniel Smith",
              "rating": 5,
              "review": "This suit is exceptional! The fit is perfect, and the quality is outstanding."
            },
            {
              "author": "Mark Johnson",
              "rating": 4,
              "review": "The suit looks great, but the pants needed some alterations. Overall, it's good."
            }
          ]
        },
        {
          "product_id": 5010,
          "product_name": "Active Performance Shorts",
          "category": "shorts",
          "subcategory": "clothes",
  
          "target_gender": "unisex",
          "description": "High-performance active shorts suitable for various sports and workouts. The shorts are made of moisture-wicking fabric and have a stretchy waistband.",
          "price": 40,
          "stock": 55,
          "company_name": "ActiveLife",
          "product_images": "https://rukminim2.flixcart.com/image/612/612/xif0q/short/l/x/q/m-st-101-ss-02-pack-of-2-solid-men-gym-and-sport-short-and-track-original-imagq65xhv2hzksn.jpeg?q=70",
          "reviews": [
            {
              "author": "Alex Turner",
              "rating": 5,
              "review": "These shorts are perfect for my workouts. They're comfortable and stay in place."
            },
            {
              "author": "Emily White",
              "rating": 4,
              "review": "The shorts are great, but the sizing is a bit off. Still, they're good."
            }
      
        
          ]
           },
  
  
            {
          "product_id": 5011,
          "product_name": "Ethnic set of Dress",
          "category": "traditional",
          "subcategory": "clothes",
  
          "target_gender": "woman",
          "description": "High-performance active shorts suitable for various sports and workouts. The shorts are made of moisture-wicking fabric and have a stretchy waistband.",
          "price": 40,
          "stock": 55,
          "company_name": "ActiveLife",
          "product_images": "https://rukminim2.flixcart.com/image/612/612/xif0q/ethnic-set/o/n/y/l-pant-set-maroon-pahraava-original-imagru9fubmhtfmg.jpeg?q=70",
          "reviews": [
            {
              "author": "Alex Turner",
              "rating": 5,
              "review": "These shorts are perfect for my workouts. They're comfortable and stay in place."
            },
            {
              "author": "Emily White",
              "rating": 4,
              "review": "The shorts are great, but the sizing is a bit off. Still, they're good."
            }
      
        
          ]
          },
          {
            "product_id": 5012,
            "product_name": "Classic Shirt",
            "category": "shirts",
            "subcategory": "clothes",
            "target_gender": "unisex",
            "description": "A timeless classic white shirt that complements any outfit. Made from high-quality cotton with a tailored fit for both men and women.",
            "price": 39.99,
            "stock": 50,
            "company_name": "FashionUnite",
            "product_images": "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/t/i/w/l-msshrt20157-mascln-sassafras-original-imagpwb2wufkhfhf.jpeg?q=70",
            "reviews": [
              {
                "author": "Alex Johnson",
                "rating": 5,
                "review": "This shirt is perfect! I love the fit and feel."
              },
              {
                "author": "Taylor Lee",
                "rating": 4,
                "review": "Great quality shirt, but I wish it came in more colors."
              }
            ]
          },
  
          {
            "product_id": 5013,
            "product_name": "Denim Jacket",
            "category": "jackets",
            "subcategory": "clothes",
            "target_gender": "unisex",
            "description": "A versatile denim jacket that never goes out of style. It's perfect for layering and adds a touch of casual cool to any outfit.",
            "price": 69.99,
            "stock": 35,
            "company_name": "UrbanTrends",
            "product_images": "https://rukminim2.flixcart.com/image/612/612/km2clu80/jacket/1/c/l/s-mnt-7003-montrez-original-imagffv4shrzd63z.jpeg?q=70",
            "reviews": [
              {
                "author": "Chris Smith",
                "rating": 4,
                "review": "Great jacket, but I wish it had more pockets."
              },
              {
                "author": "Emma Davis",
                "rating": 5,
                "review": "Love this jacket! It's my go-to piece for any casual occasion."
              }
            ]
          },
          {
            "product_id": 5014,
            "product_name": "Basic Black Trousers",
            "category": "trousers",
            "subcategory": "clothes",
            "target_gender": "unisex",
            "description": "A staple in any wardrobe, these basic black trousers offer comfort and style for both men and women. Perfect for office and everyday wear.",
            "price": 49.99,
            "stock": 60,
            "company_name": "StyleHub",
            "product_images": "https://rukminim2.flixcart.com/image/612/612/xif0q/trouser/c/4/l/34-trouderam-helken-original-imagz3mhhzpg7fnx.jpeg?q=70",
            "reviews": [
              {
                "author": "Jennifer White",
                "rating": 5,
                "review": "These trousers fit perfectly and are so comfortable to wear."
              },
              {
                "author": "Michael Johnson",
                "rating": 4,
                "review": "Nice quality trousers, but they run a bit long for my taste."
              }
            ]
          },
          {
            "product_id": 5015,
            "product_name": "Cotton Hoodie",
            "category": "hoodies",
            "subcategory": "clothes",
            "target_gender": "unisex",
            "description": "A cozy cotton hoodie that's perfect for chilly days. Features a front kangaroo pocket and a drawstring hood.",
            "price": 45.99,
            "stock": 25,
            "company_name": "CozyWear",
            "product_images": "https://rukminim2.flixcart.com/image/612/612/xif0q/sweatshirt/z/n/e/9-10-years-gl22-sw102-pr-alan-jones-original-imagrzxdtz5vs57p.jpeg?q=70",
            "reviews": [
              {
                "author": "David Wilson",
                "rating": 5,
                "review": "This hoodie is so comfortable! I wear it all the time."
              },
              {
                "author": "Sophia Adams",
                "rating": 4,
                "review": "Great hoodie, but I wish it had a bit more room in the sleeves."
              }
            ]
          }
          
          
          
  
  
  
          
  
  
        //   {
        //     "product_id": 5012,
        //     "product_name": "AllWeather Sports Watch",
        //     "category": "Watches",
        //     "subcategory": "Accessories",
        //     "target_gender": "Unisex",
        //     "description": "Versatile sports watch with various functions for running, swimming, and tracking fitness activities. Waterproof and durable.",
        //     "price": 95,
        //     "stock": 25,
        //     "company_name": "TimeMaster",
        //     "product_images": "",
        //     "reviews": [
        //         {"author": "Daniel Anderson", "rating": 5, "review": "This watch is incredible! It tracks everything, and I love the sleek design."},
        //         {"author": "Jessica Evans", "rating": 4, "review": "Great sports watch, but the user interface could be more intuitive."}
        //     ]
        // },
        // {
        //     "product_id": 5013,
        //     "product_name": "Premium Yoga Mat",
        //     "category": "Yoga Gear",
        //     "subcategory": "Sports",
        //     "target_gender": "Unisex",
        //     "description": "High-density yoga mat with excellent grip and cushioning. Ideal for yoga, pilates, and floor exercises.",
        //     "price": 50,
        //     "stock": 50,
        //     "company_name": "YogaZen",
        //     "product_images": "https://example.com/images/yogazen-mat.jpg",
        //     "reviews": [
        //         {"author": "Sophie Adams", "rating": 5, "review": "This yoga mat is perfect! I feel so stable and supported during my practice."},
        //         {"author": "Ryan Mitchell", "rating": 4, "review": "Great quality mat, but I wish it was a bit thicker for more cushioning."}
        //     ]
        // },
        // {
        //     "product_id": 5014,
        //     "product_name": "AdventureTrail Running Shoes",
        //     "category": "Shoes",
        //     "subcategory": "Sports",
        //     "target_gender": "Unisex",
        //     "description": "Trail running shoes with rugged soles for excellent traction on uneven terrain. Lightweight and breathable for long runs.",
        //     "price": 80,
        //     "stock": 35,
        //     "company_name": "TrekRunner",
        //     "product_images": "https://example.com/images/trekrunner-shoes.jpg",
        //     "reviews": [
        //         {"author": "Gregory Turner", "rating": 5, "review": "These trail shoes are fantastic! My feet feel secure on rocky paths."},
        //         {"author": "Emily Wilson", "rating": 4, "review": "The shoes are comfortable, but they could have more color options."}
        //     ]
        // },
        // {
        //     "product_id": 5015,
        //     "product_name": "CoreFlex Resistance Bands",
        //     "category": "Fitness Equipment",
        //     "subcategory": "Accessories",
        //     "target_gender": "Unisex",
        //     "description": "Set of resistance bands with varying levels of tension for strength training and stretching exercises.",
        //     "price": 30,
        //     "stock": 60,
        //     "company_name": "FlexPower",
        //     "product_images": "https://example.com/images/flexpower-bands.jpg",
        //     "reviews": [
        //         {"author": "Michaela Turner", "rating": 5, "review": "These resistance bands are fantastic! They're versatile and high-quality."},
        //         {"author": "Robert Carter", "rating": 3, "review": "The bands are good, but the highest tension could be more challenging."}
        //     ]
        // },
        // {
        //     "product_id": 5016,
        //     "product_name": "QuickDry Beach Towel",
        //     "category": "Towels",
        //     "subcategory": "Accessories",
        //     "target_gender": "Unisex",
        //     "description": "Absorbent and quick-drying beach towel made from microfiber material. Lightweight and compact for easy carrying.",
        //     "price": 20,
        //     "stock": 70,
        //     "company_name": "BeachLife",
        //     "product_images": "https://example.com/images/beachlife-towel.jpg",
        //     "reviews": [
        //         {"author": "Jennifer Reed", "rating": 4, "review": "This beach towel is perfect for vacations! It dries quickly and takes up little space in my bag."},
        //         {"author": "Alex Green", "rating": 5, "review": "Love the quality and texture of this towel. Great for beach trips!"}
        //     ]
        // },
        // {
        //     "product_id": 5017,
        //     "product_name": "HydroCharge Water Bottle",
        //     "category": "Water Bottles",
        //     "subcategory": "Accessories",
        //     "target_gender": "Unisex",
        //     "description": "Insulated water bottle that keeps beverages cold for hours. Perfect for outdoor activities and workouts.",
        //     "price": 25,
        //     "stock": 40,
        //     "company_name": "HydraTech",
        //     "product_images": "https://example.com/images/hydratech-bottle.jpg",
        //     "reviews": [
        //         {"author": "Mark Johnson", "rating": 5, "review": "This water bottle is amazing! It keeps my drink cold even during long hikes."},
        //         {"author": "Rachel Adams", "rating": 4, "review": "Great bottle, but the lid could be easier to clean."}
        //     ]
        // },
        // {
        //     "product_id": 5018,
        //     "product_name": "ProZone Basketball",
        //     "category": "Basketballs",
        //     "subcategory": "Sports",
        //     "target_gender": "Unisex",
        //     "description": "Premium indoor/outdoor basketball with excellent grip and durability. Ideal for basketball enthusiasts and training sessions.",
        //     "price": 35,
        //     "stock": 20,
        //     "company_name": "PlayMaster",
        //     "product_images": "https://example.com/images/playmaster-basketball.jpg",
        //     "reviews": [
        //         {"author": "Jason Davis", "rating": 5, "review": "This basketball is top-notch! Perfect for street games and indoor courts."},
        //         {"author": "Michelle Wilson", "rating": 4, "review": "Great basketball, but the grip could be a bit tackier."}
        //     ]
        // },
        
      
      
        
        
  ];












  
  // Endpoint to get data based on the 's' and 'id' query parameters
  // app.get('/', (req, res) => {
  //   const category = req.query.s;
  //   const productId = req.query.id;
  //   const subcategory = req.query.sub;
  //   const target_gender = req.query.g;
  //   const company_name = req.query.cn;
  //   const minPrice = req.query.min ? parseFloat(req.query.min) : 0; // Retrieve minimum price query parameter
  //   const maxPrice = req.query.max ? parseFloat(req.query.max) : Number.MAX_VALUE;

  //   // const minPrice = req.query.min; // Retrieve minimum price query parameter
  //   // const maxPrice = req.query.max;
  
  //   if (category && productId && subcategory && target_gender && minPrice && maxPrice) {
  //     // If all parameters are provided, return the matching item within the price range
  //     const filteredData = data.filter(
  //         (item) =>
  //             item.category === category &&
  //             item.product_id.toString() === productId &&
  //             item.subcategory === subcategory &&
  //             item.target_gender === target_gender &&
  //             item.price >= minPrice &&
  //             item.price <= maxPrice
  //     );
  //     if (filteredData.length > 0) {
  //         res.json(filteredData[0]); // Return the first matching item
  //     } else {
  //         res.status(404).json({ error: "Item not found" });
  //     }}
  //     else if (category && productId && subcategory && minPrice && maxPrice) {
  //       // If 's', 'id', 'sub', 'min', and 'max' parameters are provided, return matching item within price range
  //       const filteredData = data.filter(
  //           (item) =>
  //               item.category === category &&
  //               item.product_id.toString() === productId &&
  //               item.subcategory === subcategory &&
  //               item.price >= minPrice &&
  //               item.price <= maxPrice
  //       );
  //       if (filteredData.length > 0) {
  //           res.json(filteredData[0]); // Return the first matching item
  //       } else {
  //           res.status(404).json({ error: "Item not found" });
  //       }
  //   } else if (category && productId && target_gender && minPrice && maxPrice) {
  //       // If 's', 'id', 'g', 'min', and 'max' parameters are provided, return matching item within price range
  //       const target_genders = Array.isArray(target_gender) ? target_gender : [target_gender];
  //       const filteredData = data.filter(
  //           (item) =>
  //               item.category === category &&
  //               item.product_id.toString() === productId &&
  //               target_genders.includes(item.target_gender) &&
  //               item.price >= minPrice &&
  //               item.price <= maxPrice
  //       );
  //       if (filteredData.length > 0) {
  //           res.json(filteredData[0]); // Return the first matching item
  //       } else {
  //           res.status(404).json({ error: "Item not found" });
  //       }
  //   } else if (category && subcategory && target_gender && minPrice && maxPrice) {
  //       // If 's', 'sub', 'g', 'min', and 'max' parameters are provided, filter the data based on all three
  //       const target_genders = Array.isArray(target_gender) ? target_gender : [target_gender];
  //       const filteredData = data.filter(
  //           (item) =>
  //               item.category === category &&
  //               item.subcategory === subcategory &&
  //               target_genders.includes(item.target_gender) &&
  //               item.price >= minPrice &&
  //               item.price <= maxPrice
  //       );
  //       res.json(filteredData);
  //   } else if (subcategory && target_gender && minPrice && maxPrice) {
  //       // If 'sub', 'g', 'min', and 'max' parameters are provided, filter the data based on all three
  //       const target_genders = Array.isArray(target_gender) ? target_gender : [target_gender];
  //       const filteredData = data.filter(
  //           (item) =>
  //               item.subcategory === subcategory &&
  //               target_genders.includes(item.target_gender) &&
  //               item.price >= minPrice &&
  //               item.price <= maxPrice
  //       );
  //       res.json(filteredData);
  //   } else if (target_gender && minPrice && maxPrice) {
  //       // If 'g', 'min', and 'max' parameters are provided, filter the data based on all three
  //       const target_genders = Array.isArray(target_gender) ? target_gender : [target_gender];
  //       const filteredData = data.filter(
  //           (item) =>
  //               target_genders.includes(item.target_gender) &&
  //               item.price >= minPrice &&
  //               item.price <= maxPrice
  //       );
  //       res.json(filteredData);
  //   } else if (minPrice && maxPrice) {
  //       // If only 'min' and 'max' parameters are provided, filter the data based on price range
  //       const filteredData = data.filter(
  //           (item) =>
  //               item.price >= minPrice &&
  //               item.price <= maxPrice
  //       );
  //       res.json(filteredData);}



  //       else if (subcategory && minPrice && maxPrice) {
  //         // If 'sub', 'min', and 'max' parameters are provided, filter the data based on all three
  //         const filteredData = data.filter(
  //             (item) =>
  //                 item.subcategory === subcategory &&
  //                 item.price >= minPrice &&
  //                 item.price <= maxPrice
  //         );
  //         res.json(filteredData);
  //     } else if (category && minPrice && maxPrice) {
  //         // If 's', 'min', and 'max' parameters are provided, filter the data based on all three
  //         const filteredData = data.filter(
  //             (item) =>
  //                 item.category === category &&
  //                 item.price >= minPrice &&
  //                 item.price <= maxPrice
  //         );
  //         res.json(filteredData);
  //     } else if (productId && minPrice && maxPrice) {
  //         // If 'id', 'min', and 'max' parameters are provided, filter the data based on all three
  //         const filteredData = data.filter(
  //             (item) =>
  //                 item.product_id.toString() === productId &&
  //                 item.price >= minPrice &&
  //                 item.price <= maxPrice
  //         );
  //         res.json(filteredData);
  //     } else if (company_name && minPrice && maxPrice) {
  //         // If 'cn', 'min', and 'max' parameters are provided, filter the data based on all three
  //         const filteredData = data.filter(
  //             (item) =>
  //                 item.company_name === company_name &&
  //                 item.price >= minPrice &&
  //                 item.price <= maxPrice
  //         );
  //         res.json(filteredData);
  //     } else if (minPrice && maxPrice) {
  //         // If only 'min' and 'max' parameters are provided, filter the data based on price range
  //         const filteredData = data.filter(
  //             (item) =>
  //                 item.price >= minPrice &&
  //                 item.price <= maxPrice
  //         );
  //         res.json(filteredData);
  //     }



  //     else if (category && productId && subcategory && target_gender) {
  //     // If all parameters are provided, return the matching item
  //     const filteredData = data.filter(
  //       (item) =>
  //         item.category === category &&
  //         item.product_id.toString() === productId &&
  //         item.subcategory === subcategory &&
  //         item.target_gender === target_gender
  //     );
  //     if (filteredData.length > 0) {
  //       res.json(filteredData[0]); // Return the first matching item
  //     } else {
  //       res.status(404).json({ error: "Item not found" });
  //     }
  //   }
    
    

    
    
  //   else if (category && productId && subcategory) {
  //     // If 's', 'id', and 'sub' parameters are provided, return matching item
  //     const filteredData = data.filter(
  //       (item) =>
  //         item.category === category &&
  //         item.product_id.toString() === productId &&
  //         item.subcategory === subcategory
  //     );
  //     if (filteredData.length > 0) {
  //       res.json(filteredData[0]); // Return the first matching item
  //     } else {
  //       res.status(404).json({ error: "Item not found" });
  //     }
  //   } else if (category && productId && target_gender) {
  //     // If 's', 'id', and 'g' parameters are provided, return matching item
  //     const target_genders = Array.isArray(target_gender) ? target_gender : [target_gender];
  //     const filteredData = data.filter(
  //       (item) =>
  //         item.category === category &&
  //         item.product_id.toString() === productId &&
  //         target_genders.includes(item.target_gender)
  //     );
  //     if (filteredData.length > 0) {
  //       res.json(filteredData[0]); // Return the first matching item
  //     } else {
  //       res.status(404).json({ error: "Item not found" });
  //     }
  //   } else if (category && subcategory && target_gender) {
  //     // If 's', 'sub', and 'g' parameters are provided, filter the data based on all three
  //     const target_genders = Array.isArray(target_gender) ? target_gender : [target_gender];
  //     const filteredData = data.filter(
  //       (item) =>
  //         item.category === category &&
  //         item.subcategory === subcategory &&
  //         target_genders.includes(item.target_gender)
  //     );
  //     res.json(filteredData);
  //   } else if (productId && subcategory && target_gender) {
  //     // If 'id', 'sub', and 'g' parameters are provided, filter the data based on all three
  //     const target_genders = Array.isArray(target_gender) ? target_gender : [target_gender];
  //     const filteredData = data.filter(
  //       (item) =>
  //         item.product_id.toString() === productId &&
  //         item.subcategory === subcategory &&
  //         target_genders.includes(item.target_gender)
  //     );
  //     res.json(filteredData);
  //   } else if (category && productId) {
  //     // If 's' and 'id' parameters are provided, return matching item
  //     const filteredData = data.filter(
  //       (item) =>
  //         item.category === category &&
  //         item.product_id.toString() === productId
  //     );
  //     if (filteredData.length > 0) {
  //       res.json(filteredData[0]); // Return the first matching item
  //     } else {
  //       res.status(404).json({ error: "Item not found" });
  //     }
  //   } else if (category && subcategory) {
  //     // If 's' and 'sub' parameters are provided, filter the data based on both
  //     const filteredData = data.filter(
  //       (item) =>
  //         item.category === category &&
  //         item.subcategory === subcategory
  //     );
  //     res.json(filteredData);
  //   } else if (company_name && subcategory) {
  //     // If 's' and 'sub' parameters are provided, filter the data based on both
  //     const filteredData = data.filter(
  //       (item) =>
  //         item.company_name === company_name &&
  //         item.subcategory === subcategory
  //     );
  //     res.json(filteredData);
  //   } else if (category && target_gender) {
  //     // If 's' and 'g' parameters are provided, filter the data based on both
  //     const target_genders = Array.isArray(target_gender) ? target_gender : [target_gender];
  //     const filteredData = data.filter(
  //       (item) =>
  //         item.category === category &&
  //         target_genders.includes(item.target_gender)
  //     );
  //     res.json(filteredData);
  //   } else if (productId && subcategory) {
  //     // If 'id' and 'sub' parameters are provided, filter the data based on both
  //     const filteredData = data.filter(
  //       (item) =>
  //         item.product_id.toString() === productId &&
  //         item.subcategory === subcategory
  //     );
  //     res.json(filteredData);
  //   } else if (subcategory && target_gender) {
  //     // If 'sub' and 'g' parameters are provided, filter the data based on both
  //     const target_genders = Array.isArray(target_gender) ? target_gender : [target_gender];
  //     const filteredData = data.filter(
  //       (item) =>
  //         item.subcategory === subcategory &&
  //         target_genders.includes(item.target_gender)
  //     );
  //     res.json(filteredData);
  //   } else if (subcategory) {
  //     // If only 'sub' parameter is provided, filter the data based on the 's' query parameter
  //     const filteredData = data.filter((item) => item.subcategory === subcategory);
  //     res.json(filteredData);
  //   }else if (target_gender) {
  //     // If only 'sub' parameter is provided, filter the data based on the 's' query parameter
  //     const filteredData = data.filter((item) => item.target_gender === target_gender);
  //     res.json(filteredData);
      
  //     }else if (company_name) {
  //       // If only 'sub' parameter is provided, filter the data based on the 's' query parameter
  //       const filteredData = data.filter((item) => item.company_name === company_name);
  //       res.json(filteredData);
  //   } else if (category) {
  //     // If only 's' parameter is provided, filter the data based on the 's' query parameter
  //     const filteredData = data.filter((item) => item.category === category);
  //     res.json(filteredData);
  //   } else if (productId) {
  //     // If only 'id' parameter is provided, filter the data based on the 'id' query parameter
  //     const filteredData = data.filter((item) => item.product_id.toString() === productId);
  //     if (filteredData.length > 0) {
  //       res.json(filteredData[0]); // Return the first matching item
  //     } else {
  //       res.status(404).json({ error: "Item not found" });
  //     }
  //   } else {
  //     // If neither 's' nor 'id' parameters are provided, return all data
  //     res.json(data);
  //   }
  // });
  // app.listen(5000, () => {
  //   console.log('Server started on http://localhost:5000');
  // });













  

//   app.get('/', (req, res) => {
//     const { s: category, id: productId, sub: subcategory, g: target_gender, cn: company_name, min: minPrice, max: maxPrice } = req.query;

//     const filterParams = {
//         category,
//         productId,
//         subcategory,
//         target_gender,
//         company_name,
//         minPrice: minPrice ? parseFloat(minPrice) : 0,
//         maxPrice: maxPrice ? parseFloat(maxPrice) : Number.MAX_VALUE
//     };

//     const filteredData = data.filter(item => meetsFilterCriteria(item, filterParams));
//     // console.log("Target Gender:", item.target_gender)

//     if (filteredData.length > 0) {
//         res.json(filteredData); // Return all matching items
//     } else {
//         res.status(404).json({ error: "Items not found" });
//     }
// });

// function meetsFilterCriteria(item, { category, productId, subcategory, target_gender, company_name, minPrice, maxPrice }) {
  
//   return (
//         (!category || item.category === category) &&
//         (!productId || item.product_id.toString() === productId) &&
//         (!subcategory || item.subcategory === subcategory) &&
//         (!target_gender || (Array.isArray(target_gender) ? target_gender.includes(item.target_gender) : item.target_gender === target_gender)) &&
//         (!company_name || item.company_name === company_name) &&
//         (item.price >= minPrice && item.price <= maxPrice)
//     );
// }

// app.listen(5000, () => {
//     console.log('Server started on http://localhost:5000');
// });








// app.get('/', (req, res) => {
//     const { s: category, id: productId, sub: subcategory, g: target_gender, cn: company_name, min: minPrice, max: maxPrice } = req.query;

//     const filterParams = {
//         category,
//         productId,
//         subcategory,
//         target_gender,
//         company_name,
//         minPrice: minPrice ? parseFloat(minPrice) : 0,
//         maxPrice: maxPrice ? parseFloat(maxPrice) : Number.MAX_VALUE
//     };

//     const filteredData = data.find(item => meetsFilterCriteria(item, filterParams));

//     if (filteredData) {
//         res.json(filteredData); // Return the matching item
//     } else {
//         res.status(404).json({ error: "Item not found" });
//     }
// });

// function meetsFilterCriteria(item, { category, productId, subcategory, target_gender, company_name, minPrice, maxPrice }) {
//     return (
//         (!category || item.category === category) &&
//         (!productId || item.product_id.toString() === productId) &&
//         (!subcategory || item.subcategory === subcategory) &&
//         (!target_gender || (Array.isArray(target_gender) ? target_gender.includes(item.target_gender) : item.target_gender === target_gender)) &&
//         (!company_name || item.company_name === company_name) &&
//         (item.price >= minPrice && item.price <= maxPrice)
//     );
// }

// const PORT = 5000;
// app.listen(PORT, () => {
//     console.log(`Server started on http://localhost:${PORT}`);
// });


