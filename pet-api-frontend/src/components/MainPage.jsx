import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";



export default function IndexPage() {
    // const [showPets, setShowPets] = useState(false);

    // const petData = useLoaderData();
    // const allPets = petData.allPets;
    // console.log(allPets);

    // const handleClick = () => {
    //     setShowPets(prevState => !prevState)
    // }

    return (
        <div>
            <nav>
                <Navbar />
            </nav>

            <main>
                <Outlet />
            </main>
            
        </div>
    )
}