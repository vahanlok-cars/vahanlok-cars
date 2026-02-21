# 🚗 AB Cars — Website Build Prompt

## Project Overview
Build a **lead generation website** for **AB Cars**, an Indian car dealership selling both new and pre-owned cars. The primary goal of the website is to capture buyer leads and route them directly to a sales agent via **WhatsApp**. The design should feel **clean, minimal, white, and professional** — think of it like a premium but approachable showroom experience online.

---

## Brand & Identity
- **Business Name:** AB Cars
- **Target Market:** India (use INR ₹ for pricing, Indian mobile number format +91-XXXXX-XXXXX)
- **Primary CTA:** Get the Best Deal via WhatsApp
- **Tone:** Trustworthy, professional, no-clutter

---

## Design Guidelines
- **Color Palette:** White (#FFFFFF) as primary background, deep charcoal (#1A1A1A) for text, a single accent color in red (#D72828) or dark navy (#1B2A4A) for buttons and highlights
- **Typography:** Clean sans-serif fonts — Inter or Poppins
- **Layout:** Spacious, card-based listings, generous white space
- **Mobile-first:** Must be fully responsive and optimized for Android (primary device for Indian users)
- **No clutter:** Avoid excessive animations, popups, or banners

---

## Pages & Structure

### 1. Homepage
- Hero section with a strong headline like *"Find Your Perfect Car — New or Pre-Owned"*
- Two large CTA cards prominently placed: **New Cars** and **Pre-Owned Cars** — clicking either filters the car listings below
- A sticky **WhatsApp chat button** (bottom-right corner) that is always visible across all pages, linking to the sales agent's WhatsApp with a pre-filled message like: *"Hi AB Cars! I'm interested in buying a car."*
- Brief trust section: number of cars available, years in business, happy customers (placeholder stats)
- Footer with contact details, location, and WhatsApp link

### 2. Car Listings Page
- **Filter bar at the top** with the following options:
  - Car Type: **New Cars / Pre-Owned Cars** (toggle/tab style)
  - Budget range (slider or dropdown in ₹)
  - Brand (e.g. Maruti, Hyundai, Tata, Honda — dropdown)
  - Fuel Type (Petrol / Diesel / CNG / Electric)
- Car cards in a clean grid (2 columns mobile, 3 columns desktop), each showing:
  - Car image
  - Car name & year
  - Key specs (fuel type, km driven for pre-owned, transmission)
  - Price in ₹
  - A **"Get Best Deal"** button that opens the lead form

### 3. Individual Car Detail Page
Each car listing should have its own detail page containing:
- **Image gallery** (multiple photos, swipeable on mobile)
- **Car details section:**
  - Make, Model, Year
  - Fuel Type, Transmission
  - KM Driven (for pre-owned) or "Brand New"
  - Color
  - Key features (bulleted, short)
  - Price in ₹ (or "Request Price")
- **Lead Capture Form** (see full spec below)

---

## Lead Capture Form — Full Specification

This form appears on every individual car detail page and should also be accessible as a modal from listing cards.

**Form Fields:**
1. **Car Model** — pre-filled with the car the user is viewing (editable text field)
2. **Your Name** — text field, required
3. **Your Location** — text field (city/area), required, placeholder: *"e.g. Andheri, Mumbai"*
4. **Mobile Number** — number field, required, Indian format, +91 prefix shown
5. **Do you have an existing quotation?** — Yes / No toggle
   - If **Yes**: show an **image upload field** (optional) with label: *"Upload your quotation for a better deal"* — accept JPG, PNG, PDF
6. **Submit Button:** labeled **"Send via WhatsApp"**

**On Form Submission:**
- Validate all required fields
- Construct a WhatsApp message in this format and open it via `https://wa.me/91XXXXXXXXXX?text=...`:
```
🚗 New Lead from AB Cars Website

Car Interested In: [Car Model]
Name: [Name]
Location: [Location]
Mobile: [Number]

Existing Quotation: Yes/No
[If yes and image uploaded: "Quotation image attached — please check below"]
```

- If an image was uploaded, after opening WhatsApp web/app, prompt the user with an instruction: *"Please attach your quotation image in the WhatsApp chat that just opened."* (since WhatsApp API via URL doesn't support direct image sending, handle this gracefully)
- On successful submission, show a **thank you message**: *"Our team will reach out to you within 1 hour!"*

---

## WhatsApp Integration Details
- **Single sales agent number:** Use a placeholder `+91-9987057317` — make it easy to update in one config file or environment variable
- The sticky WhatsApp button should always be visible and pre-fill context based on the page the user is on (e.g. if on a car detail page, pre-fill the car name in the message)
- Use `wa.me` deep links (no third-party WhatsApp API needed at this stage — keep it simple and cost-free)

---

## Technical Recommendations
- **Frontend:** Next.js + Tailwind + shadcn
- **Car Data:** Use a simple JSON file
- **Image Handling:**  local optimized images for car listing; lazy-load all car images
- **Form Handling:** Pure client-side (using react-hook-form) — everything is routed to WhatsApp
- **Hosting:** Vercel


---

## Deliverables Checklist
- [ ] Homepage with hero + filter CTAs + sticky WhatsApp button
- [ ] Car listings page with filters
- [ ] Individual car detail pages
- [ ] Lead capture form with WhatsApp routing
- [ ] Mobile-responsive across all screen sizes
- [ ] Easy-to-edit car data source (JSON or CMS)
- [ ] Single config file with the WhatsApp number for easy updates