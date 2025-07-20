import {
    Home,
    BookOpen,
    Target,
    Award,
    HelpCircle,
    Globe,
    ShoppingCart,
    Volume2,
    VolumeX,
    LogOut
} from "lucide-react";
import {Link, useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@radix-ui/react-select";
import {useState} from "react";

const Footer = () => {
    const [language, setLanguage] = useState("english");
    const [isSoundEnabled, setIsSoundEnabled] = useState(false);
    const navigate = useNavigate();

    // Get current user from localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('authToken');
        sessionStorage.clear();
        navigate('/signin');
    };

    const handleLanguageChange = (value: string) => {
        setLanguage(value);
    };

    const toggleSound = () => {
        setIsSoundEnabled(!isSoundEnabled);
    };

    return (
        <>
            <nav className="bg-white shadow-lg border-b-4 border-blue-400">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center justify කටුකරුත්තු justify-between">
                        <div className="flex items-center space-x-2">
                            <h1 className="text-2xl font-bold text-blue-600">TinkerAlpha ⚡</h1>
                        </div>
                        <div className="hidden md:flex space-x-6">
                            <Link to="/" className="text-blue-800 font-bold border-b-2 border-blue-400 flex items-center">
                                <Home className="mr-1 h-4 w-4" />
                                Home
                            </Link>
                            <Link to="/subjects" className="text-blue-600 hover:text-blue-800 font-semibold flex items-center">
                                <BookOpen className="mr-1 h-4 w-4" />
                                Subjects
                            </Link>
                            <Link to="/activities" className="text-blue-600 hover:text-blue-800 font-semibold flex items-center">
                                <Target className="mr-1 h-4 w-4" />
                                Activities
                            </Link>
                            {currentUser.role === "TEACHER" && (
                                <Link to="/dashboard" className="text-blue-600 hover:text-blue-800 font-semibold flex items-center">
                                    <BookOpen className="mr-1 h-4 w-4" />
                                    Dashboard
                                </Link>
                            )}
                            <Link to="/certificates" className="text-blue-600 hover:text-blue-800 font-semibold flex items-center">
                                <Award className="mr-1 h-4 w-4" />
                                Certificates
                            </Link>
                            <Link to="/help" className="text-blue-600 hover:text-blue-800 font-semibold flex items-center">
                                <HelpCircle className="mr-1 h-4 w-4" />
                                Help
                            </Link>
                            <Link to="/game-context" className="text-blue-600 hover:text-blue-800 font-semibold flex items-center">
                                <Target className="mr-1 h-4 w-4" />
                                Modality Test
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <Globe className="h-5 w-5 text-blue-600" />
                                <Select value={language} onValueChange={handleLanguageChange}>
                                    <SelectTrigger className="w-28">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="english">English</SelectItem>
                                        <SelectItem value="sinhala">Sinhala</SelectItem>
                                        <SelectItem value="tamil">Tamil</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            {/*<Button
                               onClick={toggleSound}
                               variant="outline"
                               size="icon"
                               className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50"
                           >
                               {isSoundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                           </Button>*/}
                            <Button
                                onClick={handleLogout}
                                className="w-full bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center"
                            >
                                <LogOut className="w-4 h-4 mr-2"/>
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Footer;