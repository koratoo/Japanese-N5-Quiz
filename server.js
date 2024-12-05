const express = require("express");
const path = require("path");
const { Pool } = require("pg");
const app = express();
const port = 8000;

// PostgreSQL 연결 설정
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "",
  port: 5432,
});

// 정적 파일 제공
app.use(express.static(path.join(__dirname, "public")));

// API: 객관식 문제 반환
app.get("/api/quiz", async (req, res) => {
  try {
    // PostgreSQL에서 모든 단어 가져오기
    const wordsResult = await pool.query("SELECT * FROM public.words");
    const n5Words = wordsResult.rows;

    // 랜덤으로 정답 선택
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

    // JSON 응답 반환
    res.json({
      question: correctAnswer.japanese,
      options,
      correctAnswer: correctAnswer.korean,
    });
  } catch (error) {
    console.error("Error fetching quiz data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 서버 실행
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
