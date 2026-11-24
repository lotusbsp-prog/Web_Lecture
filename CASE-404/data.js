/* NEXUS 가상 직원 데이터 */
const employees = [
  {id:'EMP-001',name:'김도윤',department:'개발팀',position:'팀장',status:'재직',email:'doyun@nexus.com',joinDate:'2020-03-02'},
  {id:'EMP-002',name:'이서연',department:'인사팀',position:'대리',status:'재직',email:'seoyeon@nexus.com',joinDate:'2022-05-16'},
  {id:'EMP-003',name:'박지훈',department:'개발팀',position:'과장',status:'재직',email:'jihoon@nexus.com',joinDate:'2021-07-12'},
  {id:'EMP-004',name:'정하린',department:'보안팀',position:'팀장',status:'재직',email:'harin@nexus.com',joinDate:'2019-11-04'},
  {id:'EMP-005',name:'최민석',department:'경영지원팀',position:'부장',status:'재직',email:'minseok@nexus.com',joinDate:'2018-02-19'},
  {id:'EMP-006',name:'한유진',department:'개발팀',position:'사원',status:'재직',email:'yujin@nexus.com',joinDate:'2024-09-02'},
  {id:'EMP-007',name:'오태성',department:'보안팀',position:'대리',status:'재직',email:'taesung@nexus.com',joinDate:'2023-04-10'},
  {id:'EMP-047',name:'윤재현',department:'개발팀',position:'선임 연구원',status:'비활성',email:'jaehyun@nexus.com',joinDate:'2020-08-24'}
];

/* 회사 출입 기록 */
const accessRecords = [
  {id:'LOG-001',employeeId:'EMP-001',date:'2026-11-15',time:'18:20',location:'본관 1층',type:'퇴실'},
  {id:'LOG-002',employeeId:'EMP-002',date:'2026-11-15',time:'20:47',location:'본관 1층',type:'퇴실'},
  {id:'LOG-003',employeeId:'EMP-003',date:'2026-11-15',time:'21:14',location:'본관 1층',type:'퇴실'},
  {id:'LOG-004',employeeId:'EMP-004',date:'2026-11-15',time:'21:32',location:'보안 통제실',type:'입실'},
  {id:'LOG-005',employeeId:'EMP-005',date:'2026-11-15',time:'19:05',location:'본관 1층',type:'퇴실'},
  {id:'LOG-006',employeeId:'EMP-006',date:'2026-11-15',time:'20:10',location:'본관 1층',type:'퇴실'},
  {id:'LOG-007',employeeId:'EMP-007',date:'2026-11-15',time:'22:03',location:'보안 통제실',type:'퇴실'},
  {id:'LOG-008',employeeId:'EMP-047',date:'2026-11-15',time:'23:47',location:'연구동 3층',type:'입실'},
  {id:'LOG-009',employeeId:'EMP-047',date:'2026-11-16',time:'02:17',location:'서버실',type:'입실'},
  {id:'LOG-010',employeeId:'EMP-003',date:'2026-11-16',time:'00:12',location:'연구동 3층',type:'입실'}
];

/* 사내 메신저 대화 */
const conversations = [
  {id:'CHAT-001',title:'인사팀',preview:'신규 관리자 업무 안내',messages:[
    {sender:'이서연',time:'2026-11-16 09:00',text:'안녕하세요. NEXUS 인사팀입니다.'},
    {sender:'이서연',time:'2026-11-16 09:01',text:'신규 관리자님께서는 직원 정보와 시스템 기록을 확인해 주세요.'}
  ]},
  {id:'CHAT-002',title:'개발팀',preview:'서버 점검 일정',messages:[
    {sender:'한유진',time:'2026-11-15 20:45',text:'팀장님, 서버 점검은 오늘 마무리하나요?'},
    {sender:'박지훈',time:'2026-11-15 20:50',text:'저는 먼저 퇴근했습니다. 나머지는 내일 확인하죠.'},
    {sender:'한유진',time:'2026-11-15 20:52',text:'네, 알겠습니다.'}
  ]},
  {id:'CHAT-003',title:'보안팀',preview:'출입 기록 확인 요청',messages:[
    {sender:'오태성',time:'2026-11-16 08:10',text:'어젯밤 일부 출입 기록에서 확인이 필요한 항목이 발견됐습니다.'},
    {sender:'정하린',time:'2026-11-16 08:12',text:'해당 기록은 우선 보관해 주세요.'},
    {sender:'오태성',time:'2026-11-16 08:15',text:'네. 기록을 별도로 보관하겠습니다.'}
  ]},
  {id:'CHAT-004',title:'경영지원팀',preview:'관리자 권한 안내',messages:[
    {sender:'최민석',time:'2026-11-16 08:40',text:'신규 관리자의 시스템 접근 권한이 승인됐습니다.'},
    {sender:'최민석',time:'2026-11-16 08:42',text:'업무와 관련된 자료만 열람해 주시기 바랍니다.'}
  ]}
];

/* ===================================
   보안 로그 데이터
=================================== */

const securityLogs = [
    {
        id: "SEC-001",
        date: "2026-11-15",
        time: "18:20",
        user: "EMP-001",
        type: "로그아웃",
        result: "정상",
        detail: "개발팀 관리자 계정 로그아웃"
    },
    {
        id: "SEC-002",
        date: "2026-11-15",
        time: "21:32",
        user: "EMP-004",
        type: "시스템 접속",
        result: "정상",
        detail: "보안 관리 시스템 접속"
    },
    {
        id: "SEC-003",
        date: "2026-11-15",
        time: "23:45",
        user: "EMP-047",
        type: "로그인",
        result: "성공",
        detail: "비활성 계정 인증 성공"
    },
    {
        id: "SEC-004",
        date: "2026-11-15",
        time: "23:46",
        user: "EMP-047",
        type: "권한 변경",
        result: "성공",
        detail: "연구동 접근 권한 갱신"
    },
    {
        id: "SEC-005",
        date: "2026-11-16",
        time: "00:10",
        user: "EMP-003",
        type: "시스템 접속",
        result: "정상",
        detail: "사내 업무 시스템 접속"
    },
    {
        id: "SEC-006",
        date: "2026-11-16",
        time: "02:15",
        user: "EMP-047",
        type: "로그인",
        result: "성공",
        detail: "서버실 관리 시스템 접속"
    }
];
