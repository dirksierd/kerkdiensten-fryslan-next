export default defineEventHandler(async (event) => {
  const DB = event.context.cloudflare.env.DB
  const filters = getQuery<{ personId?: string; congregationId?: string }>(
    event,
  )

  const bindings: Array<string | number> = []
  let query = `
    SELECT *
    FROM (
      SELECT
        e.id,
        e.startingAt,
        e.endingAt,
        e.hasHolySupper,
        e.isSpecial,
        e.description,
        l.locality,
        JSON_OBJECT(
          'title', l.title,
          'locality', l.locality,
          'id', l.id,
          'congregation',
            CASE
              WHEN lc.id IS NULL THEN NULL
              ELSE
                JSON_OBJECT(
                  'id', lc.id,
                  'title', lc.title,
                  'denomination',
                    CASE
                      WHEN cd.id IS NULL THEN NULL
                      ELSE
                        JSON_OBJECT(
                          'id', cd.id,
                          'title', cd.title,
                          'titleAbbr', cd.titleAbbr
                        )
                    END
                )
            END
        ) AS location,
        JSON_GROUP_ARRAY(
          JSON_OBJECT(
            'role', ep.role,
            'person', JSON_OBJECT(
              'firstName', p.firstName,
              'lastName', p.lastName,
              'title', p.title,
              'id', p.id,
              'locality', p.locality,
              'denomination',
                CASE
                  WHEN pd.id IS NULL THEN NULL
                  ELSE
                    JSON_OBJECT(
                      'id', pd.id,
                      'title', pd.title,
                      'titleAbbr', pd.titleAbbr
                    )
                END
              )
          )
        ) FILTER (
          WHERE p.id IS NOT NULL
        ) AS roles
      FROM events e
      JOIN locations l
      ON l.id = e.locationId
      LEFT JOIN congregations lc
      ON lc.id = l.congregationId
      LEFT JOIN denominations cd
      ON cd.id = lc.denominationId
      JOIN events_people ep
      ON ep.eventId = e.id
      JOIN people p
      ON p.id = ep.personId
      LEFT JOIN denominations pd
      ON pd.id = p.denominationId
  `

  if (filters.personId) {
    query += `
      WHERE EXISTS (
        SELECT 1
        FROM events_people
        WHERE eventId = e.id AND personId = ?
      )
    `
    bindings.push(filters.personId)
  }

  if (filters.congregationId) {
    query += `WHERE lc.id = ? `
    bindings.push(filters.congregationId)
  }

  query += bindings.length ? 'AND' : 'WHERE'

  query += `
      e.startingAt > ?
      GROUP BY e.id
    ) q
    ORDER BY q.startingAt ASC, q.locality ASC
  `

  const now = Math.floor(Date.now() / 1000)
  bindings.push(now)

  const { results } = await DB.prepare(query)
    .bind(...bindings)
    .all<KFEventDb>()

  const events = results.map((r): KFEvent => {
    return {
      ...r,
      location: JSON.parse(r.location),
      hasHolySupper: r.hasHolySupper === 1,
      isSpecial: r.isSpecial === 1,
      roles: (JSON.parse(r.roles) as KFPersonRole[]).sort((a, b) =>
        a.person.firstName > b.person.firstName ? 1 : -1,
      ),
    }
  })

  return events
})
