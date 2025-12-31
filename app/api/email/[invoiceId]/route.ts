import prisma from "@/app/utils/db"
import { requireUser } from "@/app/utils/hooks";
import { emailClient } from "@/app/utils/mailtrap";
import { NextResponse } from "next/server"; 

export async function POST(request: Request, {
    params,
}: {
    params: Promise<{ invoiceId: string }>;
}) {
    try {
    const session = await requireUser();

    const { invoiceId } = await params;

    const invoiceData = await prisma.invoice.findUnique({
        where: {
            id: invoiceId,
            userId: session.user?.id,
        },
    });

    if (!invoiceData) {
        return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    await emailClient.send({
        from: {
            email: "hello@demomailtrap.co", 
            name: "Sameer Ahmed Qureshi"
        },
        to: [{ email: "sq56331@gmail.com" }],
        template_uuid: "022044a2-5205-4af8-928b-66c7b1092981",
        template_variables: {
          "first_name": invoiceData.clientName,
          company_info_name: "Invoice Sameer",
          company_info_address: "1234 Street Chad",
          company_info_city: "Karachi",
          company_info_country: "Pakistan",
          company_info_zip_code: "75500",
        }
    });
    return NextResponse.json({ success: true });

    }
    catch (error) {
    return NextResponse.json({ error: "Failed to send email reminder" }, { status: 500 });
    }
}