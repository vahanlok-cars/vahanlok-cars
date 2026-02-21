"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { buildDefaultWhatsAppUrl } from "@/lib/config";

interface WhatsAppButtonProps {
  carName?: string;
}

export default function WhatsAppButton({ carName }: WhatsAppButtonProps) {
  const url = buildDefaultWhatsAppUrl(carName);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl hover:bg-[#20bc5a] transition-all duration-200 group"
    >
      {/* Desktop: pill with text */}
      <span className="hidden sm:flex items-center gap-2 px-4 py-3 font-medium text-sm">
        <MessageCircle className="h-5 w-5" />
        <span>Chat with us</span>
      </span>
      {/* Mobile: icon only */}
      <span className="flex sm:hidden items-center justify-center w-14 h-14">
        <MessageCircle className="h-6 w-6" />
      </span>
    </a>
  );
}
