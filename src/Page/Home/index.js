import React, { useEffect, useState } from "react";
import EmptyList from "../../Component/common/EmptyList";
import BlogList from "../../Component/Home/BlogList";
import Header from "../../Component/Home/Header";
import SearchBar from "../../Component/Home/SearchBar";
import ModalAddBlogs from "../../Component/modal/Modal-AddBlogs-Component";
import { alertSuccess, alertError } from "../../Component/alert/sweetalert";
import { contentAdd, getAll, getContentSearch } from "../../Config/Api-new";
import "./styles.css";

function Home(props) {
  const [modal, setModal] = React.useState();
  const [blogs, setBlogs] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    let blogs = await getAll();
    let blogList = [];
    for (let i = 0; i < blogs.data.length; i++) {
      blogList.push({
        id: blogs.data[i].id,
        title: blogs.data[i].title,
        category: blogs.data[i].category,
        subCategory: blogs.data[i].subCategory,
        description: blogs.data[i].content,
        authorName: blogs.data[i].user_name,
        authorAvatar: "/assets/images/author.jpg",
        createdAt: blogs.data[i].posting_date,
        view_counter: blogs.data[i].view_counter,
      });
    }
    setBlogs(blogList);
  };

  // Search submit
  const handleSearchBar = (e) => {
    e.preventDefault();
    handleSearchResults();
  };

  // Search for blog by category
  const handleSearchResults = async () => {
    let blogs = await getContentSearch(searchKey);
    let blogList = [];
    for (let i = 0; i < blogs.data.length; i++) {
      blogList.push({
        id: blogs.data[i].id,
        title: blogs.data[i].title,
        category: blogs.data[i].category,
        subCategory: blogs.data[i].subCategory,
        description: blogs.data[i].content,
        authorName: blogs.data[i].user_name,
        authorAvatar: "/assets/images/author.jpg",
        createdAt: blogs.data[i].posting_date,
        view_counter: blogs.data[i].view_counter,
      });
    }
    setBlogs(blogList);
  };

  // Clear search and show all blogs
  const handleClearSearch = async () => {
    let blogs = await getContentSearch("");
    let blogList = [];
    for (let i = 0; i < blogs.data.length; i++) {
      blogList.push({
        id: blogs.data[i].id,
        title: blogs.data[i].title,
        category: blogs.data[i].category,
        subCategory: blogs.data[i].subCategory,
        description: blogs.data[i].content,
        authorName: blogs.data[i].user_name,
        authorAvatar: "/assets/images/author.jpg",
        createdAt: blogs.data[i].posting_date,
        view_counter: blogs.data[i].view_counter,
      });
    }
    setBlogs(blogList);
    setSearchKey("");
  };

  const submitBlogs = async (data) => {
    let res = await contentAdd(data);
    if (res?.status) {
      setModal(false);
      alertSuccess("Success", "");
      getData();
    } else {
      setModal(false);
      alertError("Error", "Fail create new blog");
    }
  };
  const handleOpenModal = () => {
    setModal(true);
  };

  return (
    <>
      <div>
        {/* Page Header */}
        <Header />

        {/* Search Bar */}
        <SearchBar
          value={searchKey}
          clearSearch={handleClearSearch}
          formSubmit={handleSearchBar}
          handleSearchKey={(e) => setSearchKey(e.target.value)}
        />

        {/* Add Blogs */}
        <div className="addBlog-wrap">
          <button onClick={handleOpenModal}>Add Blog</button>
        </div>

        {/* Blog List & Empty View */}
        {!blogs.length ? <EmptyList /> : <BlogList blogs={blogs} />}
      </div>
      <div>
        <ModalAddBlogs
          open={modal}
          submit={(data) => submitBlogs(data)}
          onClickOpen={() => setModal(!modal)}
        />
      </div>
    </>
  );
}

export default Home;
