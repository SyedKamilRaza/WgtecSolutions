import React from 'react'
import { ValidationErrors } from './validation';

interface EducationProps {
    validationErrors?: ValidationErrors;
    onInputChange?: (fieldName: string) => void;
}

function Education({ validationErrors = {}, onInputChange }: EducationProps) {
    return (
        <section className="mb-10">
            <div className="bg-[#1f2430] text-white text-center font-bold py-2 rounded-md mb-4">
                EDUCATION
            </div>

            {/* High School */}
            <div className="grid grid-cols-1 md:grid-cols-12 items-start gap-3 mb-3">
                <div className="text-[#cfd6df] font-semibold pt-1.5 md:col-span-3">High School :</div>
                <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                        <input
                            name="highSchoolName"
                            className={`w-full h-10 rounded-md px-3 bg-[#0f1115] text-[#e9ecf1] border ${
                                validationErrors.highSchoolName 
                                    ? 'border-red-400' 
                                    : 'border-[#323845]'
                            } placeholder-[#9aa3ad] focus:outline-none focus:ring-1 focus:ring-[#9EFF00]`}
                            placeholder="Name"
                            onChange={() => onInputChange?.('highSchoolName')}
                        />
                        {validationErrors.highSchoolName && (
                            <p className="mt-1 text-xs text-red-400 font-medium">{validationErrors.highSchoolName}</p>
                        )}
                    </div>
                    <div>
                        <input
                            name="highSchoolCity"
                            className={`w-full h-10 rounded-md px-3 bg-[#0f1115] text-[#e9ecf1] border ${
                                validationErrors.highSchoolCity 
                                    ? 'border-red-400' 
                                    : 'border-[#323845]'
                            } placeholder-[#9aa3ad] focus:outline-none focus:ring-1 focus:ring-[#9EFF00]`}
                            placeholder="City"
                            onChange={() => onInputChange?.('highSchoolCity')}
                        />
                        {validationErrors.highSchoolCity && (
                            <p className="mt-1 text-xs text-red-400 font-medium">{validationErrors.highSchoolCity}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* University */}
            <div className="grid grid-cols-1 md:grid-cols-12 items-start gap-3">
                <div className="text-[#cfd6df] font-semibold pt-1.5 md:col-span-3">University :</div>
                <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                        <input
                            name="universityName"
                            className={`w-full h-10 rounded-md px-3 bg-[#0f1115] text-[#e9ecf1] border ${
                                validationErrors.universityName 
                                    ? 'border-red-400' 
                                    : 'border-[#323845]'
                            } placeholder-[#9aa3ad] focus:outline-none focus:ring-1 focus:ring-[#9EFF00]`}
                            placeholder="Name"
                            onChange={() => onInputChange?.('universityName')}
                        />
                        {validationErrors.universityName && (
                            <p className="mt-1 text-xs text-red-400 font-medium">{validationErrors.universityName}</p>
                        )}
                    </div>
                    <div>
                        <input
                            name="universityCity"
                            className={`w-full h-10 rounded-md px-3 bg-[#0f1115] text-[#e9ecf1] border ${
                                validationErrors.universityCity 
                                    ? 'border-red-400' 
                                    : 'border-[#323845]'
                            } placeholder-[#9aa3ad] focus:outline-none focus:ring-1 focus:ring-[#9EFF00]`}
                            placeholder="City"
                            onChange={() => onInputChange?.('universityCity')}
                        />
                        {validationErrors.universityCity && (
                            <p className="mt-1 text-xs text-red-400 font-medium">{validationErrors.universityCity}</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Education