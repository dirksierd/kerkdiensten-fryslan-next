type KFEventKind = 'morning'
type KFEventLanguage = 'fy' | 'nl'
type KFRoleOption = 'pastor'

type KFDenomination = {
  id: string
  title: string
  titleAbbr: string
}

type KFCongregationDb = {
  id: string
  title: string
  url: string | null
  denomination: string | null
  locations: string
}

type KFCongregation = Omit<KFCongregationDb, 'denomination' | 'locations'> & {
  denomination: KFDenomination | null
  locations: KFLocation[]
}

type KFLocation = {
  id: string
  title: string
  congregation: KFCongregation
  locality: string
  street: string
  postalCode: string
  houseNumber: string
  houseNumberSuffix: string
}

type KFPersonDb = {
  firstName: string
  lastName: string
  title: string
  id: string
  locality: string | null
  denomination: string | null
  roles: string | null
}

type KFPerson = Omit<KFPersonDb, 'denomination' | 'roles'> & {
  denomination: KFDenomination | null
  roles: KFLocationRole[]
}

type KFLocationRole = {
  role: KFRoleOption
  location: KFLocation
}

type KFPersonRole = {
  role: KFRoleOption
  person: KFPerson
}

type KFFormEvent = {
  startingAt: number
  endingAt: number
  kind: KFEventKind
  description: string
  hasHolySupper: 1 | 0
  language: KFEventLanguage
  isSpecial: 1 | 0
}

type KFEventDb = KFFormEvent & {
  id: string
  location: string
  roles: string
}

type KFEvent = Omit<
  KFEventDb,
  'isSpecial' | 'hasHolySupper' | 'location' | 'roles'
> & {
  isSpecial: boolean
  hasHolySupper: boolean
  location: KFLocation
  roles: KFPersonRole[]
}
