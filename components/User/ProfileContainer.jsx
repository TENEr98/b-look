import Avatar from './Avatar'

const ProfileContainer = ({ profileImgUrl, children, ...restProps }) => {
  return (
    <div className="mt-32 w-full lg:px-16" {...restProps}>
      <div className="bg-white w-full h-full shadow-xl lg:rounded-xl">
        <div className="relative flex flex-col max-w-5xl mx-auto p-8">
          <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-0 left-1/2">
            <Avatar imgUrl={profileImgUrl} classes="w-32 h-32 shadow-sm" />
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default ProfileContainer
