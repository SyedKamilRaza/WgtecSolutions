"use client";
import { useState, FormEvent, useRef, useCallback } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import Personal_info from "./Personal_info";
import Education from "./Education";
import Skills from "./Skills";
import { CreateApplicationPayload } from "./types";
import { createApplication } from "@/api/module/applicationForm";
import { validateForm, hasValidationErrors, ValidationErrors } from "./validation";

export default function Page() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const formRef = useRef<HTMLFormElement>(null);

  const handleInputChange = useCallback((fieldName: string) => {
    setValidationErrors((prev) => {
      if (!prev[fieldName]) return prev;
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    // Validate form
    const errors = validateForm(formData);
    setValidationErrors(errors);

    if (hasValidationErrors(errors)) {
      // Scroll to first error
      const firstErrorField = Object.keys(errors)[0];
      const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
        (errorElement as HTMLElement).focus();
      }
      return;
    }

    setIsSubmitting(true);

    try {
      // Get form values
      const firstName = (formData.get("firstName") as string)?.trim() || "";
      const lastName = (formData.get("lastName") as string)?.trim() || "";
      const email = (formData.get("email") as string)?.trim() || "";
      const idType = formData.get("idType") as "govt_id" | "passport";
      const idNumber = (formData.get("idNumber") as string)?.trim() || "";
      const dateOfBirth = (formData.get("dateOfBirth") as string)?.trim();
      const streetName = (formData.get("streetName") as string)?.trim() || "";
      const city = (formData.get("city") as string)?.trim() || "";
      const postalCode = (formData.get("postalCode") as string)?.trim() || "";
      const phoneNumber = (formData.get("phoneNumber") as string)?.trim() || "";
      const landlineNumber = (formData.get("landlineNumber") as string)?.trim() || "";
      const highSchoolName = (formData.get("highSchoolName") as string)?.trim() || "";
      const highSchoolCity = (formData.get("highSchoolCity") as string)?.trim() || "";
      const universityName = (formData.get("universityName") as string)?.trim() || "";
      const universityCity = (formData.get("universityCity") as string)?.trim() || "";
      const certification = formData.get("certification") === "on";

      // Get skills
      const skillsJson = formData.get("skills") as string;
      const skills = skillsJson ? JSON.parse(skillsJson) : [];

      // Get uploaded URLs (files are already uploaded when selected)
      const cvResumeUrl = (formData.get("cvResumeUrl") as string)?.trim();
      const pictureUrl = (formData.get("pictureUrl") as string)?.trim();

      // Build payload
      const payload: CreateApplicationPayload = {
        firstName,
        lastName,
        email,
        idType,
        idNumber,
        dateOfBirth: dateOfBirth,
        address: {
          streetName: streetName,
          city: city,
          postalCode: postalCode,
        },
        phone: {
          phoneNumber: phoneNumber,
          landlineNumber: landlineNumber,
        },
        education: {
          highSchool: {
            name: highSchoolName,
            city: highSchoolCity,
          },
          university: {
            name: universityName,
            city: universityCity,
          },
        },
        skills: skills.length > 0 ? skills : undefined,
        cvResume: cvResumeUrl,
        picture: pictureUrl,
        certification,
      };

      // Submit application
      const response = await createApplication(payload);

      if (response.status === 200 || response.status === 201) {
        toast.success("Application submitted successfully!");

        // Reset form
        if (formRef.current) {
          formRef.current.reset();
        }
        setValidationErrors({});

        // Reset file inputs
        const cvInput = document.getElementById("cv-upload") as HTMLInputElement;
        const pictureInput = document.getElementById("picture-upload") as HTMLInputElement;
        if (cvInput) cvInput.value = "";
        if (pictureInput) pictureInput.value = "";

        // Scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        toast.error(response.data?.message || "Failed to submit application");
      }
    } catch (error: unknown) {
      console.error("Submission error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred while submitting";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="min-h-auto py-8 sm:py-10 px-4 sm:px-6 flex justify-center items-start print:p-0"
    >
      <div
        className="
          w-full max-w-3xl lg:max-w-4xl
          bg-[#121418] rounded-xl shadow-2xl
          px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8
          print:w-[210mm] print:min-h-[297mm] print:px-[20mm] print:py-[20mm]
          print:shadow-none print:border-0 print:rounded-none
        "
      >
        <header className="text-center mt-10 mb-4 sm:mb-6">
          <Image
            src="/images/WGTS.png"
            alt="WGTS Logo"
            width={250}
            height={80}
            className="mx-auto"
            priority
          />
          <div className="text-xs text-[#9aa3ad] mt-1">Innovate. Elevate. Transform</div>
        </header>

        <Personal_info
          validationErrors={validationErrors}
          onInputChange={handleInputChange}
        />

        <Education validationErrors={validationErrors} onInputChange={handleInputChange} />

        <Skills isSubmitting={isSubmitting} validationErrors={validationErrors} onInputChange={handleInputChange} />
      </div>
    </form>
  );
}
