"use client"

import { useModeloContext } from "@/contexts/ModeloContext"
import Link from "next/link"

export default function Modelo({ modelo }) {

    const { eliminarModelo } = useModeloContext()

    return (
        <div>
            <ul className="flex items-center rounded-md ms-4">
                <li className="me-2">Nombre: {modelo.nombreModelo}</li>

                <Link href={`/modelos/${modelo.modeloId}`} className="border rounded-md px-2 bg-blue-400">Ver</Link>
                <button className="bg-red-600 px-3 rounded ms-2" onClick={() => eliminarModelo(modelo.modeloId)}>X</button>
            </ul>
        </div>
    )
}
