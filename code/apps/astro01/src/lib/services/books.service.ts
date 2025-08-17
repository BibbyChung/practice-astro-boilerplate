import { getBehaviorSubject } from '~/lib/common/util'

export type BookType = {
  id: string
  name: string
  description: string
}

// books
const fakeBooks = [
  {
    id: '34e1ad23-7b54-43da-abdc-e14509d2951b',
    name: 'To Kill a Mockingbird',
    description: `A lawyer's advice to his children as he defends the real mockingbird of Harper Lee's classic novel - a black man charged with the rape of a white girl. Through the young eyes of Scout and Jem Finch, Harper Lee explores with exuberant humour the irrationality of adult attitudes to race and class in the Deep South of the 1930s. The conscience of a town steeped in prejudice, violence and hypocrisy is pricked by the stamina of one man's struggle for justice. But the weight of history will only tolerate so much.`,
  },
  {
    id: 'cdd5b323-87f0-4f39-8773-013b8ffa5350',
    name: 'The Lord of the Rings',
    description: `In ancient times the Rings of Power were crafted by the Elven-smiths, and Sauron, the Dark Lord, forged the One Ring, filling it with his own power so that he could rule all others. But the One Ring was taken from him, and though he sought it throughout Middle-earth, it remained lost to him. After many ages it fell by chance into the hands of the hobbit Bilbo Baggins.`,
  },
]
const book$ = getBehaviorSubject<BookType[]>(fakeBooks)
export const setBooks = (books: BookType[]) => {
  book$.next(books)
}
export const addBook = (book: BookType) => {
  const v = book$.getValue()
  v.push(book)
  setBooks(v)
}
export const delBook = (id: string) => {
  const v = book$.getValue()
  const newV = v.filter((a) => a.id !== id)
  setBooks(newV)
}
export const getBooks = () => book$.asObservable()
