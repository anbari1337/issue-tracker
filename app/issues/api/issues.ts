import prisma from "@/prisma/client";

export const getAllIssues = async () => {
  const issues = await prisma.issue.findMany();
  return issues;
};
