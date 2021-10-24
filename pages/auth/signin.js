import Auth from '@components/Auth/Auth'
import { getCsrfToken } from 'next-auth/client'

export default function Authorization({ csrfToken }) {
  return <Auth csrfToken={csrfToken} />
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: (await getCsrfToken(context)) || null
    }
  }
}
