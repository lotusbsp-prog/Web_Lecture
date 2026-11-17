
/* 플레이어 정보 */
let playerName = "";

/* HTML 요소 가져오기 */
const loginForm = document.getElementById("login-form");
const loginPage = document.getElementById("login-page");
const loadingPage = document.getElementById("loading-page");
const adminPage = document.getElementById("admin-page");
const loginError = document.getElementById("login-error");

/* 로딩 타이머 */
let loadingInterval;
let loadingTimeout;

/* 로그인 기능 */
loginForm.addEventListener("submit", function(event) {

    // 새로고침 방지
    event.preventDefault();

    // 입력값 가져오기
    const username = document.getElementById("username").value.trim();

    // 닉네임 확인 (비밀번호는 검사하지 않음)
    if (username !== "") {

        // 주인공 이름 저장
        playerName = username;

        // 로그인 화면 숨기기
        loginPage.style.display = "none";

        // 로딩 화면 표시
        loadingPage.style.display = "flex";

        // 환영 메시지 출력
        document.getElementById("loading-welcome").textContent =
            playerName + "님 환영합니다.";

        loginError.textContent = "";

        // 접속 로딩 애니메이션 시작
        startLoading();

    } else {

        loginError.textContent = "사원ID를 입력해주세요.";

    }

});


/* 관리자 페이지 접속 로딩 */
function startLoading() {

    const loadingMessage = document.getElementById("loading-message");

    let dotCount = 0;

    // 기존 타이머 초기화
    clearInterval(loadingInterval);
    clearTimeout(loadingTimeout);

    loadingMessage.textContent = "관리자 페이지 접속중.";

    // 점 1개 → 2개 → 3개 반복
    loadingInterval = setInterval(function() {

        dotCount = (dotCount % 3) + 1;

        loadingMessage.textContent =
            "관리자 페이지 접속중" + ".".repeat(dotCount);

    }, 400);

    // 4초 후 관리자 페이지 이동
    loadingTimeout = setTimeout(function() {

        clearInterval(loadingInterval);

        loadingPage.style.display = "none";
        adminPage.style.display = "block";

        // 관리자 환영 메시지
        document.getElementById("welcome-message").textContent =
            playerName + " 관리자님, 첫 출근을 환영합니다.";

        // 첫 업무 안내
        document.getElementById("task-message").textContent =
            playerName + "님, 직원 데이터베이스를 확인해 주세요.";

    }, 4000);
}


/* 로그아웃 기능 */
document.getElementById("logout-button").addEventListener("click", function() {

    // 로그인 화면 표시
    adminPage.style.display = "none";
    loadingPage.style.display = "none";
    loginPage.style.display = "flex";

    // 입력 초기화
    loginForm.reset();
    loginError.textContent = "";
    playerName = "";

    // 타이머 정리
    clearInterval(loadingInterval);
    clearTimeout(loadingTimeout);

});


/* ===================================
   관리자 페이지 메뉴 전환
=================================== */

// 모든 메뉴 버튼 가져오기
const menuButtons = document.querySelectorAll(".menu-btn");

// 모든 관리자 페이지 가져오기
const contentPages = document.querySelectorAll(".content-page");

/* 메뉴 클릭 이벤트 */
menuButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        // 선택한 메뉴의 페이지 이름
        const pageName = button.getAttribute("data-page");

        // 모든 페이지 숨기기
        contentPages.forEach(function(page) {
            page.style.display = "none";
        });

        // 선택한 페이지 표시
        document.getElementById(pageName + "-page").style.display = "block";

        // 모든 메뉴 선택 효과 제거
        menuButtons.forEach(function(menu) {
            menu.classList.remove("active");
        });

        // 현재 메뉴 선택 효과 적용
        button.classList.add("active");

    });

});
