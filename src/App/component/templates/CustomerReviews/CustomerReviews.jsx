import React from "react";
import styles from "./CustomerReviews.module.css";
import CardReview from "../../organisms/Home/CardReview/CardReview";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";
import { Reviews } from "./Reviews";
const CustomerReviews = () => {
  return (
    <div className={styles.ReviewsWrapper}>
      <h1>What People are Saying</h1>

      <div className={styles.sliderWrapper}>
        <Splide
          options={{
            rewind: true,
            width: "100%",
            arrows: false,
            gap: "10px",
            perPage: 3,
            breakpoints: {
              1100: {
                perPage: 2,
              },
              750: {
                perPage: 1,
              },
            },
          }}
        >
          {Reviews.map((Each) => (
            <SplideSlide>
              <CardReview
                review={Each.review}
                img={Each.img}
                name={Each.name}
                belowName={Each.belowName}
              />
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  );
};
export default CustomerReviews;
