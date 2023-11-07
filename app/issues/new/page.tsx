"use client";

import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";

interface IssueForm {
  title: string;
  description: string;
}
function Page() {
  const { control, register, handleSubmit } = useForm<IssueForm>();

  const createIssue = async (data: IssueForm) => {
    const requestBody = JSON.stringify({
      title: data.title,
      description: data.description,
    });

    await fetch("/api/issues", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify the content type as JSON
      },
      body: requestBody,
    });
  };
  return (
    <form className='max-w-xl space-y-5' onSubmit={handleSubmit(createIssue)}>
      <TextField.Root>
        <TextField.Input placeholder='Title' {...register("title")} />
      </TextField.Root>
      <Controller
        name='description'
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder='Description' {...field} />
        )}
      />
      <Button>Submit New Issue</Button>
    </form>
  );
}

export default Page;
