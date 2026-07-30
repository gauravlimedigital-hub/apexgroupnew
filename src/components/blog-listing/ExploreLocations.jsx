import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';

export function ExploreLocations({ locations = [], onSelectLocation }) {
  const defaultLocations = [
    { name: 'Siddharth Vihar' },
    { name: 'Indirapuram' },
    { name: 'Ghaziabad' },
    { name: 'Noida Extension' },
    { name: 'Greater Noida (West)' },
    { name: 'ETA II, Greater Noida' },
  ];

  const list = locations.length > 0 ? locations : defaultLocations;

  return (
    <div className="locations-block">
      <SectionHeading title="Explore by Location" className="mb-5" />
      <div id="locations-list" className="flex flex-wrap items-center justify-start gap-[14px] w-full">
        {list.map((loc, idx) => (
          <button
            key={loc.name || idx}
            onClick={() => {
              if (onSelectLocation) onSelectLocation(loc.name);
            }}
            className="inline-flex items-center justify-center gap-2 h-[44px] px-[18px] rounded-full border border-[#0F2238]/15 bg-white text-[#0F2147] font-poppins font-medium text-[14px] hover:border-[#D6B37A] hover:bg-slate-50 transition-all cursor-pointer w-fit shrink-0 active:scale-[0.98]"
            style={{ flex: "0 0 auto", width: "fit-content", whiteSpace: "nowrap" }}
            tabIndex={0}
            type="button"
            aria-label={`Explore blogs in ${loc.name}`}
          >
            <i className="fa-solid fa-location-dot text-[#D6B37A] text-[13px] shrink-0" aria-hidden="true"></i>
            <span className="whitespace-nowrap">{loc.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
