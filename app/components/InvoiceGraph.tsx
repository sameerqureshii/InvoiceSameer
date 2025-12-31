"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Graph } from "./Graph";

export function InvoiceGraph({ data }: { data: Array<{ date: string; amount: number }> }) {
    return (
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Paid Invoice</CardTitle>
                <CardDescription>
                    Invoices which have been paid in the last 30 days.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Graph data={data}/>
            </CardContent>
        </Card>
    );
}