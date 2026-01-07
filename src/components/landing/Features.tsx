'use client';

import { BarChart3, Bell, FileText, Filter, LineChart, Lock } from 'lucide-react';

const features = [
  {
    icon: FileText,
    title: 'Track Applications',
    description: 'Keep all your job applications organized in one place. Never lose track of where you applied.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: BarChart3,
    title: 'Powerful Analytics',
    description: 'Visualize your job search progress with beautiful charts and insights about your applications.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Filter,
    title: 'Smart Filtering',
    description: 'Filter and search through your applications by status, company, date, and more.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Bell,
    title: 'Stay Organized',
    description: 'Get reminders for follow-ups and interviews. Never miss an important deadline.',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: LineChart,
    title: 'Progress Tracking',
    description: 'Monitor your success rate, response times, and application trends over time.',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Lock,
    title: 'Secure & Private',
    description: 'Your data is encrypted and secure. Only you can access your application information.',
    color: 'from-pink-500 to-rose-500',
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-20 sm:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 dot-pattern opacity-20"></div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <span className="text-sm text-primary font-medium">Features</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Everything You Need to
            </span>
            <br />
            <span className="text-white">
              Ace Your Job Search
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Powerful features designed to make your job application process smooth and successful.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative glass-dark rounded-2xl p-6 sm:p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300 blur-xl`}></div>
                
                <div className="relative">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}