import { Router } from "express";
import { addVoter, getVoteDateWise, voteCount } from "../controllers/voter.controller.js";

const router=Router()
router.route('/')
            .post(addVoter)

router.route('/dateWiseVote').get(getVoteDateWise)
router.route('/voteCount').get(voteCount)


export default router