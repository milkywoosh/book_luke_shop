import { faker } from '@faker-js/faker'

export type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  progress: number
  status: 'relationship' | 'complicated' | 'single'
  subRows?: Person[]
}

export type Product = {
  id: number
  productCode: string
  categoryId: number
  createdBy: number
  subRows?: Product[]
}

const range = (len: number) => {
  const arr: number[] = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newPerson = (): Person => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int(40),
    visits: faker.number.int(1000),
    progress: faker.number.int(100),
    status: faker.helpers.shuffle<Person['status']>([
      'relationship',
      'complicated',
      'single',
    ])[0]!,
  }
}

const newProduct = (): Product => {
  return {
    id: faker.number.int({ min: 1, max: 100 }),
    productCode: faker.book.publisher(),
    categoryId: faker.number.int({ min: 1, max: 10 }),
    createdBy: faker.number.int({ min: 1, max: 5 }),
  }
}

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Person[] => {
    const len = lens[depth]!
    return range(len).map((d): Person => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}

export function makeDataProduct(...lens: number[]) {
  const makeDataLevel = (depth = 0): Product[] => {
    const len = lens[depth]!
    return range(len).map((d): Product => {
      return {
        ...newProduct(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}