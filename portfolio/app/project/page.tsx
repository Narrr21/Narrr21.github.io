"use client";

import {
  ArrowUpRight,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import projectData from "@/content/project.json";
import { useState } from "react";

export default function Projects() {
  const { title, description, projects, filter } = projectData;
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedTag, setSelectedTag] = useState("All");

  // Filter projects by tag
  const filteredProjects =
    selectedTag === "All"
      ? projects
      : projects.filter((project) => project.tags.includes(selectedTag));

  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  // Handle page change
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  // Handle items per page change
  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1); // Reset to first page
  };

  // Handle tag filter change
  const handleTagChange = (tag: string) => {
    setSelectedTag(tag);
    setCurrentPage(1); // Reset to first page
  };

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
          {/* Filter Tags */}
          <div className="flex flex-wrap gap-2">
            {filter.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagChange(tag)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedTag === tag
                    ? "bg-blue-600 text-white"
                    : "bg-slate-800 text-slate-300 border border-slate-700 hover:border-blue-500 hover:text-blue-400"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center flex-wrap gap-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              {selectedTag === "All" ? "All Projects" : selectedTag}
            </h2>

            {/* Items per page selector */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-400">Show:</span>
              <select
                value={itemsPerPage}
                onChange={(e) =>
                  handleItemsPerPageChange(Number(e.target.value))
                }
                className="bg-slate-800 text-slate-200 border border-slate-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500"
              >
                <option value={3}>3 per page</option>
                <option value={5}>5 per page</option>
                <option value={10}>10 per page</option>
                <option value={projects.length}>All</option>
              </select>
            </div>
          </div>

          <div className="grid gap-8">
            {currentProjects.map((project, index) => (
              <ProjectRow
                key={index}
                title={project.title}
                description={project.description}
                tags={project.tags}
                link={project.link}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-8 border-t border-slate-800">
              <div className="text-sm text-slate-400">
                Showing {startIndex + 1}-
                {Math.min(endIndex, filteredProjects.length)} of{" "}
                {filteredProjects.length} projects
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-slate-700 text-slate-400 hover:text-blue-400 hover:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-slate-400 disabled:hover:border-slate-700 transition-all"
                >
                  <ChevronLeft size={20} />
                </button>

                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          currentPage === page
                            ? "bg-blue-600 text-white"
                            : "border border-slate-700 text-slate-400 hover:text-blue-400 hover:border-blue-500"
                        }`}
                      >
                        {page}
                      </button>
                    ),
                  )}
                </div>

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-slate-700 text-slate-400 hover:text-blue-400 hover:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-slate-400 disabled:hover:border-slate-700 transition-all"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}
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
