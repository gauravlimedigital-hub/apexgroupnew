import { LeadPayload } from "@/types/lead";

export async function submitLead(payload: LeadPayload): Promise<{ success: boolean; message: string }> {
  // Mocking network request delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // In the future, this will be:
  // const response = await fetch('/api/leads', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(payload),
  // });
  // if (!response.ok) throw new Error('Failed to submit lead');
  // return response.json();

  console.log("Lead submitted successfully:", payload);

  return {
    success: true,
    message: "Thank you! Our property advisor will contact you shortly.",
  };
}
