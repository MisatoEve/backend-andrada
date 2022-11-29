//▼Segundo desafío entregable

//▼Primero se guarda en una variable el modulo file system
const fs = require('fs');
//const path = './DB.txt';

//►Creación de clase "ProductManager" del entregable 1
class ProductManager {
    //▼pasar por parámetro la ruta de DB
    constructor(path) {
        this.path = path
    }
    //▼obtenemos id del producto. Lee el DB y devuelve el largo del array +1
    getProductId = async () => {
        const copyProducts = await fs.promises.readFile(this.path, 'utf-8');
        const copyProductsObj = JSON.parse(copyProducts);
        const i = copyProductsObj.length;
        const id = i === undefined ? i + 1 : 1;
        return id;
    }
    //▼validar inputs de forma sincrónica
    validationInputs = ({ title, description, price, thumbnail, code, stock }) => {
        return (
            title.trim().length > 0 &&
            description.trim().length > 0 &&
            thumbnail.trim().length > 0 &&
            code.trim().length > 0 &&
            price.toString().trim().length > 0 &&
            stock.toString().trim().length > 0 &&
            price > 0 &&
            stock > 0            
        );
    };
    //▼verificar code. Consulta DB y compara utilizando some
    verifyProductCode = async (codeProduct) => {
        const copyProducts = await fs.promises.readFile(this.path, 'utf-8');
        const copyProductsObj = JSON.parse(copyProducts);
        const searchDB = copyProductsObj.some((product) => product.code === codeProduct);
        return searchDB;
    };
    //▼Función asíncrona para agregar un nuevo producto
    //►Recibe por parámetro todas las variables requeridas para crear el objeto producto
    //►Crea y guarda el objeto en el array de productos
    addProduct = async (title, description, price, thumbnail, code, stock) => {
        const id = await this.getProductId().then((id) => id);
        const newProduct = {
            id,
            title,
            description,
            price,
            thumbnail, 
            code,
            stock,
        };
        //▼verificar asíncronamente los campos
        if (!this.validationInputs({ ...newProduct })) {
            console.log(`>>Please make sure all fields are filled in correctly<< | >>Por favor, asegúrese de que todos los campos se completen correctamente<<`);
        }
        //▼verificar asíncronamente el código
        const codeVerify = await this.verifyProductCode(newProduct.code);
        if (codeVerify) {
            console.log(`(!) Product Registration Failed: Product is already registered`);
        }
        //▼se crea el archivo donde se guardarán los datos del array
        await fs.promises.writeFile(this.path, JSON.stringify([newProduct]));
        console.log(`>>The product has been added successfully<< | >>El producto se ha agregado con éxito<<`);
    };

    //▼función que intentará de leer la DB, si existe devuelve el array, de lo contrario mostrará un array vacío 
    getProducts = async () => {
        if (fs.existsSync(this.path)){
            const resolve = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(resolve);
            return products;
        } else {
            return [];
        }
    };
    //▼Traemos los datos del archivo DB.json
    //▼función para obtener los productos por el id, busca dentro del array con el metodo find 
    //▼Devuelve el objeto, de lo contrario mostrará "not found" ya que no lo encontró
    getProductById = async (productId) => {
        const copyProducts = await fs.promises.readFile(this.path, 'utf-8');
        const copyProductsObj = JSON.parse(copyProducts);
        const searchProduct = copyProductsObj.find((product) => product.id === productId);
        return searchProduct !== undefined ? searchProduct : console.log(`(!) Product Not Found`);
    }
    //▼Función para actualizar los productos del archivo, recibe los parámetros id y objeto
    //►Leer el archivo DB.json y guardar en una variable la resolución
    //▼Se utiliza find para buscar el objeto dentro del array. Y filter para separar el resto de los productos del selecionado
    //►Se crea un nuevo objeto utilizando el metodo rest (...) con el id original y los campos modificados
    //▼Agregamos el objeto modificado al array filtrado. Y se escribe la DB con el array actuaizado
    updateProduct = async (productId, objUpdate) => {
        const copyProducts = await fs.promises.readFile(this.path, 'utf-8');
        const copyProductsObj = JSON.parse(copyProducts);
        const productUpdate = copyProductsObj.find(
            (product) => product.id === productId
        );
        const filProducts = copyProductsObj.filter(
            (product) => product.id !== productId
        );

        const cutUpdate = { id: productUpdate.id, ...objUpdate };
        filProducts.push(cutUpdate);
        await fs.promises.writeFile(this.path, JSON.stringify(filProducts));
        console.log(filProducts);
    };
    //▼Función para eliminar productos del archivo
    //▼Filtrar los productos que coincidan con el id, vuelve a escribir la DB con el filtro realizado
    deleteProduct = async (productId) => {
        const copyProducts = await fs.promises.readFile(this.path, 'utf-8');
        const copyProductsObj = JSON.parse(copyProducts);
        const filProducts = copyProductsObj.filter((product) => product.id !== productId);
        await fs.promises.writeFile(this.path, JSON.stringify(filProducts));
    };
}

//▼  PROCESO DE TESTING ▼ 

// ▼ ✓Se crea una instancia de la clase “ProductManager”
const misato = new ProductManager("./DB.json")

// ▼ ✓Al llamar a getProducts() devuelve productos - error y mensaje

//console.log(misato)
//console.log(misato.getProducts())
//console.log(await misato.getProducts())
// ▼ ✓Se agrega un nuevo producto

//misato.getProducts().then((products) => {
//   if (products !== undefined) {
//        const result = JSON.parse(products);
//        console.log(result);
//    }
//});

misato.addProduct(
    "Producto prueba",
    "Este es un producto prueba",
    200,
    "Sin imagen",
    "abc123",
    25
);

// ▼ ✓Se llama a getProducts() nuevamente con el prodcuto ya ingresado en el array
//console.log(await misato.getProducts())

// ▼ ✓Se llama a la funcion getProductById para verificar que exista en la DB

//console.log(await misato.getProductById(1))

//misato.getProducts().then((products) => {
//   const result = JSON.parse(products);
//   console.log(result);
// });
//misato.getProductById(1).then((product) => {
//    console.log(product);
// });

// ▼ ✓Se invoca a la funcion updateProduct con objeto completo y las modificaciones este test devuelve el objeto por consola para verificar los cambios
//const newObj = {
//    title: "Producto de prueba actualizado",
//    description: "Este es el producto actualizado",
//    price: 250,
//    thumbnail: "Sin imagen",
//    code: "abc123",
//    stock: 50,
//};
//misato.updateProduct(1, newObj);
//misato.deleteProduct(1);

// ▼ ✓Se llama a la funcion deleteProduct con el id del objeto a eliminar

//misato.deleteProduct(1);

// ▼ ✓Se verifica que el producto haya sido eliminado y devuelva un array vacío

//console.log(await misato.getProducts())

//misato.getProducts().then((products) => {
//   if (products !== undefined) {
//     const result = JSON.parse(products);
//     console.log(result);
//   }
// });


