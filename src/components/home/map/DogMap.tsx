import { useEffect } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

const DogMap: React.FC = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=5f4cba23c8b97ee09362b0fc03c5b2f4&autoload=false`;
    script.async = true;

    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        if (container) {
          const options = {
            center: new window.kakao.maps.LatLng(37.54699, 127.09598), // 지도의 중심좌표
            level: 3, // 지도의 확대 레벨
          };

          // MAP 객체
          const map = new window.kakao.maps.Map(container, options);

          // 마커 이미지 설정
          const imageSrc =
              "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png", // 마커이미지의 주소입니다
            imageSize = new window.kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
            imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

          // 마커의 이미지 정보를 가지고 마커 이미지를 생성
          const markerImage = new window.kakao.maps.MarkerImage(
              imageSrc,
              imageSize,
              imageOption
            ),
            markerPosition = new window.kakao.maps.LatLng(37.54699, 127.09598); // 마커가 표시될 위치입니다

          // 마커를 생성합니다
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
            image: markerImage, // 마커이미지 설정
          });

          marker.setMap(map);
        }
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="w-full h-full">
      <div id="map" className="w-[100%] h-[100%]"></div>
    </div>
  );
};
export default DogMap;
