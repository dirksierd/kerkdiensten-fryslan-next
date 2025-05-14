export default defineEventHandler(async (event) => {
  const DB = event.context.cloudflare.env.DB;

  const { results } = await DB.prepare(
    `
      SELECT
        e.id,
        e.startingAt,
        e.endingAt,
        e.hasHolySupper,
        e.isSpecial,
        JSON_OBJECT(
          'title', l.title
        ) AS location
      FROM events e
      JOIN locations l
      ON l.id = e.locationId
    `,
  ).all<KFEventDb>();

  const events = results.map((r): KFEvent => {
    return {
      ...r,
      location: JSON.parse(r.location),
      hasHolySupper: r.hasHolySupper === 1,
      isSpecial: r.isSpecial === 1,
    };
  });

  return events;
});
