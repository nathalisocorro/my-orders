import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import ModalBase from "./modalBase"
import { useState } from "react"

export interface Props {
  data?: any,
}


export default function ModalForm({data}: Props) {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
        <DialogTrigger asChild>
          <Button onClick={() => setOpen(true)} className="bg-[#3eb2b4] hover:bg-[#FDBB2D] mt-2 xl:mt-0">Add Order<Plus /></Button>
        </DialogTrigger>
        <ModalBase data={data} onSuccess={() => setOpen(false)} />
    </Dialog>
  )
}
