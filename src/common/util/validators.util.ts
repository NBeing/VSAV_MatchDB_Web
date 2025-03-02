import YoutubeUtil from "@Common/util/youtube.util"

type GenericValidator =
    ((str: string) => boolean) |
    ((number: string) => boolean) |
    ((str: string) => boolean)

const isInt: GenericValidator = (num: unknown) => Number.isInteger(parseInt(num as string))
const isGtEqZero: GenericValidator = (num: unknown) => (parseInt(num as string)) >= 0
const isStringOrNull: GenericValidator = (str: unknown) => typeof str == 'string'
const isNotNoneOption: GenericValidator = (option: unknown) => option !== null

const validators = {
  isInt,
  isGtEqZero,
  isStringOrNull,
  isNotNoneOption,
  isYoutube: YoutubeUtil.isYoutube
}
export {
  validators,
  type GenericValidator
}