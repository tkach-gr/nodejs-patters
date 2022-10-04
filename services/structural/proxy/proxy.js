export class Proxy {
    constructor(db) {
        this.db = db
    }

    getAll() {
        console.log('- call getAll')
        const res = this.db.getAll()
        console.log(`response: ${JSON.stringify(res)}`)
        return res
    }

    get(id) {
        try {
            console.log('- get {id}')
            console.log(`request: id=${id}`)
            const res = this.db.get(id)
            console.log(`response: ${res}`)
            return res
        } catch (e) {
            console.log(`error: ${e}`)
            throw e
        }
    }

    add(item) {
        console.log('- add {item}')
        console.log(`request: item=${item}`)
        const res = this.db.add(item)
        console.log(`response: ${res}`)
        return res
    }

    delete(id) {
        try {
            console.log('- delete {id}')
            console.log(`request: id=${id}`)
            this.db.delete(id)
            console.log('response: success')
        } catch (e) {
            console.log(`error: ${e}`)
            throw e
        }
    }
}