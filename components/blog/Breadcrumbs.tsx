import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-zinc-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-[#111f43] transition-colors duration-300 font-poppins">
                  {item.label}
                </Link>
              ) : (
                <span className="text-[#111f43] font-semibold font-poppins" aria-current={isLast ? "page" : undefined}>
                  {item.label}
                </span>
              )}
              
              {!isLast && (
                <ChevronRight className="h-4 w-4 text-zinc-400" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
