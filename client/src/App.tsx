"use client";

import * as React from "react";
import {
  CaretSortIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useAPI from "@/hooks/useAPI";

type Patient = {
  _id: string;
  name: string;
  age: number;
  medicalHistory: string[];
  treatmentPlan: string;
};

let openModal: (patient: Patient) => void;

const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Name
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => row.getValue("name"),
  },
  {
    accessorKey: "age",
    header: () => <div className="text-right">Age</div>,
    cell: ({ row }) => row.getValue("age"),
  },
  {
    accessorKey: "treatmentPlan",
    header: () => <div>Treatment Plan</div>,
    cell: ({ row }) => row.getValue("treatmentPlan"),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => openModal(row.original)}>View Details</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

export default function App() {
  const { data, loading, error, refetch } = useAPI("https://health-dashboard-oijm.onrender.com");
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedPatient, setSelectedPatient] = React.useState<Patient | null>(null);
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    refetch("/patients?page=1&limit=10");
  }, []);

  const table = useReactTable({
    data: data?.patients.filter((patient: Patient) => patient.name.toLowerCase().includes(search.toLowerCase())) || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  openModal = (patient: Patient) => {
    setSelectedPatient(patient);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPatient(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {selectedPatient && (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{selectedPatient.name}'s Health Records</DialogTitle>
              <DialogDescription>
                Here are the health records for {selectedPatient.name}.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <h3>Age: {selectedPatient.age}</h3>
              <h4>Medical History:</h4>
              <ul>
                {selectedPatient.medicalHistory.map((record, index) => (
                  <li key={index}>{record}</li>
                ))}
              </ul>
              <h4>Treatment Plan:</h4>
              <p>{selectedPatient.treatmentPlan}</p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={closeModal}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default">Request Prior Authorization</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Prior Authorization Request</DialogTitle>
            <DialogDescription>
              Fill in the details to request prior authorization for a treatment.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="treatmentType">Treatment Type</Label>
              <Input id="treatmentType" required className="input" />
            </div>
            <div>
              <Label htmlFor="insurancePlan">Insurance Plan</Label>
              <Input id="insurancePlan" required className="input" />
            </div>
            <div>
              <Label htmlFor="dateOfService">Date of Service</Label>
              <Input type="date" id="dateOfService" required className="input" />
            </div>
            <div>
              <Label htmlFor="diagnosisCode">Diagnosis Code</Label>
              <Input id="diagnosisCode" required className="input" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Submit Request</Button>
            <Button variant="outline" onClick={closeModal}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}