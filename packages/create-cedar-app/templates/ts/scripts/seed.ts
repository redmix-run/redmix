// import { db } from 'api/src/lib/db.js'

// Manually apply seeds via the `yarn rw prisma db seed` command.
//
// Seeds automatically run the first time you run the `yarn rw prisma migrate dev`
// command and every time you run the `yarn rw prisma migrate reset` command.
//
// See https://redwoodjs.com/docs/database-seeds for more info

export default async () => {
  try {
    // Create your database records here! For example, seed some users:
    //
    // const users = [
    //   { name: 'Alice', email: 'alice@cedarjs.com' },
    //   { name: 'Bob', email: 'bob@cedarjs.com' },
    // ]
    //
    // await db.user.createMany({ data: users })

    console.info(
      '\n  No seed data, skipping. See scripts/seed.ts to start seeding your database!\n'
    )
  } catch (error) {
    console.error(error)
  }
}
