"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React from "react";

interface EmojiPickerProps {
  children: React.ReactNode;
  className?: string;
  getValue?: (emoji: string) => void;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({
  children,
  className,
  getValue,
}) => {
  const router = useRouter();
  const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });
  const onclick = (selectedEmoji: { emoji: string }) => {
    if (getValue) {
      getValue(selectedEmoji.emoji);
    }
  };
  return (
    <div className={`flex items-center`}>
      <Popover>
        <PopoverTrigger className="cursor-pointer">{children}</PopoverTrigger>
        <PopoverContent className="w-[300px] p-0 border-none">
          <Picker className="text-base" onEmojiClick={onclick} />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default EmojiPicker;
