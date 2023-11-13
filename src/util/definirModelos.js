import { Sequelize, DataTypes } from 'sequelize'

const sequelize = new Sequelize('db_nextjs', 'postgres', 'password', {
    host: 'localhost',
    dialect: "postgres"
});

const propiedadesModelo = {};
const propiedadesModeloArelacionar = {};
const listaModelosDefinidos = []

const listaModelosArelacionar = []

export default async function definirModelo(listaModelos) {

    const { modelos } = listaModelos

    //Se definen las propiedades del modelo
    modelos.forEach(modelo => {
        modelo.propiedades.forEach( propiedad => {
            //Propiedades
            propiedadesModelo[propiedad.propiedad] = {
                type: DataTypes[propiedad.tipo](propiedad.tamaño),
                unique: propiedad.unico,
                allowNull: propiedad.nulo,
            }
        })

        //Si existe la propiedad relacion
        if (modelo.relacion) {
            modelo.relacion.modeloRelacion.forEach( propiedad => {

                propiedadesModeloArelacionar[propiedad.propiedad] = {
                    type: DataTypes[propiedad.tipo](propiedad.tamaño),
                    unique: propiedad.unico,
                    allowNull: propiedad.nulo,
                }
            })

            //Se define el modelo base
            const Modelo = sequelize.define(modelo.nombreModelo, propiedadesModelo);
            //Se define el modelo a relacionar
            const ModeloArelacionar = sequelize.define(modelo.relacion.nombreModeloRelacion, propiedadesModeloArelacionar);

            listaModelosArelacionar.push({modeloBase:Modelo,modeloArelacionar:ModeloArelacionar,tipoRelacion:modelo.relacion.tipoRelacion});
            
        } else {
            //Se define el modelo y se agrega a la listaModelosDefinidos
            const Modelo = sequelize.define(modelo.nombreModelo, propiedadesModelo);
            listaModelosDefinidos.push({modelo:Modelo});
        
            // // // Se sincronizan los modelos a la base de datos
            listaModelosDefinidos.forEach(modelo => {
                modelo.modelo.sync({ alter: true })
                    .then((user) => {
                        console.log('Modelo creado en la base de datos:', user);
                    })
                    .catch((error) => {
                        console.error('Error al crear el modelo en la base de datos:', error);
                    });
            })
        }

    })

    if (listaModelosArelacionar.length > 0) {
        listaModelosArelacionar.forEach( modelo => {
            
            //Se establecen las relaciones
            switch (modelo.tipoRelacion) {
                case "Uno a uno":
                    modelo.modeloBase.hasOne(modelo.modeloArelacionar);

                    sequelize.sync({ alter: true })
                    .then((user) => {
                        console.log('Modelo creado en la base de datos:', user);
                    })
                    .catch((error) => {
                        console.error('Error al crear el modelo en la base de datos:', error);
                    });
                    break;
                case "Uno a muchos":
                    modelo.modeloBase.hasMany(modelo.modeloArelacionar);

                    sequelize.sync({ alter: true })
                    .then((user) => {
                        console.log('Modelo creado en la base de datos:', user);
                    })
                    .catch((error) => {
                        console.error('Error al crear el modelo en la base de datos:', error);
                    });
                    break;
                case "Muchos a uno":
                    modelo.modeloBase.belongsTo(modelo.modeloArelacionar);

                    sequelize.sync({ alter: true })
                    .then((user) => {
                        console.log('Modelo creado en la base de datos:', user);
                    })
                    .catch((error) => {
                        console.error('Error al crear el modelo en la base de datos:', error);
                    });
                    break;
                case "Muchos a muchos":
                    console.log(modelos.modeloBase, modeloArelacionar)
                    modelo.modeloBase.belongsToMany(modelo.modeloArelacionar, {through: `${modelo.modeloBase}_${modelo.modeloArelacionar}`});

                    sequelize.sync({ alter: true })
                    .then((user) => {
                        console.log('Modelo creado en la base de datos:', user);
                    })
                    .catch((error) => {
                        console.error('Error al crear el modelo en la base de datos:', error);
                    });
                    break;
                default:
                    break;
            }
    
        })
    }
}