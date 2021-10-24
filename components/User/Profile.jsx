import BooksList from './BooksList'
import ProfileContainer from './ProfileContainer'
import UsersList from './UsersList'

const following = [
  {
    name: 'Leonard Krasner',
    handle: 'leonardkrasner',
    imageUrl:
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    name: 'Floyd Miles',
    handle: 'floydmiles',
    imageUrl:
      'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    name: 'Emily Selman',
    handle: 'emilyselman',
    imageUrl:
      'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    name: 'Kristin Watson',
    handle: 'kristinwatson',
    imageUrl:
      'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    name: 'Leonard Krasner',
    handle: 'leonardkrasner',
    imageUrl:
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
]

const followers = [
  {
    name: 'Whitney Trudeau',
    handle: 'leonardkrasner',
    imageUrl:
      'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    name: 'Kristin Watson',
    handle: 'floydmiles',
    imageUrl:
      'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    name: 'Emily Wilson',
    handle: 'emilyselman',
    imageUrl:
      'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    name: 'Emma Youngs',
    handle: 'kristinwatson',
    imageUrl:
      'https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
]

const books = [
  {
    id: 1,
    title: "Lee Wong's Travel Story",
    category: 'Fantasy',
    votes: '12',
    words: '85974',
    createdDate: '2020-01-07',
    createdDateFull: 'January 7, 2020'
  },
  {
    id: 2,
    title: 'How to play DOTO',
    category: 'Detective',
    votes: '327',
    words: '45638',
    createdDate: '2020-01-07',
    createdDateFull: 'January 7, 2020'
  },
  {
    id: 3,
    title: 'Where is my 5 points?',
    category: 'Action',
    votes: '58',
    words: '30000',
    createdDate: '2020-01-14',
    createdDateFull: 'January 14, 2020'
  }
]

const Profile = ({ owner = false, user = null, userBooks = [] }) => {
  return (
    user && (
      <ProfileContainer profileImgUrl={user.image}>
        <div className="flex flex-col-reverse lg:flex-col">
          <div className="w-full flex flex-col-reverse justify-between items-center mt-6 xs:flex-row">
            <div className="flex flex-row space-x-10 xs:mt-0 mt-6">
              <div className="flex flex-col items-center">
                <p className="text-gray-600 font-bold text-xl">
                  {followers.length}
                </p>
                <span className="text-gray-400 text-sm font-thin">
                  Followers
                </span>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-gray-600 font-bold text-xl">
                  {following.length}
                </p>
                <span className="text-gray-400 text-sm font-thin">
                  Following
                </span>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-gray-600 font-bold text-xl">
                  {books.length}
                </p>
                <span className="text-gray-400 text-sm font-thin">Books</span>
              </div>
            </div>
            <div>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 w-24 justify-center border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {owner ? 'Settings' : 'Follow'}
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center mt-12 lg:mt-8">
            <h1 className="font-medium text-gray-700 text-3xl tracking-wide">
              {user.fullname}
            </h1>
            <p className="font-normal text-gray-400 mt-1 text-xl">
              @{user.username}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 mt-8 gap-16 w-full">
          <UsersList users={followers} />
          <UsersList users={following} title="Following" />
          <BooksList books={userBooks || []} classes="xl:col-span-2" />
        </div>
      </ProfileContainer>
    )
  )
}

export default Profile
