import axios from "axios";

export const fetchAllPets = async () => {
    try {
        const apiResponse = await axios.get("http://localhost:8080/pet/");

        const data = apiResponse.data;
        return data;

    } catch (error) {
        console.log("Error Fetching data", error)
        return error;
    }
}



export const fetchSearchedPet = async (petId) => {
    const token = localStorage.getItem("token")

    try {
        const apiResponse = await axios.get(`http://localhost:8080/pet/user/${petId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log(apiResponse);

        const data = apiResponse.data;
        return data;

        
    } catch (error) {
        console.log(error)
        return error;
    }

}




export const fetchLogin = async (username, password) => {
    try {
        const apiPost = await axios.post("http://localhost:8080/auth/login", {
            username: username,
            password: password,
        });

        // const data = apiPost.data;

        console.log(apiPost);

        if (apiPost.status == 200 && apiPost.data.token) {
            localStorage.setItem("token", apiPost.data.token);
            localStorage.setItem("username", apiPost.data.username);
        
            return apiPost
        } 
        // else {
        //     return null;
        // }

    } catch (error) {
        console.log(error);
        return error;
        
    }
}

// export const fetchLogin = async (data) => {
//     try {
//         const apiPost = await axios.post("http://localhost:8080/auth/login", data);

//         // const data = apiPost.data;

//         console.log(apiPost);

//         if (apiPost.status == 200 && apiPost.data.token) {
//             localStorage.setItem("token", apiPost.data.token);
//             // setNotLoggedIn(false)
//             // setIsLoggedIn(true);
//         } else {
//             return null;
//         }

//     } catch (error) {
//         console.log(error);
//         // setNotLoggedIn(true);
//         // setIsLoggedIn(false)
//     }
// }