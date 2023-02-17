const router = require('express').Router()
const Character = require('../models/Character.model')
/**
 * !All the routes here are prefixed with /api/characters
 */

/**
 * ? This route should respond with all the characters
 */
router.get('/', async (req, res, next) => {
	try {
		const allCharacters = await Character.find()
		res.status(200).json(allCharacters)
	} catch (error) {
		next(error)
	}
})


/**
 * ? This route should create one character and respond with
 * ? the created character
 */
router.post('/', async (req, res, next) => {
	try {
		const almostCreatedCharacter = { ...req.body }
		if (!req.body.name || !req.body.occupation || !req.body.cartoon || !req.body.weapon) {
			res.status(400).json({ error: "Complete all the fields" })
			return
		}
		const createdCharacter = await Character.create(almostCreatedCharacter)
		res.status(201).json(createdCharacter)
	} catch (error) {
		next(error)
	}
})
/**
 * ? This route should respond with one character
 */
router.get('/:id', async (req, res, next) => {
	try {
		const oneCharacter = await Character.findById(req.params.id)
		res.json(oneCharacter)
	} catch (error) {
		next(error)
	}
})
/**
 * ? This route should update a character and respond with
 * ? the updated character
 */
router.patch('/:id', async (req, res, next) => {
	try {
		const characterToUpdate = { ...req.body }
		const updatedCharacter = await Character.findByIdAndUpdate(req.params.id, characterToUpdate, { new: true })
		if (!updatedCharacter) {
			res.status(400).json({ error: "Couldn't find this character !" })
			return
		}
		res.status(202).json(updatedCharacter)
	} catch (error) {
		next(error)
	}
})

/**
 * ? Should delete a character and respond with a success or
 * ? error message
 */
router.delete('/:id', async (req, res, next) => {
	try {
		const characterToUseToDelete = { ...req.body }
		const deletedCharacter = await Character.findByIdAndDelete(req.params.id, characterToUseToDelete)
		if (!deletedCharacter) {
			res.status(400).json({ error: "Couldn't find this character !" })
			return
		}
		res.status(200).json(deletedCharacter)
	} catch (error) {
		next(error)
	}
})

module.exports = router
