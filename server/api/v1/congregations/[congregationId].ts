export default defineEventHandler(async (event) => {
  const DB = event.context.cloudflare.env.DB
  const id = getRouterParam(event, 'congregationId')

  const result = await DB.prepare(
    `
      SELECT
        c.title,
        c.url,
        CASE
          WHEN d.id IS NULL THEN NULL
          ELSE
            JSON_OBJECT(
              'id', d.id,
              'title', d.title,
              'titleAbbr', d.titleAbbr
            )
        END AS denomination,
        JSON_GROUP_ARRAY(
          JSON_OBJECT(
            'id', l.id,
            'title', l.title,
            'street', l.street,
            'houseNumber', l.houseNumber,
            'houseNumberSuffix', l.houseNumberSuffix,
            'postalCode', l.postalCode,
            'locality', l.locality
          )
        ) FILTER (
          WHERE c.id IS NOT NULL
        ) AS locations
      FROM congregations c
      LEFT JOIN denominations d
      ON d.id = c.denominationId
      LEFT JOIN locations l
      ON l.congregationId = c.id
      WHERE c.id = ?
    `,
  )
    .bind(id)
    .first<KFCongregationDb>()

  if (result) {
    const congregation = {
      ...result,
      denomination: result.denomination
        ? JSON.parse(result.denomination)
        : null,
      locations: JSON.parse(result.locations),
    } as KFCongregation

    return congregation
  } else {
    return sendNoContent(event, 404)
  }
})
