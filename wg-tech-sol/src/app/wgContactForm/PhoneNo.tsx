"use client"
import React, { useState, forwardRef, useMemo } from 'react'
import PhoneInput, {
  isValidPhoneNumber,
  type Country,
  getCountries,
  getCountryCallingCode,
} from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import en from 'react-phone-number-input/locale/en.json'
import { parsePhoneNumberFromString } from 'libphonenumber-js'

// Keep your dropdown black (scoped to this component render)
const customStyles = `
  /* Base dropdown look */
  .PhoneInputCountrySelect {
    background-color: #000000 !important;
    color: #e9ecf1 !important;
    outline: none !important;
  }

  /* Focus (click/tap) ring -> brand */
  .PhoneInputCountrySelect:focus,
  .PhoneInputCountrySelect:focus-visible {
    outline: none !important;
    border-color: #9EFF00 !important;
    box-shadow: 0 0 0 2px rgba(158, 255, 0, 0.35) !important;
  }

  /* Globe & arrow: no hover color, only on focus/click */
  .PhoneInputCountry:hover .PhoneInputCountryIcon--international,
  .PhoneInputCountry:hover .PhoneInputInternationalIconGlobe,
  .PhoneInputCountry:hover .PhoneInputInternationalIconPhone,
  .PhoneInputCountry:hover .PhoneInputCountrySelectArrow {
    color: inherit !important;
  }
  .PhoneInputCountry:focus-within .PhoneInputCountryIcon--international,
  .PhoneInputCountry:focus-within .PhoneInputInternationalIconGlobe,
  .PhoneInputCountry:focus-within .PhoneInputInternationalIconPhone,
  .PhoneInputCountry:focus-within .PhoneInputCountrySelectArrow {
    color: #9EFF00 !important;
  }

  /* Options list: replace blue highlight with brand */
  .PhoneInputCountrySelect option:hover,
  .PhoneInputCountrySelect option:focus,
  .PhoneInputCountrySelect option:active {
    background-color: #9EFF00 !important;
    color: #0f1115 !important;
  }
  .PhoneInputCountrySelect option:checked {
    background-color: #9EFF00 !important;
    color: #0f1115 !important;
  }

  /* Text selection inside inputs/selects -> brand (replaces blue) */
  #home-phone::selection,
  #mobile-phone::selection,
  .PhoneInputCountrySelect::selection,
  .PhoneInputCountrySelect option::selection {
    background: #9EFF00 !important;
    color: #0f1115 !important;
  }

  /* Mobile tap highlight color (iOS/Android) */
  .PhoneInputCountry,
  .PhoneInputCountrySelect {
    -webkit-tap-highlight-color: rgba(158, 255, 0, 0.25);
  }

  /* Scrollbar (dark) */
  .PhoneInputCountrySelect::-webkit-scrollbar { width: 8px; }
  .PhoneInputCountrySelect::-webkit-scrollbar-track { background: #1a1a1a; }
  .PhoneInputCountrySelect::-webkit-scrollbar-thumb { background: #4a4a4a; border-radius: 4px; }
`

// Stable custom input (prevents focus loss)
const TailwindPhoneInputField = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => {
    const { className = "", ...rest } = props
    return (
      <input
        ref={ref}
        {...rest}
        className={[
          "h-10 flex-1 bg-transparent text-[#e9ecf1] placeholder:text-[#9aa3ad]",
          "outline-none border-0 focus:ring-0",
          "caret-[#9EFF00] selection:bg-[#9EFF00] selection:text-[#0f1115]",
          className,
        ].join(" ")}
      />
    )
  }
)
TailwindPhoneInputField.displayName = "TailwindPhoneInputField"

// Detect country from +international number
const detectCountryFromPlus = (value?: string): Country | undefined => {
  if (!value || value[0] !== '+') return undefined
  try {
    const parsed = parsePhoneNumberFromString(value)
    return parsed?.country as Country | undefined
  } catch { return undefined }
}

import { ValidationErrors } from './validation'

interface PhoneNoProps {
  validationErrors?: ValidationErrors;
  onInputChange?: (field: string) => void;
}

function PhoneNo({ validationErrors = {}, onInputChange }: PhoneNoProps) {
  // Values
  const [homePhone, setHomePhone] = useState<string | undefined>()
  const [mobilePhone, setMobilePhone] = useState<string | undefined>()

  // Selected countries (controlled)
  const [homeCountry, setHomeCountry] = useState<Country>('PK')
  const [mobileCountry, setMobileCountry] = useState<Country>('PK')

  // Whether user manually picked a country (don't override on national input)
  // const [homeManual, setHomeManual] = useState(false)
  // const [mobileManual, setMobileManual] = useState(false)

  // Validations
  const homeInvalid = !!homePhone && !isValidPhoneNumber(homePhone)
  const mobileInvalid = !!mobilePhone && !isValidPhoneNumber(mobilePhone)

  // Build labels with country name and code
  const labels = useMemo(() => {
    const base = en as Record<string, string>
    const l: Record<string, string> = {}
    
    // Get all countries and create custom labels
    ;(getCountries() as Country[]).forEach((country) => {
      const countryName = base[country] || country
      const callingCode = getCountryCallingCode(country)
      // Format: "Pakistan +92" or "United States +1"
      l[country] = `${countryName} +${callingCode}`
    })
    
    // Keep the International option if it exists
    if (base.ZZ) {
      l.ZZ = base.ZZ
    }
    
    return l
  }, [])

  // Home handlers
  const onHomeChange = (val?: string) => {
    setHomePhone(val)
    if (onInputChange) onInputChange('phoneNumber')

    if (!val) {
      // setHomeManual(false)
      setHomeCountry('PK')
      return
    }

    const auto = detectCountryFromPlus(val)
    if (auto && auto !== homeCountry) {
      setHomeCountry(auto)
    }
  }

  const onHomeCountryChange = (country?: Country) => {
    if (country) {
      setHomeCountry(country)
      // setHomeManual(true)
    }
  }

  // Mobile handlers
  const onMobileChange = (val?: string) => {
    setMobilePhone(val)
    if (onInputChange) onInputChange('landlineNumber')

    if (!val) {
      // setMobileManual(false)
      setMobileCountry('PK')
      return
    }

    const auto = detectCountryFromPlus(val)
    if (auto && auto !== mobileCountry) {
      setMobileCountry(auto)
    }
  }

  // Update hidden inputs when values change
  React.useEffect(() => {
    const phoneInput = document.querySelector('input[name="phoneNumber"]') as HTMLInputElement;
    const landlineInput = document.querySelector('input[name="landlineNumber"]') as HTMLInputElement;
    
    if (phoneInput) phoneInput.value = homePhone || "";
    if (landlineInput) landlineInput.value = mobilePhone || "";
  }, [homePhone, mobilePhone])

  const onMobileCountryChange = (country?: Country) => {
    if (country) {
      setMobileCountry(country)
      // setMobileManual(true)
    }
  }

  return (
<>
  <style jsx global>{customStyles}</style>

  {/* Hidden inputs for form data */}
  <input type="hidden" name="phoneNumber" value={homePhone || ""} />
  <input type="hidden" name="landlineNumber" value={mobilePhone || ""} />

  <div className="grid grid-cols-1 md:grid-cols-12 items-start gap-3">
    <div className="text-[#cfd6df] font-semibold pt-1.5 md:col-span-3">Phone :</div>

    <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-2">
      {/* Home Phone */}
      <div>
        <label htmlFor="home-phone" className="block text-[#cfd6df] text-sm font-medium mb-1.5">
          Phone Number
        </label>

        <div
          className={[
            "flex items-center gap-2 rounded-md px-2 transition-colors",
            "bg-[#0f1115] border",
            homeInvalid || validationErrors.phoneNumber
              ? "border-red-500 ring-2 ring-red-500/20"
              : "border-[#323845] focus-within:ring-2 focus-within:ring-[#9EFF00]/40 focus-within:border-[#9EFF00]",
          ].join(" ")}
        >
          <PhoneInput
            id="home-phone"
            country={homeCountry}
            international
            placeholder="Phone Number"
            value={homePhone}
            onChange={onHomeChange}
            onCountryChange={onHomeCountryChange}
            countryCallingCodeEditable={true}
            className="flex items-center gap-2 w-full"
            countrySelectProps={{
              className:
                "h-10 bg-black text-[#e9ecf1] border-0 outline-none cursor-pointer pr-1 focus:ring-1 focus:ring-[#9EFF00]",
            }}
            inputComponent={TailwindPhoneInputField}
            labels={labels}
          />
        </div>

        {(homeInvalid || validationErrors.phoneNumber) && (
          <p className="mt-1 text-xs text-red-400 font-medium">
            {validationErrors.phoneNumber || "Enter a valid phone number"}
          </p>
        )}
      </div>

      {/* Mobile Phone */}
      <div>
        <label htmlFor="mobile-phone" className="block text-[#cfd6df] text-sm font-medium mb-1.5">
          Landline Number
        </label>

        <div
          className={[
            "flex items-center gap-2 rounded-md px-2 transition-colors",
            "bg-[#0f1115] border",
            mobileInvalid || validationErrors.landlineNumber
              ? "border-red-500 ring-2 ring-red-500/20"
              : "border-[#323845] focus-within:ring-2 focus-within:ring-[#9EFF00]/40 focus-within:border-[#9EFF00]",
          ].join(" ")}
        >
          <PhoneInput
            id="mobile-phone"
            country={mobileCountry}
            international
            placeholder="Landline"
            value={mobilePhone}
            onChange={onMobileChange}
            onCountryChange={onMobileCountryChange}
            countryCallingCodeEditable={true}
            className="flex items-center gap-2 w-full"
            countrySelectProps={{
              className:
                "h-10 bg-black text-[#e9ecf1] border-0 outline-none cursor-pointer pr-1 focus:ring-1 focus:ring-[#9EFF00]",
            }}
            inputComponent={TailwindPhoneInputField}
            labels={labels}
          />
        </div>

        {(mobileInvalid || validationErrors.landlineNumber) && (
          <p className="mt-1 text-xs text-red-400 font-medium">
            {validationErrors.landlineNumber || "Enter a valid phone number"}
          </p>
        )}
      </div>
    </div>
  </div>
</>
  )
}

export default PhoneNo