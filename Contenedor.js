const knex = require('knex');


class Contenedor {
	constructor(config, table) {
		this.table = table;
		this.conexion = knex(config);
}
			
//done
	async save(producto){
		try{
			const [id] = await this.conexion(this.table).insert(producto);
			return id;
		} catch(error) {
			console.error(error);throw error;
		} finally{
			// knex.destroy();
		}
	}


//done
	async getByID(id){
		try {
			const contenido = await this.conexion.from(this.table)
			.select('*').where('id','=', id);
			if(contenido.length === 0){
				return null;
			} else{
				return contenido[0];
			}
		} catch(error) {
			console.error('Error:', error);
		}
	};

	//done
	async getAll(){
		try {
			const contenido = await this.conexion.from(this.table)
			.select('*');
			return contenido;
		} catch(error) {
			console.error('Error:', error);
		}

	};


	//done
	async deleteById(deleteId){
		try {
			const check = await this.conexion.from(this.table)
			.select('*').where('id','=', deleteId);

			if(check.length === 0){
				return console.log('no existe el producto');
			} else {
				await this.conexion.from(this.table).where('id', '=', deleteId).del();
				return console.log('producto borrado')
			}
	
		} catch(error) { console.error(error); }
	
	};

// done
	async deleteAll(){
		try {
			const check = await this.conexion.from(this.table)
			.select('*').del();
			return console.log('todos los productos fueron borrados')
	
		} catch(error) { console.error(error); }
	
	};

	async update(id, product){
		try {
			this.conexion.from(this.table).where('id', '=', id).update( product );
  			return console.log('updated');
		} catch(error) { console.error(error);}
	}
}





module.exports = Contenedor;