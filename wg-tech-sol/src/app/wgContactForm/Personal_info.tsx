"use client"
import React, { useState } from 'react'
import { ValidationErrors } from './validation'
import PhoneNo from './PhoneNo'

interface PersonalInfoProps {
  validationErrors?: ValidationErrors;
  onInputChange?: (fieldName: string) => void;
}

function Personal_info({ validationErrors = {}, onInputChange }: PersonalInfoProps) {
  const [idType, setIdType] = useState<'none' | 'govt_id' | 'passport'>('none')

  return (
    <section className="mb-10">
      <div className="bg-[#1f2430] text-white text-center font-bold py-2 rounded-md mb-4">
        PERSONAL INFORMATION
      </div>

      {/* Name */}
      <div className="grid grid-cols-1 md:grid-cols-12 items-start gap-3 mb-3">
        <label className="text-[#cfd6df] font-semibold pt-1.5 md:col-span-3">
          Name :
        </label>
        <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="w-full">
            <input
              id="firstName"
              name="firstName"
              required
              onChange={() => onInputChange?.('firstName')}
              className={`w-full h-10 rounded-md px-3 bg-[#0f1115] text-[#e9ecf1] border placeholder-[#9aa3ad] focus:outline-none focus:ring-1 ${
                validationErrors.firstName
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-[#323845] focus:ring-[#9EFF00]'
              }`}
              placeholder="First Name"
              autoComplete="given-name"
            />
            {validationErrors.firstName && (
              <p className="mt-1.5 text-xs text-red-400 font-medium">{validationErrors.firstName}</p>
            )}
          </div>
          <div className="w-full">
            <input
              id="lastName"
              name="lastName"
              required
              onChange={() => onInputChange?.('lastName')}
              className={`w-full h-10 rounded-md px-3 bg-[#0f1115] text-[#e9ecf1] border placeholder-[#9aa3ad] focus:outline-none focus:ring-1 ${
                validationErrors.lastName
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-[#323845] focus:ring-[#9EFF00]'
              }`}
              placeholder="Last Name"
              autoComplete="family-name"
            />
            {validationErrors.lastName && (
              <p className="mt-1.5 text-xs text-red-400 font-medium">{validationErrors.lastName}</p>
            )}
          </div>
        </div>
      </div>

      {/* Email */}
      <div className="grid grid-cols-1 md:grid-cols-12 items-start gap-3 mb-3">
        <label className="text-[#cfd6df] font-semibold pt-1.5 md:col-span-3" htmlFor="email">
          Email :
        </label>
        <div className="md:col-span-9">
          <input
            id="email"
            name="email"
            type="email"
            required
            onChange={() => onInputChange?.('email')}
            className={`w-full h-10 rounded-md px-3 bg-[#0f1115] text-[#e9ecf1] border placeholder-[#9aa3ad] focus:outline-none focus:ring-1 ${
              validationErrors.email
                ? 'border-red-500 focus:ring-red-500'
                : 'border-[#323845] focus:ring-[#9EFF00]'
            }`}
            placeholder="Email Address"
            autoComplete="email"
          />
          {validationErrors.email && (
            <p className="mt-1.5 text-xs text-red-400 font-medium">{validationErrors.email}</p>
          )}
        </div>
      </div>

      {/* ID Type */}
      <div className="grid grid-cols-1 md:grid-cols-12 items-start gap-3 mb-3">
        <label className="text-[#cfd6df] font-semibold md:col-span-3 pt-2">
          ID Type :
        </label>

        <div className="md:col-span-9">
          <div className="flex gap-4 mb-3">
            <label className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="idType"
                value="govt_id"
                checked={idType === 'govt_id'}
                onChange={() => {
                  setIdType('govt_id');
                  onInputChange?.('idType');
                }}
                className="sr-only "
                required
              />
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 ${idType === 'govt_id'
                    ? 'border-[#9EFF00] bg-[#9EFF00]/10 text-[#9EFF00]'
                    : 'border-[#323845] bg-[#0f1115] text-[#9aa3ad] hover:border-[#4a5568]'
                  }`}
              >
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${idType === 'govt_id' ? 'border-[#9EFF00]' : 'border-[#6b7280]'
                    }`}
                >
                  {idType === 'govt_id' && (
                    <div className="w-2 h-2 rounded-full bg-[#9EFF00]" />
                  )}
                </div>
                <span className="text-sm font-medium">Govt ID</span>
              </div>
            </label>

            <label className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="idType"
                value="passport"
                checked={idType === 'passport'}
                onChange={() => {
                  setIdType('passport');
                  onInputChange?.('idType');
                }}
                className="sr-only"
                required
              />
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 ${idType === 'passport'
                    ? 'border-[#9EFF00] bg-[#9EFF00]/10 text-[#9EFF00]'
                    : 'border-[#323845] bg-[#0f1115] text-[#9aa3ad] hover:border-[#4a5568]'
                  }`}
              >
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${idType === 'passport' ? 'border-[#9EFF00]' : 'border-[#6b7280]'
                    }`}
                >
                  {idType === 'passport' && (
                    <div className="w-2 h-2 rounded-full bg-[#9EFF00]" />
                  )}
                </div>
                <span className="text-sm font-medium">Passport</span>
              </div>
            </label>
          </div>

          {idType !== 'none' && (
            <div className="space-y-3 transition-all duration-500 opacity-100 translate-y-0">
              <div>
                <input
                  id={idType === 'govt_id' ? 'cnic' : 'passport'}
                  name="idNumber"
                  required
                  onChange={() => onInputChange?.('idNumber')}
                  className={`w-full h-10 rounded-md px-3 bg-[#0f1115] text-[#e9ecf1] border placeholder-[#9aa3ad] focus:outline-none focus:ring-1 transition-all duration-300 ${
                    validationErrors.idNumber
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-[#323845] focus:ring-[#9EFF00]'
                  }`}
                  placeholder={idType === 'govt_id' ? 'CNIC Number' : 'Passport Number'}
                  inputMode={idType === 'govt_id' ? 'numeric' : 'text'}
                />
                {validationErrors.idNumber && (
                  <p className="mt-1.5 text-xs text-red-400 font-medium">{validationErrors.idNumber}</p>
                )}
              </div>

              <div>
                <label htmlFor="dateOfBirth" className="text-[#cfd6df] text-sm font-medium mb-2 block">
                  Date of Birth :
                </label>
                <input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  onChange={() => onInputChange?.('dateOfBirth')}
                  onClick={(e) => {
                    // Ensure calendar opens on click
                    (e.target as HTMLInputElement).showPicker?.();
                  }}
                  className={`w-full h-10 rounded-md px-3 pr-10 bg-[#0f1115] text-[#e9ecf1] border placeholder-[#9aa3ad] focus:outline-none focus:ring-1 transition-all duration-300 cursor-pointer ${
                    validationErrors.dateOfBirth
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-[#323845] focus:ring-[#9EFF00]'
                  }`}
                  max={new Date().toISOString().split('T')[0]}
                />
                {validationErrors.dateOfBirth && (
                  <p className="mt-1.5 text-xs text-red-400 font-medium">{validationErrors.dateOfBirth}</p>
                )}
              </div>
            </div>
          )}

          {idType === 'none' && (
            <div>
              {validationErrors.idType ? (
                <p className="text-xs text-red-400 mt-1.5 font-medium">{validationErrors.idType}</p>
              ) : (
                <p className="text-xs text-[#fff] mt-1">
                  Please select an ID type to continue
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Address */}
      <div className="grid grid-cols-1 md:grid-cols-12 items-start gap-3 mb-3">
        <label className="text-[#cfd6df] font-semibold pt-1.5 md:col-span-3" htmlFor="street">
          Address :
        </label>
        <div className="md:col-span-9">
          <input
            id="street"
            name="streetName"
            onChange={() => onInputChange?.('streetName')}
            className={`w-full h-10 rounded-md px-3 bg-[#0f1115] text-[#e9ecf1] border placeholder-[#9aa3ad] focus:outline-none focus:ring-1 ${
              validationErrors.streetName
                ? 'border-red-500 focus:ring-red-500'
                : 'border-[#323845] focus:ring-[#9EFF00]'
            }`}
            placeholder="Street Name"
            autoComplete="address-line1"
          />
          {validationErrors.streetName && (
            <p className="mt-1.5 text-xs text-red-400 font-medium">{validationErrors.streetName}</p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
            <div>
              <input
                name="city"
                onChange={() => onInputChange?.('city')}
                className={`w-full h-10 rounded-md px-3 bg-[#0f1115] text-[#e9ecf1] border placeholder-[#9aa3ad] focus:outline-none focus:ring-1 ${
                  validationErrors.city
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-[#323845] focus:ring-[#9EFF00]'
                }`}
                placeholder="City"
                autoComplete="address-level2"
              />
              {validationErrors.city && (
                <p className="mt-1.5 text-xs text-red-400 font-medium">{validationErrors.city}</p>
              )}
            </div>
            <div>
              <input
                name="postalCode"
                onChange={() => onInputChange?.('postalCode')}
                className={`w-full h-10 rounded-md px-3 bg-[#0f1115] text-[#e9ecf1] border placeholder-[#9aa3ad] focus:outline-none focus:ring-1 ${
                  validationErrors.postalCode
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-[#323845] focus:ring-[#9EFF00]'
                }`}
                placeholder="Postal Code"
                autoComplete="postal-code"
                inputMode="numeric"
              />
              {validationErrors.postalCode && (
                <p className="mt-1.5 text-xs text-red-400 font-medium">{validationErrors.postalCode}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <PhoneNo validationErrors={validationErrors} onInputChange={onInputChange} />
    </section>
  )
}

export default Personal_info