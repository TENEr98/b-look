import { useState, useEffect } from 'react'
import SpeechRecognition, {
  useSpeechRecognition
} from 'react-speech-recognition'
import { Switch } from '@headlessui/react'
import { classNames } from '@utils/tailwinds'
import { useToasts } from 'react-toast-notifications'
import CategorySelector from '@components/CategorySelector'
import { saveBook } from '@services/book'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

const BookEditor = ({ updatingBook = {} }) => {
  const [book, setBook] = useState({
    id: updatingBook._id || null,
    title: updatingBook.title || '',
    content: updatingBook.content || '',
    category: updatingBook.category || '',
    image: updatingBook.image || ''
  })

  const [speechEnabled, setSpeechEnabled] = useState(false)
  const { addToast } = useToasts()
  const [session, loading] = useSession()

  const router = useRouter()

  useEffect(() => {
    if (!loading && !session) {
      router.replace('/auth/signin')
    }
  }, [loading])

  const { interimTranscript, finalTranscript, resetTranscript } =
    useSpeechRecognition()

  useEffect(() => {
    if (interimTranscript.length < 1 && finalTranscript.length > 0) {
      setBook((prevBook) => ({
        ...prevBook,
        content: `${prevBook.content} ${finalTranscript}`.trim()
      }))

      resetTranscript()
    }
  }, [finalTranscript, interimTranscript])

  const onSpeechToggle = (state) => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      addToast("Your browser doesn't support speech recognition", {
        appearance: 'info'
      })
      return
    }

    setSpeechEnabled(state)

    if (state) {
      SpeechRecognition.startListening({ language: 'en-US', continuous: true })
    } else {
      SpeechRecognition.stopListening()
    }
  }

  const onBookChange = ({ target: { value, name } }) => {
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value || ''
    }))
  }

  const onFileUpload = async (e) => {
    e.preventDefault()
    const file = e.target.files[0]

    if (file) {
      try {
        const image = await getBase64(file)
        setBook((prevBook) => ({
          ...prevBook,
          image
        }))

        console.log(image)
      } catch (error) {
        console.error(error)
      }
    }
  }

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  const onBookSave = async () => {
    if (book.content.length < 1 || book.title < 1 || book.category < 1) return

    const payload = {
      ...book,
      creator: session.user.id
    }

    try {
      await saveBook(payload)

      router.replace('/profile')
    } catch {
      addToast('Unable to save the book', {
        appearance: 'error'
      })
    }
  }

  return (
    !loading && (
      <div className="min-h-full w-full flex p-8 flex-col justify-center">
        <h1 className="text-lg font-medium">
          {updatingBook.title ? 'Edit your book' : 'Create your new book'}
        </h1>
        <div className="mt-8">
          <form action="#" method="POST">
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name your book
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        Title
                      </span>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                        placeholder="My New Book"
                        value={book.title}
                        onChange={onBookChange}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="content"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Book content
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="content"
                      name="content"
                      rows={3}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Start story here"
                      value={book.content}
                      onChange={onBookChange}
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Words count:{' '}
                    {
                      book.content.split(' ').filter((word) => word.length > 0)
                        .length
                    }
                  </p>
                </div>

                <div>
                  <CategorySelector
                    onChange={(category) => {
                      setBook((prevBook) => ({
                        ...prevBook,
                        category
                      }))
                    }}
                    selectedCategory={book.category}
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700">
                    Cover image
                  </label>

                  {book.image.length < 1 ? (
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              accept="image/*"
                              onChange={onFileUpload}
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="w-32 h-40 mt-8">
                        <img className="w-full h-auto" src={book.image} />
                      </div>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>Change</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            accept="image/*"
                            onChange={onFileUpload}
                            className="sr-only"
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 flex flex-row items-center justify-between sm:px-6">
                <Switch.Group as="div" className="flex items-center">
                  <Switch
                    checked={speechEnabled}
                    onChange={onSpeechToggle}
                    className={classNames(
                      speechEnabled ? 'bg-indigo-600' : 'bg-gray-200',
                      'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    )}
                  >
                    <span className="sr-only">Use setting</span>
                    <span
                      aria-hidden="true"
                      className={classNames(
                        speechEnabled ? 'translate-x-5' : 'translate-x-0',
                        'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                      )}
                    />
                  </Switch>
                  <Switch.Label as="span" className="ml-3">
                    <span className="text-sm font-medium text-gray-900">
                      Speech recognition
                    </span>
                  </Switch.Label>
                </Switch.Group>
                <button
                  type="button"
                  disabled={
                    book.category.length < 1 ||
                    book.content.length < 1 ||
                    book.title < 1
                  }
                  onClick={onBookSave}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-500 disabled:cursor-not-allowed"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  )
}

export default BookEditor
