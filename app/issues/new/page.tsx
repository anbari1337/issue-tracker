"use client";

import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import * as React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { z } from "zod";
import { createIssueSchema } from "@/utils/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/app/components/ErrorMessage";

type IssueForm = z.infer<typeof createIssueSchema>;

function Page() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    defaultValues: {
      title: "",
      description: "",
    },
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = React.useState<null | string>(null);

  const createIssue = async (data: IssueForm) => {
    console.log({ data });
    const requestBody = JSON.stringify({
      title: data.title,
      description: data.description,
    });
    try {
      const response = await fetch("/api/issues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify the content type as JSON
        },
        body: requestBody,
      });
      if (!response.ok) throw new Error();
    } catch (error) {
      setError("Unexpected error occured.");
    }
  };

  console.log(error);

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

        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
}

export default Page;
