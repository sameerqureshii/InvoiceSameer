"use server";

import { requireUser } from "./utils/hooks";
import { parseWithZod } from "@conform-to/zod"
import { invoiceSchema, onboardingSchema } from "./utils/zodSchemas";
import prisma from "./utils/db";
import { redirect } from "next/navigation";
import { Inclusive_Sans } from "next/font/google";
import { emailClient } from "./utils/mailtrap";
import { formatCurrency } from "./utils/formatCurrency";
import { useId } from "react";

export async function onboardUser(prevState: any, formData: FormData){
    const session = await requireUser();

    const submission = parseWithZod(formData, {
        schema: onboardingSchema,
    });

    if(submission.status !== "success"){
        return submission.reply();
    }

    const data = await prisma.user.update({
        where:{
            id: session.user?.id,
        },
        data:{
            firstName: submission.value.firstName,
            lastName: submission.value.lastName,
            address: submission.value.address,
        }
    });

    return redirect("/dashboard");
}

export async function createInvoice(prevState: any, formData: FormData){
    const session = await requireUser();

    const submission = parseWithZod(formData, {
        schema: invoiceSchema,
    });

    if (submission.status !== "success"){
        return submission.reply();
    }

    const data = await prisma.invoice.create({
        data:{
            clientAddress: submission.value.clientAddress,
            clientEmail: submission.value.clientEmail,
            clientName: submission.value.clientName,
            currency: submission.value.currency,
            date: submission.value.date,
            dueDate: submission.value.dueDate,
            fromAddress: submission.value.fromAddress,
            fromEmail: submission.value.fromEmail,
            fromName: submission.value.fromName,
            invoiceItemDescription: submission.value.invoiceItemDescription,
            invoiceItemQuantity: submission.value.invoiceItemQuantity,
            invoiceItemRate: submission.value.invoiceItemRate,
            invoiceName: submission.value.invoiceName,
            invoiceNumber: submission.value.invoiceNumber,
            status: submission.value.status,
            total: submission.value.total,
            note: submission.value.note,
            userId: session.user?.id,
        },
    });

    await emailClient.send({
        from: {
            email: "hello@demomailtrap.co", // from Mailtrap dashboard
            name: "Sameer Ahmed Qureshi"
        },
        to: [{ email: "sq56331@gmail.com" }],
        // to: [{ email: submission.value.clientEmail}] // if you are using your're verified domain instead of hello@demomailtrap.co than use this because with this you can send mail to anyone you want too
        // since I didn't had so I use my own hard coded email 
        template_uuid: "ea006808-7e30-4e1b-8471-806cf61e5474",
        template_variables: {
            "clientName": submission.value.clientName,
            "invoiceNumber": submission.value.invoiceNumber,
            "dueDate": new Intl.DateTimeFormat("en-US", {
                dateStyle: "long",
            }).format(new Date(submission.value.date)),
            "totalAmount": formatCurrency({
                amount: submission.value.total,
                currency: submission.value.currency as any,
            }),
            "invoiceLink": `http://localhost:3000/api/invoice/${data.id}`,
        },
    });

    return redirect("/dashboard/invoices")
}

export async function editInvoice(prevState: any, formData: FormData){
    const session = await requireUser();
    const submission = parseWithZod(formData, {
        schema: invoiceSchema,
    });

    if (submission.status !== "success"){
        return submission.reply();
    }

    const data = await prisma.invoice.update({
        where:{
            id: formData.get("id") as string,
            userId: session.user?.id, 
        },
        data:{
            clientAddress: submission.value.clientAddress,
            clientEmail: submission.value.clientEmail,
            clientName: submission.value.clientName,
            currency: submission.value.currency,
            date: submission.value.date,
            dueDate: submission.value.dueDate,
            fromAddress: submission.value.fromAddress,
            fromEmail: submission.value.fromEmail,
            fromName: submission.value.fromName,
            invoiceItemDescription: submission.value.invoiceItemDescription,
            invoiceItemQuantity: submission.value.invoiceItemQuantity,
            invoiceItemRate: submission.value.invoiceItemRate,
            invoiceName: submission.value.invoiceName,
            invoiceNumber: submission.value.invoiceNumber,
            status: submission.value.status,
            total: submission.value.total,
            note: submission.value.note,
        },
    });

    // Updated Invoice Email Notification
    await emailClient.send({
        from: {
            email: "hello@demomailtrap.co", 
            name: "Sameer Ahmed Qureshi"
        },
        to: [{ email: "sq56331@gmail.com" }],
        template_uuid: "ba931337-0cee-4b9c-be54-04bb49480221",
        template_variables: {
            "clientName": submission.value.clientName,
            "invoiceNumber": submission.value.invoiceNumber,
            "dueDate": new Intl.DateTimeFormat("en-US", {
                dateStyle: "long",
            }).format(new Date(submission.value.date)),
            "totalAmount": formatCurrency({
                amount: submission.value.total,
                currency: submission.value.currency as any,
            }),
            "invoiceLink": `http://localhost:3000/api/invoice/${data.id}`,
        },
    });

    return redirect("/dashboard/invoices");
}

export async function DeleteInvoice(invoiceId: string) {
    const session = await requireUser();

    const data = await prisma.invoice.delete({
        where: {
            id: invoiceId,
            userId: session.user?.id,
        },
    });

    return redirect("/dashboard/invoices");
}

export async function MarkAsPaidAction(invoiceId: string) {
    const session = await requireUser();
    const data = await prisma.invoice.update({
        where: {
            id: invoiceId,
            userId: session.user?.id,
        },
        data: {
            status: "PAID",
        },
    });

    return redirect("/dashboard/invoices");
}