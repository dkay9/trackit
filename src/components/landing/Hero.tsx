'use client';

import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated dot pattern background */}
      <div className="absolute inset-0 dot-pattern opacity-60"></div>
      
      {/* Additional glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/30 via-dark-bg/70 to-dark-bg"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-5xl mx-auto text-center">

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-primary bg-clip-text text-transparent">
              Track Your Job Applications
            </span>
            <br />
            <span className="text-white">
              with Ease
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
            Organize, analyze, and ace your job search. Never lose track of an application again with our powerful tracking system and insightful analytics.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/signup"
              className="group px-8 py-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-all flex items-center gap-2 hover:scale-105 w-full sm:w-auto justify-center"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <button className="group px-8 py-4 glass hover:bg-white/20 text-white font-semibold rounded-lg transition-all flex items-center gap-2 w-full sm:w-auto justify-center">
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Watch Demo
            </button>
          </div>

          {/* Dashboard Preview/Mockup */}
          <div className="relative max-w-5xl mx-auto">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-purple-500/20 to-primary/20 blur-3xl"></div>
            
            {/* Dashboard mockup container */}
            <div className="relative glass-dark rounded-xl p-2 sm:p-4 shadow-2xl">
              <div className="bg-dark-lighter rounded-lg overflow-hidden">
                {/* Dashboard header bar */}
                <div className="bg-dark-bg/50 border-b border-white/10 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    <span className="text-xs text-gray-500">Dashboard</span>
                  </div>
                </div>

                {/* Dashboard content mockup */}
                <div className="p-6 space-y-4">
                  {/* Stats cards row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { label: 'Total Applications', value: '24', color: 'from-blue-500 to-blue-600' },
                      { label: 'Interviews', value: '7', color: 'from-green-500 to-green-600' },
                      { label: 'Offers', value: '2', color: 'from-purple-500 to-purple-600' },
                    ].map((stat, i) => (
                      <div key={i} className="glass-dark rounded-lg p-4">
                        <div className="text-xs text-gray-400 mb-2">{stat.label}</div>
                        <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                          {stat.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Applications list mockup */}
                  <div className="glass-dark rounded-lg p-4 space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-dark"></div>
                          <div>
                            <div className="h-3 w-24 bg-white/20 rounded mb-2"></div>
                            <div className="h-2 w-32 bg-white/10 rounded"></div>
                          </div>
                        </div>
                        <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded text-xs font-medium">
                          Interview
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social proof */}
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-dark border-2 border-dark-bg"></div>
                ))}
              </div>
              <span>Join 500+ job seekers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">★★★★★</span>
              <span>4.9 out of 5</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}