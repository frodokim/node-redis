import {Router} from 'express'
import {personRepository} from '../om/person.js'

router.put('/', async(req, res) =>{
    const person = await personRepository.createAndSave(req.body)
    res.send(person)
})


export const router = Router()