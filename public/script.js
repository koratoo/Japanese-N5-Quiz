document.addEventListener("DOMContentLoaded", () => {
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const resultElement = document.getElementById("result");
  const scoreElement = document.getElementById("score");

  let score = 0; // 점수 초기화

  // 퀴즈 문제 가져오기
  function fetchQuiz() {
    fetch("/api/quiz")
      .then((response) => response.json())
      .then((data) => {
        // 문제와 선택지 표시
        questionElement.textContent = `다음 일본어의 뜻은 무엇일까요? "${data.question}"`;
        optionsElement.innerHTML = ""; // 기존 선택지 초기화
        resultElement.textContent = ""; // 이전 결과 초기화

        // 객관식 선택지 생성
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
      .catch((error) => {
        console.error("Error fetching quiz:", error);
      });
  }

  // 정답 확인
  function checkAnswer(selectedOption, correctAnswer) {
    if (selectedOption === correctAnswer) {
      resultElement.textContent = "정답입니다! 🎉";
      resultElement.style.color = "green";
      score++; // 점수 증가
    } else {
      resultElement.textContent = `정답은 "${correctAnswer}"입니다.`;
      resultElement.style.color = "red";
      score--;
    }
    scoreElement.textContent = `점수: ${score}`; // 점수 업데이트
    setTimeout(fetchQuiz, 2000); // 2초 후 새 문제
  }

  // 초기 퀴즈 로드
  fetchQuiz();
});
