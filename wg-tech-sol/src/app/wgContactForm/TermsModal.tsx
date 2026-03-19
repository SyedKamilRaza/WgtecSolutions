"use client"
import React, { useState, useEffect } from 'react'
import { getSettings } from '@/api/module/settings'
import { toast } from 'react-toastify'

interface TermsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
    const [termsContent, setTermsContent] = useState<string>('');
    const [loading, setLoading] = useState(false);

    // Function to decode HTML entities
    const decodeHtmlEntities = (html: string): string => {
        const textarea = document.createElement('textarea');
        textarea.innerHTML = html;
        return textarea.value;
    };

    useEffect(() => {
        if (isOpen) {
            fetchTerms();
            // Close on ESC key
            const handleEscape = (e: KeyboardEvent) => {
                if (e.key === 'Escape') {
                    onClose();
                }
            };
            document.addEventListener('keydown', handleEscape);
            return () => {
                document.removeEventListener('keydown', handleEscape);
            };
        }
    }, [isOpen, onClose]);

    const fetchTerms = async () => {
        try {
            setLoading(true);
            const response = await getSettings();
            if (response.status === 200 || response.status === 201) {
                const rawContent = response.data.data.termsCondition || '';
                // Decode HTML entities before setting
                const decodedContent = decodeHtmlEntities(rawContent);
                setTermsContent(decodedContent);
            } else {
                toast.error('Failed to load terms and conditions');
                setTermsContent('Terms and conditions not available.');
            }
        } catch (error) {
            console.error('Error fetching terms:', error);
            toast.error('Error loading terms and conditions');
            setTermsContent('Error loading terms and conditions.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={handleBackdropClick}
        >
            <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#121418] rounded-xl shadow-2xl border border-[#323845] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-[#323845]">
                    <h2 className="text-2xl font-bold text-white">Terms and Conditions</h2>
                    <button
                        onClick={onClose}
                        className="text-[#9aa3ad] hover:text-white transition-colors p-2 hover:bg-[#1f2430] rounded-lg"
                        aria-label="Close modal"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#9EFF00]"></div>
                            <p className="ml-4 text-[#9aa3ad]">Loading terms and conditions...</p>
                        </div>
                    ) : (
                        <div 
                            className="text-[#cfd6df] prose prose-invert max-w-none prose-headings:text-white prose-p:text-[#cfd6df] prose-strong:text-white prose-ul:text-[#cfd6df] prose-ol:text-[#cfd6df] prose-li:text-[#cfd6df] prose-a:text-[#9EFF00] prose-a:hover:text-[#9EFF00]/80"
                            dangerouslySetInnerHTML={{ __html: termsContent || 'No terms and conditions available.' }}
                        />
                    )}
                </div>

                {/* Footer */}
                <div className="flex justify-end p-6 border-t border-[#323845]">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-[#9EFF00] text-black font-semibold rounded-lg hover:bg-[#9EFF00]/90 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TermsModal;

