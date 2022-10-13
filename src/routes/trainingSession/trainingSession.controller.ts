import { TrainingSession } from "../../schemas/training.session";
import { Request, Response } from 'express';

export async function getTrainingSession(
    req: Request,
    res: Response
    ){
        try {
            let docs = null;

            if (req.query.userId == null) {
                throw new Error("No userId provides!")
            }

            if (req.query.id) {
                docs = await TrainingSession.find({
                    userId: req.query.userId,
                    _id: req.query.id
                })
            } else {
                docs = await TrainingSession.find({
                    userId: req.query.userId
                })
            }
            if (docs.length == 0) {
                res.status(404)
                return res.json(docs)
            }
            res.status(200)
            return res.json(docs)
        } catch (error) {
            return res.sendStatus(400)
        }
}

export async function postTrainingSession(
    req: Request,
    res: Response
){
    try {
        const saved = await TrainingSession.create(req.body)
        if (saved) {
            res.status(200)
            return res.json(saved._id)
        } else {
            throw new Error()
        }
        
    } catch (error) {
        return res.sendStatus(400)
    }
}