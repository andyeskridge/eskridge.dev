import '../styles/tailwind.css'
import { AppPropsType } from 'next/dist/next-server/lib/utils'

export default ({ Component, pageProps }: AppPropsType) => (
  <Component {...pageProps} />
)
