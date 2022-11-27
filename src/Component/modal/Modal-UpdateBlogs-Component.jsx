import React, { useState } from "react";
import { Modal, Box, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Input from "../../Component/input";
import TextArea from "../../Component/textArea";

const ModalUpdateBlogs = (props) => {
  const [title, setTitle] = useState(props?.title);
  const [content, setContent] = useState(props?.content);

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
            width: "80%",
            height: "90%",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h2 style={{ width: "100%" }} id="parent-modal-title">
              Update Blog
            </h2>
            <CloseIcon onClick={() => props?.onClickOpen()} />
          </div>
          <div>
            <Input
              value={title}
              disable={false}
              label={"Title"}
              onChange={(v) => setTitle(v?.target?.value)}
              style={{ width: "100%" }}
            />
            <TextArea
              value={content}
              disable={false}
              label={"Description"}
              onChange={(v) => setContent(v?.target?.value)}
              style={{ width: "100%", marginTop: 10 }}
            />
            <div style={{ marginTop: "10px" }}>
              <Button
                onClick={() =>
                  props?.submit({
                    id: props?.id,
                    title,
                    content,
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
export default ModalUpdateBlogs;
