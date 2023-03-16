import express, { response } from "express";
import prisma from "../db/index.js";

export default function setupPetRouter(passport) {
    const router = express.Router();

    //GET all pets for either logged in users or public
    router.get("/", async (request, response) => {

        const allPets = await prisma.pet.findMany()

        response.status(200).json({
            success: true,
            allPets
        });
    });


    //GET single pet by id# (not logged in)
    router.get("/:petId", async (request, response) => {
        const petId = parseInt(request.params.petId);

        try {

            const findPetById = await prisma.pet.findUniqueOrThrow({
                where: {
                    id: petId,
                },
                select: {
                    name: true,
                    species: true,
                    user: {
                        select: {
                            username: true
                        }
                    }
                }
            });

            response.status(200).json({
                success: true,
                findPetById,
            });

        } catch (error) {
            response.status(404).json({
                success: false,
                message: "pet does not exist 1"
            });
        }


    });


    //GET ONE pet for currently logged in user
    router.get("/user/:petId", passport.authenticate("jwt", { session: false }), async (request, response) => {
        const petId = parseInt(request.params.petId);


        const findPetById = await prisma.pet.findMany({
            where: {
                AND: [
                    { userId: request.user.id },
                    { id: petId },
                ]
            },
        });



        if (findPetById.length == 0) {
            response.status(404).json({
                success: false,
                message: "pet does not exist 2"
            });
        } else {
            response.status(200).json({
                success: true,
                findPetById,
            });
        }


    });

    //GET ALL pets for currently logged in user
    router.get("/user/all/pets", passport.authenticate("jwt", { session: false }), async (request, response) => {
        try {
            const findAllPetsByUser = await prisma.pet.findMany({
                where: {
                    userId: request.user.id,
                },
            });

            if (findAllPetsByUser.length == 0) {
                response.status(404).json({
                    success: false,
                    message: "pets does not exist for this user"
                });
            } else {
                response.status(200).json({
                    success: true,
                    findAllPetsByUser,
                });
            }


        } catch (error) {
            response.status(500).json({
                success: false,
                message: "Something went wrong"
            });
        }





        // if (findPetById.length == 0) {

        // } else {

        // }


    });


    //POST new pet for currently logged in user
    router.post("/", passport.authenticate("jwt", { session: false }), async (request, response) => {
        try {
            const newPet = await prisma.pet.create({
                data: {
                    name: request.body.name,
                    species: request.body.species,
                    userId: request.user.id,
                }
            });

            response.status(201).json({
                success: true,
                newPet,
            });

        } catch (error) {
            response.status(500).json({
                success: false,
                message: "Pet not created"
            });
        }


    });


    //PUT only signed in users pet
    router.put("/:petId", passport.authenticate("jwt", { session: false }), async (request, response) => {
        const petId = parseInt(request.params.petId);

        const editPet = await prisma.pet.updateMany({
            where: {
                AND: [
                    { userId: request.user.id },
                    { id: petId },
                ]
            },
            data: {
                name: request.body.name,
                species: request.body.species,
            },
        });

        if (editPet.count == 0) {
            response.status(404).json({
                success: false,
                message: "Pet does not exist for this user"
            });
        } else {
            response.status(200).json({
                success: true,
            });
        }

    });


    //DELETE only signed in users pet
    router.delete("/:petId", passport.authenticate("jwt", { session: false }), async (request, response) => {
        const petId = parseInt(request.params.petId);

        const deletePet = await prisma.pet.deleteMany({
            where: {
                userId: request.user.id,
                id: petId,
            }
        });

        if (deletePet.count == 0) {
            response.status(404).json({
                success: false,
                message: "Pet does not exist for this user"
            });
        } else {
            response.status(200).json({
                success: true,
            });
        }
    })








    return router;
}

