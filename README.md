# 브라우저 메모장, 모메 (mome)

실행 : https://mcnorton.github.io/mome/

* 웹브라우저의 홈페이지나 새 탭 기본페이지로 지정하여 시간/날짜/메모/할일관리 등을 할 수 있는 페이지
* 구글 크롬브라우저의 유명한 모멘텀의 클론 (Google Chrome Extention "Momentum" Clone)
* 기록한 모메, 아니 메모는 사용자의 웹 브라우저 로컬 저장공간에 안전하게 기록

![screen_memo_hd](https://user-images.githubusercontent.com/4551495/145520765-96e5085f-88bc-4c2b-bd85-5e37fa8d4402.png)



## 특징
* 웹폰트를 적용하여 보기에 좋습니다.
* Vanilla Javascript, HTML, CSS 로만 제작하였습니다.
* 완료된 할일과 메모를 체크하면, 천천히 사라지는 애니메이션이 마음을 경건하게(?) 해줍니다.
* 웹 브라우저의 크기와 화면 크기에 따라 글꼴의 크기가 적절히 조절됩니다.
* 웹 브라우저의 '확장프로그램'을 이용해, **새 탭에서 자동**으로 열면 편리합니다.

## 용도
* 개인 메모보드로 활용하기.
* 교실의 대형 화면에 현재시각과 수업안내, 알림장 등 보여주기.
* 예약알림 스크린보드로 활용. (<F11> 전체화면 이용)
* 사무실의 일정안내, 예약확인, 업무대쉬보드 등...

## 히스토리
* 2021.10.15. 시작
* 2021.12.08. 코드 최적화
* 2022.01.26. 반응형 웹 적용, Fixed Font로 변경, 배경화면 고정

## 예정
* README 도움말 연결 버튼
* 시계 위치 조정
* 배경화면 종류 추가




---

# 도움말

## 새 탭에서 Mome 를 자동으로 열어보자
새 탭을 열 때, Mome 페이지를 자동으로 열리도록 하면 엄청나게 편리함.

![CustomNewTabURL](https://lh3.googleusercontent.com/4lCsO0HhSqwN-U68QDFgVhLWb285-pfcoX_PHV5C6J6WuLSadROAD5iQm8kKmE8xM0qmh6XUQ0Wf0NtxFLkyB7t2=w640-h400-e365-rj-sc0x00ffffff)

### 1. 'Custom New Tab URL' 설치
* 크롬 > 설정 > 도구 더보기 > 확장프로그램 > 'Custom New Tab URL' 설치. https://chrome.google.com/webstore/detail/custom-new-tab-url/mmjbdbjnoablegbkcklggeknkfcjkjia/

![INSTALL](https://user-images.githubusercontent.com/4551495/148336679-ba75b0e3-1129-44f8-a3d4-58eabe255c41.png)

### 2. MOME의 URL을 추가
* 설치완료 후, 새 탭을 열고, [Enable] 체크
* [URL or Local file path]에 https://mcnorton.github.io/mome/ 입력하고 [Save]

![CONFIG](https://user-images.githubusercontent.com/4551495/148336958-b271b12e-b4c3-413c-aa4f-3ea80d6efc9b.png)


## Special Thanks!
* 노마드코더 Vanilla JS Course - https://nomadcoders.co/
