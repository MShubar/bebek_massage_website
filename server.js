const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = 3000

// Middleware for parsing JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const MONGODB_URI =
  'mongodb+srv://pokeeeeepow:m5WALiLrpOmtfaxk@crm.bpqd1.mongodb.net/crm?retryWrites=true&w=majority&appName=CRM'

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected successfully')
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err)
  })

app.set('view engine', 'ejs')

// Sample book data
const books = [
  {
    title: 'War and Peace',
    author: 'Leo Tolstoy',
    price: 12.99,
    image: 'https://example.com/images/war-and-peace.jpg',
    description:
      'A historical novel that chronicles the French invasion of Russia and the impact on society.'
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    price: 9.99,
    image: 'https://example.com/images/pride-and-prejudice.jpg',
    description:
      'A romantic novel that explores the themes of love, reputation, and class.'
  },
  {
    title: '1984',
    author: 'George Orwell',
    price: 14.99,
    image: 'https://example.com/images/1984.jpg',
    description:
      'A dystopian novel that delves into the dangers of totalitarianism and surveillance.'
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    price: 11.99,
    image: 'https://example.com/images/to-kill-a-mockingbird.jpg',
    description:
      'A novel that tackles serious issues of race and moral growth through the eyes of a child.'
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    price: 10.99,
    image: 'https://example.com/images/the-great-gatsby.jpg',
    description:
      'A novel set in the Jazz Age, it tells the story of the mysterious Jay Gatsby and his obsession with Daisy Buchanan.'
  },
  {
    title: 'Moby Dick',
    author: 'Herman Melville',
    price: 13.99,
    image: 'https://example.com/images/moby-dick.jpg',
    description:
      'A whaling narrative that explores themes of obsession and revenge as Captain Ahab pursues the white whale.'
  },
  {
    title: 'Brave New World',
    author: 'Aldous Huxley',
    price: 12.99,
    image: 'https://example.com/images/brave-new-world.jpg',
    description:
      'A dystopian novel that presents a future society driven by technological advancements and conformity.'
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    price: 10.49,
    image: 'https://example.com/images/the-catcher-in-the-rye.jpg',
    description:
      'A story about teenage alienation and loss, narrated by the iconic Holden Caulfield.'
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    price: 9.49,
    image: 'https://example.com/images/the-alchemist.jpg',
    description:
      'A philosophical tale about following your dreams and listening to your heart.'
  },
  {
    title: 'Fahrenheit 451',
    author: 'Ray Bradbury',
    price: 11.49,
    image: 'https://example.com/images/fahrenheit-451.jpg',
    description:
      'A dystopian novel that explores a future where books are banned and "firemen" burn any that are found.'
  },
  {
    title: 'The Picture of Dorian Gray',
    author: 'Oscar Wilde',
    price: 10.99,
    image: 'https://example.com/images/the-picture-of-dorian-gray.jpg',
    description:
      'A novel about a man who remains eternally young while his portrait ages, exploring themes of vanity and moral duplicity.'
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    price: 14.99,
    image: 'https://example.com/images/the-hobbit.jpg',
    description:
      'A fantasy novel that follows the journey of Bilbo Baggins, a hobbit who becomes embroiled in a quest to reclaim treasure from a dragon.'
  },
  {
    title: 'Les Misérables',
    author: 'Victor Hugo',
    price: 15.99,
    image: 'https://example.com/images/les-miserables.jpg',
    description:
      'A sweeping tale of justice and redemption set against the backdrop of post-revolutionary France.'
  },
  {
    title: 'The Chronicles of Narnia',
    author: 'C.S. Lewis',
    price: 19.99,
    image: 'https://example.com/images/the-chronicles-of-narnia.jpg',
    description:
      'A series of seven fantasy novels that take readers on adventures through the magical land of Narnia.'
  },
  {
    title: 'The Da Vinci Code',
    author: 'Dan Brown',
    price: 12.99,
    image: 'https://example.com/images/the-da-vinci-code.jpg',
    description:
      'A mystery thriller that follows symbologist Robert Langdon as he unravels secrets hidden in Da Vinci’s works.'
  },
  {
    title: 'The Kite Runner',
    author: 'Khaled Hosseini',
    price: 11.99,
    image: 'https://example.com/images/the-kite-runner.jpg',
    description:
      'A poignant tale of friendship and betrayal set against the backdrop of a changing Afghanistan.'
  },
  {
    title: "Harry Potter and the Sorcerer's Stone",
    author: 'J.K. Rowling',
    price: 10.99,
    image: 'https://example.com/images/harry-potter.jpg',
    description:
      'The first book in the Harry Potter series, where a young boy discovers he is a wizard and attends Hogwarts School of Witchcraft and Wizardry.'
  }
]

// Shopping cart
let cart = []

// Middleware to serve static files
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// Route for the homepage
app.get('/', (req, res) => {
  res.render('index', { books, cart })
})

// Route for the catalog page
app.get('/catalog', (req, res) => {
  res.render('catalog', { books, cart })
})

// Route for the contact page
app.get('/contact', (req, res) => {
  res.render('contact', { cart })
})

// Route to view the cart
app.get('/cart', (req, res) => {
  res.render('cart', { cart })
})

// Route for the checkout page
app.get('/checkout', (req, res) => {
  res.render('checkout', { cart })
})

// Route to add a book to the cart
app.post('/add-to-cart', (req, res) => {
  const bookId = parseInt(req.body.bookId)
  const book = books.find((b) => b.id === bookId)
  if (book) {
    cart.push(book)
    res.redirect('/cart')
  } else {
    res.status(404).send('Book not found')
  }
})

// Route to remove a book from the cart
app.post('/remove-from-cart', (req, res) => {
  const bookId = parseInt(req.body.bookId)
  cart = cart.filter((book) => book.id !== bookId)
  res.redirect('/cart')
})

// Route to submit an order
app.post('/submit-order', (req, res) => {
  const { name, address } = req.body

  // Here you can add logic to save the order details
  console.log(`Order placed by ${name}, Address: ${address}`)
  console.log('Order details:', cart)

  // Clear the cart after order submission
  cart = []

  res.send('Thank you for your order! It has been placed successfully.')
})

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
