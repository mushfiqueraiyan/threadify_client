import { Globe, Heart, MessageSquare, Shield, Users, Zap } from "lucide-react";
import React from "react";

const Feature = () => {
  return (
    <section className="py-20 ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold  mb-6">Powerful Features</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to build and manage thriving online communities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className=" rounded-xl p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold  mb-4">User Management</h3>
            <p className="text-gray-500 leading-relaxed">
              Comprehensive user profiles, role-based permissions, and advanced
              moderation tools to keep your community safe and organized.
            </p>
          </div>

          <div className=" rounded-xl p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold  mb-4">Advanced Security</h3>
            <p className="text-gray-500 leading-relaxed">
              Built-in spam protection, content filtering, and robust security
              measures to ensure a safe environment for all users.
            </p>
          </div>

          <div className=" rounded-xl p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold  mb-4">Lightning Fast</h3>
            <p className="text-gray-500 leading-relaxed">
              Optimized performance with real-time updates, instant
              notifications, and seamless browsing experience across all
              devices.
            </p>
          </div>

          <div className="rounded-xl p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
              <Globe className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold  mb-4">Global Reach</h3>
            <p className="text-gray-500 leading-relaxed">
              Multi-language support, timezone handling, and localization
              features to connect users from around the world.
            </p>
          </div>

          <div className=" rounded-xl p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
              <Heart className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold  mb-4">Community First</h3>
            <p className="text-gray-500 leading-relaxed">
              Built with community feedback, featuring voting systems,
              reputation tracking, and tools that encourage positive
              interactions.
            </p>
          </div>

          <div className=" rounded-xl p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
              <MessageSquare className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold  mb-4">Rich Discussions</h3>
            <p className="text-gray-500 leading-relaxed">
              Advanced text editor, file attachments, code highlighting, and
              threaded conversations for in-depth discussions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
