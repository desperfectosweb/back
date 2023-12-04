import Language from '../models/language.model'

export const findAllLangauges = async () => {
  return await Language.findAll()
}
