// WhatsApp configuration — update WHATSAPP_NUMBER to change the sales agent number
export const WHATSAPP_NUMBER = "919987057317"; // +91-9987057317

export const BUSINESS = {
  name: "AB Cars",
  tagline: "Find Your Perfect Ride",
  location: "Mumbai, Maharashtra",
  phone: "+91-99870 57317",
  email: "info@abcars.in",
} as const;

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildDefaultWhatsAppUrl(carName?: string): string {
  const message = carName
    ? `Hi AB Cars! I'm interested in the ${carName}. Please share more details.`
    : "Hi AB Cars! I'm looking to buy a car. Can you help me?";
  return buildWhatsAppUrl(message);
}
