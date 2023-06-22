import React, { useEffect, useState } from "react";
import "../../Global.scss";
import "./index.scss";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { getInspirations } from "@/service/inspirations";
import { getImgSrc } from "@/utils/HelperFn";

const Intro = () => {
  const [content, setContent] = useState([]);
  const [counter, setCounter] = useState(0);
  const counterValid = counter < 100;

  useEffect(() => {
    const intervalId = counterValid && setInterval(() => setCounter((t) => t + 1), 100);
    return () => clearInterval(intervalId)
  }, [counterValid]);

  useEffect(() => {
    if (counter >= 100) {
      const tl = gsap.timeline();
      tl.to('.loader', {
        duration: 7,
        y: -2000,
        ease: "power1.out",
      }, 0)
        .to('.holder', {
          duration: 1,
          opacity: 1,
          x: 0,
          y: 0,
          ease: "sine.out",
        }, 0)
    }
  }, [counter]);

  useEffect(() => {
    getInspirations().then((res) => {
      setContent(res);
    });
  }, []);

  useEffect(() => {
    if (content.length > 0 && window.innerWidth >= 991) {
      const holder = document.querySelector(".holder");
      let overflowX, mapPositionX, overflowY, mapPositionY;

      const onResize = (e) => {
        overflowX = holder.offsetWidth - window.innerWidth;
        mapPositionX = gsap.utils.mapRange(
          0,
          window.innerWidth,
          overflowX / 2,
          overflowX / -2
        );
        overflowY = holder.offsetHeight - window.innerHeight;
        mapPositionY = gsap.utils.mapRange(
          0,
          window.innerHeight,
          overflowY / 2,
          overflowY / -2
        );
      };
      const onMouseMove = (e) => {
        if (overflowX > 0 || overflowY > 0) {
          let x =
            e.clientX || (e.changedTouches && e.changedTouches[0].clientX) || 0;
          let y =
            e.clientY || (e.changedTouches && e.changedTouches[0].clientY) || 0;
          gsap.to(holder, {
            duration: 1,
            overwrite: true,
            ease: "power3",
            x: mapPositionX(x),
            y: mapPositionY(y),
          });
        }
      };
      window.addEventListener("resize", onResize);
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("touchmove", onMouseMove);
      document.addEventListener("pointermove", onMouseMove);
      onResize();
    }
  }, [content]);

  const selectedImagesIdx = (idx) => {
    if (window.innerWidth >= 991) return true;
    // TOTAL NUMBER OF IMAGES ARE 32 AT THE MOMENT AND
    // YOU CAN CHOOSE FROM INDEX 0 to 31 IN THE LIST BELOW
    const selectedIdx = [2, 4, 5, 7, 10, 14];
    const sIdx = selectedIdx.findIndex((s) => s === idx);
    return sIdx > -1;
  };

  return (
    <div className="wrapper">
      <div className="container">
        <div className="loader">
          <p className="loading">{counter}</p>
        </div>
        <div className="holder">
          {content?.map(
            (c, idx) =>
              !c?.image?.includes("mp4") && selectedImagesIdx(idx) && (
                <div
                  key={`${idx}-${c?.title}`}
                  className="block"
                  style={{ backgroundImage: `url(${getImgSrc(c?.image)})` }}
                  alt={getImgSrc(c?.image)}
                />
              )
          )}
          <div className="begin-container">
            <h1>
              "Embark on a Journey of Inspiration. Step Inside and Explore!"
            </h1>
            <Link to="/search">
              <button className="enter-btn">Enter</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
