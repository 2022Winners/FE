# FE
FrontEnd-JavaScript, Vue

# 최종 프로젝트

## 1. 프로젝트 소개

본 프로젝트는 최종 프로젝트로, 이지연 고나령 김현지 협업으로 진행하였다.
주제는 "운동"으로, 운동 영상 정보와 리뷰 기능을 제공하고, 찜 목록과 팔로우 기능을 추가적으로 구현하여 운동 영상 기록 관리를 할 수 있는 웹 서비스이다. 
이번 프로젝트는 앞서 진행한 프론트엔드와 벡엔트 프로젝트의 결과물을 활용하여 DB 기능을 접목시켜 화면에서 실제 기능을 구현하는 프로젝트이다.

## 2. 프로젝트 결과물 소개

### 1. 메인 화면(비 로그인)

![1. 메인화면]
![2. 조회수 많은 인기영상]

![3. 전체영상 ]



![3. 부위별 영상]



- 메인 페이지에는 2개의 메뉴(로그인, 회원가입)을 제공하고, 로그인 한 경우 메뉴가 변경됨(마이페이지, 로그아웃)
- 메인 페이지 상단에는 로고와 메뉴가 보이고, 밑에 카테고리를 선택하는 버튼이 있음
- 영상 조회 부분에서는 조회수 기준으로 영상을 출력하는 최근 가장 많이 본 영상 상위 2개의 영상만 출력되도록
  video table에서 조회수 순으로 역정렬 후 2개만 select
- 영상 조회 부분 하단에는 선택한 카테고리의 영상만 출력하도록 하고, 기본값은 전체 조회로 설정되도록
  video table에서 선택한 파트의 영상만 select하고 선택한 파트가 없어 null일 경우에 전체 video select
- 카테고리 버튼을 누르면 해당 카테고리의 영상만 보이고, 어떤 카테고리를 선택했는지 영상 상단에 출력하도록 설정
- 영상 목록은 썸네일과 제목, 조회수로 구성된 카드 형태로 출력됨
- 각 영상의 썸네일을 클릭하면 해당 영상의 상세정보 페이지로 이동


### 2. 메인화면(로그인)
![5. 로그인 화면]
![5. 로그인 한 후 메인 화면]
![7. 로그인 후 생기는 영상별 찜하기 버튼]


- 로그인을 하면 해당 계정이 세션에 저장됨
- 로그인을 하면 현재 로그인 한 계정이 출력되고 그 옆으로 로그인했을 때의 메뉴가 출력됨
- 메인페이지를 누르면 현재 사용자가 찜한 영상 목록과 팔로우 정보를 조회하는 페이지로 이동
- 로그아웃을 누르면 해당 계정에서 로그아웃되고 세션을 제거함
- 로그인을 하면 조회수 옆에 찜하기 버튼이 생성되고, 해당 버튼을 누르면 마이페이지에서 조회 가능

### 3. 영상 상세 정보 화면

![수정완료]



- 메인 화면에서 영상의 썸네일을 누르면 영상 상세 정보 화면으로 이동
- 영상 상세 정보 화면에서는 메인 페이지로 이동하는 로고, 영상 제목, 해당 영상 플레이어, 영상 리뷰 목록 및 작성 버튼을 제공
- 해당 영상의 리뷰가 없으면 등록된 리뷰가 없다는 메시지를 출력하고, 등록된 리뷰가 있으면 해당 영상의 리뷰가 출력됨
- 리뷰 목록에는 리뷰 번호, 리뷰 제목, 작성자, 작성 시간이 출력되고, 리뷰 제목을 클릭하면 해당 리뷰의 상세 정보 화면으로 이동

### 4. 리뷰 상세 정보 화면
![리뷰수정화면]
![리뷰삭제]


- 리뷰 목록에서 리뷰 제목을 클릭하면 리뷰 상세 정보 화면으로 이동
- 리뷰 상세 정보 화면에서는 해당 리뷰 번호를 활용하여 리뷰 내용을 불러오기 기능 제공
- 리뷰를 수정한 후 수정을 누르면 수정 사항이 반영
- 삭제를 누르면 해당 리뷰는 삭제됨
- 취소를 누르면 이전 페이지로 이동

- 리뷰 수정 시 제목과 내용만 수정 가능하고 작성자와 시간은 자동으로 입력됨

### 5. 리뷰 작성 화면
![리뷰작성화면]

- 리뷰 목록 상단에 리뷰 작성하기 버튼을 누르면 해당 영상에 대한 리뷰를 작성하는 페이지로 이동
- 작성자는 리뷰 제목, 작성자 이름, 리뷰 내용을 기재 후 등록을 누르면 해당 리뷰가 저장되고, 취소를 누르면 이전 페이지로 이동

### 6. 회원가입 화면
![6. 회원가입 화면]
![6. 회원가입 화면-작성본]
![6. 이미 존재하는 회원]

- DB를 활용하여 회원가입 진행 전 입력값에 대한 유효성 검증 진행
- 입력한 값이 이미 존재하는 계정일 경우 예외 처리 페이지로 이동
  -> DB에서 모든 회원의 정보를 select해 회원가입시 입력한 id와 일치하는 회원이 있는지 확인하고 없으면 그때 DB에 회원정보 추가
- 요소별 입력값에 맞춰 input 태그의 type을 설정하여 데이터를 입력했지만 올바른 형식이 아닐 경우 제출 안되도록 설정
- 로고를 누르면 메인 페이지로 이동
- 예외 페이지에서 다시 입력하기 버튼을 누르면 회원가입 창으로 이동


### 7. 로그인 화면

![5.로그인 화면 - 작성본]

![5. 로그인 한 후 메인 화면]

![11. 회원 탈퇴 후 로그인 시도하면 실패]

- 로그인 메뉴를 선택하면 로그인 페이지로 이동
- 사용자는 본인의 아이디와 비밀번호를 누른 후 로그인 버튼을 누르면 정상 입력값이면 메인 페이지로 이동하고, 잘못된 입력값이면 예외 처리     페이지로 이동 -> DB에서 모든 회원 정보 SELECT 한 후 회원 정보 중 ID와 비밀번호가 일치하는 회원이 있는 지 확인 후 있으면 세션에 로그인 정보 저장
- 메인 페이지로 이동하는 로고 제공

### 8. 마이페이지 화면

![찜 2개 누른 마이페이지 화면]
![찜 1개 취소 버튼 누른 후 마이페이지 화면]

![12. 마이페이지 화면]
![13. 회원 팔로우 후 화면]

- 로그인을 하면 상단의 메뉴는 마이페이지와 로그아웃으로 변경됨
- 마이페이지를 누르면 해당 계정의 마이페이지 화면으로 이동
- 메인 화면에서 찜하기 버튼을 누르면 해당 영상 정보가 마이 페이지로 이동
- 연동된 DB에 해당 유저가 누른 찜 영상들이 저장되도록 함.
- 찜한 영상 목록에서 영상 제목을 누르면 해당 영상의 상세 정보 화면으로 이동
- 찜 취소 버튼을 누르면 해당 영상을 목록에서 제거하고 DB에서도 해당 정보를 삭제 후 마이 페이지 새로고침 
- 메인 페이지로 이동하는 로고 제공
- 세션 정보와 연동하여 해당 계정에 대한 정보가 출력하도록 설정
- 찜한 영상 하단에는 회원 팔로우/팔로잉 목록 출력
- 내가 팔로우 한 사람 목록과 나를 팔로우 한 사람 목록을 구분하여 출력
- 내가 팔로우하지 않은 사람 이름 옆에는 팔로우 버튼이 보이고, 누르면 내가 팔로우 한 사람으로 추가된 팔로워 목록 화면이 출력
- 내가 팔로우한 사람 이름 옆에는 팔로우 취소 버튼이보이고, 누르면 팔로잉 목록에서 제거된 화면이 출력

### 9. 회원수정 , 회원 탈퇴
![8. 회원 정보 수정 화면]
![9. 회원 정보 수정 후 다시 수정하기 눌렀을 때 보이는 화면]

- 로그인 후 생기는 마이페이지 상단에 회원 수정, 회원 탈퇴 버튼
- 회원 수정 버튼을 누르면 회원가입 시 입력했던 회원 정보 수정 가능 (단, 아이디, 비밀번호, 이름은 수정 불가능)
- 수정페이지에서 수정 후 버튼을 누르면 DB에 저장되어 있는 해당 회원의 정보 수정
  -> 세션에 로그인한 아이디 가져온 후 DB member TABLE 에 ID 일치하는  회원 정보 SELECT 후 수정 FORM 에 출력
     DB member TABLE 에 ID 일치하는 member SELECT 후 입력 한 값으로 바꿔준 후 member를 update 함  
- 회원 탈퇴 버튼 누르면 DB에 저장되어 있는 해당 회원의 정보 삭제 후 세션에 저장되어 있는 정보 삭제 후 로그아웃 한 메인화면 출력
  -> DB member TABLE에 ID 일치하는 member DELETE



## 3. 프로젝트 요약

### 기능 구현

1. 메인 페이지
   - 영상 조회
   - 조회순 기준 영상 조회
   - 선택 카테고리 기준 영상 조회
   - 로그인, 회원가입 기능
   - 영상 상세정보 페이지 이동
   - 영상 찜하기
2. 영상 상세 정보 페이지
   - 리뷰 목록
   - 리뷰 작성
   - 영상 정보 및 플레이어
3. 리뷰 작성 페이지
   - 리뷰 작성
   - 취소
4. 리뷰 상세 정보 페이지
   - 작성한 리뷰 조회
   - 리뷰 수정
   - 리뷰 삭제 
   - 취소
5. 마이페이지
   - 회원 정보 수정
   - 회원 탈퇴
   - 찜한 영상 목록 조회
   - 찜한 영상 목록 삭제
   - 찜한 영상 상세 정보 조회
   - 팔로워 조회
   - 팔로잉 조회
   - 팔로우 추가
   - 팔로우 삭제

## 4. 소감

### KO로이김 

- 김현지
  이번 DB 관통도 시작 전에는 걱정이 많았지만 하다 보니까 재밌기도 했고 생각보다 괜찮게 진행 할 수 있었습니다. DB랑 웹의 연결이라 어렵게만 생각했었는데 오히려 impl로 함수를 다 구현해서 작성했을 때 보다 더 편하게 데이터를 가져다가 사용할 수 있었습니다. 분업 하기 전에 ERD를 작성해 어떤 구조로 진행되는지 더 확실히 알 수 있었습니다. 그리고 서로 모르는건 물어가며 답해주고 프로젝트를 잘 진행 할 수 있게 도와준 팀원들에게 감사합니다. 

- 이지연

  프론트와 백엔드 구현이 완료된 프로젝트의 결과물을 토대로 DB와 연동하여 만드는 것이기 때문에 생각보다 편하게 구현할 수 있었다. DB와의 연동을 하게 되면서 테이블을 생성하며 ERD를 만들고, 이를 공유하여 협업을 진행하는 과정에서 규칙 설정의 중요성을 알 수 있었다. 지난 번 백엔드 프로젝트에서는 구현하지 못했던 찜 목록과, 팔로우 목록을 구현할 수 있어 좋았다. 4명이 진행한 협업은 형상관리 툴 없이 진행하여 코드를 통합하는 과정에서 어려움을 겪기도 했지만, 서로 공유하면서 문제를 해결해나갈 수 있었다.

- 고나령
  
  나령이의 후기


---
