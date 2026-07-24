import { KeyTakeaway } from "../../types";
import { CheckCircle2 } from "lucide-react";

export function QuickSummary({ takeaways }: { takeaways: KeyTakeaway[] }) {
  if (!takeaways || takeaways.length === 0) return null;

  return (
    <div className="bg-white border border-[#111f43]/10 border-l-4 border-l-[#d7c2a3] rounded-[4px] p-6 lg:p-8 mb-12 shadow-sm">
      <h2 className="text-xl font-cormorant font-bold tracking-tight text-[#111f43] mb-4 flex items-center gap-2">
        Key Takeaways
      </h2>
      <ul className="space-y-3">
        {takeaways.map((takeaway) => (
          <li key={takeaway.id} className="flex gap-3 text-zinc-700">
            <CheckCircle2 className="h-5 w-5 text-[#d7c2a3] shrink-0 mt-0.5" />
            <span className="leading-relaxed font-poppins text-[15px]">{takeaway.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
