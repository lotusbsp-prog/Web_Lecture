
/* ===================================
   NEXUS 직원 데이터
=================================== */

const employees = [
    {
        id: "EMP-001",
        name: "김도윤",
        department: "개발팀",
        position: "팀장",
        status: "재직",
        email: "doyun@nexus.com",
        joinDate: "2020-03-02"
    },
    {
        id: "EMP-002",
        name: "이서연",
        department: "인사팀",
        position: "대리",
        status: "재직",
        email: "seoyeon@nexus.com",
        joinDate: "2022-05-16"
    },
    {
        id: "EMP-003",
        name: "박지훈",
        department: "개발팀",
        position: "과장",
        status: "재직",
        email: "jihoon@nexus.com",
        joinDate: "2021-07-12"
    },
    {
        id: "EMP-004",
        name: "정하린",
        department: "보안팀",
        position: "팀장",
        status: "재직",
        email: "harin@nexus.com",
        joinDate: "2019-11-04"
    },
    {
        id: "EMP-005",
        name: "최민석",
        department: "경영지원팀",
        position: "부장",
        status: "재직",
        email: "minseok@nexus.com",
        joinDate: "2018-02-19"
    },
    {
        id: "EMP-006",
        name: "한유진",
        department: "개발팀",
        position: "사원",
        status: "재직",
        email: "yujin@nexus.com",
        joinDate: "2024-09-02"
    },
    {
        id: "EMP-007",
        name: "오태성",
        department: "보안팀",
        position: "대리",
        status: "재직",
        email: "taesung@nexus.com",
        joinDate: "2023-04-10"
    },
    {
        id: "EMP-047",
        name: "윤재현",
        department: "개발팀",
        position: "선임 연구원",
        status: "비활성",
        email: "jaehyun@nexus.com",
        joinDate: "2020-08-24"
    }
];


/* ===================================
   회사 출입 기록 데이터
=================================== */

const accessRecords = [
    {
        id: "LOG-001",
        employeeId: "EMP-001",
        date: "2026-11-15",
        time: "18:20",
        location: "본관 1층",
        type: "퇴실"
    },
    {
        id: "LOG-002",
        employeeId: "EMP-002",
        date: "2026-11-15",
        time: "20:47",
        location: "본관 1층",
        type: "퇴실"
    },
    {
        id: "LOG-003",
        employeeId: "EMP-003",
        date: "2026-11-15",
        time: "21:14",
        location: "본관 1층",
        type: "퇴실"
    },
    {
        id: "LOG-004",
        employeeId: "EMP-004",
        date: "2026-11-15",
        time: "21:32",
        location: "보안 통제실",
        type: "입실"
    },
    {
        id: "LOG-005",
        employeeId: "EMP-005",
        date: "2026-11-15",
        time: "19:05",
        location: "본관 1층",
        type: "퇴실"
    },
    {
        id: "LOG-006",
        employeeId: "EMP-006",
        date: "2026-11-15",
        time: "20:10",
        location: "본관 1층",
        type: "퇴실"
    },
    {
        id: "LOG-007",
        employeeId: "EMP-007",
        date: "2026-11-15",
        time: "22:03",
        location: "보안 통제실",
        type: "퇴실"
    },
    {
        id: "LOG-008",
        employeeId: "EMP-047",
        date: "2026-11-15",
        time: "23:47",
        location: "연구동 3층",
        type: "입실"
    },
    {
        id: "LOG-009",
        employeeId: "EMP-047",
        date: "2026-11-16",
        time: "02:17",
        location: "서버실",
        type: "입실"
    },
    {
        id: "LOG-010",
        employeeId: "EMP-003",
        date: "2026-11-16",
        time: "00:12",
        location: "연구동 3층",
        type: "입실"
    }
];
