const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 8000;

// 정적 파일 제공
app.use(express.static(path.join(__dirname, "public")));

// N5 단어 데이터 로드
const n5Words = JSON.parse(fs.readFileSync("./n5_words.json", "utf-8"));

// API: 객관식 문제 반환
app.get("/api/quiz", (req, res) => {
  const correctAnswer = n5Words[Math.floor(Math.random() * n5Words.length)];

  // 객관식 선택지 생성
  const options = [correctAnswer.korean];
  while (options.length < 4) {
    const randomOption =
      n5Words[Math.floor(Math.random() * n5Words.length)].korean;
    if (!options.includes(randomOption)) {
      options.push(randomOption);
    }
  }

  // 선택지 섞기
  options.sort(() => Math.random() - 0.5);

  res.json({
    question: correctAnswer.japanese,
    options,
    correctAnswer: correctAnswer.korean,
  });
});

// 서버 실행
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
