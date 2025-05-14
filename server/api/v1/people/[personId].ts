export default defineEventHandler(async (event) => {
  const DB = event.context.cloudflare.env.DB
  const id = getRouterParam(event, 'personId')

  const result = await DB.prepare(
    `
      SELECT
        p.firstName,
        p.lastName,
        p.id,
        p.locality,
        CASE
          WHEN pd.id IS NULL THEN NULL
          ELSE
            JSON_OBJECT(
              'id', pd.id,
              'title', pd.title,
              'titleAbbr', pd.titleAbbr
            )
        END AS denomination,
        JSON_GROUP_ARRAY(
          JSON_OBJECT(
            'role', lp.role,
            'location',
            JSON_OBJECT(
              'id', l.id,
              'title', l.title,
              'congregation',
              CASE
                WHEN c.id IS NULL THEN NULL
                ELSE
                  JSON_OBJECT(
                    'id', c.id,
                    'title', c.title,
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
            )
          )
        ) FILTER (
          WHERE l.id IS NOT NULL
        ) AS locations
      FROM people p
      LEFT JOIN locations_people lp
      ON lp.personId = p.id
      LEFT JOIN locations l
      ON l.id = lp.locationId
      LEFT JOIN congregations c
      ON c.id = l.congregationId
      LEFT JOIN denominations cd
      ON cd.id = c.denominationId
      LEFT JOIN denominations pd
      ON pd.id = p.denominationId
      WHERE p.id = ?
    `,
  )
    .bind(id)
    .first<KFPersonDb>()

  if (result) {
    const person: KFPerson = {
      ...result,
      denomination: result.denomination
        ? JSON.parse(result.denomination)
        : null,
      locations: result.locations ? JSON.parse(result.locations) : null,
    }

    return person
  } else {
    return sendNoContent(event, 404)
  }
})
