import Header from '@components/Header/Header'
import { CategoriesProvider } from '@contexts/Categories'
import Head from 'next/head'
import '@assets/tailwind.scss'
import 'swiper/swiper.scss'
import { Provider } from 'next-auth/client'
import { ToastProvider } from 'react-toast-notifications'

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider session={pageProps.session}>
      <ToastProvider autoDismiss placement={'bottom-right'}>
        <CategoriesProvider>
          <Head>
            <title>B-Look</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <div className="w-full h-full min-h-full">
            <div className="bg-bg max-w-desktop w-full min-h-full mx-auto shadow-2xl flex flex-col pb-24">
              <Header />
              <Component {...pageProps} />
            </div>
          </div>
        </CategoriesProvider>
      </ToastProvider>
    </Provider>
  )
}

export default MyApp
