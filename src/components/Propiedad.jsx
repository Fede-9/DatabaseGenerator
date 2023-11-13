"use client"

import { useModeloContext } from "@/contexts/ModeloContext"

export default function Propiedad({propiedad,tamaño,unico,nulo,setPropiedad,setTipo,setTamaño,setUnico,setNulo,setRelacion,setTipoRelacion,tipoDatoRef,relacionRef,tipoRelacionRef,listaModelos}) {

  //Tipos de datos de sequelize
  const dataTypes = [
    "STRING",
    "CHAR",
    "INTEGER",
    "REAL",
    "DECIMAL",
    "BOOLEAN",
    "DATE",
    "ENUM",
  ]

  //Tipos de relaciones
  const asociasiones = [
    "Uno a uno",
    "Uno a muchos",
    "Muchos a uno",
    "Muchos a muchos"
  ]

  const { modelos } = useModeloContext()

  return (
    <div className="border rounded-md bg-zinc-200 mt-8 p-4">
        <label htmlFor="Propiedad">Nombre</label>
        <input id="Propiedad" value={propiedad} type="text" className="m-3 border rounded-md text-zinc-950 " onChange={(e) => setPropiedad(e.target.value)} />

        <label htmlFor="Tipo">Tipo de dato</label>
        <select ref={tipoDatoRef} name="" id="Tipo" className="m-3 border rounded-md" onChange={(e) => setTipo(e.target.value)}>
        <option defaultValue>Seleccione tipo</option>
          {dataTypes.map((tipo,index) => (
            <option key={index} value={tipo}>{tipo}</option>
          ))}
        </select>

        <label htmlFor="Tamaño">Tamaño</label>
        <input id="tamaño" value={tamaño} type="text" className="m-3 border rounded-md" onChange={(e) => setTamaño(e.target.value)} />

        <label htmlFor="Unico">Unico</label>
        <input type="checkbox" checked={unico} name="" id="Unico" className="m-3" onChange={() => setUnico(!unico)} />

        <label htmlFor="Nulo">Nulo</label>
        <input type="checkbox" name="" checked={nulo} id="Nulo" className="m-3" onChange={() => setNulo(!nulo)} />

        <label htmlFor="Relacion" className="m-3">Relacion</label>
        <select ref={relacionRef} name="" id="Relacion" className="m-3 border rounded-md" onChange={(e) => setRelacion(e.target.value)}>
        <option defaultValue>Seleccione modelo</option>
          {modelos?.map((modelo,index) => (
            <option key={index} value={modelo.modeloId}>{modelo.nombreModelo}</option>
          ))}
        </select>

        <label htmlFor="TipoRelacion" className="m-3">Tipo relacion</label>
        <select ref={tipoRelacionRef} name="" id="TipoRelacion" className="m-3 border rounded-md" onChange={(e) => setTipoRelacion(e.target.value)}>
        <option defaultValue>Seleccione tipo</option>
          {asociasiones?.map((asoc,index) => (
            <option key={index}>{asoc}</option>
          ))}
        </select>
    </div>
  )
}
