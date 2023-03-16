import { FormControl, FormLabel, Input, Box, useToast, Button, Flex, useColorModeValue, Stack, Heading, Link, Text, HStack, Spacer } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form"
import { Navigate, useActionData, useNavigate, useSubmit } from "react-router-dom"
import { IoArrowBackOutline } from "react-icons/io5"


export default function Login() {
    // const [notLoggedIn, setNotLoggedIn] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const [successMsg, setSuccessMsg] = useState(false);
    const [inputMsg, setInputMsg] = useState(false);
    const [wrongUserOrPassword, setWrongUserOrPassword] = useState(false);


    const submit = useSubmit();
    const actionData = useActionData();
    const navigate = useNavigate();
    const toast = useToast();
    const id = 'test-toast'

    const { register, handleSubmit, formState: { errors } } = useForm();

    //useEffect for messages
    useEffect(() => {

        if (actionData && actionData.response && (actionData.response.status == 500 || actionData.response.status == 401)) {
            console.log(actionData)

            if (!toast.isActive(id)) {
                toast({
                    id,
                    title: 'Wrong username or password',
                    description: "Please try again",
                    status: 'error',
                    duration: 3500,
                    isClosable: true,
                });
            }

        }


        if (actionData && actionData.status == 200) {
            console.log("SUCCESS!");

            if (!toast.isActive(id)) {
                toast({
                    id,
                    title: 'Welcome back',
                    description: "Redirecting you to the home page...",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            }

            setTimeout(() => {
                navigate("/")
            }, 2500);


        }

    }, [actionData,]);




    // data that is extracted from react form
    const onSubmit = (data) => {
        console.log(data);

        if (data.username == '' || data.password == '') {
            // console.log("there was nothing written")
            if (!toast.isActive(id)) {
                toast({
                    id,
                    title: 'Please make sure to type a username and password',
                    status: 'error',
                    duration: 3500,
                    isClosable: true,
                });
            }

            return;
        } else {


            submit(data, { method: "post", action: "/auth/login" });
        }
    }
    // console.log(errors);
    console.log(actionData)





    return (
        <Flex
            // border="black solid 1px"
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}
        >
            
            <HStack  >
                <Spacer />

                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6} >
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            to get access to your pets
                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}
                    >
                        <Stack>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <FormControl mb={4}>
                                    <FormLabel>Username</FormLabel>
                                    <Input type="text" placeholder="username" {...register("username")} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Password</FormLabel>
                                    <Input type="text" placeholder="password" {...register("password")} />
                                </FormControl>

                                <Button
                                    m={4}
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{ bg: 'blue.500', }}
                                    type="submit" >
                                    Submit
                                </Button>

                                <Button
                                    onClick={() => navigate("/")}
                                    leftIcon={<IoArrowBackOutline />}
                                    colorScheme='blue'
                                    variant='outline'
                                    m={4}
                                >
                                    Back
                                </Button>

                            </form>
                        </Stack>


                    </Box>
                </Stack>
            </HStack>






        </Flex>
    )
}




        // try {
        //     await axios.post("http://localhost:8080/auth/login", data)
        //         .then((response) => {
        //             console.log(response);

        //             if (response.status == 200 && response.data.token) {
        //                 localStorage.setItem("token", response.data.token);
        //                 setNotLoggedIn(false)
        //                 setIsLoggedIn(true);
        //             } else {
        //                 return null;
        //             }
        //         });
        // } catch (error) {
        //     console.log(error);
        //     setNotLoggedIn(true);
        //     setIsLoggedIn(false)
        // }


        // console.log(sendForm)