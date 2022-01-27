import Chance from 'chance'

const chance = new Chance()

export interface Row {
  name: string
  jobTitle: string
  country: string
}

const generateRow = (): Row => ({
  name: chance.name(),
  jobTitle: chance.profession(),
  country: chance.country({ full: true })
})

export const generateRows = (count: number) => [...Array(count).keys()].map(generateRow)