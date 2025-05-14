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
            'role', cp.role,
            'congregation',
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
          )
        ) FILTER (
          WHERE c.id IS NOT NULL
        ) AS congregations
      FROM people p
      LEFT JOIN congregations_people cp
      ON cp.personId = p.id
      JOIN congregations c
      ON c.id = cp.congregationId
      JOIN denominations cd
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
      congregations: result.congregations
        ? JSON.parse(result.congregations)
        : null,
    }

    return person
  } else {
    return sendNoContent(event, 404)
  }
})
