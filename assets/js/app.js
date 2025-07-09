let dorks = {};

const engineSelect = document.getElementById('engine');
const domainInput = document.getElementById('domain');
const dorkList = document.getElementById('dork-list');

engineSelect.addEventListener('change', () => {
  const selected = engineSelect.value;
  if (!selected) {
    dorks = {};
    dorkList.innerHTML = '';
    return;
  }

  const [engineKey] = selected.split('|');
  const jsonFile = `dorks/dorks-${engineKey}.json`;

  //console.log(`Trying to load the file: ${jsonFile}`);

  fetch(jsonFile)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      //console.log(`Dorks loaded ${jsonFile}:`, data);
      dorks = data;
      updateDorkList();
    })
    .catch(err => {
      //console.error(`Error while loading ${jsonFile}:`, err);
      dorks = {};
      dorkList.innerHTML = `<p style="color:red;">Error while loading dork for ${engineKey}.</p>`;
    });
});

domainInput.addEventListener('input', updateDorkList);

function updateDorkList() {
  const selected = engineSelect.value;
  if (!selected) {
    dorkList.innerHTML = '';
    return;
  }

  const [, engineUrl] = selected.split('|');
  const domain = domainInput.value.trim();

  dorkList.innerHTML = '';

  if (!domain) {
    dorkList.innerHTML = `<p style="color:gray; font-size:13px;">Type a domain to load dorks.</p>`;
    return;
  }

  if (Object.keys(dorks).length === 0) {
    dorkList.innerHTML = `<p style="color:gray; font-size:13px;">Dorks not loaded yet, wait...</p>`;
    return;
  }

  for (let key in dorks) {
    const item = document.createElement('div');
    item.className = 'dork-item';

    
    let query = dorks[key].query.replace(/example\.com/g, domain);

    //check if query is fofa
    if (key.toLowerCase().includes("fofa")) {
      query = btoa(query);
    }

    //card title
    const link = document.createElement('a');
    link.href = engineUrl + query;
    link.target = "_blank";
    link.textContent = dorks[key].description;
    link.style.fontSize = '16px';
    link.style.color = 'var(--primary)';
    link.style.textDecoration = 'none';

    //dorks detailed
    const desc = document.createElement('p');
    desc.textContent = dorks[key].query;

    //append infos inside div
    item.appendChild(link);
    item.appendChild(desc);
    dorkList.appendChild(item);
  }
}
