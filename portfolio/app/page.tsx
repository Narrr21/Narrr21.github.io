import {
  Github,
  Linkedin,
  Mail,
  Instagram,
  Download,
  FolderOpen,
} from "lucide-react";
import Image from "next/image";
import landingData from "@/content/landing.json";

export default function Home() {
  const { hero, social } = landingData;

  return (
    <div className="min-h-screen">
      {/* Wrapper*/}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          {/* Left: Info */}
          <div className="space-y-6">
            <div>
              {/* Name */}
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
                {hero.name}
              </h1>
              {/* Title */}
              <p className="text-xl text-slate-400 mb-6">{hero.title}</p>
              {/* Quick Summary */}
              <p className="text-slate-200 mb-4">{hero.summary}</p>
            </div>
            {/* Icons Wrapper */}
            <div className="flex flex-wrap items-center justify-between gap-6 sm:gap-10 w-full">
              {/* Left: Social Icons */}
              <div className="flex items-center gap-3">
                <p className="text-sm font-medium leading-none">Contact:</p>

                <a href={`mailto:${social.email}`} className="social-icon">
                  <Mail size={20} />
                </a>

                <a href={social.github} target="_blank" className="social-icon">
                  <Github size={20} />
                </a>

                <a href={social.linkedin} className="social-icon">
                  <Linkedin size={20} />
                </a>

                <a href={social.instagram} className="social-icon">
                  <Instagram size={20} />
                </a>
              </div>
              {/* Right: Buttons */}
              <div className="flex gap-4 ml-auto">
                <a
                  href="/cv.pdf"
                  className="btn-primary flex items-center gap-2"
                >
                  <Download size={18} />
                  Download CV
                </a>
                <a
                  href="/project"
                  className="btn-secondary flex items-center gap-2"
                >
                  <FolderOpen size={18} />
                  View Projects
                </a>
              </div>
            </div>
          </div>
          {/* Right: Profile Photo */}
          <div className="flex justify-center md:justify-start">
            <div className="relative w-80 h-96 rounded-2xl overflow-hidden bg-slate-800">
              <Image
                src={hero.profileImage}
                alt={hero.profilePlaceholder}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SkillBadge({ name, color }: { name: string; color: string }) {
  const colorClasses = {
    blue: "skill-badge-blue",
    green: "skill-badge-green",
    purple: "skill-badge-purple",
    orange: "skill-badge-orange",
  };

  return (
    <span
      className={`skill-badge ${
        colorClasses[color as keyof typeof colorClasses]
      }`}
    >
      {name}
    </span>
  );
}
