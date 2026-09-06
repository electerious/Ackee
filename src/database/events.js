import Event from '../models/Event.js'
import sortByProperty from '../utils/sortByProperty.js'

const response = (entry) => ({
  id: entry.id,
  title: entry.title,
  type: entry.type,
  created: entry.created,
  updated: entry.updated,
})

export const add = async (data) => {
  const enhance = (entry) => {
    return entry == null ? entry : response(entry)
  }

  return enhance(await Event.create(data))
}

export const all = async () => {
  const enhance = (entries) => {
    return entries.map(response).toSorted(sortByProperty('title'))
  }

  return enhance(await Event.find({}))
}

export const get = async (id) => {
  const enhance = (entry) => {
    return entry == null ? entry : response(entry)
  }

  return enhance(await Event.findOne({ id }))
}

export const update = async (id, data) => {
  const enhance = (entry) => {
    return entry == null ? entry : response(entry)
  }

  return enhance(
    await Event.findOneAndUpdate(
      {
        id,
      },
      {
        $set: {
          title: data.title,
          type: data.type,
          updated: Date.now(),
        },
      },
      {
        returnDocument: 'after',
        runValidators: true,
      },
    ),
  )
}

export const del = (id) => {
  return Event.findOneAndDelete({
    id,
  })
}
