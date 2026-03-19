"use client"
import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import { Skill, SkillLevel } from "./types";

type SkillItem = { id: number; skill: string; level: string };

interface SkillAddProps {
  onSkillsChange?: (skills: Skill[]) => void;
  
}

function SkillAdd({ onSkillsChange }: SkillAddProps) {
  const levels = ["Beginner", "Intermediate", "Advanced", "Expert"];

  // Skills state
  const [skills, setSkills] = useState<SkillItem[]>([
    { id: 1, skill: "", level: "" },
    { id: 2, skill: "", level: "" },
  ]);

  // Notify parent when skills change
  useEffect(() => {
    if (onSkillsChange) {
      const validSkills: Skill[] = skills
        .filter((s) => s.skill.trim() && s.level)
        .map((s) => ({
          skill: s.skill.trim(),
          level: s.level.toLowerCase() as SkillLevel,
        }));
      onSkillsChange(validSkills);
    }
  }, [skills, onSkillsChange]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingSkill, setEditingSkill] = useState({ skill: "", level: "" });
  const [attemptedAdd, setAttemptedAdd] = useState(false);

  // Disable Add if any row is incomplete
  const isAddDisabled = skills.some((s) => !s.skill.trim() || !s.level);
  const isEditingInvalid = !editingSkill.skill.trim() || !editingSkill.level;

  // Add new skill
  const addSkill = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAttemptedAdd(true);
    if (isAddDisabled) return;

    const newId = Math.max(...skills.map((s) => s.id), 0) + 1;
    setSkills([...skills, { id: newId, skill: "", level: "" }]);
  };

  // Delete skill
  const deleteSkill = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.preventDefault();
    if (skills.length > 1) {
      setSkills(skills.filter((s) => s.id !== id));
    } else {
      alert("You must have at least one skill");
    }
  };

  // Start editing
  const startEdit = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.preventDefault();
    const row = skills.find((s) => s.id === id);
    if (row) {
      setEditingId(id);
      setEditingSkill({ skill: row.skill, level: row.level });
    }
  };

  // Save edit
  const saveEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isEditingInvalid) return;

    setSkills((prev) =>
      prev.map((s) =>
        s.id === editingId ? { ...s, skill: editingSkill.skill, level: editingSkill.level } : s
      )
    );
    setEditingId(null);
    setEditingSkill({ skill: "", level: "" });
  };

  // Cancel edit
  const cancelEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setEditingId(null);
    setEditingSkill({ skill: "", level: "" });
  };

  // Update skill value in entry mode (first time)
  const updateSkill = (id: number, field: "skill" | "level", value: string) => {
    setSkills((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  return (
    <>
      {/* Skills List */}
      <div className="space-y-3 mb-4">
        {skills.map((row, index) => {
          const isComplete = !!row.skill.trim() && !!row.level;
          const markLevelRed = !!row.skill.trim() && !row.level;

          return (
            <div key={row.id} className="relative">
              {editingId === row.id ? (
                // Edit Mode (after first completion)
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    className="w-full h-10 rounded-md px-3 bg-[#0f1115] text-[#e9ecf1] border border-[#323845] placeholder-[#9aa3ad] focus:outline-none  focus:ring-1 focus:ring-[#9EFF00]"
                    placeholder={`Skill ${index + 1}`}
                    value={editingSkill.skill}
                    onChange={(e) => setEditingSkill({ ...editingSkill, skill: e.target.value })}
                  />
                  <div className="flex gap-2">
                    <select
                      value={editingSkill.level}
                      onChange={(e) => setEditingSkill({ ...editingSkill, level: e.target.value })}
                      className={`flex-1 h-10 rounded-md px-3 bg-[#0f1115] text-[#e9ecf1] border focus:outline-none ${editingSkill.skill.trim() && !editingSkill.level
                          ? "border-red-500 focus:ring-2 focus:ring-red-500/40 focus:border-red-500"
                          : "border-[#323845]  focus:ring-1 focus:ring-[#9EFF00]"
                        }`}
                      aria-invalid={editingSkill.skill.trim() && !editingSkill.level ? true : undefined}
                    >
                      <option value="">Select level</option>
                      {levels.map((lvl) => (
                        <option key={lvl} value={lvl.toLowerCase()}>
                          {lvl}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={saveEdit}
                      disabled={isEditingInvalid}
                      className={`h-10 w-10 rounded-md bg-[#1f2430] text-sky-500 flex items-center justify-center transition-colors ${isEditingInvalid ? "opacity-50 cursor-not-allowed" : "hover:bg-sky-500 hover:text-white"
                        }`}
                      title={isEditingInvalid ? "Fill both fields to save" : "Save"}
                    >
                      <FaCheck className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="h-10 w-10 rounded-md bg-[#1f2430] text-red-500 hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center"
                      title="Cancel"
                    >
                      <FaTimes className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : isComplete ? (
                // Locked View (after first completion) -> edit via button only
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    className="w-full h-10 rounded-md px-3 bg-[#0f1115] text-[#e9ecf1] border border-[#323845] placeholder-[#9aa3ad] focus:outline-none cursor-default"
                    placeholder={`Skill ${index + 1}`}
                    value={row.skill}
                    readOnly
                    aria-readonly
                  />
                  <div className="flex gap-2">
                    <select
                      value={row.level}
                      disabled
                      className="flex-1 h-10 rounded-md px-3 bg-[#0f1115] text-[#e9ecf1] border border-[#323845] disabled:opacity-100 disabled:bg-[#0f1115] disabled:text-[#e9ecf1] disabled:cursor-default"
                    >
                      <option value="">{row.level}</option>
                    </select>
                    <button
                      type="button"
                      onClick={(e) => startEdit(e, row.id)}
                      className="h-10 w-10 rounded-md bg-[#1f2430] text-sky-500 hover:bg-sky-500 hover:text-white transition-colors flex items-center justify-center"
                      title="Edit"
                    >
                      <FaEdit className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => deleteSkill(e, row.id)}
                      className="h-10 w-10 rounded-md bg-[#1f2430] text-red-500 hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center"
                      title="Delete"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                // Entry Mode (first time entry – editable without Edit button)
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    className="w-full h-10 rounded-md px-3 bg-[#0f1115] text-[#e9ecf1] border border-[#323845] placeholder-[#9aa3ad] focus:outline-none  focus:ring-1 focus:ring-[#9EFF00]"
                    placeholder={`Skill ${index + 1}`}
                    value={row.skill}
                    onChange={(e) => updateSkill(row.id, "skill", e.target.value)}
                  />
                  <div className="flex gap-2">
                    <select
                      value={row.level}
                      onChange={(e) => updateSkill(row.id, "level", e.target.value)}
                      className={`flex-1 h-10 rounded-md px-3 bg-[#0f1115] text-[#e9ecf1] border focus:outline-none ${row.skill.trim() && !row.level
                          ? "border-red-500 focus:ring-2 focus:ring-red-500/40 focus:border-red-500"
                          : "border-[#323845]  focus:ring-1 focus:ring-[#9EFF00]"
                        }`}
                      aria-invalid={row.skill.trim() && !row.level ? true : undefined}
                    >
                      <option value="">Select level</option>
                      {levels.map((lvl) => (
                        <option key={lvl} value={lvl.toLowerCase()}>
                          {lvl}
                        </option>
                      ))}
                    </select>
                    {/* No Edit button in entry mode; only delete if needed */}
                    <button
                      type="button"
                      onClick={(e) => deleteSkill(e, row.id)}
                      className="h-10 w-10 rounded-md bg-[#1f2430] text-red-500 hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center"
                      title="Delete"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Helper after Add attempt when level missing but skill filled */}
              {attemptedAdd && row.skill.trim() && !row.level && (
                <p className="mt-1 text-xs text-red-400">Please select a level for this skill.</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Skill Button */}
      <div className="flex justify-end">

        <button
          type="button"
          onClick={addSkill}
          disabled={isAddDisabled}
          className={`w-full sm:w-auto mb-6 px-6 py-2.5 rounded-md transition-colors flex items-center justify-center gap-2 font-medium ${isAddDisabled
              ? "bg-[#1f2430]/70 text-sky-500/60 cursor-not-allowed"
              : "bg-[#1f2430] text-sky-500 hover:bg-sky-500 hover:text-white"
            }`}
          title={isAddDisabled ? "Fill current skills and levels first" : "Add another skill"}
          aria-disabled={isAddDisabled}
        >
          <FaPlus className="w-4 h-4" />
          Add More Skills
        </button>
      </div>
    </>
  );
}

export default SkillAdd;