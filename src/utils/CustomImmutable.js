// const data = {
//   id: 10,
//   name: 'root',
// }

// const dataList = [
//   data, data, data
// ]

// const result1 = CustomImmutable.Map(data)
// const result2 = result1.set('name', 'sercan')
// console.log(result1.toJS())
// console.log(result2.toJS())

// const result3 = CustomImmutable.List(dataList)
// const result4 = result3.push(10)
// console.log(result3.toJS())
// console.log(result4.toJS())
// console.log(result4.delete(result4.findIndex(i => i === 10)).toJS())
// const result5 = result4.update(3, item => {
//   return item
// })
// console.log(result5)

const CustomImmutable = {
  Map: function(data) {
    const memory = Object.freeze({ ...data })

    return {
      get: key => memory[key],
      set: (key, value) => {
        return this.Map({
          ...memory,
          [key]: value,
        })
      },
      toJS: () => ({ ...memory })
    }
  },
  List: function(data) {
    const memory = [ ...data ]

    const push = data => this.List(memory.concat(data))
    const findIndex = fn => memory.findIndex(fn)
    const deleteOne = (index) => {
      const next = [ ...memory ]
      next.splice(index, 1)
      return this.List(next)
    }
    const update = (index, fn) => {
      const next = [ ...memory ]
      if (memory[index] && typeof fn === 'function') {
        const next = [ ...memory ]
        next[index] = fn(next[index])
      }

      return this.List(next)
    }
    const toJS = () => [ ...memory ]

    return {
      push,
      findIndex,
      delete: deleteOne,
      update,
      toJS,
    }
  }
}

export default CustomImmutable
