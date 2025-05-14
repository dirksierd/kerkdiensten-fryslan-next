export default defineEventHandler(async (event) => {
  const DB = event.context.cloudflare.env.DB
  const filters = getQuery<{ personId?: string }>(event)

  const bindings: string[] = []
  let query = `
      SELECT
        e.id,
        e.startingAt,
        e.endingAt,
        e.hasHolySupper,
        e.isSpecial,
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
                          'title', cd.title
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
              'id', p.id,
              'locality', p.locality,
              'denomination',
                CASE
                  WHEN pd.id IS NULL THEN NULL
                  ELSE
                    JSON_OBJECT(
                      'id', pd.id,
                      'title', pd.title
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
      LEFT JOIN events_people ep
      ON ep.eventId = e.id
      JOIN people p
      ON p.id = ep.personId
      LEFT JOIN denominations pd
      ON pd.id = p.denominationId
  `

  if (filters.personId) {
    query += `WHERE p.id = ? `
    bindings.push(filters.personId)
  }

  query += 'GROUP BY e.id'

  const { results } = await DB.prepare(query)
    .bind(...bindings)
    .all<KFEventDb>()

  const events = results.map((r): KFEvent => {
    return {
      ...r,
      location: JSON.parse(r.location),
      hasHolySupper: r.hasHolySupper === 1,
      isSpecial: r.isSpecial === 1,
      roles: JSON.parse(r.roles),
    }
  })

  return events
})
