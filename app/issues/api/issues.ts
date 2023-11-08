import prisma from "@/prisma/client";

export const getAllIssues = async () => {
  const issues = await prisma.issue.findMany();
  return issues;
};

export const getIssueById = async (id: string) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  return issue;
};
