import z from "zod";

const uploadFiles = z.object({
  body: z
    .object({
      files: z.array(
        z.instanceof(File).describe("File should be a valid file")
      ),
    })
    .strict(),
});

const updateFile = z.object({
  body: z
    .object({
      name: z
        .string({
          error: "File name should be a text",
        })
        .min(1, "Cann't save empty name")
        .optional(),
      alt_text: z
        .string({
          error: "Alt text should be a text",
        })
        .optional(),
    })
    .strict(),
});

const deleteFiles = z.object({
  body: z
    .object({
      files_path: z.array(
        z
          .string({ error: "File path should be a text" })
          .min(1, "File path is required"),
        { message: "files_path must be an array of file paths" }
      ),
    })
    .strict(),
});

export const FileSchemas = {
  uploadFiles,
  updateFile,
  deleteFiles,
};
