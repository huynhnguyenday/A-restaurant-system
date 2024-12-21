import MainSlider from "../components/MainSlider";
import ProductSlider from "../components/ProductSlider";
import Benefit from "../components/Benefit";
import BlogMain from "../components/BlogMain";
import BannerSwiper from "./website/BannerSwiper";

const Home = () => {
  return (
    <div>

        <BannerSwiper/>
      
        <MainSlider />
      
      
        <ProductSlider />
      
      
        <Benefit />
      
      
        <BlogMain />
      
    </div>
  );
};

export default Home;
