'use client';

import { UserPlus, Plus, BarChart3, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Sign Up in Seconds',
    description: 'Create your free account with just your email. No credit card required.',
  },
  {
    number: '02',
    icon: Plus,
    title: 'Add Applications',
    description: 'Quickly add job applications with company details, position, and status.',
  },
  {
    number: '03',
    icon: BarChart3,
    title: 'Track & Analyze',
    description: 'Monitor your progress with analytics and stay on top of your job search.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-20 sm:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <span className="text-sm text-primary font-medium">How It Works</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">
              Get Started in
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Three Simple Steps
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            From signup to insights in minutes. No complicated setup required.
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connection lines (desktop) */}
            <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary/50 via-purple-500/50 to-primary/50"></div>

            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  <div className="glass-dark rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300 group">
                    {/* Number badge */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary/50">
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div className="w-20 h-20 mx-auto mb-6 mt-4 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-10 h-10 text-primary" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow (mobile) */}
                  {index < steps.length - 1 && (
                    <div className="md:hidden flex justify-center my-4">
                      <ArrowRight className="w-6 h-6 text-primary rotate-90" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-all shadow-lg shadow-primary/50 hover:shadow-primary/70 hover:scale-105"
          >
            Start Tracking Now
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}