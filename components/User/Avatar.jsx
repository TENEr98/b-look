import { UserIcon } from '@heroicons/react/solid'
import { classNames } from '@utils/tailwinds'

const Avatar = ({ imgUrl = null, classes = '', ...restProps }) => {
  return (
    <div
      className={classNames(
        'bg-gray-300 text-white relative rounded-full overflow-hidden border-2 border-gray-300',
        classes
      )}
      {...restProps}
    >
      {imgUrl ? (
        <img
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-auto"
          src={imgUrl}
          alt="User picture"
        />
      ) : (
        <UserIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/3 w-full h-full" />
      )}
    </div>
  )
}

export default Avatar
