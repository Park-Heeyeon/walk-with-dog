# 함께 산책할 개 🐾

"함께 산책할 개" 프로젝트는 가까운 지역에 사는 반려견을 키우는 사용자들이 쉽게 소통하고 함께 산책할 친구를 찾을 수 있는 서비스입니다.

## 프로젝트 개요

이 프로젝트는 **pnpm**과 **Vite**를 사용한 빌드 환경으로 **Next.js**를 사용했습니다. 
회원 정보 유효성 검사 및 사용자 인증, 같은 구 내의 사용자를 지도에 표시, 채팅 기능으로 이루어진 프로젝트입니다.

## 주요 기능

- **회원가입 및 로그인**
  - **Zod**를 사용한 회원가입 정보 유효성 검사
  - **useFunnel** 패턴을 활용하여 단계별 회원가입 진행
  - **NextAuth** 및 **bcrypt**를 통한 안전한 로그인 및 비밀번호 해시 암호화
- **메인 화면 분기 처리**
  - 로그인 여부에 따라 다른 메인 화면 제공
    - **로그인 시**: 같은 구 내의 반려견 아이콘을 지도에 표시
    - **비로그인 시**: 로그인/회원가입 페이지로 이동 가능한 버튼 표시
- **반려견 위치 표시**
  - **카카오맵 API**를 사용하여 사용자가 설정한 위치를 지도에 표시
- **실시간 채팅**
  - **Socket.io**를 이용한 실시간 채팅 기능 제공
- **다중 모달 관리**
  - **Zustand**를 활용하여 다중 모달 상태를 전역에서 관리
  - 여러 모달을 동시에 열고 닫을 수 있는 기능 제공

## 기술 스택

- **프론트엔드**: Next.js, Vite
- **스타일링**: TailwindCSS, shadcn/ui
- **상태 관리**: Zustand
- **데이터 관리**: React-Query
- **지도**: 카카오맵 API
- **입력 유효성 검사**: Zod
- **사용자 인증**: NextAuth, bcrypt
- **실시간 통신**: Socket.io

## 기능별 화면

- **메인화면**
  - **미로그인/로그인**
    <p align="center">
      <img width="367" alt="스크린샷 2024-11-08 오후 5 28 02" src="https://github.com/user-attachments/assets/48e43220-8a8f-4207-8b72-4599ad4e53c9">
      <img width="367" alt="스크린샷 2024-11-08 오후 5 28 02" src="https://github.com/user-attachments/assets/28d85b3e-53b2-4915-8e33-bc7ec4f91753">
      <img width="367" alt="스크린샷 2024-11-08 오후 5 28 02" src="https://github.com/user-attachments/assets/3d872478-8476-42ab-a8ab-3ca9e5a0a7a7">
      <img width="367" alt="스크린샷 2024-11-08 오후 5 28 02" src="https://github.com/user-attachments/assets/2e42df3f-0891-41a9-a805-401a41c32cc8">
    </p>
    
- **로그인화면**
    <p align="center">
      <img width="366" alt="스크린샷 2024-11-08 오후 5 28 54" src="https://github.com/user-attachments/assets/27715eeb-ff91-4c55-9ee8-29664d00bb66">
    </p>

- **회원가입화면**
  <p align="center">
    <img width="370" alt="스크린샷 2024-11-08 오후 5 28 10" src="https://github.com/user-attachments/assets/961fe10c-7e6e-4368-b8ba-58a426c99b23">
    <img width="366" alt="스크린샷 2024-11-08 오후 5 31 03" src="https://github.com/user-attachments/assets/ab612fea-bc16-4df0-80c9-b9fa32d45154">
  </p>

- **채팅화면**
  <p align="center">
    <img width="366" alt="스크린샷 2024-11-08 오후 5 31 03" src="https://github.com/user-attachments/assets/35da0ef8-6828-4127-80a6-ace0ba8c4976" />
  </p>
