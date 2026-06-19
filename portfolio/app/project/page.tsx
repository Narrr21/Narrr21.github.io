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
  const { title, description, projects, filter, techstack } = projectData;
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // State untuk menampung banyak filter sekaligus
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTech, setSelectedTech] = useState<string[]>([]);

  // Logika Filter Bersama (Combo Checkbox)
  const filteredProjects = projects.filter((project) => {
    // 1. Validasi kecocokan semua tag yang dicentang
    const matchTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => project.tags.includes(tag));

    // 2. Validasi kecocokan semua techstack yang dicentang
    const matchTech =
      selectedTech.length === 0 ||
      selectedTech.every((tech) => project.techstack.includes(tech));

    return matchTags && matchTech;
  });

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

  // Toggle Checkbox untuk Kategori / Tags
  const handleTagChange = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
    setCurrentPage(1);
  };

  // Toggle Checkbox untuk Tech Stack
  const handleTechChange = (tech: string) => {
    setSelectedTech((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
    setCurrentPage(1);
  };

  // Membersihkan semua filter aktif
  const handleClearFilters = () => {
    setSelectedTags([]);
    setSelectedTech([]);
    setCurrentPage(1);
  };

  const availableFilters = filter.filter((tag) => tag.toLowerCase() !== "all");
  const availableTech = techstack || [];
  const hasActiveFilters = selectedTags.length > 0 || selectedTech.length > 0;

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

        {/* Combo Checkbox Filter Panel */}
        <section className="space-y-6 p-6 bg-slate-900/50 border border-slate-800 rounded-xl mb-12">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">
              Filter Options Combo
            </span>
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="text-xs text-blue-400 hover:text-blue-300 underline underline-offset-4 transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>

          {/* 1. Group Checkbox: Categories / Tags */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 block mb-1">Categories / Tags:</span>
            <div className="flex flex-wrap gap-3">
              {availableFilters.map((tag) => {
                const isChecked = selectedTags.includes(tag);
                return (
                  <label
                    key={tag}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium cursor-pointer transition-all select-none ${
                      isChecked
                        ? "bg-blue-600/10 border-blue-500 text-blue-400"
                        : "bg-slate-800/40 border-slate-700/60 text-slate-300 hover:border-slate-600 hover:text-white"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleTagChange(tag)}
                      className="w-3.5 h-3.5 rounded border-slate-600 bg-slate-700 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-900 accent-blue-600"
                    />
                    <span>{tag}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* 2. Group Checkbox: Tech Stack */}
          {availableTech.length > 0 && (
            <div className="space-y-2 pt-2">
              <span className="text-xs font-semibold text-slate-400 block mb-1">Tech Stack:</span>
              <div className="flex flex-wrap gap-3">
                {availableTech.map((tech) => {
                  const isChecked = selectedTech.includes(tech);
                  return (
                    <label
                      key={tech}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium cursor-pointer transition-all select-none ${
                        isChecked
                          ? "bg-emerald-600/10 border-emerald-500 text-emerald-400"
                          : "bg-slate-800/40 border-slate-700/60 text-slate-300 hover:border-slate-600 hover:text-white"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleTechChange(tech)}
                        className="w-3.5 h-3.5 rounded border-slate-600 bg-slate-700 text-emerald-600 focus:ring-emerald-500 focus:ring-offset-slate-900 accent-emerald-600"
                      />
                      <span>{tech}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        <section className="space-y-12">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              {!hasActiveFilters
                ? "All Projects"
                : `Filtered Projects (${filteredProjects.length})`}
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

          {/* Project List */}
          <div className="grid gap-8">
            {currentProjects.length > 0 ? (
              currentProjects.map((project, index) => (
                <ProjectRow
                  key={index}
                  title={project.title}
                  description={project.description}
                  tags={project.tags}
                  techstack={project.techstack}
                  link={project.link}
                />
              ))
            ) : (
              <div className="text-center py-12 border border-dashed border-slate-800 rounded-xl">
                <p className="text-slate-400">
                  No projects match the combination of selected criteria.
                </p>
              </div>
            )}
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
  techstack,
  link,
}: {
  title: string;
  description: string;
  tags: string[];
  techstack: string[];
  link: string;
}) {
  return (
    <div className="group relative bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/10">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-3">
          <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center gap-2"
            >
              {title}
            </a>
          </h3>

          <p className="text-slate-300 leading-relaxed">{description}</p>

          {/* Menyatukan container lencana agar mengalir sejajar dengan rapi */}
          <div className="flex flex-wrap gap-2 pt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs font-semibold rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20"
              >
                {tag}
              </span>
            ))}
            {techstack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-medium rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 p-2 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-slate-700 transition-all"
          aria-label={`Open ${title} in a new tab`}
        >
          <ExternalLink size={20} />
        </a>
      </div>
    </div>
  );
}