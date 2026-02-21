"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, Upload, X, Send } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/config";

const schema = z.object({
  carModel: z.string().min(1, "Car model is required"),
  name: z.string().min(2, "Please enter your full name"),
  location: z.string().min(2, "Please enter your city or area"),
  mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  hasQuotation: z.enum(["yes", "no"]),
});

type FormData = z.infer<typeof schema>;

interface LeadFormProps {
  carModel: string;
  carId?: string;
}

export default function LeadForm({ carModel }: LeadFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [quotationFile, setQuotationFile] = useState<File | null>(null);
  const [showImageHint, setShowImageHint] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      carModel,
      hasQuotation: "no",
    },
  });

  const hasQuotation = watch("hasQuotation");

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setQuotationFile(file);
  }

  function removeFile() {
    setQuotationFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function onSubmit(data: FormData) {
    const lines = [
      "🚗 New Lead from AB Cars Website",
      "",
      `Car Interested In: ${data.carModel}`,
      `Name: ${data.name}`,
      `Location: ${data.location}`,
      `Mobile: +91 ${data.mobile}`,
      "",
      `Existing Quotation: ${data.hasQuotation === "yes" ? "Yes" : "No"}`,
    ];

    if (data.hasQuotation === "yes" && quotationFile) {
      lines.push("Quotation image attached — please check below");
    }

    const message = lines.join("\n");
    const url = buildWhatsAppUrl(message);

    if (data.hasQuotation === "yes" && quotationFile) {
      setShowImageHint(true);
    } else {
      setSubmitted(true);
    }

    window.open(url, "_blank");
  }

  if (showImageHint) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center space-y-4">
        <div className="text-amber-600 text-4xl">📎</div>
        <h3 className="font-semibold text-[#1A1A1A] text-lg">
          One more step!
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          WhatsApp has opened with your enquiry. Please <strong>attach your quotation image</strong> in the chat that just opened.
        </p>
        <button
          onClick={() => {
            setShowImageHint(false);
            setSubmitted(true);
          }}
          className="w-full bg-[#D72828] hover:bg-[#b82020] text-white font-semibold py-3 rounded-lg transition-colors text-sm"
        >
          Done — I&apos;ve attached it
        </button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center space-y-3">
        <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
        <h3 className="font-semibold text-[#1A1A1A] text-xl">Thank you!</h3>
        <p className="text-gray-600 text-sm">
          Our team will reach out to you within <strong>1 hour!</strong>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      {/* Car Model */}
      <div>
        <label className="block text-sm font-medium text-[#1A1A1A] mb-1">
          Car Model
        </label>
        <input
          {...register("carModel")}
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D72828]/30 focus:border-[#D72828] transition-colors"
          placeholder="e.g. Hyundai Creta SX(O)"
        />
        {errors.carModel && (
          <p className="text-red-500 text-xs mt-1">{errors.carModel.message}</p>
        )}
      </div>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-[#1A1A1A] mb-1">
          Your Name <span className="text-[#D72828]">*</span>
        </label>
        <input
          {...register("name")}
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D72828]/30 focus:border-[#D72828] transition-colors"
          placeholder="Enter your full name"
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-[#1A1A1A] mb-1">
          Your Location <span className="text-[#D72828]">*</span>
        </label>
        <input
          {...register("location")}
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D72828]/30 focus:border-[#D72828] transition-colors"
          placeholder="e.g. Andheri, Mumbai"
        />
        {errors.location && (
          <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>
        )}
      </div>

      {/* Mobile */}
      <div>
        <label className="block text-sm font-medium text-[#1A1A1A] mb-1">
          Mobile Number <span className="text-[#D72828]">*</span>
        </label>
        <div className="flex">
          <span className="flex items-center px-3 bg-gray-50 border border-r-0 border-gray-200 rounded-l-lg text-sm text-gray-500 select-none">
            +91
          </span>
          <input
            {...register("mobile")}
            type="tel"
            inputMode="numeric"
            maxLength={10}
            className="flex-1 border border-gray-200 rounded-r-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D72828]/30 focus:border-[#D72828] transition-colors"
            placeholder="9876543210"
          />
        </div>
        {errors.mobile && (
          <p className="text-red-500 text-xs mt-1">{errors.mobile.message}</p>
        )}
      </div>

      {/* Existing quotation toggle */}
      <div>
        <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
          Do you have an existing quotation?
        </label>
        <div className="flex gap-2">
          {(["no", "yes"] as const).map((val) => (
            <label
              key={val}
              className={`flex-1 flex items-center justify-center gap-2 border rounded-lg py-2.5 text-sm font-medium cursor-pointer transition-all ${
                hasQuotation === val
                  ? "border-[#D72828] bg-[#D72828]/5 text-[#D72828]"
                  : "border-gray-200 text-gray-500 hover:border-gray-300"
              }`}
            >
              <input
                type="radio"
                value={val}
                {...register("hasQuotation")}
                className="sr-only"
              />
              {val === "yes" ? "Yes" : "No"}
            </label>
          ))}
        </div>
      </div>

      {/* File upload (conditional) */}
      {hasQuotation === "yes" && (
        <div>
          <label className="block text-sm font-medium text-[#1A1A1A] mb-1">
            Upload your quotation for a better deal{" "}
            <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          {quotationFile ? (
            <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
              <span className="text-sm text-gray-700 truncate max-w-50">
                {quotationFile.name}
              </span>
              <button
                type="button"
                onClick={removeFile}
                className="text-gray-400 hover:text-gray-600 shrink-0 ml-2"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-200 rounded-lg py-5 cursor-pointer hover:border-[#D72828]/50 transition-colors">
              <Upload className="h-6 w-6 text-gray-400 mb-1" />
              <span className="text-sm text-gray-500">
                Click to upload JPG, PNG, or PDF
              </span>
              <input
                ref={fileInputRef}
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileChange}
                className="sr-only"
              />
            </label>
          )}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 bg-[#D72828] hover:bg-[#b82020] disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-colors text-sm"
      >
        <Send className="h-4 w-4" />
        Send via WhatsApp
      </button>

      <p className="text-center text-xs text-gray-400">
        No spam — your details go directly to our sales team.
      </p>
    </form>
  );
}
