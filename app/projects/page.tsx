import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import { allProjects, ProjectItem } from "@/data/mock-data";
import { ArrowUpRight } from "lucide-react";

function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <a
      href={project.url}
      target={project.url.startsWith("http") ? "_blank" : "_self"}
      rel={project.url.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group block bg-white border border-[#d9cbc2]/60 rounded-[16px] overflow-hidden shadow-[0_8px_30px_rgba(17,31,67,.06)] hover:shadow-[0_16px_40px_rgba(17,31,67,.12)] hover:-translate-y-1.5 transition-all duration-300 ease-out cursor-pointer"
    >
      {/* Large Project Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#111f43]/5 border-b border-[#d9cbc2]/40">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          /* Clean Temporary Image Placeholder */
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#fbf6f0]/50 group-hover:bg-[#fbf6f0] transition-colors duration-500">
            <div className="w-16 h-16 rounded-full bg-white border border-[#d7c2a3]/50 shadow-sm flex items-center justify-center text-[#111f43] mb-3 group-hover:scale-110 group-hover:border-[#d7c2a3] transition-all duration-500">
              <svg className="w-7 h-7 text-[#111f43]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <span className="font-poppins text-[11px] font-semibold uppercase tracking-[0.15em] text-[#777777]">
              Image Asset Pending
            </span>
          </div>
        )}
        {/* Subtle hover overlay indicator */}
        <div className="absolute inset-0 bg-[#111f43]/0 group-hover:bg-[#111f43]/5 transition-colors duration-300 pointer-events-none" />
      </div>

      {/* Project Name and Clickable Indicator */}
      <div className="p-6 md:p-7 flex items-center justify-between gap-4 bg-white">
        <h2 className="font-cormorant font-bold text-[26px] text-[#111f43] group-hover:text-[#354773] transition-colors duration-200">
          {project.name}
        </h2>
        <div className="w-10 h-10 rounded-full bg-[#fbf6f0] border border-[#d7c2a3]/40 flex items-center justify-center text-[#111f43] group-hover:bg-[#111f43] group-hover:text-white group-hover:border-[#111f43] transition-all duration-300 shrink-0">
          <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </a>
  );
}

export default function ProjectsPage() {
  const ongoingProjects = allProjects.filter((p) => p.status === "Ongoing");
  const completedProjects = allProjects.filter((p) => p.status === "Completed");
  const pastProjects = allProjects.filter((p) => p.status === "Past");

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      <Header />

      <main className="flex-1 py-12 md:py-16">
        {/* Minimal Page Introduction Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center mb-16 md:mb-20">
          <span className="font-poppins text-[13px] font-semibold uppercase tracking-[0.2em] text-[#d7c2a3] block mb-3">
            PROJECTS
          </span>
          <h1 className="font-cormorant font-bold text-[40px] md:text-[52px] text-[#111f43] leading-tight mb-4">
            Discover Our Landmark Developments
          </h1>
          <p className="font-poppins text-[16px] text-[#555555] max-w-2xl mx-auto leading-relaxed">
            Explore thoughtfully designed residential developments by Apex Group.
          </p>
          <div className="w-16 h-[2px] bg-[#d7c2a3] mt-8 mx-auto" />
        </div>

        {/* Categorized Project Sections */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-20 md:space-y-24">
          
          {/* Ongoing Projects */}
          {ongoingProjects.length > 0 && (
            <section>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 md:mb-10 border-b border-[#d9cbc2]/50 pb-5">
                <div>
                  <span className="font-poppins text-[12px] font-semibold uppercase tracking-[0.2em] text-[#d7c2a3] block mb-2">
                    CURRENTLY IN PROGRESS
                  </span>
                  <h2 className="font-cormorant font-bold text-[34px] md:text-[42px] text-[#111f43] leading-none">
                    Ongoing Projects
                  </h2>
                </div>
                <span className="font-poppins text-[13px] text-[#777777] mt-2 sm:mt-0 font-medium">
                  {ongoingProjects.length} {ongoingProjects.length === 1 ? "Landmark Development" : "Landmark Developments"}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {ongoingProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </section>
          )}

          {/* Completed Projects */}
          {completedProjects.length > 0 && (
            <section>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 md:mb-10 border-b border-[#d9cbc2]/50 pb-5">
                <div>
                  <span className="font-poppins text-[12px] font-semibold uppercase tracking-[0.2em] text-[#d7c2a3] block mb-2">
                    DELIVERED WITH EXCELLENCE
                  </span>
                  <h2 className="font-cormorant font-bold text-[34px] md:text-[42px] text-[#111f43] leading-none">
                    Completed Projects
                  </h2>
                </div>
                <span className="font-poppins text-[13px] text-[#777777] mt-2 sm:mt-0 font-medium">
                  {completedProjects.length} {completedProjects.length === 1 ? "Landmark Development" : "Landmark Developments"}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {completedProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </section>
          )}

          {/* Past Projects */}
          {pastProjects.length > 0 && (
            <section>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 md:mb-10 border-b border-[#d9cbc2]/50 pb-5">
                <div>
                  <span className="font-poppins text-[12px] font-semibold uppercase tracking-[0.2em] text-[#d7c2a3] block mb-2">
                    OUR LEGACY
                  </span>
                  <h2 className="font-cormorant font-bold text-[34px] md:text-[42px] text-[#111f43] leading-none">
                    Past Projects
                  </h2>
                </div>
                <span className="font-poppins text-[13px] text-[#777777] mt-2 sm:mt-0 font-medium">
                  {pastProjects.length} {pastProjects.length === 1 ? "Landmark Development" : "Landmark Developments"}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {pastProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </section>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
