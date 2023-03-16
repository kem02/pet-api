import { Box, Flex, Spacer, Button, Text, Tag, TagLeftIcon } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoPersonCircleOutline } from "react-icons/io5"

export default function Navbar() {
    const [user, setUser] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("username");

        if (user) {
            setUser(user);
            setIsAuthenticated(true)
        }
    }, [user]);

    const handleSignOut = () => {
        localStorage.removeItem("token")
        setIsAuthenticated(false);
        localStorage.removeItem("username")
        setUser('');
        navigate("/")
    }


    return (
        <div>
            <Flex padding="10px" background="blue.500" align="center">
                <Flex>
                    {
                        user ?
                            <Tag
                                // border="black solid 1px"
                                size={"lg"}
                                key={"lg"}
                                variant='subtle'
                                colorScheme='cyan'
                                mr={2}
                            >
                                <TagLeftIcon
                                    boxSize='16px'
                                    as={IoPersonCircleOutline}
                                />
                                Hi {user}
                            </Tag>
                            :
                            null
                    }

                    {
                        isAuthenticated ?
                            <Button
                                onClick={handleSignOut}
                                // border='1px'
                                colorScheme='black'
                                color="black"
                                variant='ghost'
                            >
                                Sign Out</Button> : null
                    }

                </Flex>
                <Spacer marginLeft={20} />
                <Box position="absolute" left="50%" transform="translateX(-50%)" >
                    <NavLink to="/" >
                        <Text fontSize="2xl" fontWeight="semibold" >Pet API</Text>
                    </NavLink>
                </Box>


                <Spacer />
                <Flex align="center" gap="4">

                    <NavLink to="/pet" end>
                        {({ isActive }) => (
                            <Box
                                padding="2"
                                fontWeight="semibold"
                                fontSize="lg"
                                marginLeft={"10px"}
                                marginRight={"15px"}
                                borderWidth="thick"
                                borderTop={"none"}
                                borderLeft={"none"}
                                borderRight={"none"}
                                borderBottomColor={isActive ? "cyan.400" : "white"}
                            >
                                All Pets
                            </Box>
                        )}
                    </NavLink>

                    <NavLink to="/pet/user" end>
                        {({ isActive }) => (
                            <Box
                                padding="2"
                                fontWeight="semibold"
                                fontSize="lg"
                                marginLeft={"10px"}
                                marginRight={"15px"}
                                borderWidth="thick"
                                borderTop={"none"}
                                borderLeft={"none"}
                                borderRight={"none"}
                                borderBottomColor={isActive ? "cyan.400" : "white"}
                            >
                                Find your pet
                            </Box>
                        )}
                    </NavLink>

                    <NavLink to="/auth/login">
                        <Box
                            padding="2"
                            fontWeight="semibold"
                            fontSize="lg"
                        >
                            Login
                        </Box>
                    </NavLink>

                    <NavLink to="/auth/signup">
                        <Box
                            padding="2"
                            fontWeight="semibold"
                            fontSize="lg"
                            marginLeft={"10px"}
                            marginRight={"15px"}
                        >
                            Signup
                        </Box>
                    </NavLink>



                </Flex>

            </Flex>
        </div>
    )
}