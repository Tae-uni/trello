"use server";

import { z } from "zod";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type State = {
  errors?: {
    title?: string[];
  },
  message?: string | null;
}

// Define a schema for board creation using zod
const CreateBoard = z.object({
  title: z.string().min(3, {
    message: "Minimum length of 3 letters is required"
  }) // The title field must be a string
});

// Define an asynchronous function to handle board creation
export async function create(prevState: State, formData: FormData) {
  // Parse and validate the formData using the CreateBoard shema
  const validatedFields = CreateBoard.safeParse({
    title: formData.get("title"), // Extract the title from the formData
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields."
    }
  }

  const { title } = validatedFields.data;

  // Use the Prisma client to create a new board record in the database
  try {
    await db.board.create({
      data: {
        title, // Set the title field with the validated title
      }
    });
  } catch (error) {
    return {
      message: "Database Error",
    }
  }
  revalidatePath("/organization/org_2haU8uXYUm7djl7lvS25GxOvBtr");
  redirect("/organization/org_2haU8uXYUm7djl7lvS25GxOvBtr");
}