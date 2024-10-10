import * as React from "react";
import ImageGallery from "react-image-gallery";
import chamcong from "@/asset/images/chamcong.png";
import tinhluong from "@/asset/images/tinhluong.png";
import lienket from "@/asset/images/lienketdoanhnhgoep.png";

export interface IStartTabImageProps {
  tab: number;
  setTab: React.Dispatch<React.SetStateAction<number>>;
}

const images = [
  {
    original: (
      <div
        className="w-full h-full bg-blue-400"
        style={{
          background: `url(${chamcong}) center center / cover no-repeat `,
        }}
      ></div>
    ),
    // thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: (
      <img
        className="w-full h-full bg-red-400"
        style={{
          background: `url(${tinhluong}) center center / cover no-repeat `,
        }}
      ></img>
    ),
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: (
      <div
        className="w-full h-full bg-green-400"
        style={{
          background: `url(${lienket}) center center / cover no-repeat `,
        }}
      ></div>
    ),
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
];

let timer: number | null = null;
export default function StartTabImage(props: IStartTabImageProps) {
  const scrollBar = React.useRef<HTMLDivElement | null>(null);
  const handleSilce = (val) => {
    props.setTab(val);
  };

  const handleClick = () => {
    const newTab = props.tab === images.length - 1 ? 0 : props.tab + 1;
    props.setTab(newTab);
  };

  React.useEffect(() => {
    if (scrollBar.current) {
      console.log(scrollBar.current.scrollWidth, scrollBar.current.scrollLeft);

      scrollBar.current.scrollLeft = Math.floor(
        (scrollBar.current.scrollWidth * props.tab) / images.length
      );
    }
  }, [props.tab]);

  return (
    <div
      ref={scrollBar}
      onClick={handleClick}
      className="h-full w-full overflow-x-hidden flex flex-nowrap snap-x snap-proximity"
      // onScroll={(e) => {
      //   const index = Math.floor(
      //     (e.currentTarget.scrollLeft / e.currentTarget.scrollWidth) *
      //       images.length
      //   );
      //   handleSilce(index);
      // }}
      // onScroll={() => {
      //   if (timer !== null) {
      //     clearTimeout(timer);
      //   }
      //   timer = setTimeout(handleClick, 150);
      // }}
    >
      {images.map((image, index) => (
        <div key={index} className="snap-center shrink-0 w-full h-full">
          {image.original}
        </div>
      ))}
    </div>
  );
}

// return (
//   <div className="h-full w-full overflow-x-scroll flex flex-nowrap snap-x">
//     {images.map((image, index) => (
//       <div key={index} className="snap-center shrink-0 w-full h-full">
//         {image.original}
//       </div>
//     ))}
//   </div>
// );
