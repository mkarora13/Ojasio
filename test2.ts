async function test() {
  try {
    const res = await fetch("https://ais-dev-uzutcbnsrtjwn473k6ygfy-254218443261.asia-southeast1.run.app/api/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "test@test.com" })
    });
    console.log("Status:", res.status);
    console.log("Body:", await res.text());
  } catch (err) {
    console.error("Error:", err);
  }
}
test();
