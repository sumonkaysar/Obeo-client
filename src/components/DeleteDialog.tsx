import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onCofirm?: () => void;
}

export default function DeleteDialog({ isOpen, setIsOpen, onCofirm }: IProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete remove
            the data from our app.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onCofirm}
            className="bg-red-500 hover:bg-[#ff4040] cursor-pointer text-white"
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
