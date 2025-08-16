import React from "react";
import {
  MessageSquare,
  Users,
  Shield,
  Globe,
  Heart,
  Award,
  Target,
  Eye,
  Lightbulb,
  Coffee,
  Code,
  Palette,
} from "lucide-react";

export default function About() {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      bio: "Former community manager at tech giants, passionate about connecting people through technology.",
      avatar: "SJ",
      color: "from-blue-500 to-purple-600",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      bio: "Full-stack developer with 10+ years experience in scalable web applications.",
      avatar: "MC",
      color: "from-green-500 to-blue-500",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Design",
      bio: "UX/UI designer focused on creating intuitive and beautiful user experiences.",
      avatar: "ER",
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "David Thompson",
      role: "Community Manager",
      bio: "Expert in community building and user engagement with a background in social psychology.",
      avatar: "DT",
      color: "from-orange-500 to-red-500",
    },
  ];

  const milestones = [
    {
      year: "2020",
      title: "The Beginning",
      description:
        "Threadify was founded with a simple idea: make online discussions more meaningful.",
    },
    {
      year: "2021",
      title: "First 1K Users",
      description:
        "Reached our first thousand active users and launched our mobile app.",
    },
    {
      year: "2022",
      title: "Global Expansion",
      description:
        "Expanded internationally with multi-language support and 24/7 customer service.",
    },
    {
      year: "2023",
      title: "50K Community",
      description:
        "Hit 50,000 active users and introduced advanced moderation tools.",
    },
    {
      year: "2024",
      title: "Major Updates",
      description:
        "Launched real-time messaging, improved UI, and enhanced security features.",
    },
    {
      year: "2025",
      title: "Future Forward",
      description:
        "Continuing to innovate with AI-powered features and community-driven development.",
    },
  ];

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}

      {/* Our Story Section */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold  mb-6">Our Story</h2>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto">
              From a small idea to a global community platform
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className=" ">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold  mb-4">Our Mission</h3>
              <p className="text-gray-500 leading-relaxed">
                To create inclusive digital spaces where meaningful
                conversations flourish, knowledge is shared freely, and
                communities thrive through authentic human connections.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Eye className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold  mb-4">Our Vision</h3>
              <p className="text-gray-500 leading-relaxed">
                To become the world's leading platform for community-driven
                discussions, fostering understanding and collaboration across
                cultures and borders.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold  mb-4">Our Impact</h3>
              <p className="text-gray-500 leading-relaxed">
                Empowering individuals to learn, grow, and connect while
                building stronger, more informed communities that drive positive
                change in the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold  mb-6">Our Journey</h2>
            <p className="text-xl text-gray-500">
              Key milestones in our growth and development
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-400  h-full"></div>

            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`flex items-center mb-12 ${
                  index % 2 === 0 ? "" : "flex-row-reverse"
                }`}
              >
                <div
                  className={`w-1/2 ${
                    index % 2 === 0 ? "pr-8 text-right" : "pl-8"
                  }`}
                >
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      {milestone.year}
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">
                      {milestone.title}
                    </h4>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
                <div className="w-4 h-4 bg-white border-4 border-blue-500 rounded-full relative z-10"></div>
                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold  mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto">
              The passionate individuals behind Threadify who work tirelessly to
              build better communities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className=" rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div
                  className={`w-20 h-20 bg-gradient-to-r ${member.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold`}
                >
                  {member.avatar}
                </div>
                <h4 className="text-xl font-semibold  mb-2">{member.name}</h4>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold  mb-6">Why Choose Threadify?</h2>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto">
              What sets us apart in the world of online communities
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Code className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold  mb-4">
                Technical Excellence
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Built with modern technologies and best practices, ensuring
                reliability, security, and performance at scale.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold  mb-4">Community Focused</h3>
              <p className="text-gray-500 leading-relaxed">
                Every feature is designed with community needs in mind, based on
                feedback from thousands of active users.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Palette className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold  mb-4">Beautiful Design</h3>
              <p className="text-gray-500 leading-relaxed">
                Intuitive, accessible, and aesthetically pleasing interface that
                makes participation enjoyable for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
