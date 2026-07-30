import React from 'react';

export function ProjectCard({ project }) {
  const fallbackImage = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop';

  return (
    <a
      href={project.url || '#'}
      target={project.url?.startsWith('http') ? '_blank' : '_self'}
      rel={project.url?.startsWith('http') ? 'noopener noreferrer' : ''}
      className="project-card group block bg-white border border-[#d9cbc2]/60 rounded-xl overflow-hidden shadow-sm hover:-translate-y-1.5 transition-all duration-300 cursor-pointer text-decoration-none"
      style={{ opacity: 1, visibility: 'visible' }}
    >
      <div className="project-image-wrapper aspect-[4/3] overflow-hidden bg-neutral-100 relative">
        <img
          src={project.image || fallbackImage}
          alt={project.name}
          width="400"
          height="300"
          loading="lazy"
          decoding="async"
          className="project-img w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallbackImage;
          }}
        />
        <div className="project-hover-overlay absolute inset-0 bg-[#111f43]/0 group-hover:bg-[#111f43]/5 transition-colors"></div>
      </div>
      <div className="project-content p-6 flex justify-between items-center gap-4 bg-white flex-wrap">
        <div className="project-text-info flex-grow min-w-0">
          <h3 className="project-name font-cormorant font-bold text-2xl text-[#111f43] mb-1">
            {project.name}
          </h3>
          <p className="project-location font-poppins text-xs text-[#777777] flex items-center gap-1.5">
            <i className="fa-solid fa-location-dot text-[#d7c2a3]" aria-hidden="true"></i> {project.location}
          </p>
        </div>
        <div className="project-btn-wrapper">
          <span className="btn-secondary project-view-btn text-xs font-poppins font-semibold px-4 py-2 rounded-lg border border-[#d7c2a3] text-[#111f43] group-hover:bg-[#d7c2a3] group-hover:text-white transition-colors">
            View Project
          </span>
        </div>
      </div>
    </a>
  );
}
