import {  Button, Text, Card, CardBody, Stack, Heading, Divider, CardFooter, ButtonGroup, Image, Flex, Alert, AlertIcon } from "@chakra-ui/react"
import { useLoaderData} from "react-router-dom"
import { IoHeartOutline } from "react-icons/io5"

export default function PetSearchResult() {

    const petData = useLoaderData()
    console.log(petData);


    // const { id, name, species } = petData.findPetById[0];
    // const { id, name, species } = petData?.findPetById?.[0] || {}
    const { id, name, species } = petData.findPetById ? petData.findPetById[0] : {}

    return (
        <>
            {
                petData.success === true ?
                    <Flex
                        // border="red solid 1px"
                        pt="8rem"
                        align={'center'}
                        justify={'center'}
                    >
                        <Card maxW='md'>
                            <CardBody>
                                <Image
                                    src='https://placehold.jp/3d4070/ffffff/150x150.png'
                                    borderRadius='lg'
                                />
                                <Stack mt='6' spacing='3'>
                                    <Heading size='md'>Pet's Name: {name}</Heading>
                                    <Text>Your pet's ID #: {id}</Text>
                                    <Text>Species: {species}</Text>
                                </Stack>
                            </CardBody>
                            <Divider />
                            <CardFooter>
                                <ButtonGroup spacing='2'>
                                    <Button
                                        variant='solid'
                                        colorScheme='blue'
                                        leftIcon={<IoHeartOutline />}
                                    >
                                        Love your pet
                                    </Button>
                                    <Button variant='ghost' colorScheme='blue'>
                                        Change your pet's info
                                    </Button>
                                </ButtonGroup>
                            </CardFooter>
                        </Card>
                    </Flex>

                    :
                    <Flex
                        align={'center'}
                        justify={'center'}
                    // border="red solid 1px"
                    >
                        <Alert
                            status='warning'
                            m="2rem"
                            ml="40rem"
                            mr="40rem"
                        // border="red solid 1px"
                        >
                            <AlertIcon />
                            No pet by that id for this user
                        </Alert>

                    </Flex>

            }

            


            {/* <Card maxW='sm'>
                <CardBody>
                    <Image
                        src='https://placehold.jp/3d4070/ffffff/150x150.png'
                        borderRadius='lg'
                    />
                    <Stack mt='6' spacing='3'>
                        <Heading size='md'>Pet's Name: {name}</Heading>
                        <Text>Pet's ID: {id}</Text>
                        <Text>Species: {species}</Text>
                    </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                    <ButtonGroup spacing='2'>
                        <Button
                            variant='solid'
                            colorScheme='blue'
                            leftIcon={<IoHeartOutline />}
                        >
                            Your pet
                        </Button>
                        <Button variant='ghost' colorScheme='blue'>
                            Change your pet's info
                        </Button>
                    </ButtonGroup>
                </CardFooter>
            </Card> */}


        </>


    )
}


// useEffect(() => {

    //     if (petData) {
    //         if (petData.response) {
    //             if (petData.response.status == 404) {
    //                 console.log(petData)
    //                 setSuccessMsg(false)
    //                 console.log("no pet data")
    //             }

    //         }

    //     } else {

    //         setSuccessMsg(true)
    //         // setResponse('')

    //     }

    //     if (petData.status == 200) {
    //         setSuccessMsg(true)
    //     }


    // }, [petData]);