import React, { useState, useEffect, useRef } from 'react';
import {
    Home,
    BookOpen,
    Target,
    Award,
    HelpCircle,
    ShoppingCart,
    Play,
    Pause,
    Volume2,
    VolumeX,
    Globe
} from 'lucide-react';
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Header from "@/components/Header.tsx";

// Define types for the question structure
interface Question {
    id: number;
    text: string;
    correctAnswer: string;
    audioText: string;
    options: string[];
}

// Define types for user data
interface UserData {
    id?: string;
    userId?: string;
    userName?: string;
    email?: string;
}

const Auditory: React.FC = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [answers, setAnswers] = useState<string[]>(Array(5).fill(''));
    const [marks, setMarks] = useState<number[]>(Array(5).fill(0));
    const [totalMarks, setTotalMarks] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [userId, setUserId] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [user, setUser] = useState<string>('');
    const [audioError, setAudioError] = useState<boolean>(false);
    const [language, setLanguage] = useState<string>("english");
    const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(false);
    const [saveStatus, setSaveStatus] = useState<string | null>(null);

    const questions: Question[] = [
        {
            id: 1,
            text: "What is Sri Lanka's administrative capital?",
            correctAnswer: "Sri Jayawardenepura Kotte",
            audioText: "Listen carefully: Sri Lanka's administrative capital is different from its commercial capital. It's located near Colombo.",
            options: ["Colombo", "Kandy", "Sri Jayawardenepura Kotte", "Anuradhapura"]
        },
        {
            id: 2,
            text: "What is a famous city known for its temple?",
            correctAnswer: "Kandy",
            audioText: "This city is home to the famous Temple of the Tooth and is considered the cultural capital of Sri Lanka.",
            options: ["Colombo", "Kandy", "Anuradhapura", "Galle"]
        },
        {
            id: 3,
            text: "What is the commercial capital of Sri Lanka?",
            correctAnswer: "Colombo",
            audioText: "This bustling city is the largest in Sri Lanka and serves as its main commercial hub and port city.",
            options: ["Kandy", "Colombo", "Anuradhapura", "Jaffna"]
        },
        {
            id: 4,
            text: "What is an ancient city with a famous dagoba?",
            correctAnswer: "Anuradhapura",
            audioText: "This ancient city was the first capital of Sri Lanka and is famous for its large stupas and sacred Bo tree.",
            options: ["Colombo", "Kandy", "Galle", "Anuradhapura"]
        },
        {
            id: 5,
            text: "What is a coastal city known for its fort?",
            correctAnswer: "Galle",
            audioText: "This UNESCO World Heritage site is famous for its well-preserved Dutch colonial fort by the sea.",
            options: ["Colombo", "Anuradhapura", "Jaffna", "Galle"]
        },
    ];

    const speakText = (text: string): void => {
        if ('speechSynthesis' in window && isSoundEnabled) {
            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.8;
            utterance.pitch = 1;
            utterance.volume = 1;

            utterance.onstart = () => setIsPlaying(true);
            utterance.onend = () => setIsPlaying(false);
            utterance.onerror = () => {
                setIsPlaying(false);
                setAudioError(true);
            };

            window.speechSynthesis.speak(utterance);
            setAudioError(false);
        } else if (!isSoundEnabled) {
            setAudioError(true);
            console.log("Audio muted by user");
        } else {
            setAudioError(true);
            console.error("Speech synthesis not supported");
        }
    };

    const stopSpeech = (): void => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            setIsPlaying(false);
        }
    };

    useEffect(() => {
        const userData: UserData = JSON.parse(localStorage.getItem('currentUser') || '{}');
        setUser(userData.id || '');
        setUserId(userData.userId || '');
        setUsername(userData.userName || '');
        setEmail(userData.email || '');

        const timer = setTimeout(() => {
            speakText(questions[currentQuestionIndex].audioText);
        }, 500);

        return () => clearTimeout(timer);
    }, [currentQuestionIndex]);

    const handleAnswerSelect = (value: string): void => {
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = value;
        setAnswers(newAnswers);
        setSaveStatus(null);
    };

    const handleClearAnswer = (): void => {
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = '';
        setAnswers(newAnswers);
        setSaveStatus(null);
    };

    const handleNext = (): void => {
        stopSpeech();
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSaveStatus(null);
        } else if (!isSubmitted) {
            handleSubmit();
        }
    };

    const handleSubmit = async (): Promise<void> => {
        stopSpeech();
        if (!user || !userId || !username || !email) {
            setSaveStatus('Please log in to submit quiz results.');
            return;
        }

        const newMarks = answers.map((answer, index) =>
            answer === questions[index].correctAnswer ? 1 : 0
        );
        const total = newMarks.reduce((sum, mark) => sum + mark, 0);
        setMarks(newMarks);
        setTotalMarks(total);
        setIsSubmitted(true);

        try {
            const response = await axios.post('http://localhost:5000/api/v1/quizzes/saveQuizResults', {
                quizName:"AUDITORY",
                user,
                userId,
                username,
                email,
                totalMarks: total,
                date: new Date().toISOString()
            });
            setSaveStatus('Quiz results saved successfully!');
            console.log('Quiz results saved:', response.data);
        } catch (error: any) {
            setSaveStatus('Error saving quiz results. Please try again.');
            console.error('Error saving quiz results:', error.response?.data || error.message);
        }
    };

    const handleReplayAudio = (): void => {
        speakText(questions[currentQuestionIndex].audioText);
    };

    const handleLanguageChange = (value: string): void => {
        setLanguage(value);
        setSaveStatus(null);
    };

    const toggleSound = (): void => {
        setIsSoundEnabled(prev => !prev);
        if (isPlaying) {
            stopSpeech();
        }
    };

    const resetQuiz = (): void => {
        stopSpeech();
        setCurrentQuestionIndex(0);
        setAnswers(Array(5).fill(''));
        setMarks(Array(5).fill(0));
        setTotalMarks(0);
        setIsSubmitted(false);
        setAudioError(false);
        setSaveStatus(null);
    };

    const getEncouragementMessage = (): string => {
        const percentage = (totalMarks / questions.length) * 100;
        if (percentage === 100) return "🌟 Perfect! You're an audio expert! 🌟";
        if (percentage >= 80) return "🎉 Excellent work! Almost perfect! 🎉";
        if (percentage >= 60) return "👍 Good job! Keep learning! 👍";
        if (percentage >= 40) return "😊 Nice try! Practice makes perfect! 😊";
        return "🌈 Don't worry! Learning is fun! Try again! 🌈";
    };

    const getScoreColor = (): string => {
        const percentage = (totalMarks / questions.length) * 100;
        if (percentage >= 80) return "text-green-600";
        if (percentage >= 60) return "text-yellow-600";
        return "text-red-500";
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400 relative overflow-hidden">
            <div className="absolute top-10 left-10 text-4xl animate-bounce">🌟</div>
            <div className="absolute top-20 right-20 text-3xl animate-ping">⭐</div>
            <div className="absolute bottom-20 left-20 text-4xl animate-pulse">🎈</div>

            {/* Navigation Bar */}
            <Header></Header>
            {/* Navigation Bar */}

            <div className="container mx-auto px-4 py-12">
                {saveStatus && (
                    <div className={`mb-4 p-4 rounded-lg ${saveStatus.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {saveStatus}
                    </div>
                )}
                <div className="text-center mb-16">
                    <div className="relative">
                        <div className="text-6xl mb-4 animate-bounce">🎧</div>
                        <h1 className="text-6xl font-bold text-white mb-6 animate-pulse">
                            🎵 Sri Lanka Auditory Quiz!
                        </h1>
                        <div className="absolute -top-8 -left-8 text-5xl animate-spin">⭐</div>
                        <div className="absolute -top-8 -right-8 text-5xl animate-spin">⭐</div>
                    </div>
                    <div className="bg-white/90 rounded-3xl p-6 max-w-4xl mx-auto border-4 border-yellow-400 shadow-2xl">
                        <p className="text-2xl text-purple-800 font-bold mb-4">
                            Hi {username || 'Student'}! 👋 Listen to the audio and answer the question!
                        </p>
                        <p className="text-lg text-blue-700">
                            🎵 Audio will play automatically - listen carefully! 🎵
                        </p>
                    </div>
                </div>

                <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border-4 border-yellow-300 flex-1 flex flex-col items-center">
                    {!isSubmitted ? (
                        <div className="space-y-8 w-full">
                            <div className="text-center mb-4">
                                <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-lg font-bold">
                                    Question {currentQuestionIndex + 1} of {questions.length}
                                </span>
                            </div>

                            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-8 border-2 border-dashed border-blue-300 transform hover:scale-105 transition-all duration-300">
                                <div className="flex items-center mb-6 justify-center">
                                    <span className="text-4xl mr-4">🎙️</span>
                                    <p className="text-2xl font-bold text-purple-800 text-center">
                                        {questions[currentQuestionIndex].text}
                                    </p>
                                </div>

                                <div className="flex justify-center items-center space-x-4 mb-6">
                                    <Button
                                        onClick={handleReplayAudio}
                                        disabled={isPlaying || !isSoundEnabled}
                                        className={`flex items-center space-x-2 px-6 py-3 rounded-full font-bold transition-all duration-300 ${
                                            isPlaying || !isSoundEnabled
                                                ? 'bg-gray-300 cursor-not-allowed'
                                                : 'bg-blue-500 hover:bg-blue-600 text-white hover:scale-105'
                                        }`}
                                    >
                                        {isPlaying ? (
                                            <>
                                                <Volume2 className="h-5 w-5 animate-pulse" />
                                                <span>Playing...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Play className="h-5 w-5" />
                                                <span>🔊 Replay Audio</span>
                                            </>
                                        )}
                                    </Button>

                                    {isPlaying && (
                                        <Button
                                            onClick={stopSpeech}
                                            className="flex items-center space-x-2 px-6 py-3 rounded-full font-bold bg-red-500 hover:bg-red-600 text-white transition-all duration-300 hover:scale-105"
                                        >
                                            <Pause className="h-5 w-5" />
                                            <span>Stop</span>
                                        </Button>
                                    )}
                                </div>

                                {audioError && (
                                    <div className="text-center text-red-600 mb-4">
                                        <p>🔇 Audio not available - please read the question above</p>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {questions[currentQuestionIndex].options.map((option, idx) => (
                                        <Button
                                            key={idx}
                                            onClick={() => handleAnswerSelect(option)}
                                            disabled={isSubmitted}
                                            className={`px-6 py-4 rounded-xl text-lg font-medium border-2 transition-all duration-300 hover:scale-105 ${
                                                answers[currentQuestionIndex] === option
                                                    ? 'bg-purple-500 text-white border-purple-600 shadow-lg'
                                                    : 'bg-gradient-to-r from-pink-200 to-purple-200 text-purple-800 border-purple-300 hover:from-pink-300 hover:to-purple-300'
                                            } ${isSubmitted ? 'cursor-not-allowed' : ''}`}
                                        >
                                            {option}
                                        </Button>
                                    ))}
                                </div>

                                {answers[currentQuestionIndex] && (
                                    <div className="text-center mt-4">
                                        <Button
                                            onClick={handleClearAnswer}
                                            disabled={isSubmitted || !answers[currentQuestionIndex]}
                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
                                        >
                                            Clear Answer
                                        </Button>
                                    </div>
                                )}
                            </div>

                            {currentQuestionIndex < questions.length - 1 ? (
                                <div className="flex justify-center mt-10">
                                    <Button
                                        onClick={handleNext}
                                        disabled={!answers[currentQuestionIndex] || isSubmitted}
                                        className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-6 px-12 rounded-full text-3xl shadow-lg transform hover:scale-110 transition-all duration-300 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed disabled:transform-none border-4 border-white"
                                    >
                                        🚀 Next! 🚀
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex justify-center mt-10">
                                    <Button
                                        onClick={handleNext}
                                        disabled={!answers[currentQuestionIndex] || isSubmitted}
                                        className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-6 px-12 rounded-full text-3xl shadow-lg transform hover:scale-110 transition-all duration-300 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed disabled:transform-none border-4 border-white"
                                    >
                                        🚀 Submit My Answers! 🚀
                                    </Button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-center space-y-8 w-full max-w-4xl">
                            <div className="bg-gradient-to-r from-yellow-200 to-pink-200 rounded-2xl p-8 border-4 border-yellow-400">
                                <h2 className="text-5xl font-bold text-purple-800 mb-6">🎊 Quiz Results! 🎊</h2>
                                <div className={`text-8xl font-bold mb-6 ${getScoreColor()}`}>
                                    {totalMarks} / {questions.length}
                                </div>
                                <div className="text-3xl font-bold text-indigo-700 mb-4">
                                    {getEncouragementMessage()}
                                </div>
                                <div className="text-lg text-gray-600">
                                    Score: {Math.round((totalMarks / questions.length) * 100)}%
                                </div>
                            </div>

                            <div className="space-y-6 max-h-96 overflow-y-auto">
                                {questions.map((question, index) => (
                                    <div key={question.id} className={`p-6 rounded-xl border-2 ${marks[index] === 1 ? 'bg-green-100 border-green-400' : 'bg-red-100 border-red-400'}`}>
                                        <p className="font-semibold text-gray-800 text-lg mb-4">Q{index + 1}: {question.text}</p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="text-center">
                                                <strong>Your answer:</strong><br/>
                                                <span className={marks[index] === 1 ? 'text-green-700' : 'text-red-700'}>
                                                    {answers[index] || 'No answer'}
                                                </span>
                                            </div>
                                            <div className="text-center">
                                                <strong>Correct answer:</strong><br/>
                                                <span className="text-green-700">{question.correctAnswer}</span>
                                            </div>
                                        </div>
                                        <div className="mt-4 text-center">
                                            {marks[index] === 1 ? (
                                                <span className="text-green-600 font-bold text-xl">✅ Correct!</span>
                                            ) : (
                                                <span className="text-red-600 font-bold text-xl">❌ Incorrect</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    onClick={resetQuiz}
                                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                                >
                                    🔄 Try Again
                                </Button>
                                <Link to="/">
                                    <Button
                                        className="bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                                    >
                                        <Home className="mr-3 h-5 w-5" />
                                        🏠 Back to Home
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Auditory;