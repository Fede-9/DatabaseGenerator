"use client"

import { useModeloContext } from "@/contexts/ModeloContext"

export default function  PropiedadesModelo({propiedad}) {

    const { eliminarPropiedadModelo } = useModeloContext()

    return (
        <div>
                <ul className="flex rounded-md ms-4">
                    <li className="me-2">Nombre: {propiedad.propiedad}</li>
                    <li className="me-2">Tipo de dato: {propiedad.tipo}</li>
                    <li className="me-2">tamaño: {propiedad.tamaño}</li>
                    <li className="me-2">Unico: {propiedad.unico ? "True" : "False"}</li>
                    <li className="me-2">Nulo: {propiedad.nulo ? "True" : "False"}</li>
                    <button className="bg-red-600 px-3 rounded ms-2" onClick={() => eliminarPropiedadModelo(propiedad.id)}>X</button>
                </ul>
        </div>
    )
}
