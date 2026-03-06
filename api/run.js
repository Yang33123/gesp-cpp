export default async function handler(req, res) {

  const { code, input } = req.body;

  try {

    const response = await fetch("https://ce.judge0.com/submissions?base64_encoded=false&wait=true", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        language_id: 54,
        source_code: code,
        stdin: input || ""
      })
    });

    const result = await response.json();

    res.status(200).json({
      output: result.stdout || result.stderr || result.compile_output
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

}