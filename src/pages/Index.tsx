
import { useState } from "react";
import { Link } from "react-router-dom";
import { Play, Users, GraduationCap, User, Globe, Download, Star, Home, BookOpen, Target, Award, HelpCircle, ShoppingCart, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Footer from "@/components/Footer";
import Header from "@/components/Header.tsx";

const Index = () => {
  const [language, setLanguage] = useState("english");
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
  };

  const toggleSound = () => {
    setIsSoundEnabled(!isSoundEnabled);
  };

  const handleDownloadSampleCertificate = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 850;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 1200, 850);
      gradient.addColorStop(0, '#7dd3fc');
      gradient.addColorStop(0.5, '#a7f3d0');
      gradient.addColorStop(1, '#fbbf24');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 1200, 850);

      // Draw decorative border
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 8;
      ctx.strokeRect(40, 40, 1120, 770);
      
      // Inner border
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 4;
      ctx.strokeRect(60, 60, 1080, 730);

      // White certificate content area
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(150, 150, 900, 550);

      // TinkerAlpha logo area
      ctx.fillStyle = '#6366f1';
      ctx.font = 'bold 32px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('TinkerAlpha Learning Academy', 600, 200);

      // Certificate content
      ctx.fillStyle = '#6b7280';
      ctx.font = '28px Arial';
      ctx.fillText('this certificate is presented to', 600, 320);

      // Sample name
      ctx.fillStyle = '#1f2937';
      ctx.font = 'bold 48px Arial';
      ctx.fillText('SAMPLE STUDENT', 600, 380);

      // Achievement text
      ctx.fillStyle = '#6b7280';
      ctx.font = '24px Arial';
      ctx.fillText('for joining TinkerAlpha Learning Academy', 600, 430);

      // Welcome message
      ctx.fillStyle = '#059669';
      ctx.font = 'bold 32px Arial';
      ctx.fillText('Welcome Certificate', 600, 480);

      // Date
      ctx.fillStyle = '#6b7280';
      ctx.font = '20px Arial';
      ctx.fillText(`Date: ${new Date().toLocaleDateString()}`, 600, 530);

      // Decorative elements
      ctx.font = '48px Arial';
      ctx.fillText('🎓', 200, 300);
      ctx.fillText('🎓', 1000, 300);
      ctx.fillText('🏫', 600, 160);

      // Download
      const link = document.createElement('a');
      link.download = 'TinkerAlpha_Sample_Certificate.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const userTypes = [
    { 
      type: "student", 
      icon: GraduationCap, 
      title: "Student", 
      description: "Start your electronics learning adventure",
      color: "from-blue-100 to-blue-200 border-blue-300"
    },
   
    { 
      type: "teacher", 
      icon: User, 
      title: "Teacher", 
      description: "Manage classes and track student progress",
      color: "from-purple-100 to-purple-200 border-purple-300"
    }
  ];

  const testimonials = [
    {
      
      name: "Nimasha Thilakarathne",
      role: "Parent",
      rating: 5,
      comment: "TinkerAlpha has made learning electronics so fun for my daughter! She's excited about every lesson.",
    },
    {
      
      name: "Sandun Dissanayake",
      role: "Teacher",
      rating: 5,
      comment: "The gamification and interactive activities keep students engaged throughout the entire lesson.",
    },
    {
      
      name: "Fathima Afla",
      role: "Parent",
      rating: 5,
      comment: "The progress tracking helps me understand exactly how my son is developing his STEM skills.",
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
      {/* Background Music */}
      <audio autoPlay loop>
        <source src="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" type="audio/wav" />
      </audio>

      {/* Navigation Bar */}
      <Header></Header>
      {/* Navigation Bar */}


      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-blue-800 mb-6 animate-bounce">
            ⚡ Welcome to TinkerAlpha! ⚡
          </h1>
          <p className="text-2xl text-gray-700 mb-8 max-w-4xl mx-auto">
            💡 The most fun way for kids to learn electronics! Join thousands of young innovators! 🔋
          </p>
          <Link to="/activities">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-12 py-6 text-2xl rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <Play className="mr-4 h-6 w-6" />
               START LEARNING NOW
            </Button>
          </Link>
        </div>

        {/* User Type Selection */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center text-blue-800 mb-8"> 🙋🏻‍♀️Choose Your Role & Sign In</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {userTypes.map((userType) => {
              const IconComponent = userType.icon;
              return (
                <Link key={userType.type} to="/signin">
                  <Card className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 bg-gradient-to-b ${userType.color} border-2`}>
                    <CardHeader className="text-center pb-2">
                      <IconComponent className="h-16 w-16 mx-auto mb-4 text-blue-600" />
                      <CardTitle className="text-2xl text-blue-800">
                        {userType.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center pt-0">
                      <p className="text-blue-600 text-lg mb-4">
                        {userType.description}
                      </p>
                      <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3">
                        Sign In as {userType.title}
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Downloadable Certificate Section */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-300">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-orange-800 mb-4">
                🎓 Welcome Certificate for New Students!
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-orange-700 text-lg mb-6">
                Get your personalized welcome certificate when you register for TinkerAlpha Learning Academy!
              </p>
              <div className="flex justify-center space-x-4">
                <Button 
                  onClick={handleDownloadSampleCertificate}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Sample Certificate
                </Button>
                <Link to="/register">
                  <Button variant="outline" className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 px-8 py-3">
                    Register to Get Yours!
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-800 mb-12">✨ Amazing Features ✨</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <Card className="bg-gradient-to-b from-yellow-100 to-yellow-200 border-yellow-300 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="text-5xl mb-4">🎮</div>
                <h3 className="text-xl font-bold text-yellow-800 mb-2">Interactive Games</h3>
                <p className="text-yellow-600">Fun drag-and-drop activities and puzzles!</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-b from-green-100 to-green-200 border-green-300 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="text-5xl mb-4">🏆</div>
                <h3 className="text-xl font-bold text-green-800 mb-2">Earn Rewards</h3>
                <p className="text-green-600">Collect badges, stars, and certificates!</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-b from-purple-100 to-purple-200 border-purple-300 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="text-5xl mb-4">📱</div>
                <h3 className="text-xl font-bold text-purple-800 mb-2">3D AR Scanning</h3>
                <p className="text-purple-600">Scan barcodes to see 3D circuits!</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-b from-red-100 to-red-200 border-red-300 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="text-5xl mb-4">🤖</div>
                <h3 className="text-xl font-bold text-red-800 mb-2">AI Helper</h3>
                <p className="text-red-600">Get hints and help from our friendly robot!</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center text-blue-800 mb-12">⭐ What Parents & Teachers Say ⭐</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gradient-to-b from-blue-50 to-blue-100 border-2 border-blue-200">
                <CardContent className="p-6 text-center">
                 
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-blue-700 italic mb-4">"{testimonial.comment}"</p>
                  <h4 className="font-bold text-blue-800">{testimonial.name}</h4>
                  <p className="text-blue-600 text-sm">{testimonial.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
