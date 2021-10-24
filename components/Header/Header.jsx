import { useContext } from 'react'
import { Fragment } from 'react'
import { Popover, Transition, Menu } from '@headlessui/react'
import { MenuIcon, SearchIcon, XIcon } from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { CategoriesContext } from '@contexts/Categories'
import Link from 'next/link'
import { classNames } from '@utils/tailwinds'
import { useSession } from 'next-auth/client'
import Avatar from '@components/User/Avatar'

const userNavigation = [
  { name: 'Your Profile', href: '/profile' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '/auth/signout' }
]

const Header = () => {
  const categoriesList = useContext(CategoriesContext)
  const [session, loading] = useSession()

  console.log({
    session,
    loading
  })

  return (
    !loading && (
      <div className="flex justify-between items-center h-16 px-8 py-4 bg-white">
        <div className="hidden sm:flex items-center space-x-2 h-full w-1/3 min-w-xs">
          <Popover className="relative">
            {({ open }) => (
              <>
                <Popover.Button
                  className={classNames(
                    open ? 'text-gray-900' : 'text-gray-500',
                    'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  )}
                >
                  <span>Categories</span>
                  <ChevronDownIcon
                    className={classNames(
                      open ? 'text-gray-600' : 'text-gray-400',
                      'ml-2 h-5 w-5 group-hover:text-gray-500'
                    )}
                    aria-hidden="true"
                  />
                </Popover.Button>
                <Transition
                  show={open}
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel
                    static
                    className="absolute z-10 -ml-4 mt-3 transform px-2 sm:px-0 xl:ml-0 xl:left-1/2 xl:-translate-x-1/2"
                  >
                    <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                      <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                        {categoriesList.map((item) => (
                          <Link key={item.name} href={item.href}>
                            <a className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
                              <div className="ml-4">
                                <p className="text-base font-medium text-gray-900">
                                  {item.name}
                                </p>
                              </div>
                            </a>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
          <span className="h-6 w-px bg-gray-400" />
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <input
              type="text"
              name="global-search"
              id="global-search"
              className="block w-full pl-10 sm:text-sm border-none"
              placeholder="Search..."
            />
          </div>
        </div>
        <div className="text-base sm:text-center font-bold flex-1">
          <Link href="/">
            <a>
              <span className="text-gray-500">b</span>
              <span className="text-gray-900">look</span>
            </a>
          </Link>
        </div>
        <div className="hidden sm:flex items-center w-1/3 justify-end space-x-6">
          {session ? (
            <Menu as="div" className="ml-3 relative">
              {({ open }) => (
                <>
                  <div>
                    <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <span className="sr-only">Open user menu</span>
                      <Avatar imgUrl={session.user.image} classes="h-8 w-8" />
                      <span className="whitespace-nowrap text-sm font-normal text-gray-700 mx-2">
                        {session.user.fullname || 'Unnamed'}
                      </span>
                    </Menu.Button>
                  </div>
                  <Transition
                    show={open}
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items
                      static
                      className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                    >
                      <div className="px-4 p-2 border-b border-gray-400 w-full inlineblock text-sm">
                        <span className="text-gray-600">Signed in as </span>
                        <span className="text-gray-900 font-medium">
                          @{session.user.username}
                        </span>
                      </div>
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              href={item.href}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>
          ) : (
            <>
              <Link href="/auth/signin">
                <a className="whitespace-nowrap text-sm font-medium text-gray-500 hover:text-gray-900">
                  Sign in
                </a>
              </Link>
              <Link href="/auth/signup">
                <a className="whitespace-nowrap inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                  Sign up
                </a>
              </Link>
            </>
          )}
        </div>
        <Popover className="block sm:hidden">
          {({ open }) => (
            <div>
              <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-4 w-4" aria-hidden="true" />
              </Popover.Button>
              <Transition
                show={open}
                as={Fragment}
                enter="duration-200 ease-out"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="duration-100 ease-in"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Popover.Panel
                  focus
                  static
                  className="fixed z-50 top-0 right-0 p-4 transition transform origin-center flex flex-col sm:hidden h-screen w-full max-w-xs bg-white shadow-md"
                >
                  <div>
                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-4 w-4" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                  <div className="flex-1">some content</div>
                  <div className="bg-gray-400 -m-4">Authentication</div>
                </Popover.Panel>
              </Transition>
            </div>
          )}
        </Popover>
      </div>
    )
  )
}

export default Header
