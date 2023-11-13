"use client"
import { useState, useRef, useEffect } from "react"

import { v4 as uuidv4 } from 'uuid';

import { useRouter } from 'next/router'

import Propiedad from "@/components/Propiedad";
import PropiedadesModelo from '@/components/PropiedadesModelo';

import { useModeloContext } from "@/contexts/ModeloContext";
import Modelo from "@/components/Modelo";
import NavBar from "@/components/NavBar";

export default function index() {

  const router = useRouter()

  //Estado para el nombre del modelo
  const [nombreModelo, setnombreModelo] = useState("")

  //Estados de las propiedades del modelo
  const [propiedad, setPropiedad] = useState("")
  const [tipo, setTipo] = useState("")
  const [tamaño, setTamaño] = useState("")
  const [unico, setUnico] = useState(false)
  const [nulo, setNulo] = useState(false)
  const [relacion, setRelacion] = useState("")
  const [tipoRelacion, setTipoRelacion] = useState("")

  const { modelos, propiedades, agregarModelo, agregarModeloConRelacion, eliminarModelo, agregarPropiedadAModelo, eliminarPropiedadModelo } = useModeloContext()

  const [listaModelos, setListaModelos] = useState([])

  useEffect(() => {
    setListaModelos(modelos)
  }, [modelos])

  //Referencias a los diferentes select
  const tipoDatoRef = useRef(null)
  const relacionRef = useRef(null)
  const tipoRelacionRef = useRef(null)

  const controlAgregarModelo = () => {
    const modeloId = uuidv4()

    if (relacion != "" && tipoRelacion != "") {

      agregarModeloConRelacion(modeloId, nombreModelo, relacion, tipoRelacion)

      resetSelects()

      setnombreModelo("")
      setPropiedad("")
      setTamaño("")
      setUnico(false)
      setNulo(false)

      setRelacion("")
      setTipoRelacion("")

    } else {

      agregarModelo(modeloId, nombreModelo)
  
      resetSelects()
  
      setnombreModelo("")
      setPropiedad("")
      setTamaño("")
      setUnico(false)
      setNulo(false)
    }

  }

  const controlAgregarPropiedadAModelo = () => {
    const id = uuidv4();

    const nuevaPropiedad = {
      id,
      propiedad,
      tipo,
      tamaño,
      unico,
      nulo
    }

    agregarPropiedadAModelo(nuevaPropiedad)

    resetSelects()

    setPropiedad("")
    setTamaño("")
  }

  const resetSelects = () => {
    tipoDatoRef.current.selectedIndex = 0
    relacionRef.current.selectedIndex = 0
    tipoRelacionRef.current.selectedIndex = 0
  }

  const generarModelos = async (e) => {
    e.preventDefault();

    if (modelos.length > 0) {

      console.log(modelos)

      const response = await fetch('/api/submitForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ modelos })
      });

      if (response.ok) {
        alert("Se creo Correctamente");
      } else {
        alert('Error al crear el modelo');
      }

    } else {
      alert("No se pueden enviar los datos")
    }

  };

  return (
    <div>
        <NavBar/>
        <form onSubmit={generarModelos} className="bg-white p-4 rounded-md border">
                <div>
                <label htmlFor="Nombre" className="block font-bold text-lg">Nombre del Modelo</label>
                <input
                    type="text"
                    name="Nombre"
                    id="Nombre"
                    value={nombreModelo}
                    className="my-6 border rounded-md bg-stone-200"
                    onChange={(e) => setnombreModelo(e.target.value)}
                />
                </div>

                <div className="relative">
                <button
                    type="button"
                    onClick={controlAgregarPropiedadAModelo}
                    className="bg-orange-400 p-1 rounded-md px-6"
                >
                    Agregar propiedad
                </button>

                <button
                    type="button"
                    onClick={controlAgregarModelo}
                    className="bg-green-400 p-1 rounded-md mx-3 px-6"
                >
                    Crear modelo
                </button>

                <button type="submit" className="bg-red-400 p-1 px-6 rounded-md absolute right-5">Generar</button>
                </div>

                <Propiedad
                propiedad={propiedad}
                setPropiedad={setPropiedad}
                setTipo={setTipo}
                tamaño={tamaño}
                setTamaño={setTamaño}
                unico={unico}
                setUnico={setUnico}
                nulo={nulo}
                setNulo={setNulo}
                setRelacion={setRelacion}
                setTipoRelacion={setTipoRelacion}
                tipoDatoRef={tipoDatoRef}
                relacionRef={relacionRef}
                tipoRelacionRef={tipoRelacionRef}
                />
            </form>

            {propiedades?.length > 0 ? <h3 className="mt-6 font-bold mb-6 text-lg ms-4">Propiedades</h3> : ""}

            {propiedades.map((propiedad, propIndex) => (
                  <PropiedadesModelo key={propIndex} propiedad={propiedad}/>
                ))}
            
            {listaModelos.length > 0 ? <h3 className="mt-6 font-bold mb-6 text-lg ms-4">Modelos</h3> : ""}

            {listaModelos.map((modelo, index) => (
              <Modelo key={index} modelo={modelo}/>
            ))}
    </div>
  )
}

