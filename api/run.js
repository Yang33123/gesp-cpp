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
        version: "*",
        files: [
          {
            content: code
          }
        ],
        stdin: input || ""
      })
    });

    const result = await response.json();

    console.log("Piston result:", result);

    res.status(200).json(result);

  } catch (err) {

    console.error("Server error:", err);

    res.status(500).json({
      error: "Server error",
      message: err.message
    });

  }

}