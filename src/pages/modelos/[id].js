import Link from 'next/link'
import { useRouter } from 'next/router'
import PropiedadesModelo from '@/components/PropiedadesModelo'
import { useModeloContext } from '@/contexts/ModeloContext'
import NavBar from '@/components/NavBar'

export default function ModeloDetalle() {
  const router = useRouter()
  const { id } = router.query
  const { modelos } = useModeloContext()
  const detalleModelo = modelos.find((modelo) => modelo.modeloId == id)

  return (
    <>
      <NavBar/>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Detalles del Modelo</h1>

        <div className="mb-4">
          <p className="font-semibold">Nombre: {detalleModelo?.nombreModelo}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-bold">Propiedades</h3>
          <ul>
            {detalleModelo?.propiedades.map((propiedad, index) => (
              <PropiedadesModelo key={index} propiedad={propiedad} />
            ))}
          </ul>
        </div>

        {detalleModelo?.relacion ? (
          <div className="mb-4">
            <h3 className="text-xl font-bold my-4">Relación</h3>

            <p className="mb-4">Nombre: {detalleModelo.relacion.nombreModeloRelacion}</p>

            <h3 className="text-xl font-bold">Propiedades</h3>
            <ul>
              {detalleModelo?.relacion.modeloRelacion.map((propiedad, index) => (
                <PropiedadesModelo key={index} propiedad={propiedad} />
              ))}
            </ul>

            <p className="font-semibold mt-4 mb-10">Tipo de relación: {detalleModelo.relacion.tipoRelacion}</p>
          </div>
        ) : (
          ""
        )}

        <Link href={"/modelos/crear"} className="border rounded-md p-3 bg-blue-400">Volver</Link>
      </div>
    </>
  )
}