import {Folder} from "./folder.js";
import {File} from "./file.js";

export class CompositeService {
    constructor() {
        this.mainFolder = new Folder('main')
    }

    getTree() {
        return this.mainFolder.getTree()
    }

    addFile(name, extension, path) {
        const file = new File(name, extension)
        this.addEntity(file, path)
    }

    addFolder(name, path) {
        const folder = new Folder(name)
        this.addEntity(folder, path)
    }

    addEntity(entity, path) {
        let folder = this.mainFolder

        if (path === '/') {
            folder.add(entity)
            return
        }

        const names = this.trimPath(path).split('/')
        const prevNames = []

        for(let index = 0; index < names.length; index++) {
            const name = names[index]

            prevNames.push(name)

            const item = folder.get(name)
            if (!item?.isFolder()) {
                const path = `/${prevNames.join('/')}`
                throw new Error(`isn't a folder ${path}`)
            }

            folder = item
        }

        folder.add(entity)
    }

    deleteEntity(path) {
        let folder = this.mainFolder

        if (path === '/') {
            throw new Error(`can't delete main folder`)
        }

        const names = this.trimPath(path).split('/')
        const prevNames = []

        for(let index = 0; index < names.length; index++) {
            const name = names[index]

            if (index === names.length - 1) {
                const match = folder.get(name)
                if (!match) {
                    throw new Error(`doesn't exist /${names.join('/')}`)
                }

                folder.remove(name)
                break
            }

            prevNames.push(name)

            const item = folder.get(name)
            if (!item?.isFolder()) {
                const path = `/${prevNames.join('/')}`
                throw new Error(`isn't a folder ${path}`)
            }

            folder = item
        }
    }

    trimPath(path) {
        let output = path

        if (output[0] === '/') {
            output = output.slice(1)
        }

        if (output[output.length - 1] === '/') {
            output = output.slice(0, output.length - 1)
        }

        return output
    }
}