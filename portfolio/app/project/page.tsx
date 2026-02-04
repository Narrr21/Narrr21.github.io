import { ArrowUpRight, ExternalLink } from "lucide-react";
import projectData from "@/content/project.json";

export default function Projects() {
  const { title, description, projects } = projectData;

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

        <section className="space-y-12">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Selected Projects
            </h2>
          </div>

          <div className="grid gap-8">
            {projects.map((project, index) => (
              <ProjectRow
                key={index}
                title={project.title}
                description={project.description}
                tags={project.tags}
                link={project.link}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

// Komponen untuk List Project
function ProjectRow({
  title,
  description,
  tags,
  link,
}: {
  title: string;
  description: string;
  tags: string[];
  link: string;
}) {
  return (
    <div className="group relative bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/10">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-3">
          <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
          <p className="text-slate-300 leading-relaxed">{description}</p>
          <div className="flex flex-wrap gap-2 pt-2">
            {tags.map((tag) => (
              <span key={tag} className="skill-badge skill-badge-blue">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <a
          href={link}
          target="_blank"
          className="shrink-0 p-2 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-slate-700 transition-all"
        >
          <ExternalLink size={20} />
        </a>
      </div>
    </div>
  );
}
