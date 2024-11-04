import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllDelegations } from "@/lib/db/queries";
import { Card } from "@/components/ui/card";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const { user } = await getUser();
  if (!user) {
    redirect("/login");
  }
  const delegations = await getAllDelegations(user.id);

  return (
    <div className="p-10 flex flex-col justify-center items-center h-full w-full">
      <Card className="p-4 w-1/2">
        <Table>
          <TableCaption>A list of all delegations</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Delegation id</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {delegations.map((delegation) => (
              <TableRow key={delegation.id}>
                <TableCell>
                  <Link href={`delegations/${delegation.id}`}>
                    {delegation.id}
                  </Link>
                </TableCell>
                <TableCell>{delegation.description}</TableCell>
                <TableCell>{delegation.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
