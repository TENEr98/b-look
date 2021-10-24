import { useState, useEffect } from 'react'
import { signIn, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { ExclamationCircleIcon } from '@heroicons/react/solid'
import { classNames } from '@utils/tailwinds'
import { signUpUser } from '@services/signUp'

const handleLogin = ({ username, password, csrfToken }) => {
  signIn('credentials', {
    username,
    password,
    csrfToken,
    callbackUrl: `${window.location.origin}/`
  })
}

const Auth = ({ csrfToken = null, signUp = false }) => {
  const [form, setForm] = useState({
    username: '',
    password: '',
    error: false,
    csrfToken,
    signUpError: ''
  })
  const [session, loading] = useSession()

  const router = useRouter()

  useEffect(() => {
    if (loading) {
      return
    }

    if (session) {
      router.replace('/')
      return
    }

    if (router.query.error) {
      setForm((prevForm) => ({
        ...prevForm,
        error: true,
        username: router.query.username || ''
      }))
    }
  }, [router, loading, session])

  const onFormChange = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      error: false,
      signUpError: '',
      [e.target.name]: e.target.value
    }))
  }

  const onFormSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    if (signUp) {
      try {
        await signUpUser(form)
        router.push('/auth/signin')
      } catch (error) {
        if (error.response.status === 400) {
          setForm((prevForm) => ({
            ...prevForm,
            signUpError: error.response.data
          }))
        } else {
          setForm((prevForm) => ({
            ...prevForm,
            signUpError: 'Unexpected error occured, please try again later'
          }))
        }
      }
    } else {
      handleLogin(form)
    }
  }

  const validateForm = () => {
    return (
      form.username.length > 2 &&
      form.password.length > 2 &&
      !(signUp && form.email.length < 3 && form.fullname.length < 3)
    )
  }

  return (
    !loading &&
    !session && (
      <div className="h-full flex flex-col justify-center sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Sign {signUp ? 'up new account' : 'in to your account'}
        </h2>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={onFormSubmit}>
              {signUp && (
                <>
                  <div>
                    <label
                      htmlFor="fullname"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full name
                    </label>
                    <div className="mt-1 relative">
                      <input
                        id="fullname"
                        type="text"
                        autoComplete="fullname"
                        required
                        name="fullname"
                        value={form.fullname || ''}
                        onChange={onFormChange}
                        className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm border-gray-300 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <div className="mt-1 relative">
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        required
                        name="email"
                        value={form.email || ''}
                        onChange={onFormChange}
                        className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm border-gray-300 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </>
              )}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <div className="mt-1 relative">
                  <input
                    id="username"
                    type="text"
                    autoComplete="username"
                    required
                    name="username"
                    value={form.username}
                    onChange={onFormChange}
                    className={classNames(
                      'appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm',
                      form.error
                        ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500'
                    )}
                  />
                  {form.error && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <ExclamationCircleIcon
                        className="h-5 w-5 text-red-500"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 relative ">
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    name="password"
                    value={form.password}
                    onChange={onFormChange}
                    className={classNames(
                      'appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm',
                      form.error
                        ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500'
                    )}
                    aria-describedby="email-error"
                  />
                  {form.error && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <ExclamationCircleIcon
                        className="h-5 w-5 text-red-500"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                </div>
                {form.error && (
                  <p className="mt-2 text-sm text-red-600" id="email-error">
                    Invalid credentials provided
                  </p>
                )}
                {form.signUpError.length > 0 && (
                  <p className="mt-2 text-sm text-red-600" id="email-error">
                    {form.signUpError}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <button
                    disabled={!validateForm()}
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Sign {signUp ? 'up' : 'in'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  )
}

export default Auth
