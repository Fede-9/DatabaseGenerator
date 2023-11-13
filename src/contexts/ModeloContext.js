import { createContext, useContext, useState } from 'react';

//Crecion del contexto
const ModeloContext = createContext();

//Funcion para acceder a los datos del contexto
export function useModeloContext() {
  return useContext(ModeloContext);
}

export function ModeloContextProvider({ children }) {

  //Lista modelos
  const [modelos, setModelos] = useState([]);

  //Nuevo modelo
  const [propiedades, setPropiedades] = useState([]);

  const agregarModelo = (modeloId, nombreModelo) => {
    const nuevoModelo = {modeloId, nombreModelo, propiedades}
    setModelos([...modelos, nuevoModelo])
    setPropiedades([])
  };

  const agregarModeloConRelacion = (modeloId, nombreModelo,idModeloRelacion, tipoRelacion) => {

    const modeloRelacion = modelos.find( modelo => modelo.modeloId == idModeloRelacion)

    const nuevoModelo = {modeloId, nombreModelo, propiedades, relacion: { nombreModeloRelacion: modeloRelacion.nombreModelo, modeloRelacion: modeloRelacion.propiedades, tipoRelacion }}
    setModelos([...modelos, nuevoModelo])
    setPropiedades([])
  };

  const eliminarModelo = (modeloId) => {
    setModelos(modelos.filter( modelo => modelo.modeloId != modeloId))
  }

  const agregarPropiedadAModelo = (nuevaPropiedad) => {

    setPropiedades([...propiedades, nuevaPropiedad])
  };

  const eliminarPropiedadModelo = (propiedadId) => {
    setPropiedades(propiedades.filter( propiedad => propiedad.id != propiedadId ))
  }

  const agregarRelacionAModelo = (modeloId, modeloDeRelacion) => {
    setModelos(modelos.map( modelo => {
      modelo.id == modeloId ? 
      { ...modelo, relacion: modeloDeRelacion }
      : ""
    }))
  };

  return (
    <ModeloContext.Provider
      value={{ modelos, propiedades, agregarModelo, eliminarModelo, agregarModeloConRelacion, agregarPropiedadAModelo, eliminarPropiedadModelo, agregarRelacionAModelo }}
    >
      {children}
    </ModeloContext.Provider>
  );
}