"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function GenerateLogo() {
  const [selectedSvg, setSelectedSvg] = useState<string | null>(null);

  useEffect(() => {
    async function loadSvg() {
      try {
        const response = await fetch("/svg-names");
        const data = await response.json();
        const randomIndex = Math.floor(Math.random() * data.svgNames.length);
        setSelectedSvg(data.svgNames[randomIndex]);
      } catch (error) {
        console.error("Error fetching SVG names:", error);
      }
    }

    loadSvg();
  }, []);

  return (
    <div className="relative h-18 w-18 flex items-center justify-center">
      {selectedSvg ? (
        <Image src={`/svg/${selectedSvg}.svg`} alt={selectedSvg} fill />
      ) : null}
    </div>
  );
}
