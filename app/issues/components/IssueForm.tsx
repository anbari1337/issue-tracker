"use client";

import { ErrorMessage, Spinner } from "@/app/components";
import { createIssueSchema } from "@/utils/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { z } from "zod";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
type IssueFormData = z.infer<typeof createIssueSchema>;

function IssueForm({ issue }: { issue?: Issue }) {
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    defaultValues: {
      title: issue?.title || "",
      description: issue?.description || "",
    },
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = React.useState<null | string>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const createIssue = async (data: IssueFormData) => {
    console.log({ data });
    const requestBody = JSON.stringify({
      title: data.title,
      description: data.description,
    });
    try {
      setLoading(true);
      const response = await fetch("/api/issues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify the content type as JSON
        },
        body: requestBody,
      });
      if (!response.ok) throw new Error();
      router.push("/issues");
    } catch (error) {
      setLoading(false);
      setError("Unexpected error occured.");
    }
  };

  return (
    <div className='max-w-xl'>
      {error && (
        <Callout.Root className='mb-5' color='red'>
          <Callout.Icon>
            <AiOutlineInfoCircle />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className='space-y-5' onSubmit={handleSubmit(createIssue)}>
        <TextField.Root>
          <TextField.Input placeholder='Title' {...register("title")} />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder='Description' {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={loading}>
          {loading ? <Spinner /> : "Submit New Issue"}
        </Button>
      </form>
    </div>
  );
}

export default IssueForm;
