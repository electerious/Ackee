import sortByProperty from '../../../../utils/sortByProperty.js'

export default (newRef, property) =>
  (existingRefs = [], { readField }) => {
    const toObj = (ref) => ({ ref, [property]: readField(property, ref) })
    const toRef = (obj) => obj.ref

    return [...existingRefs, newRef].map(toObj).toSorted(sortByProperty(property)).map(toRef)
  }
