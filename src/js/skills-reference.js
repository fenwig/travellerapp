let activeCategory = 'all';
let expandedCard = null;

const DOT_CLASS = {
  combat: 'dot-combat',
  social: 'dot-social',
  technical: 'dot-technical',
  spacecraft: 'dot-spacecraft',
  physical: 'dot-physical',
  knowledge: 'dot-knowledge'
};

function buildSkillCard(skill) {
  const card = document.createElement('div');
  card.className = 'skill-card';
  card.dataset.name = skill.name.toLowerCase();
  card.dataset.category = skill.category;

  const specialtiesHTML = skill.specialties.length
    ? `<div class="skill-specialties">
        <div class="skill-specialties-title">Specialities</div>
        ${skill.specialties.map(s => `
          <div class="specialty-item">
            <span class="specialty-name">${s.name}</span>
            <span class="specialty-desc">${s.desc}</span>
          </div>`).join('')}
      </div>`
    : '';

  const examplesHTML = skill.examples.map(ex =>
    `<div class="skill-example">
      <span class="ex-difficulty">${ex.difficulty}</span> — ${ex.text}
      <span class="ex-char"> (${ex.time}, ${ex.char})</span>
    </div>`
  ).join('');

  card.innerHTML = `
    <div class="skill-header">
      <div class="skill-header-left">
        <div class="skill-category-dot ${DOT_CLASS[skill.category]}"></div>
        <div>
          <div class="skill-name">${skill.name}</div>
          <div class="skill-tag">${skill.category}</div>
        </div>
      </div>
      <span class="skill-chevron">▼</span>
    </div>
    <div class="skill-body">
      <p class="skill-desc">${skill.desc}</p>
      ${specialtiesHTML}
      <div class="skill-examples-title">Example Tasks</div>
      ${examplesHTML}
    </div>
  `;

  card.addEventListener('click', () => toggleCard(card));
  return card;
}

function toggleCard(card) {
  if (expandedCard && expandedCard !== card) {
    expandedCard.classList.remove('expanded');
  }
  card.classList.toggle('expanded');
  expandedCard = card.classList.contains('expanded') ? card : null;
}

function renderSkills() {
  const grid = document.getElementById('skill-grid');
  const search = document.getElementById('skill-search').value.toLowerCase();
  grid.innerHTML = '';

  const filtered = SKILLS.filter(skill => {
    const matchCat = activeCategory === 'all' || skill.category === activeCategory;
    const matchSearch = !search || skill.name.toLowerCase().includes(search) || skill.desc.toLowerCase().includes(search);
    return matchCat && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = '<div class="no-results">No skills found.</div>';
    return;
  }

  filtered.forEach(skill => grid.appendChild(buildSkillCard(skill)));
}

function filterSkills() {
  expandedCard = null;
  renderSkills();
}

function filterCategory(cat, btn) {
  activeCategory = cat;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  expandedCard = null;
  renderSkills();
}

function showTab(tab) {
  document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
  document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
  document.getElementById('tab-' + tab).style.display = 'block';
  event.target.classList.add('active');
}

renderSkills();
