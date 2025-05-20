export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'eventId')

  const DB = event.context.cloudflare.env.DB
  const result = await DB.prepare(
    `
    SELECT id, startingAt, endingAt, kind, hasHolySupper, isSpecial, description
    FROM events
    WHERE id = ?
    `,
  )
    .bind(id)
    .first<KFEvent>()

  return result
})
