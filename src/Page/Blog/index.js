import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import Chip from "../../Component/common/Chip";
import EmptyList from "../../Component/common/EmptyList";
import ModalAddComment from "../../Component/modal/Modal-AddComment-Component";
import ModalUpdateBlogs from "../../Component/modal/Modal-UpdateBlogs-Component";
import "./styles.css";
import {
  getData,
  increaseViewer,
  contentAddComments,
  contentUpdate,
  deleteContent,
} from "../../Config/Api-new";
import { alertSuccess, alertError } from "../../Component/alert/sweetalert";
import { Link } from "react-router-dom";

const Blog = () => {
  const [modal, setModal] = React.useState();
  const [modalUpdate, setModalUpdate] = React.useState();
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const history = useHistory();
  const Name = JSON.parse(localStorage.getItem("quadrant"));

  useEffect(() => {
    getItem();
  }, []);

  const getItem = async () => {
    let blog = await getData(parseInt(id));
    let item = {
      id: blog.data.id,
      title: blog.data.title,
      category: blog.data.category,
      subCategory: blog.data.subCategory,
      description: blog.data.content,
      authorName: blog.data.user_name,
      authorAvatar: "/assets/images/author.jpg",
      createdAt: blog.data.posting_date,
      view_counter: blog.data.view_counter,
      commentsList: blog.data.commentsList,
    };
    if (item) {
      setBlog(item);
    }
  };

  const addViewer = async () => {
    let res = await increaseViewer(parseInt(id));
    if (res?.status) {
      history.push("/");
      window.location.reload();
    }
  };

  const addComment = () => {
    setModal(true);
  };

  const updateBlog = () => {
    setModalUpdate(true);
  };

  const submitComment = async (data) => {
    let res = await contentAddComments(data);
    if (res?.status) {
      setModal(false);
      alertSuccess("Success", "");
      getItem();
    } else {
      setModal(false);
      alertError("Error", "Fail add new comment");
    }
  };

  const submitBlogs = async (data) => {
    let res = await contentUpdate(data);
    if (res?.status) {
      setModalUpdate(false);
      alertSuccess("Success", "");
      getItem();
    } else {
      setModalUpdate(false);
      alertError("Error", "Fail update blog");
    }
  };

  const deleteBlog = async () => {
    let res = await deleteContent(parseInt(id));
    if (res?.status) {
      alertSuccess("Delete Successfull", "");
      history.push("/");
      window.location.reload();
    } else {
      alertError("Error", "Fail delete blog");
    }
  };

  return (
    <>
      <Link className="blog-goBack" onClick={addViewer}>
        <span> &#8592;</span> <span>Go Back</span>
      </Link>
      {blog ? (
        <div>
          <div className="blog-wrap">
            <header>
              <p className="blog-date">Published {blog.createdAt}</p>
              <p className="blog-viewers">Viewers : {blog.view_counter}</p>
              <h1>{blog.title}</h1>
              <div className="blog-subCategory">
                {blog.subCategory.map((category, i) => (
                  <div key={i}>
                    <Chip label={category} />
                  </div>
                ))}
              </div>
            </header>
            <p className="blog-desc">{blog.description}</p>
            <div className="addBlog-wrap">
              <button onClick={addComment}>Add Comment</button>
            </div>
            {blog?.authorName === Name.namaPengguna ? (
              <button onClick={updateBlog}>Update Content</button>
            ) : (
              ""
            )}
            <div className="addBlog-wrap">
              <button onClick={deleteBlog}>Delete Content</button>
            </div>
          </div>
          <h5>Comments :</h5>
          {blog?.commentsList.map((d, i) => {
            return (
              <div className="blog-wrap">
                <div>
                  <div>
                    <h6>
                      {d.user_name} : <h7>{d.comment}</h7>
                    </h6>
                    <h8>Posting Date : {d.comment_date}</h8>
                  </div>
                </div>
              </div>
            );
          })}

          <ModalAddComment
            open={modal}
            id={parseInt(id)}
            title={blog?.title}
            content={blog?.description}
            submit={(data) => submitComment(data)}
            onClickOpen={() => setModal(!modal)}
          />
          <ModalUpdateBlogs
            open={modalUpdate}
            id={parseInt(id)}
            title={blog?.title}
            content={blog?.description}
            submit={(data) => submitBlogs(data)}
            onClickOpen={() => setModalUpdate(!modalUpdate)}
          />
        </div>
      ) : (
        <EmptyList />
      )}
    </>
  );
};

export default Blog;
