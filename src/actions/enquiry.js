"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function createEnquiry(formState, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const message = formData.get("message");

  const enquirySchema = z.object({
    name: z.string().min(1, { message: "Please enter your name" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    phone: z.string().min(1, { message: "Please enter your phone number" }),
    message: z.string().min(1, {
      message: "Please tell me what you want to enquire with me about",
    }),
  });

  const result = enquirySchema.safeParse({
    name,
    email,
    phone,
    message,
  });

  console.log(result.error?.flatten().fieldErrors);

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return {
      success: false,
      errors,
    };
  }

  await db.enquiry.create({
    data: {
      name,
      email,
      phone,
      message,
    },
  });

  revalidatePath("/admin/enquiries");

  return {
    success: true,
    errors: {},
  };
}

export const getEnquiries = async () => {
  const enquiries = await db.enquiry.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return enquiries;
};
