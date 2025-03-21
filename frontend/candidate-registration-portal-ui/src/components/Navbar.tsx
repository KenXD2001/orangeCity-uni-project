import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

function Navbar() {
    const { logout } = useAuth();

    return (
        <nav className="bg-white shadow px-6 py-3 flex justify-between">
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <Button variant="destructive" onClick={logout}>
                Logout
            </Button>
        </nav>
    );
}

export default Navbar;
