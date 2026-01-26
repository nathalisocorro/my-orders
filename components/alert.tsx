import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";

interface AlertProps {
  loading: boolean;
  item: any;
  onDelete: (item: any) => void;
  onCancel: () => void;
}

export default function AlertComponent({
  loading,
  item,
  onDelete,
  onCancel,
}: AlertProps) {
  return (
    <div className="fixed top-4 left-1/2 z-30 max-w-[20rem] transform -translate-x-1/2">
      <Alert className="bg-red-100">
        <AlertTitle className="flex gap-2 items-center text-red-500">
          <AlertCircle />
          You are about to delete this order
        </AlertTitle>
        <AlertDescription>
          You will not be able to get it back later
        </AlertDescription>
        <div className="flex mt-3 gap-3 px-7">
          <Button disabled={loading} onClick={() => onDelete(item)}>
            Proceed
          </Button>
          <Button disabled={loading} onClick={() => onCancel()}>
            Cancel
          </Button>
        </div>
      </Alert>
    </div>
  );
}
