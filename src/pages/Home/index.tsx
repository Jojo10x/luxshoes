import HeroSection from "./HeroSection";
import QuickView from "./QuickView";
import Collections from "./Collections";
import ImageGallery from "../../components/ImageGallery";

const Home = () => {
  return (
    <>
      <HeroSection />
      {/* <ImageGallery/> */}
      <QuickView />
      <Collections />
    </>
  );
};

export default Home;
