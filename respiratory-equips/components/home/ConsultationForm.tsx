"use client";

import { useState } from "react";
import {
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaStethoscope,
  FaFileUpload,
  FaPaperPlane,
  FaCheckCircle,
} from "react-icons/fa";

export default function ConsultationForm() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [prescriptionName, setPrescriptionName] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong. Please try again.");
      }

      setSuccess(true);
      form.reset();
      setPrescriptionName("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="max-w-3xl mx-auto px-6 lg:px-8 pb-16">
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8">
        <span className="inline-block bg-accent-light text-accent text-xs font-semibold tracking-wide px-3 py-1 rounded-full mb-3">
          NEED HELP CHOOSING EQUIPMENT?
        </span>
        <p className="text-primary font-bold text-xl mb-6">Request a Free Consultation</p>

        {success ? (
          <div className="flex flex-col items-center text-center py-10">
            <FaCheckCircle className="text-accent text-4xl mb-3" />
            <p className="font-semibold text-primary">Request sent successfully!</p>
            <p className="text-gray-500 text-sm mt-1">
              Our team will get in touch with you shortly.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="mt-5 text-accent text-sm font-medium hover:text-accent-dark"
            >
              Submit another request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {error && (
              <div className="md:col-span-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-2.5">
                {error}
              </div>
            )}

            <Field icon={FaUser} required name="fullName" type="text" placeholder="Full Name*" />
            <Field icon={FaPhoneAlt} required name="phone" type="tel" placeholder="Phone Number*" />
            <Field icon={FaEnvelope} required name="email" type="email" placeholder="Email Address*" />
            <Field icon={FaMapMarkerAlt} required name="city" type="text" placeholder="City*" />

            <div className="relative">
              <FaStethoscope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                name="equipmentNeeded"
                className="w-full appearance-none rounded-lg border border-gray-200 bg-white pl-11 pr-4 py-3 text-sm text-gray-600 outline-none focus:border-accent focus:ring-2 focus:ring-accent-light transition-colors"
              >
                <option value="">Equipment Needed</option>
                <option value="cpap">CPAP Machine</option>
                <option value="bipap">BiPAP Machine</option>
                <option value="oxygen">Oxygen Concentrator</option>
                <option value="mask">Mask</option>
                <option value="accessory">Accessory</option>
              </select>
            </div>

            <label className="relative flex items-center rounded-lg border border-dashed border-gray-300 bg-gray-50 pl-11 pr-4 py-3 text-sm text-gray-500 cursor-pointer hover:border-accent hover:bg-accent-light/40 transition-colors">
              <FaFileUpload className="absolute left-4 text-gray-400" />
              <span className="flex-1 truncate">{prescriptionName || "Upload Prescription"}</span>
              <input
                type="file"
                name="prescription"
                accept="image/*,.pdf"
                className="hidden"
                onChange={(e) => setPrescriptionName(e.target.files?.[0]?.name || "")}
              />
            </label>

            <textarea
              name="message"
              placeholder="Message (Optional)"
              rows={3}
              className="md:col-span-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent-light resize-none transition-colors"
            />

            <button
              type="submit"
              disabled={submitting}
              className="md:col-span-2 flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white rounded-lg py-3.5 font-semibold transition-colors shadow-sm disabled:opacity-60"
            >
              {submitting ? "Sending..." : "Request Callback"} <FaPaperPlane />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function Field({
  icon: Icon,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { icon: any }) {
  return (
    <div className="relative">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        {...props}
        className="w-full rounded-lg border border-gray-200 bg-white pl-11 pr-4 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent-light transition-colors"
      />
    </div>
  );
}