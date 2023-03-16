import axios from "axios";
import { useEffect } from "react";

export default function GetUserPet() {
    useEffect(() => {
        const token = localStorage.getItem("token")

        const fetchUserPet = async () => {
            try {
                const petData = await axios.get("http://localhost:8080/pet/user/2", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                console.log(petData);

            } catch (error) {
                console.log(error)
            }
        }

        fetchUserPet();

    }, [])

    return (
        <div>

        </div>
    )
}

