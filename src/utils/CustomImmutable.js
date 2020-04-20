export function Map(data = {}) {
  const memory = Object.freeze({ ...data })

  const get = key => memory[key]
  const set = (key, value) => Map({
    ...memory,
    [key]: value,
  })
  const toJS = () => ({ ...memory })

  return {
    get,
    set,
    toJS,
  }
}

export function List(data = []) {
  const memory = [ ...data ]

  const push = data => List(memory.concat(data))
  const findIndex = fn => memory.findIndex(fn)
  const deleteOne = (index) => {
    const next = [ ...memory ]
    next.splice(index, 1)
    return List(next)
  }
  const update = (index, fn) => {
    const next = [ ...memory ]

    if (memory[index] && typeof fn === 'function') {
      next[index] = fn(next[index])
    }

    return List(next)
  }
  const toJS = () => [ ...memory.map(child => child?.toJS()) ]

  return {
    push,
    findIndex,
    delete: deleteOne,
    update,
    toJS,
  }
}

// const data = {
//   id: 10,
//   name: 'root',
// }

// const dataList = [
//   data, data, data
// ]

// const result1 = Map(data)
// const result2 = result1.set('name', 'sercan')
// console.log(result1.toJS())
// console.log(result2.toJS())

// const result3 = List(dataList)
// const result4 = result3.push(10)
// console.log(result3.toJS())
// console.log(result4.toJS())
// console.log(result4.delete(result4.findIndex(i => i === 10)).toJS())
// const result5 = result4.update(3, item => {
//   return item
// })
// console.log(result5)
