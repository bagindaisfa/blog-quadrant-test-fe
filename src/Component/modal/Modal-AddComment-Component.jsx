import React, { useState } from "react";
import { Modal, Box, Button } from "@mui/material";
import TextArea from "../../Component/textArea";
import CloseIcon from "@mui/icons-material/Close";

const ModalAddComment = (props) => {
  const [comment, setComment] = useState("");
  const Name = JSON.parse(localStorage.getItem("quadrant"));

  return (
    <>
      <Modal
        open={props?.open}
        onClose={props?.onClickOpen}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            overflow: "hidden",
            overflowY: "scroll",
            width: "50%",
            height: "75%",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h2 style={{ width: "100%" }} id="parent-modal-title">
              New Comment
            </h2>
            <CloseIcon onClick={() => props?.onClickOpen()} />
          </div>
          <div>
            <TextArea
              value={comment}
              disable={false}
              label={"Comment"}
              onChange={(v) => setComment(v?.target?.value)}
              style={{ width: "100%", marginTop: 10 }}
            />
            <div style={{ marginTop: "10px" }}>
              <Button
                onClick={() =>
                  props?.submit({
                    id: props?.id,
                    title: props?.title,
                    content: props?.content,
                    commentsList: [
                      {
                        comment: comment,
                        user_name: Name.namaPengguna,
                      },
                    ],
                  })
                }
                variant="contained"
              >
                Save
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};
export default ModalAddComment;
