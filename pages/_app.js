import '../styles/globals.css'
import Layout from '../components/Layout'
import { AuthContextProvider } from '../contexts/AuthContext'
import { UserMetaContextProvider } from '../contexts/UserMetaContext'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {AnimatePresence} from 'framer-motion'
function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      {/* <UserMetaContextProvider> */}
      <AnimatePresence exitBeforeEnter>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AnimatePresence>
      {/* </UserMetaContextProvider> */}
    </AuthContextProvider>
  )
}

export default MyApp
