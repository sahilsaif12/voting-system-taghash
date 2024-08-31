import { PrismaClient } from "@prisma/client";
import { connection } from "../db/index.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
const prisma = new PrismaClient();


const addVoter = asyncHandler(async (req, res) => {
    const { name, voting_choice, casted_at } = req.body
    try {
        const newVoter = await prisma.voter.create({
            data: {
                name, casted_at, voting_choice
            },
        });

        console.log(newVoter);

        res.status(200)
            .json(
                new ApiResponse(200, "vote added successfully")
            )
    } catch (error) {
        res.status(400).json(
            new ApiResponse(400, "some field is required or server problem", error)
        )
        console.log(error);
    }
})

const getVoteDateWise = asyncHandler(async (req, res) => {

    try {
        const voters = await prisma.voter.findMany({
            select: {
              voting_choice: true,
              casted_at: true,
            },
          });
        let totalYes=0
        let totalNo=0
          const result = voters.reduce((acc, voter) => {
            const casted_at = voter.casted_at
        
            if (!acc[casted_at]) {
              acc[casted_at] = { casted_at, yesCnt: 0, noCnt: 0 };
            }
        
            if (voter.voting_choice === 'yes') {
              acc[casted_at].yesCnt += 1;
            } else if (voter.voting_choice === 'no') {
              acc[casted_at].noCnt += 1;
            }
        
            return acc;
          }, {});


        res.status(200).json(
            new ApiResponse(200, "Date wise vote fetched successfully", Object.values(result))
        )

    } catch (error) {
        res.status(500).json(
            new ApiResponse(500, "server problem", error)
        )
        console.log(error);
    }
})

const voteCount = asyncHandler(async (req, res) => {
    try {
    const [total, total_yes, total_no] = await prisma.$transaction([
        prisma.voter.count(),
        prisma.voter.count({
          where: {
            voting_choice: 'yes',
          },
        }),
        prisma.voter.count({
          where: {
            voting_choice: 'no',
          },
        }),
      ]);
      
        res.status(200).json(
            new ApiResponse(200, "vote count fetched successfully", {total,total_no,total_yes})
        )
    } catch (error) {
        res.status(500).json(
            new ApiResponse(500, "server problem", error)
        )
        console.log(error);
    }
})
export {
    addVoter,
    getVoteDateWise,
    voteCount
}