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
  denomination: string | null
  locations: string
}

type KFCongregation = Omit<KFCongregationDb, 'denomination', 'locations'> & {
  denomination: KFDenomination | null
  locations: KFLocation[]
}

type KFLocation = {
  title: string
  congregation: KFCongregation | null
}

type KFPersonDb = {
  firstName: string
  lastName: string
  id: string
  locality: string | null
  denomination: string | null
  locations: string | null
}

type KFPerson = Omit<KFPersonDb, 'denomination', 'congregations'> & {
  denomination: KFDenomination | null
  locations: KFLocationRole[]
}

type KFLocationRole = {
  role: KFRoleOption
  congregation: KFLocation
}

type KFPersonRole = {
  role: KFRoleOption
  person: KFPerson
}

type KFEventDb = {
  id: string
  startingAt: number
  endingAt: number
  location: string
  kind: KFEventKind
  description: string
  hasHolySupper: 1 | 0
  language: KFEventLanguage
  isSpecial: 1 | 0
  roles: string
}

type KFEvent = Omit<
  KFEventDb,
  'isSpecial' | 'hasHolySupper' | 'location' | 'roles'
> & {
  isSpecial: boolean
  hasHolySupper: boolean
  location: KFLocation[]
  roles: KFPersonRole[]
}
