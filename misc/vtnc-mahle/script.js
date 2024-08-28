const btn = document.getElementById('btn');
const count = document.getElementById('count');

const handleClick = (e) => {
  e.preventDefault();

  let newCount = getStoredCount() + 1;

  if(!handleNewCount(newCount)) 
    newCount = 0;
  
  setStoreCount(newCount);
  loadStoredCount();
}

const handleNewCount = (newCount) => {
  switch (newCount) {
    case 5: alert('Calma ai calabreso!'); break;
    case 10: alert('Sai daí que tu nem consegue beber 10'); break;
    case 15: alert('Ai virou putaria!'); break;
    case 20: alert('Seguinte, ai tu ta exagerando, vai ficar sem nenhuma agora!'); return false;
  }

  return true;
}

const getStoredCount = () => {
  return parseInt(localStorage.getItem('counter'), 10) || 0;
}

const setStoreCount = (count) => {
  localStorage.setItem('counter', count);
}

const loadStoredCount = () => {
  const storedCount = getStoredCount();
  count.textContent = storedCount;
}

btn.addEventListener('click', handleClick, false);
loadStoredCount();