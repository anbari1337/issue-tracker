import prisma from "@/prisma/client";
import { createIssueSchema } from "@/utils/validationSchemas";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const validator = createIssueSchema.safeParse(body);

  console.log(validator);
  if (!validator.success)
    return NextResponse.json(validator.error.format(), { status: 400 });

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
