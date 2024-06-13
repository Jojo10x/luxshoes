import HeroSection from "./HeroSection";
import QuickView from "./QuickView";
import Collections from "./Collections";
import ImageGallery from "../../components/ImageGallery";
import ImageUpload from "../../components/AddProduct";

const Home = () => {
  return (
    <>
      <HeroSection />
      <ImageGallery/>
      <ImageUpload/>
      <QuickView />
      <Collections />
    </>
  );
};

export default Home;
