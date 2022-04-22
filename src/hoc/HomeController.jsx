import HomePageAdmin from "../components/HomePageAdmin";
import { useAuth } from "../hooks/useAuth";

function HomeController({ children }) {

    const { user, isAdmin } = useAuth() || {}

    if(isAdmin) {
        return <HomePageAdmin />
    }

    return children;
}

export default HomeController;