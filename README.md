Mini E-Commerce - Single Page Application

This project is a lightweight e-commerce single-page application (SPA) developed using HTML, CSS, and JavaScript. It simulates a basic online shopping experience with dynamic product interactions powered by a local JSON server.

The application was built as part of a software engineering course to demonstrate understanding of frontend development concepts including DOM manipulation, asynchronous data fetching, and basic CRUD operations using a mock API.

Features include:
 Displaying products retrieved from a local JSON server
 Adding new products using a form (product name, price, category, and image)
 Filtering displayed products by category
 Liking individual products to increase their like count
 Adding and removing products from a client-side shopping cart without affecting the main product list

Technologies used:
HTML5, CSS3, JavaScript (ES6+), JSON Server

To run the project locally:
 Clone the repository using the command: git clone https://github.com/your-username/mini-ecommerce.git
 Navigate into the project folder: cd mini-ecommerce
 Install JSON Server globally if not already installed: npm install -g json-server
 Start the server with: json-server --watch db.json
 Open index.html in your browser or use a development server like Live Server in VS Code

Project folder structure:
 index.html contains the main HTML structure
 css/style.css includes all styles for layout and design
 src/index.js contains the application logic and DOM interactions
 db.json serves as the mock database for storing product data
 README.md provides project documentation

Author: Derrick Wachira, Software Engineering Student at Moringa School

License: This project is licensed under the MIT License. See the LICENSE file for more information.
