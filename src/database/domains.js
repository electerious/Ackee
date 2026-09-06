import Domain from '../models/Domain.js'
import sortByProperty from '../utils/sortByProperty.js'

const response = (entry) => ({
  id: entry.id,
  title: entry.title,
  created: entry.created,
  updated: entry.updated,
})

export const add = async (data) => {
  const enhance = (entry) => {
    return entry == null ? entry : response(entry)
  }

  return enhance(
    await Domain.create({
      title: data.title,
    }),
  )
}

export const all = async () => {
  const enhance = (entries) => {
    return entries.map(response).toSorted(sortByProperty('title'))
  }

  return enhance(await Domain.find({}))
}

export const get = async (id) => {
  const enhance = (entry) => {
    return entry == null ? entry : response(entry)
  }

  return enhance(await Domain.findOne({ id }))
}

export const update = async (id, data) => {
  const enhance = (entry) => {
    return entry == null ? entry : response(entry)
  }

  return enhance(
    await Domain.findOneAndUpdate(
      {
        id,
      },
      {
        $set: {
          title: data.title,
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
  return Domain.findOneAndDelete({
    id,
  })
}
