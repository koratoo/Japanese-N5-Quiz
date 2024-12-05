# Japanese N5 Quiz

## 📚 프로젝트 설명

일본어 N5 수준의 단어를 학습하고 테스트할 수 있는 간단한 웹 퀴즈 애플리케이션입니다. 사용자에게 일본어 단어를 제시하고, 한국어로 뜻을 맞추는 객관식 퀴즈를 제공합니다.

---

## 🌟 기능

- 일본어 N5 수준 단어 학습.
- 객관식 퀴즈 형식으로 문제 풀이.
- 정답 횟수 카운팅.
- 반응형 웹 디자인으로 모바일 및 데스크톱에서 사용 가능.

---

## 🛠 사용 언어 및 기술

- **HTML**: 기본 웹 구조를 제공.
- **CSS**: 스타일링과 반응형 디자인.
- **JavaScript**: 퀴즈 로직 및 사용자 상호작용.
- **JSON**: 일본어 N5 단어 데이터를 저장.
- **GitHub Pages**: 정적 웹사이트 배포.

---

## ⏳ 제작 기간

- **총 소요 기간**: 5일
- **작업 단계**:
  1. 기본 HTML, CSS 작성 (1일)
  2. JSON 데이터 준비 및 클라이언트 로직 작성 (2일)
  3. 객관식 퀴즈 기능 구현 (1일)
  4. 디자인 개선 및 배포 (1일)

---

## 📂 프로젝트 구조

```plaintext
project-folder/
├── public/
│   ├── index.html         # 메인 HTML 파일
│   ├── style.css          # CSS 파일
│   ├── script.js          # 클라이언트 JS 파일
│   └── n5_words.json      # 일본어 N5 단어 데이터
├── README.md              # 프로젝트 설명 파일
```

## 🔍 주요 로직 설명

### 1. **퀴즈 문제 로드**

- `script.js`에서 `fetchQuiz()` 함수를 호출하여 JSON 데이터(`n5_words.json`)에서 무작위로 일본어 단어를 가져옵니다.
- API `/api/quiz`로 요청하여 정답과 객관식 선택지를 반환받습니다.

#### 관련 코드:

```javascript
function fetchQuiz() {
  fetch("/api/quiz")
    .then((response) => response.json())
    .then((data) => {
      // 문제 텍스트 설정
      questionElement.textContent = `다음 일본어의 뜻은 무엇일까요? "${data.question}"`;

      // 객관식 버튼 생성
      optionsElement.innerHTML = "";
      data.options.forEach((option) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-button");
        button.addEventListener("click", () =>
          checkAnswer(option, data.correctAnswer)
        );
        optionsElement.appendChild(button);
      });
    })
    .catch((error) => console.error("Error fetching quiz:", error));
}
```

### 2. **객관식 선택지 생성**

- API에서 반환된 데이터(`options`)를 반복문으로 순회하여 선택지 버튼을 동적으로 생성합니다.
- 버튼을 클릭하면 사용자의 선택을 처리하는 `checkAnswer()` 함수가 호출됩니다.

#### 관련 코드:

```javascript
data.options.forEach((option) => {
  const button = document.createElement("button");
  button.textContent = option;
  button.classList.add("option-button");
  button.addEventListener("click", () =>
    checkAnswer(option, data.correctAnswer)
  );
  optionsElement.appendChild(button);
});
```

### 3. **정답 확인 및 결과 표시**

- 사용자가 선택한 옵션과 정답을 비교합니다.
- 정답일 경우 점수를 1점 증가시키고, 오답일 경우 정답을 화면에 표시합니다.
- 2초 후 새로운 문제를 로드합니다.

#### 관련 코드:

```javascript
function checkAnswer(selectedOption, correctAnswer) {
  if (selectedOption === correctAnswer) {
    resultElement.textContent = "정답입니다! 🎉";
    resultElement.style.color = "green";
    score++;
  } else {
    resultElement.textContent = `틀렸습니다. 정답은 "${correctAnswer}"입니다.`;
    resultElement.style.color = "red";
  }

  // 점수 업데이트
  scoreElement.textContent = `점수: ${score}`;

  // 2초 후 새 퀴즈 로드
  setTimeout(fetchQuiz, 2000);
}
```

### 4. **점수 관리**

- 점수는 전역 변수 `score`로 관리됩니다.
- 정답 시 점수를 증가시키고, 점수는 항상 화면에 업데이트됩니다.

#### 관련 코드:

```javascript
let score = 0;

scoreElement.textContent = `점수: ${score}`;
```

### 5. **JSON 데이터 구조**

- `n5_words.json` 파일은 일본어 단어와 한국어 뜻을 포함합니다.
- `fetchQuiz()` 함수는 이 데이터를 기반으로 문제와 선택지를 생성합니다.

#### 데이터 구조:

```json
[
  { "japanese": "こんにちは", "korean": "안녕하세요" },
  { "japanese": "ありがとう", "korean": "감사합니다" },
  { "japanese": "さようなら", "korean": "안녕히 가세요" },
  { "japanese": "おはよう", "korean": "좋은 아침" },
  { "japanese": "こんばんは", "korean": "안녕하세요 (저녁 인사)" }
]
```

24-12-05 : Json 파일을 불러오는 구조에서 PostgreSQL과 연동하여 데이터를 불러오는 방식으로 변경
