import { classNames } from '@utils/tailwinds'

const UsersList = ({
  users = [],
  title = 'Followers',
  classes = '',
  ...restProps
}) => {
  return (
    <div className={classNames('flex flex-col', classes)} {...restProps}>
      <h2 className="text-gray-600 text-lg border-b border-gray-200 pb-3 font-medium">
        {title}
      </h2>
      <div>
        <div className="flow-root mt-6">
          {users.length < 1 ? (
            <div className="max-w-7xl mx-auto text-center">
              <h2 className="tracking-tight text-gray-400 text-lg capital">
                Your {title.toLowerCase()} list is empty
              </h2>
            </div>
          ) : (
            <ul className="-my-5 divide-y divide-gray-200">
              {users.slice(0, 4).map((person) => (
                <li key={person.handle} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8 rounded-full"
                        src={person.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {person.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {'@' + person.handle}
                      </p>
                    </div>
                    <div>
                      <a
                        href="#"
                        className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                      >
                        View
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {users.length > 4 && (
          <div className="mt-6">
            <a
              href="#"
              className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              View all
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default UsersList
