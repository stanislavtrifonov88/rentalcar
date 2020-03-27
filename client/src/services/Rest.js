const get = (path) => fetch(path)
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw Error(`Failed with status ${res.status}`);
  });

const post = (path, body) => fetch(path, {
  method: 'POST',
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw Error(`Failed with status ${res.status}`);
  });

export default { get, post };
