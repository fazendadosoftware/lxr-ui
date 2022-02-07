import tutorialMeta01 from './tutorials/01_creatingFirstCustomReport'

const contentIndex = {
  'introduction': () => import('./introduction.md'),
  [tutorialMeta01.id]: () => import(`./tutorials/${tutorialMeta01.filename}.md`)
}

export const getTutorialMetas = () => ([
  tutorialMeta01
])

export const getContentById = async (id: string) => {
  const content = await contentIndex[id]?.().then(res => res?.default) ?? null
  return content
}
