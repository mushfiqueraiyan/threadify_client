import React from "react";
import Banner from "./Banner/Banner";
import TagsSection from "./Tags";
import AllPosts from "./AllPosts";
import Announcement from "./Announcement";

const Home = () => {
  return (
    <div>
      <Banner />
      <TagsSection />
      <Announcement />
      <AllPosts />
    </div>
  );
};

export default Home;
