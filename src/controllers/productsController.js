const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const writeJson = database => fs.writeFileSync(productsFilePath, JSON.stringify(database), "utf-8")
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {  //pasar todos los productos a esta vista para que los pueda listar, dentro del res.render renderiza la vista products que le pasa los productos y toThousand
		res.render('products', {  
			products,
			toThousand
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => { //primero se debe calcular el id
		let productId = +req.params.id; //id que viene por parametro, se coloca el + para que lo pase a numero tambien se puede usar 'number' 
		let product = products.find(product => product.id === productId)	 //capturar el producto segun el id

		res.render('detail', {
			product,
			toThousand
		})	
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form') // devuelve el formulario para que el usuario lo utilice, cargue los datos y lo envie a nuestra app para poder procesarlo
	},
	
	// Create -  Method to store
	store: (req, res) => { //destructuring = agarra una propiedad y la guarda dentro de una variable
		const [name, price, discount, category, description] = req.body // el body es donde viajan los datos del formulario
		/* res.send(req.file) */
		let lastId = 1;
		products.forEach(product => {
			if(product.id > lastId){
				lastId = product.id
			}
		});

		let newProduct = {
			id: lastId + 1,
			name, //si la variable que tiene el valor que queremos guardar es igual a al nombre de la propiedad se deja como esta
			price,
			discount,
			category,
			description,
			image: 'default-image-png'
		}

		/* let newProduct = {
			...req.body,
			id: lastId = 1,
			image: req.file ? req.file.filename : 'default-image-png'
		} */

		product.push(newProduct)

		writeJson(products) 

		res.redirect('/products')

	},

	// Update - Form to edit
	edit: (req, res) => {
		let productId = +req.params.id;
		let productToEdit = products.find(product => product.id ===  productId)

		res.render('product-edit-form', {
			product: productToEdit
		})
	},
	// Update - Method to update
	update: (req, res) => {  
		let productId = +req.params.id
		const [name, price, discount, category, description] = req.body
		products.forEach(product => {
			if(product.id === productId){
				product.id = product.id,
				product.name = name,
				product.price = price,
				product.discount = discount,
				product.description = description
				if(req.file){
					if (fs.existsSync('./public/images(products', product.image)){
						fs.unlinkSync(`./public/images/products/${product.image}`)
				}else{
					console.log('No encontre el archivo')
				}
				product.image = req.file.filename
			}else{
				product.image = product.image
			}
		}
	})
		whriteJSON(products)

		res.redirect(`/products/detail/${productId}`) //redirecciona al producto que se acaba de editar
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let productId = +req.params.id
		
		products.forEach(product =>{
			if(product.id === productId ){
				if (fs.existsSync('./public/images(products', product.image)){
					fs.unlinkSync(`./public/images/products/${product.image}`)
				}else{
					console.log('No encontre el archivo')
				}

			let productToDestroyIndex = products.indexOf(product) //si encuentra el elemento devuelve el indice sino trae -1
			if (productToDestroyIndex !== -1) { 
				products.splice(productToDestryIndex, 1)
			// como primer parametro es el indice del elemento que se quiere borrar , el segundo, es la cantidad aa eliminar
			}else {
				console.log('No encontre el producto')
			}
		}
		})

		whriteJSON(products)
		res.redirect('/products')
	}
};

module.exports = controller;