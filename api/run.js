export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { code, input } = req.body;

  try {
    const response = await fetch("https://piston.rs/api/v2/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        language: "cpp",
        version: "10.2.0",
        files: [
          {
            content: code
          }
        ],
        stdin: input || ""
      })
    });

    const result = await response.json();

    // 防止 undefined 报错
    const output =
      result?.run?.stdout ||
      result?.run?.stderr ||
      "No output";

    res.status(200).json({
      output: output
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Server error",
      detail: error.message
    });
  }
}