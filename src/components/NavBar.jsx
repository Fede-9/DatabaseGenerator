import Link from "next/link";

export default function NavBar() {
    return (
        <nav className='flex items-center bg-gray-300 p-4'>
          <h1 className="text-lg font-bold">Generador de Modelos</h1>

          <Link href={"/"} className="bg-red-500 hover:bg-blue-600 text-white ml-auto px-4 py-2 rounded">Cerrar sesión</Link>
        </nav>
    )
}