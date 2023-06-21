const express = require('express')
const router = express.Router()
const AddPerfume = require('../models/AddPerfume')

function result(succ, msg, details) {
    if (details) {
        return {
            success: succ,
            message: msg,
            data: details
        }
    } else {
        return {
            success: succ,
            message: msg,
        }
    }

}
router.get('/', async (req, res) => {
    try {
        const addperfume = await AddPerfume.aggregate([{
                $lookup: {
                    from: 'user',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'userData'
                }
            },
            {
                $set: {
                    id: '$_id',
                    username: {
                        $arrayElemAt: ['$userData.username', 0]
                    }

                } 
        
                },
                {
                $project: {
                    userData: 0,
                    _id: 0
                }
            }

        ]);
        if (addperfume.length > 0) {
            res.status(200).json(result(1, 'Retrieve Data Success', addperfume))
        } else {
            res.status(404).json(result(0, 'Zero Data!'))
        }
    } catch (error) {
        res.status(500).json(result(0, error.message))
    }
})
router.post('/', async (req, res) => {
    const inputAddPerfume = new AddPerfume({
        merekperfume: req.body.merekperfume,
        namaperfume: req.body.namaperfume,
        deskripsiperfume: req.body.deskripsiperfume,
        jenisperfume: req.body.jenisperfume,
        ukuranperfume: req.body.ukuranperfume,
        hargaperfume: req.body.hargaperfume,
        genderperfume: req.body.genderperfume,
        user_id: req.body.user_id
    })
    try {
        const addPerfume = await inputAddPerfume.save()
        res.status(200).json(result(1, 'Insert Perfume Successful'))

    } catch (error) {
        res.status(500).json(result(0, error.message))
    }
})

router.put('/', async (req, res) => {
    const data = {
        id: req.body.id,
        merekperfume: req.body.merekperfume,
        namaperfume: req.body.namaperfume,
        deskripsiperfume: req.body.deskripsiperfume,
        jenisperfume: req.body.jenisperfume,
        ukuranperfume: req.body.ukuranperfume,
        hargaperfume: req.body.hargaperfume,
        genderperfume: req.body.genderperfume
    }
    try {
        const addPerfume = await AddPerfume.updateOne({
            _id: data.id,
        }, data)

        if (addPerfume.matchedCount > 0) {
            res.status(200).json(result(1, 'Updated Data Success!'))
        } else {
            res.status(200).json(result(1, 'Updated Data Failed!'))
        }

    } catch (error) {
        res.status(500).json(result(0, error.message))
    }
})
router.delete('/:id', async (req, res) => {
    try {
        const addPerfume = await AddPerfume.deleteOne({
            _id: req.params.id
        })
        if (addPerfume.deletedCount > 0) {
            res.status(200).json(result(1, 'Deleted Data Success!'))
        } else {
            res.status(200).json(result(0, 'Deleted Data Failed!'))
        }
    } catch (error) {
        res.status(500).json(result(0, error.message))
    }

})
module.exports = router