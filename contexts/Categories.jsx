import { createContext } from 'react'

const CategoriesContext = createContext([])

const CategoriesProvider = ({ children }) => {
  const categoriesList = [
    {
      'name': 'Fantasy',
      'href': '/book/category/Fantasy'
    },
    {
      'name': 'Sci-Fi',
      'href': '/book/category/Sci-Fi'
    },
    {
      'name': 'Mystery',
      'href': '/book/category/Mystery'
    },
    {
      'name': 'Romance',
      'href': '/book/category/Romance'
    },
    {
      'name': 'Dystopian',
      'href': '/book/category/Dystopian'
    },
    {
      'name': 'Contemporary',
      'href': '/book/category/Contemporary'
    },
    {
      'name': 'Westerns',
      'href': '/book/category/Westerns'
    },
    {
      'name': 'Thriller',
      'href': '/book/category/Thriller'
    }
  ]

  return (
    <CategoriesContext.Provider value={categoriesList}>
      {children}
    </CategoriesContext.Provider>
  )
}

export { CategoriesContext, CategoriesProvider }
