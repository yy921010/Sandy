"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useCopy } from "@/hooks/use-copy";

export function CopyButton({
  value,
  className,
  ...props
}: {
  value: string;
  className?: string;
}) {
  const { hasCopied, copy } = useCopy(value);

  return (
    <Button
      size="icon"
      variant="ghost"
      className={cn(
        "z-10 size-6 rounded-md bg-zinc-800 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50",
        className,
      )}
      onClick={copy}
      {...props}
    >
      {hasCopied ? (
        <CheckIcon className="size-3" />
      ) : (
        <CopyIcon className="size-3" />
      )}
      <span className="sr-only">Copy</span>
    </Button>
  );
}
