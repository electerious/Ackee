import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'

import Action from '../../src/models/Action.js'
import Domain from '../../src/models/Domain.js'
import Event from '../../src/models/Event.js'
import PermanentToken from '../../src/models/PermanentToken.js'
import Record from '../../src/models/Record.js'
import Token from '../../src/models/Token.js'
import connect from '../../src/utils/connect.js'
import createArray from '../../src/utils/createArray.js'
import { job as saltJob } from '../../src/utils/salt.js'
import { day, minute } from '../../src/utils/times.js'

const mongoDb = MongoMemoryServer.create()

export const connectToDatabase = async () => {
  const dbUrl = (await mongoDb).getUri()
  return connect(dbUrl)
}

export const fillDatabase = async (t) => {
  // Saves to context so tests can access ids
  t.context.token = await Token.create({})
  t.context.permanentToken = await PermanentToken.create({ title: 'Example' })
  t.context.domain = await Domain.create({ title: 'Example' })
  t.context.event = await Event.create({ title: 'Example', type: 'TOTAL_CHART' })

  const now = Date.now()

  const records = createArray(14).map((item, index) => ({
    clientId: `client-${index}`,
    domainId: t.context.domain.id,
    siteLocation: 'https://example.com/',
    siteReferrer: 'https://google.com/',
    siteLanguage: 'en',
    source: index > 4 ? 'Newsletter' : undefined,
    screenWidth: index === 1 ? 0 : 414,
    screenHeight: index === 1 ? 0 : 896,
    screenColorDepth: 32,
    deviceName: 'iPhone',
    deviceManufacturer: 'Apple',
    osName: 'iOS',
    osVersion: index > 7 ? '13.0' : '14.0',
    browserName: 'Safari',
    browserVersion: index > 7 ? '13.0' : '14.0',
    browserWidth: index === 1 ? 0 : 414,
    browserHeight: index === 1 ? 0 : 719,
    // Set fake duration
    created: now - index * day - minute,
    updated: now - index * day,
  }))

  const actions = createArray(14).map((item, index) => ({
    eventId: t.context.event.id,
    key: `Key ${index + 1}`,
    value: index + 1,
    created: now - index * day,
    updated: now - index * day,
  }))

  await Record.insertMany(records)
  await Action.insertMany(actions)
}

export const cleanupDatabase = async (t) => {
  await Token.findOneAndDelete({
    id: t.context.token.id,
  })
  await Domain.findOneAndDelete({
    id: t.context.domain.id,
  })
}

export const cleanup = (server) => async () => {
  // Ensure database is disconnected and in-memory MongoDB is stopped
  await mongoose.disconnect()
  await (await mongoDb).stop()

  // Cancel the daily salt generation job
  saltJob.cancel()

  // Close the server to prevent open handles
  server.close()
}

export const gql = (strings, ...values) => {
  return strings.reduce((result, string, index) => result + string + (values[index] ?? ''), '')
}
