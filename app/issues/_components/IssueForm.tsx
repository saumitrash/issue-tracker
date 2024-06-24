"use client";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { issueSchema, patchIssueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, Flex, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, set, useForm } from "react-hook-form";
// import { DevTool } from "@hookform/devtools";

import SimpleMDE from "react-simplemde-editor";

import { Issue, Status } from "@prisma/client";
import { z } from "zod";
import IssueStatusSelector from "./IssueStatusSelector";

type NewIssueFormData = z.infer<typeof issueSchema>;
type PatchIssueFormData = z.infer<typeof patchIssueSchema>;

const IssueForm = ({
  issue,
  formType = "update",
}: {
  issue?: Issue;
  formType: "new" | "update";
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
  } = useForm<NewIssueFormData | PatchIssueFormData>({
    resolver: zodResolver(formType === "new" ? issueSchema : patchIssueSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    const finalData = Object.entries(data)
      .filter(([key, value]) => dirtyFields[key as keyof typeof dirtyFields])
      .reduce((acc, [key, value]) => {
        return { ...acc, [key]: value };
      }, {});

    try {
      setIsSubmitting(true);
      if (issue) {
        await axios.patch("/api/issues/" + issue.id, finalData);
      } else {
        await axios.post("/api/issues", finalData);
      }

      router.push("/issues/list");
      router.refresh();
    } catch (error) {
      setIsSubmitting(false);
      setError("An unexpected error occured");
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <Flex justify="between">
          <TextField.Root>
            <TextField.Input
              defaultValue={issue?.title}
              placeholder="Title"
              {...register("title")}
            />
          </TextField.Root>

          <Controller
            name="status"
            control={control}
            render={({ field: { onChange, value } }) => (
              <IssueStatusSelector
                value={value!}
                defaultValue={issue?.status || "OPEN"}
                onChange={onChange}
              />
            )}
          />
        </Flex>

        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          defaultValue={issue?.description}
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description. . ." {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          {issue ? "Update issue" : "Submit New Issue"}{" "}
          {isSubmitting && <Spinner />}
        </Button>
        {/* <DevTool control={control} /> */}
      </form>
    </div>
  );
};

export default IssueForm;
