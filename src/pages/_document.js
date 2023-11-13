import { Html, Head, Main, NextScript } from 'next/document'
import NavBar from '@/components/NavBar'
import { useState } from 'react'

export default function Document() {

  const [estadoNavBar, setEstadoNavBar] = useState(false)

  return (
    <Html lang="es">
      <Head />
      <body>
        {estadoNavBar ?  <NavBar /> : "" }

        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
