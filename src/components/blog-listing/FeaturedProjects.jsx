import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { ProjectCard } from '../cards/ProjectCard';

export function FeaturedProjects({ projects = [] }) {
  const defaultProjects = [
    {
      name: 'Apex Quebec',
      location: 'Siddharth Vihar, Ghaziabad',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      url: 'https://www.theapexgroup.in/qubec.php',
    },
    {
      name: "Apex D'Rio",
      location: 'Indirapuram, Ghaziabad',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      url: 'https://www.theapexgroup.in/drio.php',
    },
    {
      name: 'Apex Elyria',
      location: 'Greater Noida West',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      url: '#',
    },
  ];

  const list = projects.length > 0 ? projects : defaultProjects;

  return (
    <div id="projects-section" className="featured-projects-block">
      <SectionHeading
        id="projects-heading"
        title="Featured Projects"
        linkText="View All Projects"
        linkHref="landing.html#floor-plans"
      />
      <div id="projects-grid" className="projects-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-[40px] w-full">
        {list.slice(0, 3).map((proj, idx) => (
          <ProjectCard key={proj.name || idx} project={proj} />
        ))}
      </div>
    </div>
  );
}
