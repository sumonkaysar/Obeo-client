import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ReactNode } from "react";

interface IProps {
  title?: string;
  content: ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className: string;
}

const CommonDialog = ({
  title,
  content,
  isOpen,
  setIsOpen,
  className,
}: IProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className={className}>
        <DialogHeader>
          <DialogTitle className={title ? "" : "sr-only"}>{title}</DialogTitle>
          <DialogDescription className="sr-only"></DialogDescription>
          {content}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CommonDialog;
