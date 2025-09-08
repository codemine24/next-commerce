"use client";

import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { SxProps } from "@mui/material/styles";
import { InputLabel } from "./form/input-label";

type EditorProps = {
    placeholder: string;
    defaultValue: string;
    setValue: (value: string) => void;
    height?: number;
    label?: string;
    required?: boolean;
    sx?: SxProps;
};

export const Editor = ({
    placeholder,
    defaultValue = "",
    setValue,
    height,
    label,
    required = false,
    sx,
}: EditorProps) => {
    const { quill, quillRef } = useQuill({
        placeholder,
        modules: {
            toolbar: [
                [{ font: [] }],
                [{ header: [1, 2, 3, 4, 5, 6] }],
                ["bold", "italic", "underline", "strike"],
                [{ color: [] }, { background: [] }],
                [{ script: "sub" }, { script: "super" }],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ indent: "-1" }, { indent: "+1" }],
                [{ align: [] }],
                ["link", "image", "video"],
                ["clean"],
            ],
        },
        formats: [
            "font",
            "header",
            "bold",
            "italic",
            "underline",
            "strike",
            "color",
            "background",
            "script",
            "blockquote",
            "code-block",
            "list",
            "indent",
            "align",
            "link",
            "image",
            "video",
        ],
    });

    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (quill) {
            quill.root.innerHTML = defaultValue;
            quill.on("text-change", () => {
                let updatedContent = quill.root.innerHTML;

                if (!updatedContent.trim() || updatedContent === "<p><br></p>") {
                    updatedContent = "";
                }

                setValue(updatedContent.toString());
            });
        }
    }, [quill]);

    if (!isClient) {
        return null;
    }

    return (
        <Box>
            <InputLabel label={label || ""} required={required} sx={{ mb: 1 }} />
            <Box
                sx={{
                    width: "100%",
                    marginBottom: 1,
                    ...sx,
                }}
            >
                <div ref={quillRef} style={{ minHeight: height || 150 }} />
            </Box>
        </Box>
    );
};