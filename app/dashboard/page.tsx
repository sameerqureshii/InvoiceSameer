import { DashboardBlocks } from "@/app/components/DashboardBlocks";
import { InvoiceGraph } from "@/app/components/InvoiceGraph";
import { requireUser } from "@/app/utils/hooks";
import prisma from "@/app/utils/db";
import { RecentInvoices } from "../components/RecentInvoices";
import { EmptyState } from "../components/EmptyState";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

async function getData(userId: string) {
    const dataa = await prisma.invoice.findMany({
        where: {
            userId: userId,
        },
        select: {
            id: true,
        },
    });

    return dataa;
}
async function getInvoices(userId: string) {
    const rawData = await prisma.invoice.findMany({
        where: {
            status: "PAID",
            userId: userId,
            createdAt: {
                lte: new Date(),
                gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            },
        },
        select: {
            total: true,
            createdAt: true,
        },
        orderBy: {
            createdAt: "asc",
        },
    });

    // group and aggregate data by date
    const aggregatedData = rawData.reduce(
        (acc: {[key: string]: number}, curr) => {
            const date = new Date(curr.createdAt).toLocaleDateString("en-US",{
                month: "short",
                day: "numeric",
            });
            acc[date] = (acc[date] || 0) + curr.total;
            
            return acc;
        }, {}
    );

    // Convert to array and from the object
    const transformedData = Object.entries(aggregatedData).map
    (([date, amount]) => ({
        date,
        amount, 
        originalDate: new Date(date + ", " + new Date().getFullYear()),
     }))
    .sort((a, b) => a.originalDate.getTime() - b.originalDate.getTime())
    .map(({date, amount}) => ({
        date, 
        amount,
    }));
    return transformedData;
}

export default async function DashboardRoute() {
    const data = await getInvoices("userId");
    const session = await requireUser();
    const invoices = await getInvoices(session.user?.id as string);
    const dataa = await getData(session.user?.id as string);

    return (
        <>{dataa.length < 1? (
        <EmptyState 
            title="No invoices found"
            description="Create an invoice to get started"
            buttontext="Create Invoice"
            href="/dashboard/invoices/create"
        />
        ) : (
        <Suspense fallback={<Skeleton className="w-full h-full flex-1"/>}>
        <DashboardBlocks />
        <div className="grid gap-4 lg:grid-cols-3 md:gap-8">
            <InvoiceGraph data={invoices} />
            <RecentInvoices/>
        </div>
        </Suspense>
        )}
     </>
    );
}