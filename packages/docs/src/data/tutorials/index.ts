import { meta as meta01 } from './01_creatingFirstCustomReport'

const tutorialsIndex = {
  [meta01.id]: () => import('./01_creatingFirstCustomReport')
}

export const getTutorialMetas = () => ([
  meta01
])

export const getTutorialById = (id: string) => {
  return tutorialsIndex[id]() ?? null
}
