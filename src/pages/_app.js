import '@/styles/globals.css'
import { ModeloContextProvider } from '@/contexts/ModeloContext'

export default function App({ Component, pageProps }) {
  return (
    <ModeloContextProvider>
      <Component {...pageProps} />
    </ModeloContextProvider>
  )
}
