import { Loader } from "lucide-react";

export default function LoadingComponent() {
  return (
    <div className="grid place-items-center w-full h-full gap-3">
      <div className="grid place-items-center">
        <Loader />
        <span className="text-3xl font-extrabold">Loading...</span>
      </div>
    </div>
  );
}
