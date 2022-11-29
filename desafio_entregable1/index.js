//▼Primer desafío entregable

//►Creación de clase "ProductManager"

class ProductManager {
    //▼variable privada products
        #products;
    
        constructor() {
            this.#products = [];
        }
    
    //▼Función para devolver los productos que se encuentran guardados
    //►No recibe parámetros
    //►Devuelve el array de productos
        getProducts = () => {
            return this.#products;
        };
    
    //▼Función que genera el id automático de los productos
    //►No recibe parámetros
    //►Devuelve un Id generado a travéz del largo del array de productos
        createProductId = () => {
            const i = this.#products.length;
            const id = i > 0 ? i + 1 : 1;
            return id;
        };
    
    //▼Función que buscará la coincidencia entre lo ingresado y lo guardado
    //►Recibe como parámetro el código del nuevo producto
    //►Devolverá Verdadero si lo encontró o Falso si no.
        searchProductCode = (codeProduct) => {
            const copyProducts = [...this.#products];
            const searchProduct = copyProducts.some((product) => product.code === codeProduct);
            return searchProduct;
        };
    
    //▼Función para validar las variables ingresadas cuando se agregan productos
    //►Recibe por parámetro todas las variables del objeto nuevo producto
    //►Devolverá Verdadero si cumple con las validaciones o Falso si no.
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
    
    //▼Función encargada de buscar la coincidencia entre el Id ingresado y los productos guardados en el array
    //►Recibe por parámetro un Id
    //►Devolverá el producto si hay coincidencia, de lo contrario mostrará "not found"
        getProductsById = (productId) => {
            const copyProducts = [...this.#products];
            const searchProduct = copyProducts.find((product) => product.id === productId);
            searchProduct
            ? console.log(searchProduct) : console.log(`(!) Product: ${productId} Not Found`)
        }
    
    //▼Función para agregar un nuevo producto
    //►Recibe por parámetro todas las variables requeridas para crear el objeto producto
    //►Crea y guarda el objeto en el array de productos
        addProduct = (title, description, price, thumbnail, code, stock) => {
            const newProduct = {
                id: this.createProductId(),
                title,
                description,
                price,
                thumbnail, 
                code,
                stock
            };
            if (this.searchProductCode(newProduct.code)) {
                console.error(`(!) Product ${newProduct.code} Registration Failed: Product is already registered`)
    //            console.error(`(!) Error de registro de Producto ${newProduct.code}: el producto ya está registrado`)
                return
            }
            if (!this.validationInputs({...newProduct})) {
                console.error(`>>Please make sure all fields are filled in correctly<< | >>Por favor, asegúrese de que todos los campos se completen correctamente<<`);
    //            console.error(`>>Por favor, asegúrese de que todos los campos se completen correctamente<<`);
            } else {
                this.#products.push(newProduct);
                console.log(`>>The product: '${newProduct.title}' has been added successfully<< | >>El producto: '${newProduct.title}' se ha agregado con éxito<<`);
    //            console.log(`El producto: ${newProduct.title} se ha agregado con éxito`)
            }
        };
    }
    
    //▼Testing por consola
    const misato = new ProductManager();
    
    console.log('Productos registrados en la base de datos:', misato.getProducts());
    console.log('▼_______________inicia test_______________▼');
    console.log('___________________________________________');
    console.log('___________________________________________');
    misato.addProduct(
        "producto prueba",
        "Este es un producto prueba",
        200,
        "Sin imagen",
        "abc123",
        25
    );
    console.log('Productos registrados en la base de datos:', misato.getProducts());
    console.log('▼_________________________________________▼');
    console.log('___________________________________________');
    misato.addProduct(
        "producto prueba2",
        "Este es un producto prueba2",
        300,
        "Sin imagen",
        "abc1234",
        25
    );
    console.log('Productos registrados en la base de datos:', misato.getProducts());
    console.log('▼_________________________________________▼');
    console.log('___________________________________________');
    misato.addProduct(
        "producto prueba3",
        "Este es un producto prueba3",
        400,
        "Sin imagen",
        "abcd123",
        20
    );
    console.log('Productos registrados en la base de datos:', misato.getProducts());
    console.log('▼___________________________________________▼');
    misato.getProductsById(30);
    console.log('▲___________________________________________▲');
    console.log('▼___________________________________________▼');
    misato.getProductsById(1);
    console.log('▲___________________________________________▲');
    console.log('▼___________________________________________▼');
    misato.getProductsById(4);
    console.log('▲___________________________________________▲');
    console.log('____________________________________________');
    console.log('▲_______________finaliza test_______________▲') 