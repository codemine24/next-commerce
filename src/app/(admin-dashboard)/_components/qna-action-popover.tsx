import { Box, Button, Popover } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import React, { useState, useTransition } from "react";

import { deleteQnas } from "@/actions/qna";
import { ConfirmDialog } from "@/components/dialog/confirm-dialog";
import { DeleteIcon } from "@/icons/delete-icon";
import { DotVerticalIcon } from "@/icons/dot-vertical";
import { Qna } from "@/interfaces/qna";
import { toast } from "@/lib/toast-store";

import AnswerFormPopover from "./answer-form-popover";

interface QnaActionPopoverProps {
  qna: Qna;
}

const QnaActionPopover = ({ qna }: QnaActionPopoverProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenConfirmModal(false);
    // setOpenEditModal(false);
  };

 

  const handleDeleteQna = () => {
    startTransition(async () => {
      const res = await deleteQnas({ ids : [qna.id] });
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  };

  return ( 

    <>
      <IconButton onClick={handleClick}>
        <DotVerticalIcon />
      </IconButton>

      <Popover
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box width={200} display="flex" flexDirection="column" p={0.5}>
         
          <AnswerFormPopover qna={qna} />

          {/* Delete Button */}
          <Button
            startIcon={<DeleteIcon />}
            variant="text"
            color="error"
            onClick={() => setOpenConfirmModal(true)}
            sx={{
              pl: 2,
              textTransform: "none",
              justifyContent: "flex-start",
            }}
          >
            Delete
          </Button>
        </Box>
      </Popover>

      {openConfirmModal && (
        <ConfirmDialog
          open={openConfirmModal}
          onClose={handleClose}
          title="Delete Question"
          description="Are you sure you want to delete this question?"
          onConfirm={handleDeleteQna}
          loading={isPending}
        />
      )}
    </>
  );
};

export default QnaActionPopover;