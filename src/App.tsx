import React, { useState } from 'react';
import { Menu, X, BookOpen, Users, Award, Phone, Mail, MapPin, ChevronLeft, ChevronRight, Globe, Star, Camera, Bus, Image as ImageIcon, Trophy } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleEnrollClick = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // Close mobile menu if open
    if (isMenuOpen) setIsMenuOpen(false);
  };
  const handleGetStartedClick = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // focus the name input after a short delay to allow scrolling
      setTimeout(() => {
        const nameInput = document.getElementById('contact-name') as HTMLInputElement | null;
        if (nameInput) nameInput.focus();
      }, 600);
    }
    if (isMenuOpen) setIsMenuOpen(false);
  };

  // Simple inline Slider component
  const Slider = () => {
    const slides = Array.from({ length: 20 }).map((_, i) => `/gallery/img${i}.jpg`);
    const [index, setIndex] = useState(0);
    const timeoutRef = React.useRef<number | null>(null);
    const containerRef = React.useRef<HTMLDivElement | null>(null);

    const goTo = (i: number) => setIndex((i + slides.length) % slides.length);

    React.useEffect(() => {
      timeoutRef.current = window.setTimeout(() => goTo(index + 1), 3000);
      return () => { if (timeoutRef.current) window.clearTimeout(timeoutRef.current); };
    }, [index, slides.length]);

    // swipe
    let startX = 0;
    const onTouchStart = (e: React.TouchEvent) => { startX = e.touches[0].clientX; };
    const onTouchEnd = (e: React.TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (dx > 40) goTo(index - 1);
      else if (dx < -40) goTo(index + 1);
    };

    return (
      <div className="relative" ref={containerRef} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${index * 100}%)` }}>
          {slides.map((src, i) => (
            <div key={i} className="flex-shrink-0 w-full">
              <img src={src} alt={`Slide ${i+1}`} loading="lazy" className="w-full h-96 object-cover rounded-2xl" />
            </div>
          ))}
        </div>

        <button onClick={() => goTo(index - 1)} aria-label="Previous" className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={() => goTo(index + 1)} aria-label="Next" className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow">
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} className={`w-2 h-2 rounded-full ${i === index ? 'bg-amber-700' : 'bg-white/60'}`} aria-label={`Go to slide ${i+1}`} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img src="/logo.png" alt="Bright Future Logo" className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-md" />
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
                  Bright Future
                </span>
                <span className="text-xs sm:text-sm text-gray-600 -mt-1">English Academy</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-amber-700 transition-colors font-medium">Home</a>
              <a href="#about" className="text-gray-700 hover:text-amber-700 transition-colors font-medium">About</a>
              <a href="#programs" className="text-gray-700 hover:text-amber-700 transition-colors font-medium">Programs</a>
              <a href="#activities" className="text-gray-700 hover:text-amber-700 transition-colors font-medium">Activities</a>
              <a href="#gallery" className="text-gray-700 hover:text-amber-700 transition-colors font-medium">Our Gallery</a>
              <a href="#contact" className="text-gray-700 hover:text-amber-700 transition-colors font-medium">Contact</a>
              <button onClick={handleEnrollClick} className="px-6 py-2 bg-gradient-to-r from-amber-700 to-amber-900 text-white rounded-full hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
                Enroll Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col space-y-4">
                <a href="#home" className="text-gray-700 hover:text-amber-700 transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>Home</a>
                <a href="#about" className="text-gray-700 hover:text-amber-700 transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>About</a>
                <a href="#programs" className="text-gray-700 hover:text-amber-700 transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>Programs</a>
                <a href="#activities" className="text-gray-700 hover:text-amber-700 transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>Activities</a>
                <a href="#gallery" className="text-gray-700 hover:text-amber-700 transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>Our Gallery</a>
                <a href="#contact" className="text-gray-700 hover:text-amber-700 transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>Contact</a>
                <button onClick={handleEnrollClick} className="px-6 py-2 bg-gradient-to-r from-amber-700 to-amber-900 text-white rounded-full hover:shadow-lg transition-all duration-200">
                  Enroll Now
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-16 sm:pt-20 min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8 text-center md:text-left">
              <div className="inline-block px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                Welcome to Excellence
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
                  Bright Future
                </span>
                <br />
                <span className="text-gray-800">English Academy School</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl mx-auto md:mx-0">
                Empowering students with world-class English education and building confident, articulate leaders for tomorrow's global community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button onClick={handleGetStartedClick} className="px-8 py-4 bg-gradient-to-r from-amber-700 to-amber-900 text-white rounded-full hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 font-medium">
                  Get Started <ChevronRight className="inline w-5 h-5 ml-1" />
                </button>
                <button className="px-8 py-4 bg-white text-amber-800 rounded-full border-2 border-amber-700 hover:bg-amber-50 transition-all duration-200 font-medium">
                  Learn More
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-amber-600 rounded-3xl transform rotate-3 opacity-20"></div>
              <div className="relative bg-gradient-to-br from-amber-600 to-amber-800 rounded-3xl p-8 sm:p-12 shadow-2xl">
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 text-white">
                    <Users className="w-8 h-8 sm:w-10 sm:h-10 mb-2 sm:mb-3" />
                    <div className="text-2xl sm:text-3xl font-bold">450+</div>
                    <div className="text-xs sm:text-sm opacity-90">Students</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 text-white">
                    <Award className="w-8 h-8 sm:w-10 sm:h-10 mb-2 sm:mb-3" />
                    <div className="text-2xl sm:text-3xl font-bold">15+</div>
                    <div className="text-xs sm:text-sm opacity-90">Awards</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 text-white">
                    <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 mb-2 sm:mb-3" />
                    <div className="text-2xl sm:text-3xl font-bold">5+</div>
                    <div className="text-xs sm:text-sm opacity-90">Courses</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 text-white">
                    <Globe className="w-8 h-8 sm:w-10 sm:h-10 mb-2 sm:mb-3" />
                    <div className="text-2xl sm:text-3xl font-bold">4+</div>
                    <div className="text-xs sm:text-sm opacity-90">Years</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* School Photo Card */}
          <div className="mt-16 sm:mt-24">
            <div className="max-w-4xl mx-auto">
              {/* --- MODIFIED PART START --- */}
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-amber-100 group transition-all duration-500 ease-in-out hover:shadow-amber-200/80 hover:-translate-y-2">
                <div className="aspect-video bg-gradient-to-br from-amber-100 to-orange-100 relative">
                  <img
                    src="/school-profile.jpg"
                    alt="Bright Future campus"
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                  />
                </div>
                <div className="p-6 sm:p-8 bg-gradient-to-br from-amber-50 to-white">
                  <h3 className="text-2xl sm:text-3xl font-bold text-center mb-3 bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
                    Our School
                  </h3>
                  <p className="text-center text-gray-600 text-sm sm:text-base">
                    A state-of-the-art facility designed to inspire learning and growth
                  </p>
                </div>
              </div>
              {/* --- MODIFIED PART END --- */}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          {/* Director & Principal Section */}
          <div className="max-w-5xl mx-auto mb-20 space-y-20">
            {/* Director Section */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
              <div className="flex-shrink-0">
                <img
                  src="/director.jpg"
                  alt="School Director"
                  className="w-48 h-48 rounded-full object-cover shadow-lg border-4 border-amber-100"
                />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xl font-semibold text-amber-800 mb-2">From the Director's Desk</h3>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Sher Singh Ji</h2>
                <p className="text-gray-600 leading-relaxed">
                  Welcome to Bright Future English Academy! Our vision is to create a learning environment that nurtures curiosity, fosters creativity, and instills a lifelong love for learning. We are dedicated to providing an education that goes beyond textbooks, preparing our students to be confident, compassionate, and responsible global citizens. We believe in every child's potential and strive to empower them to achieve their brightest future.
                </p>
              </div>
            </div>

            {/* Principal Section */}
            <div className="flex flex-col md:flex-row-reverse items-center md:items-start gap-8 md:gap-12">
              <div className="flex-shrink-0">
                <img
                  src="/principal.png"
                  alt="School Principal"
                  className="w-48 h-48 rounded-full object-cover shadow-lg border-4 border-amber-100"
                />
              </div>
              <div className="text-center md:text-right">
                <h3 className="text-xl font-semibold text-amber-800 mb-2">A Message from the Principal</h3>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Dinesh Ji</h2>
                <p className="text-gray-600 leading-relaxed">
                  At Bright Future, we are committed to academic excellence and the holistic development of each student. Our dedicated faculty works tirelessly to create a supportive and engaging atmosphere where students feel valued and are encouraged to explore their talents. We focus on building a strong foundation in English communication, critical thinking, and character development.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t-2 border-dashed border-gray-200 max-w-4xl mx-auto mb-16 sm:mb-24"></div>

          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Why Choose <span className="bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">Bright Future?</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Shaping confident communicators for a brighter future.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: BookOpen,
                title: "Expert Faculty",
                description: "Learn from certified and experienced teachers."
              },
              {
                icon: Users,
                title: "Small Class Sizes",
                description: "Personalized attention with optimal student-teacher ratios for effective learning."
              },
              {
                icon: Award,
                title: "Proven Results",
                description: "Proud to achieve 95% success in Exams - excellence through dedication."
              },
              {
                icon: Bus,
                title: "Transport Facility",
                description: "Reliable school transport that puts student safety first."
              },
              {
                icon: Star,
                title: "Modern Facilities",
                description: "State-of-the-art classrooms with advanced learning technology and resources."
              },
              {
                icon: Trophy,
                title: "Big PlayGround",
                description: "Spacious playgrounds and sports facilities promoting physical fitness and teamwork."
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-6 sm:p-8 bg-gradient-to-br from-amber-50 to-white rounded-2xl hover:shadow-xl transition-all duration-300 border border-amber-100 hover:border-amber-300"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-amber-700 to-amber-900 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-16 sm:py-24 bg-gradient-to-br from-amber-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Our <span className="bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">Programs</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive English language programs designed for every age and proficiency level.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "Early Foundation",
                level: "Nursery - LKG",
                features: ["Basic Vocabulary", "Phonics", "Storytelling", "Fun Activities"],
                color: "from-amber-500 to-amber-600"
              },
              {
                title: "Primary School",
                level: "Grades 1-5",
                features: ["Foundation Building", "Interactive Learning", "Fun Activities", "Reading Skills"],
                color: "from-amber-600 to-amber-700"
              },
              {
                title: "Middle School",
                level: "Grades 6-8",
                features: ["Grammar Mastery", "Creative Writing", "Public Speaking", "Literature Study"],
                color: "from-amber-700 to-amber-800"
              },
              {
                title: "Extra-Curricular Activities",
                level: "All Levels",
                features: ["Art & Craft", "Music & Dance", "Sports & Fitness", "Drama & Theatre"],
                color: "from-amber-600 to-amber-800"
              },
              {
                title: "Tuition Support",
                level: "All Levels",
                features: ["Subject Help", "Homework Assistance", "Exam Prep", "One-on-One Tutoring"],
                color: "from-amber-700 to-amber-900"
              },
              {
                title: "Cultural Events",
                level: "All Ages",
                features: ["Festivals & Traditions ", "Annual Day & Celebrations", "Talent Shows", "Community Engagement"],
                color: "from-amber-500 to-amber-800"
              }
            ].map((program, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`h-2 bg-gradient-to-r ${program.color}`}></div>
                <div className="p-6 sm:p-8">
                  <div className="mb-4">
                    <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gray-800">{program.title}</h3>
                    <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs sm:text-sm font-medium">
                      {program.level}
                    </span>
                  </div>
                  <ul className="space-y-2 sm:space-y-3 mb-6">
                    {program.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm sm:text-base text-gray-600">
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-3 bg-gradient-to-r from-amber-700 to-amber-900 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-medium">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section id="activities" className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              School <span className="bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">Activities</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our vibrant campus life and memorable moments captured through the years.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "Annual Day Celebration",
                description: "Students showcasing their talents through dance, drama, and music performances in our grand auditorium.",
                image: "/event.jpg",
              },
              {
                title: "Educational Tour",

                description: "Exploring historical monuments and cultural heritage sites to enhance practical knowledge and cultural awareness.",
                image: "/tour.jpg",
              },
              {
                title: "Sports Day",
                description: "A day filled with fun and competitive sports activities promoting teamwork and physical fitness.",
                image: "/sports.jpg",
              },
              {
                title: "Science Exhibition",
                description: "Innovative projects and experiments displayed by students demonstrating their scientific curiosity and creativity.",
                image: "/science.jpg",
              },
              {
                title: "Cultural Festival",
                description: "Celebrating diversity with traditional performances, art exhibitions, and culinary delights from various cultures.",
                image: "/cultural.jpg",
              },
              {
                title: "Art & Craft Workshop",
                description: " Hands-on sessions where students explore their creativity through various art forms and crafts.",
                image: "/art.jpg",
              }
            ].map((activity, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-amber-50 to-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-amber-100"
              >
                <div className="aspect-video bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 to-amber-800/10"></div>
                  {activity.image ? (
                    <img src={activity.image} alt={activity.title} className="w-full h-full object-cover relative z-10" />
                  ) : (
                    <ImageIcon className="w-16 h-16 text-amber-700 opacity-40 relative z-10" />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{activity.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Our Gallery</h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">A selection of moments and memories from our school life.</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-2xl">
              <Slider />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24 bg-gradient-to-br from-amber-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Get in <span className="bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">Touch</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Ready to start learning with us? Contact us today for more information.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-6 sm:space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-amber-700 to-amber-900 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-800">Visit Us</h3>
                  <p className="text-sm sm:text-base text-gray-600">Jai Bhawani Nagar, Sangariya<br />Jodhpur - 342013</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-amber-700 to-amber-900 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-800">Call Us</h3>
                  <p className="text-sm sm:text-base text-gray-600">+91 7413826136<br />+91 9001777040</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-amber-700 to-amber-900 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-800">Email Us</h3>
                  <p className="text-sm sm:text-base text-gray-600">brightfuture.info.in@g</p>
                </div>
              </div>

              <div className="p-6 sm:p-8 bg-gradient-to-br from-amber-700 to-amber-900 rounded-2xl text-white">
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">School Timing</h3>
                <div className="space-y-2 text-sm sm:text-base">
                  <p>Monday - Friday: 7:30 AM - 1:15 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gradient-to-br from-amber-50 to-white p-6 sm:p-8 rounded-2xl border border-amber-100">
              <form className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                    placeholder="Tell us about your requirements..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-amber-700 to-amber-900 text-white rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 font-medium"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-700 to-amber-900 rounded-lg flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-bold">Bright Future</span>
                  <span className="text-xs opacity-80">English Academy</span>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Where learning meets excellence and every child shines.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-base sm:text-lg">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#home" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#programs" className="text-gray-400 hover:text-white transition-colors">Programs</a></li>
                <li><a href="#activities" className="text-gray-400 hover:text-white transition-colors">Activities</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-base sm:text-lg">Programs</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#programs" className="text-gray-400 hover:text-white transition-colors">Early Foundation</a></li>
                <li><a href="#programs" className="text-gray-400 hover:text-white transition-colors">Primary School</a></li>
                <li><a href="#programs" className="text-gray-400 hover:text-white transition-colors">Middle School</a></li>
                <li><a href="#programs" className="text-gray-400 hover:text-white transition-colors">Extra-Curricular Activities</a></li>
                <li><a href="#programs" className="text-gray-400 hover:text-white transition-colors">Tuition Support</a></li>
                <li><a href="#programs" className="text-gray-400 hover:text-white transition-colors">Cultural Events</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-base sm:text-lg">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li className="text-gray-400">brightfuture.info.in@gmail.com</li>
                <li className="text-gray-400">+91 7413826136</li>
                <li className="text-gray-400">Jai Bhawani Nagar</li>
                <li className="text-gray-400">Sangariya, Jodhpur -342013</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-sm text-gray-400">
              &copy; 2025 Bright Future English Academy School. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
