import '@/styles/globals.css'
import Provider from './context/Provider'

export default function App({ Component, pageProps }) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  )
}
