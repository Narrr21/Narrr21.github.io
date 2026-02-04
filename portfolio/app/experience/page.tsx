import { Calendar, Briefcase } from "lucide-react";
import experienceData from "@/content/experience.json";

export default function Experience() {
  const { title, description, experiences } = experienceData;

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="">
        <section className="space-y-8 mb-16">
          <div>
            <h1 className="text-5xl font-bold tracking-tight text-white mb-6">
              {title}
            </h1>
            <div className="h-1 w-20 bg-blue-600 rounded"></div>
          </div>

          <p className="text-lg text-slate-300 leading-relaxed max-w-3xl">
            {description}
          </p>
        </section>

        <section className="space-y-6">
          {experiences.map((exp, index) => (
            <ExperienceCard
              key={index}
              icon={<Briefcase size={20} />}
              title={exp.title}
              organization={exp.organization}
              period={exp.period}
              description={exp.description}
              skills={exp.skills}
            />
          ))}
        </section>
      </div>
    </div>
  );
}

function ExperienceCard({
  icon,
  title,
  organization,
  period,
  description,
  skills,
}: {
  icon: React.ReactNode;
  title: string;
  organization: string;
  period: string;
  description: string;
  skills: string[];
}) {
  return (
    <div className="group relative bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-blue-500 transition-all">
      <div className="flex items-start gap-4">
        <div className="shrink-0 p-3 rounded-lg bg-slate-700/50 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
          {icon}
        </div>

        <div className="flex-1 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                {title}
              </h3>
              <p className="text-slate-400 font-medium mt-1">{organization}</p>
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-sm shrink-0">
              <Calendar size={16} />
              <span>{period}</span>
            </div>
          </div>

          <p className="text-slate-300 leading-relaxed">{description}</p>

          <div className="flex flex-wrap gap-2 pt-2">
            {skills.map((skill, index) => {
              return (
                <span
                  key={skill}
                  className={`skill-badge`}
                >
                  {skill}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
