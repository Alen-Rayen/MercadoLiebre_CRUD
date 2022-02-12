const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); // arrow function expresada 
// toThousand es una funcion que recibe un numero 'n' y lo pasa a string 'toString()'

const controller = {
	index: (req, res) => { // traemos products que es el array de productos, se le agrega un filter donde cada elemento sera un producto y => devuelve de products su propiedad category sea === a un string que sea "in-sale"
		let productInSale = products.filter(product => product.category === 'in-sale') 
		console.log(productInSale)

		let productsVisited = products.filter(product => product.category === 'visited')
		res.render('index', {   //se manda a la vista donde se pasan las dos variables anteriores para que se "vean"
			productInSale,
			productsVisited,
			toThousand    // para que en la vista se utilice y se aplique 
			})
	},
	search: (req, res) => {
		// Do the magic
	},
};

module.exports = controller;
