import React from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  ShieldCheck,
  Award,
  Users,
  Target,
  ArrowRight,
  TrendingUp,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const About = () => {
  const stats = [
    { label: "Properties Managed", value: "1,200+" },
    { label: "Happy Homeowners", value: "3,500+" },
    { label: "Cities Covered", value: "15+" },
    { label: "Years of Excellence", value: "12+" },
  ];

  const values = [
    {
      icon: ShieldCheck,
      title: "Transparent Advisory",
      description:
        "Every listing and transaction undergoes rigorous verification to guarantee absolute peace of mind and full disclosure.",
    },
    {
      icon: Target,
      title: "Tailored Living Spaces",
      description:
        "We match unique lifestyle requirements with curated properties, whether you seek urban penthouses or tranquil residential plots.",
    },
    {
      icon: Award,
      title: "Market Leadership",
      description:
        "Backed by over a decade of real estate data, our team provides market insights that maximize asset growth and value.",
    },
  ];

  const leadership = [
    {
      name: "Marcus Vance",
      role: "Founder & CEO",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
    },
    {
      name: "Elena Rostova",
      role: "Head of Real Estate Strategy",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    },
    {
      name: "David Chen",
      role: "Chief Investment Officer",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 space-y-16 max-w-7xl mx-auto">
      
      {/* Hero Header Banner */}
      <section className="bg-[#1c2a57] rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden shadow-2xl shadow-[#1c2a57]/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#f7a31d]/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-3xl space-y-4 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#f7a31d] text-[11px] font-bold uppercase tracking-widest backdrop-blur-md border border-white/10">
            <Sparkles className="w-3.5 h-3.5" /> About Urban Estates
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Redefining Premium Real Estate & Modern Living.
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pt-2">
            Urban Estates was founded on a simple principle: to make buying, selling, and investing in high-value properties seamless, transparent, and rewarding.
          </p>
        </div>

        {/* Floating Stat Overlay Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 mt-10 border-t border-white/10 relative z-10">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <p className="text-2xl sm:text-3xl font-black text-[#f7a31d]">
                {stat.value}
              </p>
              <p className="text-[11px] text-slate-300 font-medium uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Story Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 space-y-5">
          <div className="inline-flex items-center gap-2 text-[#f7a31d] text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-4 h-4" /> Our Story
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Connecting People with Exceptional Properties.
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Over the past decade, Urban Estates has evolved from a local boutique brokerage into a trusted full-stack real estate firm. We combine market intelligence with localized advisory to guide clients through every stage of their real estate journey.
          </p>
          
          <ul className="space-y-2.5 pt-2 text-xs font-semibold text-slate-700">
            {[
              "Verified residential and commercial property listings",
              "In-depth market valuation and neighborhood insights",
              "End-to-end legal and documentation support",
            ].map((point, i) => (
              <li key={i} className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#f7a31d] shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <div className="pt-4">
            <Link
              to="/listing"
              className="inline-flex items-center gap-2 bg-[#1c2a57] hover:bg-[#152042] text-white font-bold py-3 px-6 rounded-xl text-xs uppercase tracking-wider shadow-lg transition-all"
            >
              <span>Explore Portfolio</span>
              <ArrowRight className="w-4 h-4 text-[#f7a31d]" />
            </Link>
          </div>
        </div>

        {/* Feature Image Banner */}
        <div className="lg:col-span-6 relative">
          <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"
              alt="Urban Estate Modern Architecture"
              className="w-full h-80 sm:h-96 object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-xl border border-slate-100 hidden sm:flex items-center gap-4 max-w-xs">
            <div className="w-10 h-10 rounded-xl bg-[#f7a31d]/20 text-[#f7a31d] flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Proven Track Record</p>
              <p className="text-[10px] text-slate-500">Consistently delivering top return on investment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Our Guiding Pillars
          </h2>
          <p className="text-slate-500 text-xs">
            The core values that shape our advisory services and customer partnerships.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 hover:border-[#f7a31d]/40 transition-all space-y-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#1c2a57] text-[#f7a31d] flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{val.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {val.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-xl space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[#f7a31d] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <Users className="w-4 h-4" /> Leadership
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Meet Our Executive Team
            </h2>
          </div>
          <p className="text-slate-500 text-xs max-w-xs">
            Guided by industry veterans dedicated to elevating standards in real estate advisory.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {leadership.map((member, idx) => (
            <div
              key={idx}
              className="group rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 hover:shadow-lg transition-all"
            >
              <div className="h-64 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5 text-center">
                <h3 className="font-bold text-slate-900 text-sm">{member.name}</h3>
                <p className="text-[11px] text-[#f7a31d] font-semibold mt-0.5">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="bg-gradient-to-r from-[#1c2a57] to-[#253975] rounded-3xl p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-xl font-bold">Ready to find your dream property?</h3>
          <p className="text-xs text-slate-300">
            Contact our advisors today for a private property consultation.
          </p>
        </div>
        <Link
          to="/contact"
          className="bg-[#f7a31d] hover:bg-[#e09112] text-[#1c2a57] font-bold py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider shadow-lg transition-all shrink-0"
        >
          Contact Advisory Team
        </Link>
      </section>

    </div>
  );
};

export default About;