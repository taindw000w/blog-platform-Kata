import { React, useState, useEffect, useCallback } from "react";
import { Article } from "../article/article";

import { fetchSearch } from "../services/index";
import { fetchArticlesList } from "../services/index";

import { Pagination } from "antd";
import { Oval } from "react-loader-spinner";
import "../../../node_modules/react-loader-spinner/dist/loader/Oval";
import "../../../node_modules/antd/dist/antd.css";
import './articles.scss'

export const Articles = () => {
  const [posts, setPosts] = useState();
  const [postsCount, setPostsCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const token = localStorage.getItem('token')
  const page_size = 5;

  const getPosts = useCallback(
    (page, page_size) => {
      fetchArticlesList(page, page_size, token)
        .then((result) => {
          setPosts(result.articles);
          setPostsCount(result.articlesCount);
          return result;
        })
        .catch((error) => {
          throw Error("Сообщение об ошибке: " + error.message);
        });
    },
    [fetchSearch]
  );
  
  useEffect(() => {
    getPosts()
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    getPosts(page, page_size);
  };
  
  return (
    <div className="wrapper-articles-block">
      <ul className="aticle-list">
        {posts === undefined ? (
          <div className="oval-wrapper">
            <Oval
              height={50}
              width={50}
              color="#00cfff"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#0888a6"
              strokeWidth={1}
              strokeWidthSecondary={2}
              className="oval-loading"
            />
          </div>
        ) : (
          posts.map((article, index) => {
            return (
              <Article
                author={article.author}
                body={article.body}
                date={article.createdAt}
                description={article.description}
                favorited={article.favorited}
                favoritesCount={article.favoritesCount}
                slug={article.slug}
                tagList={article.tagList}
                title={article.title}
                updateAt={article.updateAt}
                key={index}
              />
            );
          })
        )}
      </ul>
      <Pagination
        total={postsCount}
        current={currentPage}
        pageSize={page_size}
        responsive
        onChange={handlePageChange}
        className="pagination"
        showSizeChanger={false}
      />
    </div>
  );
}