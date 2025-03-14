"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import clsx from "clsx";

interface CustomDialogProps {
  header?: string;
  content?: React.ReactNode;
  children?: React.ReactNode;
  description?: string;
  className?: string;
}

const CustomDialog: React.FC<CustomDialogProps> = ({
  header,
  content,
  children,
  description,

  className,
}) => {
  return (
    <Dialog>
      <DialogTrigger className={clsx("", className)}>{children}</DialogTrigger>
      <DialogContent
        className={"h-screen block sm:h-[440px] overflow-scroll w-full"}
      >
        <DialogHeader>
          <DialogTitle>{header}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
