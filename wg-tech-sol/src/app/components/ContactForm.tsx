"use client";
import { useState, useEffect, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import {
  getAllServices,
  getSubServicesbyServiceId,
} from "@/api/module/service";
import { createProposal } from "@/api/module/proposals";
import TermsModal from "@/app/wgContactForm/TermsModal";
import type {
  Service,
  SubService,
  SelectedServiceItem,
  ProposalPayload,
} from "./ContactForm.types";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); //naya Add kia ha?
  const [budget, setBudget] = useState(1000);
  const [message, setMessage] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [selectedSubServiceId, setSelectedSubServiceId] = useState("");
  const [selectedServices, setSelectedServices] = useState<
    SelectedServiceItem[]
  >([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingServices, setIsLoadingServices] = useState(false);
  const [isLoadingSubServices, setIsLoadingSubServices] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [subServices, setSubServices] = useState<SubService[]>([]);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  // existing states ke baad yeh add karo
  const [nationalId, setNationalId] = useState("");
  const [document, setDocument] = useState<File | null>(null);
  const [manualBudget, setManualBudget] = useState<string>("");

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    if (selectedServiceId) {
      fetchSubServices(selectedServiceId);
    } else {
      setSubServices([]);
      setSelectedSubServiceId("");
    }
  }, [selectedServiceId]);

  // Auto-select from URL params (simplified)
  useEffect(() => {
    const serviceId = searchParams.get("serviceId");
    if (serviceId && services.length > 0 && !selectedServiceId) {
      const service = services.find((s) => s._id === serviceId);
      if (service) setSelectedServiceId(serviceId);
    }
  }, [services, searchParams, selectedServiceId]);

  useEffect(() => {
    const subServiceId = searchParams.get("subServiceId");
    if (
      subServiceId &&
      subServices.length > 0 &&
      selectedServiceId &&
      !selectedSubServiceId
    ) {
      const subService = subServices.find((s) => s._id === subServiceId);
      const service = services.find((s) => s._id === selectedServiceId);

      if (subService && service) {
        setSelectedSubServiceId(subServiceId);

        const serviceItem: SelectedServiceItem = {
          serviceId: selectedServiceId,
          serviceName: service.title,
          subServiceId: subServiceId,
          subServiceName: subService.title,
          displayText: `${service.title} - ${subService.title}`,
        };

        setSelectedServices((prev) => {
          const exists = prev.some(
            (item) =>
              item.serviceId === serviceItem.serviceId &&
              item.subServiceId === serviceItem.subServiceId,
          );
          return exists ? prev : [...prev, serviceItem];
        });
      }
    }
  }, [
    subServices,
    selectedServiceId,
    selectedSubServiceId,
    services,
    searchParams,
  ]);

  const fetchServices = async () => {
    setIsLoadingServices(true);
    try {
      const response = await getAllServices();
      if (response.status === 200 || response.status === 201) {
        const servicesData: Service[] = response?.data?.data?.services || [];
        setServices(servicesData);
      } else {
        toast.error("Failed to load services");
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      toast.error("Error loading services");
    } finally {
      setIsLoadingServices(false);
    }
  };

  const fetchSubServices = async (serviceId: string) => {
    setIsLoadingSubServices(true);
    try {
      const response = await getSubServicesbyServiceId(serviceId);
      if (response.status === 200 || response.status === 201) {
        const subServicesData: SubService[] = response?.data?.data || [];
        setSubServices(subServicesData);
      } else {
        toast.error("Failed to load sub-services");
        setSubServices([]);
      }
    } catch (error) {
      console.error("Error fetching sub-services:", error);
      toast.error("Error loading sub-services");
      setSubServices([]);
    } finally {
      setIsLoadingSubServices(false);
    }
  };

  const handleServiceChange = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setSelectedSubServiceId("");
  };

  const handleSubServiceChange = (subServiceId: string) => {
    setSelectedSubServiceId(subServiceId);

    if (selectedServiceId && subServiceId) {
      const selectedService = services.find((s) => s._id === selectedServiceId);
      const selectedSubService = subServices.find(
        (s) => s._id === subServiceId,
      );

      if (selectedService && selectedSubService) {
        const serviceItem: SelectedServiceItem = {
          serviceId: selectedServiceId,
          serviceName: selectedService.title,
          subServiceId: subServiceId,
          subServiceName: selectedSubService.title,
          displayText: `${selectedService.title} - ${selectedSubService.title}`,
        };

        const exists = selectedServices.some(
          (item) =>
            item.serviceId === serviceItem.serviceId &&
            item.subServiceId === serviceItem.subServiceId,
        );

        if (!exists) {
          setSelectedServices([...selectedServices, serviceItem]);
        }
      }
    }
  };

  const removeServiceChip = (indexToRemove: number) => {
    setSelectedServices(
      selectedServices.filter((_, index) => index !== indexToRemove),
    );
  };

  const validateForm = (): boolean => {
    if (!fullname.trim() || fullname.trim().length < 3) {
      toast.error("Full name must be at least 3 characters");
      return false;
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (!termsAccepted) {
      toast.error("Please accept the Terms and Conditions");
      return false;
    }

    return true;
  };

  const buildPayload = (): ProposalPayload => {
    const payload: ProposalPayload = {
      fullname: fullname.trim(),
      email: email.trim(),
      password: password.trim(), // ✅ ADD THIS
    };

    if (selectedServices.length > 0) {
      payload.services = [
        ...new Set(selectedServices.map((item) => item.serviceId)),
      ];
      payload.subServices = selectedServices.map((item) => item.subServiceId);
    }

    // payload.budget = budget ? budget.toString() : null;
    // payload.messages = message.trim() || null;

    // return payload;

    payload.budget = manualBudget
      ? manualBudget
      : budget
        ? budget.toString()
        : null;
    payload.messages = message.trim() || null;

    // ✅ NAYA ADD KARO
    payload.nationalId = nationalId.trim() || null;
    payload.document = document || null;

    return payload;
  };

  const resetForm = () => {
    setFullname("");
    setEmail("");
    setPassword("");
    setBudget(1000);
    setMessage("");
    setSelectedServiceId("");
    setSelectedSubServiceId("");
    setSelectedServices([]);
    setSubServices([]);
    setTermsAccepted(false);
    // ✅ NAYA ADD KARO
    setNationalId("");
    setDocument(null);
    setManualBudget("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (!validateForm()) return;
    if (!password.trim() || password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    setIsSubmitting(true);

    try {
      const payload = buildPayload();
      const response = await createProposal(payload);

      if (response.status === 200 || response.status === 201) {
        toast.success("Proposal submitted successfully!");
        resetForm();
      } else {
        toast.error(response.data?.message || "Failed to submit proposal");
      }
    } catch (error: unknown) {
      console.error("Submission error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred while submitting";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-auto mt-26 sm:mt-16 md:mt-20 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[700px] border border-[#454545] p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 space-y-4 sm:space-y-6 md:space-y-8 rounded-lg"
      >
        {/* <div className="flex flex-col sm:flex-row gap-4 sm:gap-6"> */}
        <div className="flex-1 bg-[#232323] rounded-lg p-4 sm:p-5 md:p-6">
          <label className="block text-white text-base sm:text-lg mb-2">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Type here"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
            minLength={3}
            maxLength={120}
            className="w-full bg-transparent border-none outline-none text-white placeholder-gray-500 text-sm sm:text-base"
          />
        </div>

        <div className="flex-1 bg-[#232323] rounded-lg p-4 sm:p-5 md:p-6">
          <label className="block text-white text-base sm:text-lg mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="Type here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-transparent border-none outline-none text-white placeholder-gray-500 text-sm sm:text-base"
          />
        </div>
        {/* </div> */}

        {/* PASSWORD */}
        <div className="bg-[#232323] rounded-lg p-4 sm:p-5 md:p-6">
          <label className="block text-white text-base sm:text-lg mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full bg-transparent border-none outline-none text-white placeholder-gray-500 text-sm sm:text-base"
          />
        </div>

        {/* ✅ NATIONAL ID — Full Name/Email block ke baad */}
        <div className="bg-[#232323] rounded-lg p-4 sm:p-5 md:p-6">
          <label className="block text-white text-base sm:text-lg mb-2">
            National ID Number
          </label>
          <input
            type="text"
            placeholder="Type here"
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
            maxLength={20}
            className="w-full bg-transparent border-none outline-none text-white placeholder-gray-500 text-sm sm:text-base"
          />
        </div>

        <div className="bg-[#232323] rounded-lg p-4 sm:p-5 md:p-6">
          <label className="block text-white text-base sm:text-lg mb-3 sm:mb-4">
            Select Services
          </label>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative w-full">
                <select
                  value={selectedServiceId}
                  onChange={(e) => handleServiceChange(e.target.value)}
                  disabled={isLoadingServices}
                  className="w-full bg-[#1a1a1a] border border-gray-600 rounded-lg px-4 py-3 text-white text-sm sm:text-base outline-none focus:border-lime-400 transition-all duration-300 appearance-none pr-10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">
                    {isLoadingServices ? "Loading..." : "Choose service..."}
                  </option>
                  {services.map((service) => (
                    <option
                      key={service._id}
                      value={service._id}
                      className="bg-[#1a1a1a] text-white"
                    >
                      {service.title}
                    </option>
                  ))}
                </select>
                <span className="absolute inset-y-0 right-3 text-xs flex items-center pointer-events-none text-white">
                  ▼
                </span>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative w-full">
                <select
                  value={selectedSubServiceId}
                  onChange={(e) => handleSubServiceChange(e.target.value)}
                  disabled={!selectedServiceId || isLoadingSubServices}
                  className="w-full bg-[#1a1a1a] border border-gray-600 rounded-lg px-4 py-3 text-white text-sm sm:text-base outline-none focus:border-lime-400 transition-all duration-300 appearance-none pr-10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">
                    {isLoadingSubServices
                      ? "Loading..."
                      : !selectedServiceId
                        ? "Select service first..."
                        : "Choose sub-service..."}
                  </option>
                  {subServices.map((subService) => (
                    <option
                      key={subService._id}
                      value={subService._id}
                      className="bg-[#1a1a1a] text-white"
                    >
                      {subService.title}
                    </option>
                  ))}
                </select>
                <span className="absolute inset-y-0 right-3 text-xs flex items-center pointer-events-none text-white">
                  ▼
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ UPLOAD DOCUMENT — Select Services ke baad */}
        <div className="bg-[#232323] rounded-lg p-4 sm:p-5 md:p-6">
          <label className="block text-white text-base sm:text-lg mb-2">
            Upload Document
          </label>
          <span className="block text-gray-400 mb-4 text-xs sm:text-sm">
            Upload your requirements document (PDF, DOC, DOCX)
          </span>
          <label className="cursor-pointer inline-flex items-center gap-2 border border-gray-600 rounded-lg px-4 py-2 text-white text-sm hover:border-lime-400 transition-all duration-300">
            <span>📎</span>
            <span>{document ? document.name : "Upload Document"}</span>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => setDocument(e.target.files?.[0] || null)}
            />
          </label>
          {document && (
            <button
              type="button"
              onClick={() => setDocument(null)}
              className="ml-3 text-red-400 text-sm hover:text-red-300"
            >
              ✕ Remove
            </button>
          )}
        </div>

        {selectedServices.length > 0 && (
          <div className="bg-[#232323] rounded-lg p-4 sm:p-5 md:p-6">
            <label className="block text-white text-base sm:text-lg mb-3 sm:mb-4">
              Selected Services
            </label>
            <div className="flex flex-wrap gap-2">
              {selectedServices.map((serviceItem, index) => (
                <div
                  key={index}
                  className="bg-lime-400 text-black px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  <span>{serviceItem.displayText}</span>
                  <button
                    type="button"
                    onClick={() => removeServiceChip(index)}
                    className="text-black hover:text-red-600 font-bold text-lg leading-none"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-[#232323] rounded-lg p-4 sm:p-5 md:p-6">
          <label className="block text-white text-base sm:text-lg mb-2">
            Your Budget
          </label>
          <span className="block text-gray-400 mb-4 sm:mb-6 text-xs sm:text-sm">
            Slide to indicate your budget range
          </span>
          <div className="flex items-center justify-between gap-2">
            <span className="text-white text-xs sm:text-sm md:text-base whitespace-nowrap">
              $500
            </span>
            <div className="flex-1 mx-2 sm:mx-4">
              <input
                type="range"
                min={500}
                max={50000}
                value={budget}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setBudget(Number(e.target.value))
                }
                className="w-full accent-lime-400 cursor-pointer"
                style={{
                  height: "6px",
                  background: `linear-gradient(to right, #bfff00 0%, #bfff00 ${
                    ((budget - 500) / (50000 - 500)) * 100
                  }%, #4a4a4a ${
                    ((budget - 500) / (50000 - 500)) * 100
                  }%, #4a4a4a 100%)`,
                }}
              />
              <div className="text-center mt-2 text-lime-400 font-semibold text-sm sm:text-base">
                ${budget.toLocaleString()}
              </div>
            </div>
            <span className="text-white text-xs sm:text-sm md:text-base whitespace-nowrap">
              $50,000
            </span>
          </div>

          {/* ✅ MANUAL BUDGET INPUT — slider ke bilkul neeche */}
          <div className="mt-4">
            <label className="block text-gray-400 text-xs sm:text-sm mb-2">
              Or enter manually
            </label>
            <div className="flex items-center gap-2 bg-[#1a1a1a] border border-gray-600 rounded-lg px-4 py-2 focus-within:border-lime-400 transition-all duration-300">
              <span className="text-gray-400 text-sm">$</span>
              <input
                type="number"
                placeholder="Enter your budget"
                value={manualBudget}
                min={0}
                onChange={(e) => {
                  setManualBudget(e.target.value);
                  if (e.target.value) setBudget(Number(e.target.value));
                }}
                className="w-full bg-transparent border-none outline-none text-white placeholder-gray-500 text-sm sm:text-base"
              />
            </div>
          </div>
        </div>

        <div className="bg-[#232323] rounded-lg p-4 sm:p-5 md:p-6">
          <label className="block text-white text-base sm:text-lg mb-2">
            Your Message
          </label>
          <textarea
            placeholder="Type here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-white placeholder-gray-500 resize-none h-20 sm:h-24 md:h-28 text-sm sm:text-base"
          />
        </div>

        <label className="flex gap-3 items-start text-sm text-[#9aa3ad] mb-4">
          <input
            type="checkbox"
            name="termsAccepted"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            required
            className="mt-1 h-4 w-4 accent-[#9EFF00]"
          />
          <span>
            I accept the{" "}
            <button
              type="button"
              onClick={() => setIsTermsModalOpen(true)}
              className="text-[#9EFF00] hover:text-[#9EFF00]/80 underline font-semibold"
            >
              Terms and Conditions
            </button>
          </span>
        </label>

        <TermsModal
          isOpen={isTermsModalOpen}
          onClose={() => setIsTermsModalOpen(false)}
        />

        <div className="flex justify-center pt-2 sm:pt-4">
          <button
            type="submit"
            disabled={isSubmitting || !termsAccepted}
            className="relative block mx-auto w-full sm:w-auto overflow-hidden rounded-2xl border border-gray-500 bg-transparent text-xl sm:text-2xl text-white cursor-pointer transition-colors duration-300 hover:text-black hover:border-[#9eff00] focus:text-black focus:border-[#9eff00] active:text-black active:border-[#9eff00] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9eff00] focus-visible:ring-offset-2 focus-visible:ring-offset-black before:absolute before:inset-y-0 before:left-0 before:w-0 before:bg-[#9eff00] before:content-[''] before:transition-all before:duration-300 before:ease-out hover:before:w-full focus:before:w-full active:before:w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="relative z-10 px-8 sm:px-12 md:px-16 py-2">
              {isSubmitting ? "Submitting..." : "Submit"}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
