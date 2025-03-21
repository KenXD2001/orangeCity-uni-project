import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <aside className="w-64 bg-gray-900 text-white h-full p-4">
            <h2 className="text-xl font-bold">Admin Panel</h2>
            <nav className="mt-6">
                <ul>
                    <li className="mb-2">
                        <Link to="/dashboard" className="block p-2 rounded hover:bg-gray-700">
                            Dashboard
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link to="/profile" className="block p-2 rounded hover:bg-gray-700">
                            Profile
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}

export default Sidebar;
