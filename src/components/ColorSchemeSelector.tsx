import React from "react";
import { colorSchemes } from "../assets/assets";

const ColorSchemeSelector = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (color: string) => void;
}) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-zinc-200">
        Color Scheme
      </label>

      {/* Color grid */}
      <div className="grid grid-cols-6 gap-3">
        {colorSchemes.map((scheme) => (
          <button
            key={scheme.id}
            onClick={() => onChange(scheme.id)}
            title={scheme.name}
            className={`relative h-10 rounded-lg overflow-hidden transition-all ${
              value === scheme.id
                ? "ring-2 ring-pink-500"
                : "ring-1 ring-white/10"
            }`}
          >
            <div className="flex h-full w-full">
              {scheme.colors.map((color, i) => (
                <div
                  key={i}
                  className="flex-1"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </button>
        ))}
      </div>

      {/* Selected text (ONLY ONCE) */}
      <p className="text-sm text-zinc-400">
        Selected:{" "}
        <span className="text-zinc-200 font-medium">
          {colorSchemes.find((s) => s.id === value)?.name}
        </span>
      </p>
    </div>
  );
};

export default ColorSchemeSelector;
