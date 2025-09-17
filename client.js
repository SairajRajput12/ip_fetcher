async function getIp() {
  try {
    const res = await fetch("http://localhost:3000");

    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

getIp();
