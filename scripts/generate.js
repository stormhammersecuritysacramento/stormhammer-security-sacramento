const fs = require("fs");

// ✅ SAFETY: GitHub Actions starts with empty filesystem
if (!fs.existsSync("pages")) {
  fs.mkdirSync("pages", { recursive: true });
}

const data = {
  cities: ["Sacramento", "Roseville", "Folsom", "Citrus Heights", "Natomas"],
  properties: ["Apartments", "Warehouses", "Shopping Centers"],
  problems: ["theft", "loitering", "vandalism", "trespassing"],
  streets: ["Sunrise Blvd", "Watt Ave", "Madison Ave", "Folsom Blvd"],
  services: ["Security Patrol", "Security Guards", "Mobile Patrol"]
};

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

let pages = [];

for (let i = 0; i < 100; i++) {

  const city = pick(data.cities);
  const property = pick(data.properties);
  const problem = pick(data.problems);
  const street = pick(data.streets);
  const service = pick(data.services);

  const slug = `${city}-${property}-${problem}-${street}-${i}`
    .toLowerCase()
    .replace(/ /g, "-");

  const html = `
<!DOCTYPE html>
<html>
<head>
<title>${service} in ${city} | StormHammer Security</title>
<meta name="description" content="${service} for ${property} in ${city} near ${street}. Prevent ${problem}. StormHammer Security PPO 121830.">
</head>

<body style="font-family: Arial; max-width: 900px; margin: auto; padding: 40px;">

<h1>${service} in ${city}, CA</h1>

<p>
StormHammer Security provides ${service} for ${property} in ${city}, especially near ${street}.
We help reduce ${problem} through active patrol coverage and deterrence.
</p>

<h2>Local Security Conditions</h2>
<p>${city} properties often experience issues such as ${problem}, especially around commercial and residential overlap zones.</p>

<h2>Service Coverage</h2>
<p>We actively patrol ${street} and surrounding ${property} areas in ${city}.</p>

<a href="tel:5309029390">Call Dispatch</a><br>
<a href="mailto:stormhammer.security.sacramento@gmail.com">Request Service</a>

</body>
</html>
`;

  const file = `pages/${slug}.html`;
  fs.writeFileSync(file, html);

  pages.push(file);
}

fs.writeFileSync("pages.json", JSON.stringify(pages, null, 2));

console.log("Generated pages:", pages.length);
