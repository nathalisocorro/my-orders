"use client"

import * as React from "react"
import type { PaginationState } from "@tanstack/react-table"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"
import { AlertCircle, ArrowUpDown, ChevronDown, MoreHorizontal, Plus, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import ModalBase from "@/components/modalBase"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import LoadingComponent from "@/components/loading"
import FetchOrders from "@/hooks/orders-hooks"
import { toast } from "sonner"
import { Order } from "@/types"

export default function OrdersPage() {

  const { orders, loading, deleteOrders, addOrders, updateOrders } = FetchOrders()
  const [open, setOpen] = React.useState(false)
  const [editing, setEditing] = React.useState<Order|undefined>(undefined)

  const [alert, setAlert] = React.useState(false)
  const [pagination, setPagination] = React.useState<PaginationState>({
  pageIndex: 0,
  pageSize: 10,
})

const handleOpen = (order: any) => {
  setEditing(order)
  setOpen(true)
}

const handleSuccess = () => {
  setEditing(undefined)
  setOpen(false)
}

const handleSave = (order: Order) => {
    if(order.id){
      updateOrders(order)
      return
    }
    addOrders(order)
  }

  const [itemToDelete, setItemToDelete] = React.useState<any>(null)

  const handleDelete = async (item: any) => {
    await deleteOrders(item)
    setAlert(false)
  }

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const columns: ColumnDef<Order>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <div>{row.getValue("id") as string}</div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          STATUS
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
    const status = row.getValue("status") as string
    const statusClass =
    status.toLowerCase() === "paid"
      ? "bg-green-500"
      : status.toLowerCase() === "canceled"
      ? "bg-red-500"
      : "bg-blue-500"
    return (
      <Badge className={statusClass}>
        {status}
      </Badge>
    )
  }
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          CREATED AT
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue<any[]>("createdAt").slice(0,10).toString()}</div>,
  },
  {
    accessorKey: "userId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
        >
          USER ID
        </Button>
      )
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue<string>("userId")}</div>,
  },
  {
    accessorKey: "products",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
        >
          PRODUCTS ID
        </Button>
      )
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue<any[]>("products").map(p => p).join(', ')}</div>,
  },
  {
    accessorKey: "total",
    header: () => <div className="text-right">TOTAL</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total"))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const order = row.original
      
      return (
          <>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {navigator.clipboard.writeText(order?.id || ''), toast.success('ID copied to the clipboard')}}
              className="flex text-center justify-center"
            >
              Copy order ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button onClick={() => handleOpen(order)} className="w-full text-start font-normal" variant={"ghost"}>Edit order</Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button variant={"ghost"} className="text-red-500 w-full"
              onClick={() => {setAlert(true); setItemToDelete(order)}}
              >Delete order</Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

          </>
      )
    },
  },
]

  const table = useReactTable({
  data: orders,
  columns,
  state: {
    sorting,
    columnFilters,
    columnVisibility,
    rowSelection,
    pagination,
  },
  onSortingChange: setSorting,
  onColumnFiltersChange: setColumnFilters,
  onColumnVisibilityChange: setColumnVisibility,
  onRowSelectionChange: setRowSelection,
  onPaginationChange: setPagination,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
})

    return(
        <div className="flex bg-[#d7eff5] h-full overflow-y-hidden justify-start">
          <main className="mx-4 my-5 w-full">
            <div className="w-full flex flex-col xl:flex-row justify-between xl:items-center">
              {alert && (
                <div className="fixed top-4 left-1/2 z-30 max-w-[20rem] transform -translate-x-1/2">
                  <Alert  className="bg-red-100">
                    <AlertTitle className="flex gap-2 items-center text-red-500"> 
                      <AlertCircle />
                      You are about to delete this order</AlertTitle>
                    <AlertDescription>
                      You will not be able to get it back later
                    </AlertDescription>
                    <div className="flex mt-3 gap-3 px-7">
                      <Button disabled={loading} onClick={() => handleDelete(itemToDelete)}>Proceed</Button>
                      <Button disabled={loading} onClick={() => setAlert(false)}>Cancel</Button>
                    </div>
                  </Alert>
                </div>
              )}
              <div>
                <div className="flex justify-start gap-2 items-end"><h1 className="text-4xl font-extrabold">Orders</h1><ShoppingCart size={"40"} /></div>
                <h3 className="text-md text-gray-500 mt-1 font-bold">Registry of all the orders made by users</h3>
              </div>
              <div>
                <Button onClick={() => setOpen(true)} className="bg-[#3eb2b4] hover:bg-[#FDBB2D] mt-2 xl:mt-0">Add Order<Plus /></Button>
              </div>
            </div>
            <div className="flex flex-col w-full mt-10">
              <div className="flex items-center py-4">
                <Input
                  placeholder="Filter status..."
                  value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
                  onChange={(event) =>
                    table.getColumn("status")?.setFilterValue(event.target.value)
                  }
                  className="max-w-sm bg-white"
                />
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="xl:ml-auto m0-40">
                      Columns <ChevronDown />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {table
                      .getAllColumns()
                      .filter((column) => column.getCanHide())
                      .map((column) => {
                        return (
                          <DropdownMenuCheckboxItem
                            key={column.id}
                            className="capitalize"
                            checked={column.getIsVisible()}
                            onCheckedChange={(value: any) =>
                              column.toggleVisibility(!!value)
                            }
                          >
                            {column.id}
                          </DropdownMenuCheckboxItem>
                        )
                      })}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="rounded-md border overflow-x-auto grid place-items-center mx-auto">
                  <Table className="min-w-250 bg-white ">
                  <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                          return (
                            <TableHead key={header.id}>
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                            </TableHead>
                          )
                        })}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row) => (
                        <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && "selected"}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={columns.length}
                          className="h-30 text-center"
                        >
                          {loading ? <LoadingComponent /> : <span>No orders found</span>}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              <div className="flex flex-col xl:flex-row items-center justify-end space-x-2 py-4">
                <div className="text-muted-foreground flex-1 text-sm">
                  {table.getFilteredSelectedRowModel().rows.length} of{" "}
                  {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                

                <div className="space-x-2 flex">
                  <div className="flex items-center space-x-2 mr-1">
                <span className="text-sm">Rows per page</span>
                <select
                  className="h-8 rounded-md border px-2 text-sm"
                  value={table.getState().pagination.pageSize}
                  onChange={(e) => {
                    table.setPageSize(Number(e.target.value))
                  }}
                >
                  {[5, 10, 20].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      {pageSize}
                    </option>
                  ))}
                </select>
              </div>
                  <div><Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    Next
                  </Button></div>
                </div>
              </div>
            </div>
          </main>
          <Dialog open={open} onOpenChange={setOpen}>
            <ModalBase key={editing ? editing.id : 'new'} data={editing} onSuccess={handleSuccess} onSave={handleSave}/>
          </Dialog>
        </div>
    )
}