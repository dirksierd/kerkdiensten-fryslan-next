type KFEventKind = 'morning'
type KFEventLanguage = 'fy' | 'nl'
type KFRoleOption = 'pastor'

type KFDenomination = {
  id: string
  title: string
}

type KFCongregation = {
  id: string
  title: string
  denomination: KFDenomination | null
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
  congregations: string | null
}

type KFPerson = Omit<KFPersonDb, 'denomination', 'congregations'> & {
  denomination: KFDenomination | null
  congregations: KFCongregationRole[]
}

type KFCongregationRole = {
  role: KFRoleOption
  congregation: KFCongregation
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
