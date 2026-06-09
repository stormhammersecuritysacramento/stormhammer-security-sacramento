const fs = require("fs");
const data = require("../data/keywords.json");

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function slugify(text) {
  return text.toLowerCase().replace(/ /g, "-");
}

let pages = [];

for (let i = 0; i < 300; i++) {

  const city = pick(data.cities);
  const property = pick(data.properties);
  const problem = pick(data.problems);
  const street = pick(data.streets);
  const service = pick(data.services);

  const slug = `${city}-${property}-${problem}-${street}`
    .replace(/\s+/g, "-")
    .toLowerCase();

  const html = `
<!DOCTYPE html>
<html>
<head>
<title>${service} in ${city} | StormHammer Security</title>
<meta name="description" content="${service} for ${property} in ${city} near ${street}. Prevent ${problem}. Call StormHammer Security.">
</head>

<body style="font-family: Arial; max-width: 900px; margin: auto; padding: 40px;">

<h1>${service} in ${city}, CA</h1>

<p>
StormHammer Security provides ${service} for ${property} in ${city} near ${street}.
We reduce ${problem} with active patrol coverage.
</p>

<h2>Local Security Overview</h2>
<p>${city} has ongoing property security concerns related to ${problem}, especially in ${property} zones.</p>

<h2>Why ${property} Needs Patrols</h2>
<p>Visible patrols help deter ${problem} and improve safety perception.</p>

<h2>Service Coverage</h2>
<p>We actively patrol areas near ${street} and surrounding neighborhoods.</p>

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
