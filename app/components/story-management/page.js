"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./storyManagement.module.css";
import Header from "../header/page";
import Footer from "../footer/page";

export default function StoryManagement() {
  const [stories, setStories] = useState([]);
  const [newStory, setNewStory] = useState({ title: "", content: "" });
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");

    if (!token || role !== "Admin") {
      router.push("/login");
    } else {
      fetchStories(); // Fetch all stories at once
    }
  }, [router]);

  const fetchStories = () => {
    const token = Cookies.get("token");

    axios
      .get("http://localhost:4000/api/story", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setStories(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy truyện:", error);
      });
  };

  const handleCreateStory = () => {
    const token = Cookies.get("token");

    if (newStory.title && newStory.content) {
      axios
        .post(
          "http://localhost:4000/api/story",
          { title: newStory.title, content: newStory.content },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setStories([...stories, response.data]);
          setNewStory({ title: "", content: "" });
        })
        .catch((error) => {
          console.error("Lỗi khi tạo truyện:", error);
        });
    }
  };

  const handleDeleteStory = (storyId) => {
    const token = Cookies.get("token");

    axios
      .delete(`http://localhost:4000/api/story/${storyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setStories(stories.filter((story) => story.id !== storyId));
      })
      .catch((error) => {
        console.error("Lỗi khi xóa truyện:", error);
      });
  };

  // Pagination logic
  const totalPages = Math.ceil(stories.length / pageSize);
  const paginatedStories = stories.slice(
    pageIndex * pageSize,
    (pageIndex + 1) * pageSize
  );

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.content}>
        <h1 className={styles.pageTitle}>Quản lý truyện</h1>

        <div className={styles.newStoryForm}>
          <h2 className={styles.newStoryFormTitle}>Tạo truyện mới</h2>
          <input
            type="text"
            placeholder="Tiêu đề truyện"
            value={newStory.title}
            onChange={(e) =>
              setNewStory({ ...newStory, title: e.target.value })
            }
            className="form-control mb-3"
          />
          <textarea
            placeholder="Nội dung truyện"
            value={newStory.content}
            onChange={(e) =>
              setNewStory({ ...newStory, content: e.target.value })
            }
            className="form-control mb-3"
          ></textarea>
          <button onClick={handleCreateStory} className="btn btn-success">
            Tạo truyện
          </button>
        </div>

        <table className={`table table-bordered mt-4 ${styles.table}`}>
          <thead>
            <tr>
              <th>Tiêu đề</th>
              <th>Nội dung</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {paginatedStories.map((story) => (
              <tr key={story.id}>
                <td>{story.title}</td>
                <td>{story.content}</td>
                <td>
                  <button
                    onClick={() => handleDeleteStory(story.id)}
                    className="btn btn-danger"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={`pagination mt-3 ${styles.pagination}`}>
          <button
            className="btn btn-primary me-2"
            onClick={() => setPageIndex(0)}
            disabled={pageIndex === 0}
          >
            {"<<"}
          </button>
          <button
            className="btn btn-primary me-2"
            onClick={() => setPageIndex(pageIndex - 1)}
            disabled={pageIndex === 0}
          >
            {"<"}
          </button>
          <button
            className="btn btn-primary me-2"
            onClick={() => setPageIndex(pageIndex + 1)}
            disabled={pageIndex === totalPages - 1}
          >
            {">"}
          </button>
          <button
            className="btn btn-primary me-2"
            onClick={() => setPageIndex(totalPages - 1)}
            disabled={pageIndex === totalPages - 1}
          >
            {">>"}
          </button>
          <span className="mx-3">
            Trang <strong>{pageIndex + 1}</strong> trên {totalPages}
          </span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="form-select"
          >
            {[5, 10, 20].map((size) => (
              <option key={size} value={size}>
                Hiển thị {size}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Footer />
    </div>
  );
}
