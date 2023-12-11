import '@/styles/globals.css'
import Provider from './context/Provider'


export default function App({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  )
}
