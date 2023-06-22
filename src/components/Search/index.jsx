import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Masonry from "react-masonry-css";
import styled from "./index.module.scss";
import { getInspirations } from "@/service/inspirations";
import { getImgSrc } from "@/utils/HelperFn";
import { gsap } from "gsap";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [content, setContent] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const breakpointColumnsObj = {
    default: 6, // Number of columns for default breakpoint
    1100: 4, // Number of columns for 1100px breakpoint and above
    800: 3, // Number of columns for 800px breakpoint and above
    500: 2, // Number of columns for 500px breakpoint and above
  };

  useEffect(() => {
    getInspirations().then((res) => {
      setContent(res);
      setSearchResult(res);
    });
  }, []);

  const getSearchResult = () => {
    const res = content.filter((c) =>
      c?.title?.toLowerCase()?.includes(searchInput?.toLowerCase())
    );
    setSearchResult(res);
  };

  const handleOnClickSearchBtn = () => {
    getSearchResult();
  };

  const handleOnKeyDown = (e) => {
    if (e.keyCode === 13) getSearchResult();
  };

  const handleOnChange = (value) => {
    if (value.length <= 0) setSearchResult(content);
    setSearchInput(value);
  };

  const handleOnLoadImage = (e) => {
    if (e.target.complete) {
      gsap.to('.item', {
        delay: 3,
        duration: 1,
        scale: 1,
        y: 0,
        ease: "power1.inOut",
        stagger: {
          grid: [6, 6],
          from: "center",
          amount: 1.5,
        }
      });
    }
  }

  return (
    <>
      <div className={styled.header}>
        <Link to="/" className={styled.back}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-arrow-left-circle"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 8 8 12 12 16"></polyline>
            <line x1="16" y1="12" x2="8" y2="12"></line>
          </svg>
        </Link>
        <img src="/logo.svg" alt="Buyamia" />
        <div className={styled.bar}>
          <input
            className={styled.searchbar}
            type="text"
            placeholder="Search here"
            value={searchInput}
            onChange={(e) => handleOnChange(e.target.value)}
            onKeyDown={handleOnKeyDown}
          />
          <span onClick={handleOnClickSearchBtn}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-search"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
        </div>
      </div>
      {searchResult.length <= 0 && (
        <div className={styled.noResults}>
          <h3>No result found!</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-frown"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M16 16s-1.5-2-4-2-4 2-4 2"></path>
            <line x1="9" y1="9" x2="9.01" y2="9"></line>
            <line x1="15" y1="9" x2="15.01" y2="9"></line>
          </svg>
        </div>
      )}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {searchResult?.map((s, idx) => (
          <a
            key={`${s.title}-${idx}`}
            target="_blank"
            href={s.destinationurl}
            className={`${styled.item} item`}
          >
            <img
              loading="lazy"
              src={getImgSrc(s.image)}
              onLoad={handleOnLoadImage}
              alt={s.title}
            />
            <div className="buyamia-link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-arrow-up-right"
              >
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
              <h6>www.buyamia.com</h6>
            </div>
          </a>
        ))}
      </Masonry>
    </>
  );
};

export default Search;
