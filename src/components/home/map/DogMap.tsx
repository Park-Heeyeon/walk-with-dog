import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

const DogMap: React.FC = () => {
  const { data: { user } = {} } = useSession();

  const addressSearch = () => {
    return new Promise<{ lat: number; lng: number }>((resolve, reject) => {
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(user?.address, (res: any, status: string) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const lat = res[0].y;
          const lng = res[0].x;
          resolve({ lat, lng });
        } else {
          reject("Failed to retrieve coordinates");
        }
      });
    });
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=5f4cba23c8b97ee09362b0fc03c5b2f4&autoload=false&libraries=services`;
    script.async = true;

    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(async () => {
        try {
          const coords = await addressSearch();

          const container = document.getElementById("map");
          if (container && coords) {
            const options = {
              center: new window.kakao.maps.LatLng(coords.lat, coords.lng), // 지도의 중심좌표를 사용자의 위치로 설정
              level: 3, // 지도의 확대 레벨
            };

            const map = new window.kakao.maps.Map(container, options);

            // 마커 이미지 설정
            const imageSrc = "/images/marker_img.png",
              imageSize = new window.kakao.maps.Size(64, 69),
              imageOption = { offset: new window.kakao.maps.Point(27, 69) };

            const markerImage = new window.kakao.maps.MarkerImage(
              imageSrc,
              imageSize,
              imageOption
            );
            const markerPosition = new window.kakao.maps.LatLng(
              coords.lat,
              coords.lng
            );

            // 마커 생성 및 지도에 추가
            const marker = new window.kakao.maps.Marker({
              position: markerPosition,
              image: markerImage,
            });
            marker.setMap(map);
          }
        } catch (error) {
          console.error(error);
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
