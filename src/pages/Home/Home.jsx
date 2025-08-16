import React from "react";
import Banner from "./Banner/Banner";
import TagsSection from "./Tags";
import AllPosts from "./AllPosts";
import Announcement from "./Announcement";
import Feature from "./Feature";

const Home = () => {
  return (
    <div>
      <Banner />
      <TagsSection />
      <Announcement />
      <AllPosts />
      <Feature />
    </div>
  );
};

export default Home;
