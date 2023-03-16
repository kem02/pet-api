import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form"
import { Outlet, useActionData, useNavigate, useSubmit } from "react-router-dom";
import { Box, Button, Flex, FormControl, FormLabel, Input, } from "@chakra-ui/react";

export default function PetSearch() {
    const navigate = useNavigate();

    const { register, handleSubmit, reset, formState } = useForm();
    const onSubmit = (data) => {
        // console.log(data);
        // console.log(typeof(data.petId));

        const petId = data.petId;
        navigate(`/pet/user/${petId}`);
    }

    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset({ search: '' });
        }
    }, [formState, reset]);



    return (
        <div>

            <Flex justify="center" alignItems="center" >

                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl >
                        <FormLabel>Search for your pet</FormLabel>
                        <Input type="number" placeholder="Pet's ID number" {...register("petId", { required: true, maxLength: 80 })} />
                    </FormControl>

                    <Button
                        mt={4}
                        bg={'blue.400'}
                        color={'white'}
                        _hover={{ bg: 'blue.500', }}
                        type="submit" >
                        Submit
                    </Button>

                </form>

            </Flex>



            <Outlet />

        </div>
    )
}