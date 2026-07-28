/**
 * Central runtime configuration.
 *
 * Values come from environment variables when present (see `.env.local`),
 * with sensible fallbacks so the app works out of the box.
 */

// Base URL of the Ono Belle backend API (no trailing slash).
export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://projects.jadesdev.com.ng/onobelle-backend/api"
).replace(/\/$/, "");

// WhatsApp business number in international format, digits only (no "+").
// Used for the floating chat button, product enquiries and the order fallback link.
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "2348133035019";

/** Build a wa.me deep link with a pre-filled message. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
