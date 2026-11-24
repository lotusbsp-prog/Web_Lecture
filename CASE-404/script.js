/* ===================================
   로그인 및 관리자 페이지 전환
=================================== */
let playerName = '';
let loadingInterval;
let loadingTimeout;

const loginForm = document.getElementById('login-form');
const loginPage = document.getElementById('login-page');
const loadingPage = document.getElementById('loading-page');
const adminPage = document.getElementById('admin-page');
const loginError = document.getElementById('login-error');

/* 로그인: 비밀번호는 가상 입력란이며 검사하지 않음 */
loginForm.onsubmit = function() {
    const username = document.getElementById('username').value.trim();
    if (username === '') {
        loginError.textContent = '사원ID를 입력해주세요.';
        return false;
    }
    playerName = username;
    loginError.textContent = '';
    loginPage.style.display = 'none';
    loadingPage.style.display = 'block';
    document.getElementById('loading-welcome').textContent = playerName + '님 환영합니다.';
    startLoading();
    return false; // 입력 양식의 기본 전송 방지
};

/* 접속중. → 접속중.. → 접속중... 반복 */
function startLoading() {
    const message = document.getElementById('loading-message');
    let dotCount = 1;
    clearInterval(loadingInterval);
    clearTimeout(loadingTimeout);
    message.textContent = '관리자 페이지 접속중.';

    loadingInterval = setInterval(function() {
        dotCount = (dotCount % 3) + 1;
        message.textContent = '관리자 페이지 접속중' + '.'.repeat(dotCount);
    }, 400);

    loadingTimeout = setTimeout(function() {
        clearInterval(loadingInterval);
        loadingPage.style.display = 'none';
        adminPage.style.display = 'block';
        document.getElementById('welcome-message').textContent =
            playerName + ' 관리자님, 첫 출근을 환영합니다.';
        document.getElementById('task-message').textContent =
            playerName + '님, 직원 데이터베이스를 확인해 주세요.';
        showPage('dashboard');
    }, 4000);
}

/* 로그아웃 */
document.getElementById('logout-button').onclick = function() {
    clearInterval(loadingInterval);
    clearTimeout(loadingTimeout);
    adminPage.style.display = 'none';
    loadingPage.style.display = 'none';
    loginPage.style.display = 'block';
    loginForm.reset();
    playerName = '';
};

/* ===================================
   관리자 메뉴 전환
=================================== */
const menuButtons = document.querySelectorAll('.menu-btn');
const contentPages = document.querySelectorAll('.content-page');

function showPage(pageName) {
    for (let i = 0; i < contentPages.length; i++) {
        contentPages[i].style.display = 'none';
    }
    document.getElementById(pageName + '-page').style.display = 'block';
    for (let i = 0; i < menuButtons.length; i++) {
        menuButtons[i].className = 'menu-btn';
        if (menuButtons[i].getAttribute('data-page') === pageName) {
            menuButtons[i].className = 'menu-btn active';
        }
    }
}
for (let i = 0; i < menuButtons.length; i++) {
    menuButtons[i].onclick = function() {
        showPage(this.getAttribute('data-page'));
    };
}

/* 사번으로 직원 정보 찾기 */
function getEmployee(employeeId) {
    for (let i = 0; i < employees.length; i++) {
        if (employees[i].id === employeeId) return employees[i];
    }
    return null;
}

/* ===================================
   직원 관리: 검색, 필터, 상세 조회
=================================== */
const employeeList = document.getElementById('employee-list');
const employeeSearch = document.getElementById('employee-search-input');
const departmentFilter = document.getElementById('department-filter');
const employeeDetail = document.getElementById('employee-detail');
const detailContent = document.getElementById('employee-detail-content');

/* DOM을 이용해 테이블 셀 추가 */
function addCell(row, value, className) {
    const cell = document.createElement('td');
    cell.textContent = value;
    if (className) cell.className = className;
    row.appendChild(cell);
    return cell;
}

function showEmployees() {
    const keyword = employeeSearch.value.trim().toLowerCase();
    const department = departmentFilter.value;
    let count = 0;
    employeeList.innerHTML = '';
    for (let i = 0; i < employees.length; i++) {
        const employee = employees[i];
        const matchName = employee.name.toLowerCase().includes(keyword);
        const matchId = employee.id.toLowerCase().includes(keyword);
        const matchDepartment = department === '전체' || employee.department === department;
        if (!(matchName || matchId) || !matchDepartment) continue;

        count++;
        const row = document.createElement('tr');
        addCell(row, employee.id);
        addCell(row, employee.name);
        addCell(row, employee.department);
        addCell(row, employee.position);
        addCell(row, employee.status, employee.status === '재직' ? 'status-active' : 'status-inactive');
        const cell = document.createElement('td');
        const button = document.createElement('button');
        button.textContent = '조회';
        button.className = 'detail-btn';
        button.onclick = function() { showEmployeeDetail(employee.id); };
        cell.appendChild(button);
        row.appendChild(cell);
        employeeList.appendChild(row);
    }
    document.getElementById('employee-count').textContent = '검색 결과: ' + count + '명';
    if (count === 0) {
        const row = document.createElement('tr');
        const cell = addCell(row, '검색 결과가 없습니다.');
        cell.colSpan = 6;
        employeeList.appendChild(row);
    }
}

function showEmployeeDetail(employeeId) {
    const employee = getEmployee(employeeId);
    if (!employee) return;
    detailContent.innerHTML = '';
    const info = [
        ['사번', employee.id], ['이름', employee.name], ['부서', employee.department],
        ['직급', employee.position], ['재직 상태', employee.status],
        ['이메일', employee.email], ['입사일', employee.joinDate]
    ];
    for (let i = 0; i < info.length; i++) {
        const p = document.createElement('p');
        p.textContent = info[i][0] + ' : ' + info[i][1];
        detailContent.appendChild(p);
    }
    employeeDetail.style.display = 'block';
}

employeeSearch.oninput = function() { employeeDetail.style.display = 'none'; showEmployees(); };
departmentFilter.onchange = function() { employeeDetail.style.display = 'none'; showEmployees(); };
document.getElementById('employee-reset').onclick = function() {
    employeeSearch.value = '';
    departmentFilter.value = '전체';
    employeeDetail.style.display = 'none';
    showEmployees();
};
document.getElementById('detail-close').onclick = function() { employeeDetail.style.display = 'none'; };

/* ===================================
   출입 기록: 검색, 날짜, 유형
=================================== */
const accessList = document.getElementById('access-list');
const accessSearch = document.getElementById('access-search-input');
const accessDate = document.getElementById('access-date');
const accessType = document.getElementById('access-type');
const accessWarning = document.getElementById('access-warning');

function showAccessRecords() {
    const keyword = accessSearch.value.trim().toLowerCase();
    const date = accessDate.value;
    const type = accessType.value;
    let count = 0;
    accessList.innerHTML = '';

    for (let i = 0; i < accessRecords.length; i++) {
        const record = accessRecords[i];
        const employee = getEmployee(record.employeeId);
        const name = employee ? employee.name : '알 수 없음';
        const matchKeyword = name.toLowerCase().includes(keyword) || record.employeeId.toLowerCase().includes(keyword);
        const matchDate = date === '' || record.date === date;
        const matchType = type === '전체' || record.type === type;
        if (!matchKeyword || !matchDate || !matchType) continue;

        count++;
        const row = document.createElement('tr');
        addCell(row, record.id);
        addCell(row, record.date);
        addCell(row, record.time);
        addCell(row, record.employeeId);
        addCell(row, name);
        addCell(row, record.location);
        addCell(row, record.type);
        const lastCell = document.createElement('td');
        if (employee && employee.status === '비활성') {
            row.className = 'access-suspicious';
            const button = document.createElement('button');
            button.className = 'detail-btn';
            button.textContent = '확인';
            button.onclick = function() { showAccessWarning(record, employee); };
            lastCell.appendChild(button);
        } else {
            lastCell.textContent = '-';
        }
        row.appendChild(lastCell);
        accessList.appendChild(row);
    }
    document.getElementById('access-count').textContent = '검색 결과: ' + count + '건';
    if (count === 0) {
        const row = document.createElement('tr');
        const cell = addCell(row, '검색 결과가 없습니다.');
        cell.colSpan = 8;
        accessList.appendChild(row);
    }
}
function showAccessWarning(record, employee) {
    document.getElementById('access-warning-message').textContent =
        employee.name + ' (' + employee.id + ') 계정은 현재 비활성 상태입니다. 그러나 ' +
        record.date + ' ' + record.time + '에 ' + record.location +
        ' ' + record.type + ' 기록이 남아 있습니다. 추가 확인이 필요합니다.';
    accessWarning.style.display = 'block';
}
accessSearch.oninput = function() { accessWarning.style.display = 'none'; showAccessRecords(); };
accessDate.onchange = function() { accessWarning.style.display = 'none'; showAccessRecords(); };
accessType.onchange = function() { accessWarning.style.display = 'none'; showAccessRecords(); };
document.getElementById('access-reset').onclick = function() {
    accessSearch.value = '';
    accessDate.value = '';
    accessType.value = '전체';
    accessWarning.style.display = 'none';
    showAccessRecords();
};
document.getElementById('access-warning-close').onclick = function() { accessWarning.style.display = 'none'; };

/* ===================================
   사내 메신저: 대화방 검색 및 열람
=================================== */
const chatList = document.getElementById('chat-list');
const chatSearch = document.getElementById('chat-search');
const chatTitle = document.getElementById('chat-title');
const chatMessages = document.getElementById('chat-messages');
let selectedChat = '';

function showChatList() {
    const keyword = chatSearch.value.trim().toLowerCase();
    chatList.innerHTML = '';
    let count = 0;
    for (let i = 0; i < conversations.length; i++) {
        const chat = conversations[i];
        if (!chat.title.toLowerCase().includes(keyword)) continue;
        count++;
        const button = document.createElement('button');
        button.className = chat.id === selectedChat ? 'chat-item active' : 'chat-item';
        const title = document.createElement('h4');
        title.textContent = chat.title;
        const preview = document.createElement('p');
        preview.textContent = chat.preview;
        button.appendChild(title);
        button.appendChild(preview);
        button.onclick = function() {
            selectedChat = chat.id;
            showChatList();
            showChatMessages(chat.id);
        };
        chatList.appendChild(button);
    }
    if (count === 0) {
        const p = document.createElement('p');
        p.textContent = '검색 결과가 없습니다.';
        chatList.appendChild(p);
    }
}
function showChatMessages(chatId) {
    for (let i = 0; i < conversations.length; i++) {
        const chat = conversations[i];
        if (chat.id !== chatId) continue;
        chatTitle.textContent = chat.title;
        chatMessages.innerHTML = '';
        for (let j = 0; j < chat.messages.length; j++) {
            const message = chat.messages[j];
            const box = document.createElement('div');
            box.className = 'chat-message';
            const sender = document.createElement('p');
            sender.className = 'chat-sender';
            sender.textContent = message.sender;
            const time = document.createElement('p');
            time.className = 'chat-time';
            time.textContent = message.time;
            const content = document.createElement('p');
            content.className = 'chat-text';
            content.textContent = message.text;
            box.appendChild(sender);
            box.appendChild(time);
            box.appendChild(content);
            chatMessages.appendChild(box);
        }
        return;
    }
}
chatSearch.oninput = function() { showChatList(); };

/* 초기 화면 데이터 출력 */
showEmployees();
showAccessRecords();
showChatList();
document.getElementById('total-employees').textContent = employees.length + '명';
let activeCount = 0;
for (let i = 0; i < employees.length; i++) {
    if (employees[i].status === '재직') activeCount++;
}
document.getElementById('active-employees').textContent = activeCount + '명';


/* ===================================
   보안 로그 관리 기능
=================================== */

/* HTML 요소 가져오기 */
const securityList = document.getElementById("security-list");
const securitySearch = document.getElementById("security-search-input");
const securityType = document.getElementById("security-type");
const securityCount = document.getElementById("security-count");
const securityDetail = document.getElementById("security-detail");
const securityDetailText = document.getElementById("security-detail-text");

/* 보안 로그 목록 표시 */
function showSecurityLogs() {

    const keyword = securitySearch.value.trim().toLowerCase();
    const type = securityType.value;

    // 기존 목록 초기화
    securityList.innerHTML = "";

    let count = 0;

    // 보안 로그 검사
    for (let i = 0; i < securityLogs.length; i++) {

        const log = securityLogs[i];

        // 검색 조건 확인
        if (!log.user.toLowerCase().includes(keyword)) {
            continue;
        }

        if (type !== "전체" && log.type !== type) {
            continue;
        }

        count++;

        // 테이블 행 생성
        const row = document.createElement("tr");

        const values = [
            log.id,
            log.date,
            log.time,
            log.user,
            log.type,
            log.result
        ];

        // 테이블 셀 생성
        for (let j = 0; j < values.length; j++) {

            const cell = document.createElement("td");
            cell.textContent = values[j];

            row.appendChild(cell);
        }

        // 상세정보 버튼
        const detailCell = document.createElement("td");
        const button = document.createElement("button");

        button.textContent = "조회";
        button.className = "detail-btn";

        button.onclick = function() {
            showSecurityDetail(log);
        };

        detailCell.appendChild(button);
        row.appendChild(detailCell);

        securityList.appendChild(row);
    }

    // 검색 결과 출력
    securityCount.textContent =
        "검색 결과: " + count + "건";

    // 검색 결과 없음
    if (count === 0) {
        securityList.innerHTML =
            "<tr><td colspan='7'>검색 결과가 없습니다.</td></tr>";
    }
}

/* 보안 로그 상세정보 */
function showSecurityDetail(log) {

    let message =
        "기록번호: " + log.id + "\n" +
        "사용자: " + log.user + "\n" +
        "발생 시간: " + log.date + " " + log.time + "\n" +
        "작업 유형: " + log.type + "\n" +
        "처리 결과: " + log.result + "\n" +
        "상세 내용: " + log.detail;

    // 비활성 계정 여부 확인
    for (let i = 0; i < employees.length; i++) {

        if (employees[i].id === log.user &&
            employees[i].status === "비활성") {

            message +=
                "\n\n[확인 필요] 비활성 계정에서 발생한 작업입니다.";

            break;
        }
    }

    securityDetailText.textContent = message;
    securityDetail.style.display = "block";
}

/* 계정 검색 이벤트 */
securitySearch.oninput = function() {
    securityDetail.style.display = "none";
    showSecurityLogs();
};

/* 로그 유형 선택 이벤트 */
securityType.onchange = function() {
    securityDetail.style.display = "none";
    showSecurityLogs();
};

/* 검색 초기화 */
document.getElementById("security-reset").onclick = function() {

    securitySearch.value = "";
    securityType.value = "전체";

    securityDetail.style.display = "none";
    showSecurityLogs();
};

/* 상세정보 닫기 */
document.getElementById("security-close").onclick = function() {
    securityDetail.style.display = "none";
};

/* 초기 보안 로그 출력 */
showSecurityLogs();
