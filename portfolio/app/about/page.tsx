import { Github, Linkedin, Mail, Instagram } from "lucide-react";
import aboutData from "@/content/about.json";

export default function About() {
  const { title, description, skills } = aboutData;

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="">
        <section className="space-y-8">
          <div>
            <h1 className="text-5xl font-bold tracking-tight text-white mb-6">
              {title}
            </h1>
            <div className="h-1 w-20 bg-blue-600 rounded"></div>
          </div>

          <div className="space-y-6 text-lg text-slate-300 leading-relaxed">
            {description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="mt-16 space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">
              Skills & Interests
            </h2>
            <div className="h-1 w-20 bg-blue-600 rounded"></div>
          </div>

          <div className="grid gap-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.languages.map((skill: string) => (
                  <span
                    key={skill}
                    className="text-sm font-medium px-4 py-2 bg-slate-700/50 text-slate-200 rounded-lg border border-slate-600 hover:border-blue-500 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.technologies.map((tech: string) => (
                  <span
                    key={tech}
                    className="text-sm font-medium px-4 py-2 bg-slate-700/50 text-slate-200 rounded-lg border border-slate-600 hover:border-green-500 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                Focus Areas
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.focusAreas.map((area: string) => (
                  <span
                    key={area}
                    className="text-sm font-medium px-4 py-2 bg-slate-700/50 text-slate-200 rounded-lg border border-slate-600 hover:border-purple-500 transition-colors"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
