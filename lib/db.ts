import { PrismaClient } from "@prisma/client";

// Prevent the PrismaClient from being recreated multiple times during devlopment
declare global {
  var prisma: PrismaClient | undefined;
};

// Basically Next.js is working with hot reload, but global is excluded from hot reload
export const db = globalThis.prisma || new PrismaClient();

// If the env is not production, assign the PrismaClient to the global variable
// This helps maintain the same PrismaClient instance across hot reloads during devlopment
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;