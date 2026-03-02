export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { code, input } = req.body;

  try {
    const response = await fetch("https://emkc.org/api/v2/piston/execute", {
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
        stdin: input
      })
    });

    const result = await response.json();

    res.status(200).json({
      output: result.run.output
    });

  } catch (error) {
    res.status(500).json({ error: "Execution failed" });
  }
}