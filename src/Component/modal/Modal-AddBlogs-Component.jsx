import React, { useState, useEffect } from "react";
import { Modal, Box, Button, InputLabel, FormControl } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CloseIcon from "@mui/icons-material/Close";
import Input from "../../Component/input";
import TextArea from "../../Component/textArea";
import Selects from "react-select";

const ModalAddBlogs = (props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState([]);
  const Name = JSON.parse(localStorage.getItem("quadrant"));
  const optionsTech = [
    { value: "frontend", label: "Frontend" },
    { value: "ui/ux", label: "UI/UX" },
    { value: "design", label: "Design" },
  ];
  const optionsTravel = [
    { value: "montain", label: "Montain" },
    { value: "island", label: "Island" },
    { value: "beach", label: "Beach" },
  ];
  const optionsFood = [
    { value: "meet Ball", label: "Meet Ball" },
    { value: "pasta", label: "Pasta" },
    { value: "steak", label: "Steak" },
  ];
  const cat = ["Tech", "Travel", "Food"];

  const convertValue = (v) => {
    let arr = [];

    v?.map((d) => {
      arr.push(d?.value);
    });

    return arr;
  };

  const change = (v) => {
    setSubCategory(v);
  };

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
              New Blog
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
            <FormControl
              sx={{ marginTop: 2, width: "100%" }}
              variant="outlined"
            >
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Category"
                onChange={(v) => {
                  setCategory(v?.target?.value);
                }}
              >
                {cat?.map((d, i) => {
                  return <MenuItem value={d}>{d}</MenuItem>;
                })}
              </Select>
            </FormControl>

            <div style={{ marginTop: 10 }}>
              <Selects
                onChange={(v) => change(v)}
                value={subCategory}
                placeholder={"Sub Category"}
                isMulti
                options={
                  category === "Tech"
                    ? optionsTech
                    : category === "Food"
                    ? optionsFood
                    : category === "Travel"
                    ? optionsTravel
                    : []
                }
              />
            </div>
            <div style={{ marginTop: "10px" }}>
              <Button
                onClick={() =>
                  props?.submit({
                    user_name: Name.namaPengguna,
                    title,
                    category,
                    subCategory: convertValue(subCategory),
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
export default ModalAddBlogs;
