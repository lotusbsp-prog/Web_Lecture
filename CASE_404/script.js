
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


/* ===================================
   직원 관리 기능
=================================== */

/* HTML 요소 가져오기 */
const employeeList = document.getElementById("employee-list");
const employeeSearch = document.getElementById("employee-search-input");
const departmentFilter = document.getElementById("department-filter");
const employeeCount = document.getElementById("employee-count");
const employeeDetail = document.getElementById("employee-detail");
const detailContent = document.getElementById("employee-detail-content");

/* 직원 목록 표시 */
function showEmployees() {

    // 검색어 및 선택 부서
    const keyword = employeeSearch.value.trim().toLowerCase();
    const department = departmentFilter.value;

    // 검색 조건에 맞는 직원 찾기
    const result = employees.filter(function(employee) {

        const matchName =
            employee.name.toLowerCase().includes(keyword);

        const matchId =
            employee.id.toLowerCase().includes(keyword);

        const matchDepartment =
            department === "전체" ||
            employee.department === department;

        return (matchName || matchId) && matchDepartment;
    });

    // 기존 목록 초기화
    employeeList.innerHTML = "";

    // 검색 결과 개수 출력
    employeeCount.textContent =
        "검색 결과: " + result.length + "명";

    // 검색 결과가 없는 경우
    if (result.length === 0) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");

        cell.colSpan = 6;
        cell.textContent = "검색 결과가 없습니다.";

        row.appendChild(cell);
        employeeList.appendChild(row);
        return;
    }

    // 직원 목록 생성
    result.forEach(function(employee) {

        const row = document.createElement("tr");

        // 직원 기본정보
        const values = [
            employee.id,
            employee.name,
            employee.department,
            employee.position
        ];

        values.forEach(function(value) {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        // 재직 상태
        const statusCell = document.createElement("td");
        statusCell.textContent = employee.status;

        if (employee.status === "재직") {
            statusCell.className = "status-active";
        } else {
            statusCell.className = "status-inactive";
        }

        row.appendChild(statusCell);

        // 상세정보 버튼
        const buttonCell = document.createElement("td");
        const button = document.createElement("button");

        button.textContent = "조회";
        button.className = "detail-btn";

        button.addEventListener("click", function() {
            showEmployeeDetail(employee.id);
        });

        buttonCell.appendChild(button);
        row.appendChild(buttonCell);

        employeeList.appendChild(row);
    });
}

/* 직원 상세정보 표시 */
function showEmployeeDetail(employeeId) {

    // 사번으로 직원 찾기
    const employee = employees.find(function(item) {
        return item.id === employeeId;
    });

    if (!employee) {
        return;
    }

    // 기존 상세정보 초기화
    detailContent.innerHTML = "";

    // 상세정보 항목
    const information = [
        ["사번", employee.id],
        ["이름", employee.name],
        ["부서", employee.department],
        ["직급", employee.position],
        ["재직 상태", employee.status],
        ["이메일", employee.email],
        ["입사일", employee.joinDate]
    ];

    // 상세정보 화면 생성
    information.forEach(function(item) {

        const paragraph = document.createElement("p");

        paragraph.textContent =
            item[0] + " : " + item[1];

        detailContent.appendChild(paragraph);
    });

    // 상세정보 영역 표시
    employeeDetail.style.display = "block";

    // 상세정보 위치로 이동
    employeeDetail.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
}

/* 직원 검색 */
employeeSearch.addEventListener("input", function() {
    showEmployees();
    employeeDetail.style.display = "none";
});

/* 부서 필터 */
departmentFilter.addEventListener("change", function() {
    showEmployees();
    employeeDetail.style.display = "none";
});

/* 검색 초기화 */
document.getElementById("employee-reset").addEventListener("click", function() {

    employeeSearch.value = "";
    departmentFilter.value = "전체";

    employeeDetail.style.display = "none";
    showEmployees();
});

/* 상세정보 닫기 */
document.getElementById("detail-close").addEventListener("click", function() {
    employeeDetail.style.display = "none";
});

/* 초기 직원 목록 출력 */
showEmployees();


/* ===================================
   출입 기록 관리 기능
=================================== */

/* HTML 요소 가져오기 */
const accessList = document.getElementById("access-list");
const accessSearch = document.getElementById("access-search-input");
const accessDate = document.getElementById("access-date");
const accessType = document.getElementById("access-type");
const accessCount = document.getElementById("access-count");
const accessWarning = document.getElementById("access-warning");
const accessWarningMessage = document.getElementById("access-warning-message");

/* 출입 기록 목록 표시 */
function showAccessRecords() {

    // 검색 조건 가져오기
    const keyword = accessSearch.value.trim().toLowerCase();
    const date = accessDate.value;
    const type = accessType.value;

    // 검색 조건에 맞는 기록 찾기
    const result = accessRecords.filter(function(record) {

        // 사번으로 직원 정보 찾기
        const employee = employees.find(function(item) {
            return item.id === record.employeeId;
        });

        const employeeName = employee ? employee.name : "알 수 없음";

        // 이름 또는 사번 검색
        const matchKeyword =
            employeeName.toLowerCase().includes(keyword) ||
            record.employeeId.toLowerCase().includes(keyword);

        // 날짜 검색
        const matchDate =
            date === "" || record.date === date;

        // 출입 유형 검색
        const matchType =
            type === "전체" || record.type === type;

        return matchKeyword && matchDate && matchType;
    });

    // 기존 목록 초기화
    accessList.innerHTML = "";

    // 검색 결과 표시
    accessCount.textContent =
        "검색 결과: " + result.length + "건";

    // 기록이 없는 경우
    if (result.length === 0) {

        const row = document.createElement("tr");
        const cell = document.createElement("td");

        cell.colSpan = 7;
        cell.textContent = "검색 결과가 없습니다.";

        row.appendChild(cell);
        accessList.appendChild(row);

        return;
    }

    // 검색 결과로 테이블 생성
    result.forEach(function(record) {

        const employee = employees.find(function(item) {
            return item.id === record.employeeId;
        });

        const employeeName = employee ? employee.name : "알 수 없음";

        const row = document.createElement("tr");

        // 출입 기록 항목
        const values = [
            record.id,
            record.date,
            record.time,
            record.employeeId,
            employeeName,
            record.location,
            record.type
        ];

        values.forEach(function(value, index) {

            const cell = document.createElement("td");
            cell.textContent = value;

            // 입실과 퇴실 글자색 변경
            if (index === 6) {
                cell.className =
                    record.type === "입실" ? "access-in" : "access-out";
            }

            row.appendChild(cell);
        });

        // 비활성 직원의 출입 기록 확인
        if (employee && employee.status === "비활성") {

            row.classList.add("access-suspicious");
            row.title = "기록 확인이 필요합니다.";

            // 기록을 클릭하면 안내 표시
            row.addEventListener("click", function() {
                showAccessWarning(record, employee);
            });
        }

        accessList.appendChild(row);
    });
}

/* 이상 출입 기록 확인 */
function showAccessWarning(record, employee) {

    accessWarningMessage.textContent =
        employee.name + " (" + employee.id + ") 계정은 " +
        "현재 비활성 상태입니다. " +
        "하지만 " + record.date + " " + record.time +
        "에 " + record.location +
        " 출입 기록이 확인되었습니다. " +
        "해당 기록의 확인이 필요합니다.";

    // 안내 표시
    accessWarning.style.display = "block";

    // 안내 영역으로 이동
    accessWarning.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
}

/* 직원 이름 및 사번 검색 */
accessSearch.addEventListener("input", function() {

    accessWarning.style.display = "none";
    showAccessRecords();

});

/* 날짜 검색 */
accessDate.addEventListener("change", function() {

    accessWarning.style.display = "none";
    showAccessRecords();

});

/* 출입 유형 필터 */
accessType.addEventListener("change", function() {

    accessWarning.style.display = "none";
    showAccessRecords();

});

/* 검색 초기화 */
document.getElementById("access-reset").addEventListener("click", function() {

    accessSearch.value = "";
    accessDate.value = "";
    accessType.value = "전체";

    accessWarning.style.display = "none";

    showAccessRecords();

});

/* 이상 기록 안내 닫기 */
document.getElementById("access-warning-close").addEventListener("click", function() {

    accessWarning.style.display = "none";

});

/* 초기 출입 기록 출력 */
showAccessRecords();
