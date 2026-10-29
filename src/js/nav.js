// Shared sidebar navigation: builds the three collapsible groups into every
// page's <nav class="sidebar">. To add or move a page, edit NAV_GROUPS only.
// Pages keep their own logo block and Sign Out button; this fills the middle.
const NAV_GROUPS = [
  { id: 'character', label: 'Character Resources', items: [
    ['character-record.html',   'Character Record'],
    ['spacecraft-record.html',  'Spacecraft Record'],
    ['character-list.html',     'Roster'],
    ['character-creation.html', 'Character Creation'],
    ['creation-codex.html',     'Creation Codex']
  ]},
  { id: 'tools', label: 'Player Tools', items: [
    ['passenger-calculator.html', 'Passenger Calculator'],
    ['freight-calculator.html',   'Freight & Mail Calculator'],
    ['buy-cargo.html',             'Buy Cargo'],
    ['sell-cargo.html',            'Sell Cargo'],
    ['https://travellermap.com',   'Traveller Map', true]   // third value: opens in a new tab
  ]},
  { id: 'campaign', label: 'Campaign', items: [
    ['piracy-encounter.html', 'Piracy Encounter']
  ]},
  { id: 'reference', label: 'Reference', items: [
    ['general-rules.html',        'General Rules'],
    ['combat.html',               'Combat'],
    ['vehicles.html',             'Vehicles'],
    ['spacecraft-operations.html','Spacecraft Operations'],
    ['spacecraft-combat.html',    'Spacecraft Combat'],
    ['equipment.html',            'Equipment'],
    ['weapons-armor.html',        'Weapons & Armor'],
    ['trade.html',                'Trade']
  ]}
];

document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;
  const here = location.pathname.split('/').pop();
  const anchor = sidebar.querySelector('.sidebar-signout');

  let saved = {};
  try { saved = JSON.parse(localStorage.getItem('navOpen') || '{}'); } catch (e) {}

  NAV_GROUPS.forEach(g => {
    const hasActive = g.items.some(i => i[0] === here);
    const open = hasActive || saved[g.id] === true;

    const head = document.createElement('div');
    head.className = 'sidebar-group-label sidebar-group-toggle';
    head.innerHTML = '<span>' + g.label + '</span><span class="nav-caret"></span>';

    const body = document.createElement('div');
    body.className = 'sidebar-group-body';

    g.items.forEach(([href, label, newTab]) => {
      const a = document.createElement(href ? 'a' : 'span');
      a.className = 'sidebar-nav-item' + (href === here ? ' active' : '') + (href ? '' : ' disabled');
      if (href) a.href = href;
      if (newTab) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
      a.textContent = label;
      body.appendChild(a);
    });

    const setOpen = o => {
      body.style.display = o ? 'block' : 'none';
      head.classList.toggle('open', o);
    };
    setOpen(open);
    head.addEventListener('click', () => {
      const o = body.style.display === 'none';
      setOpen(o);
      saved[g.id] = o;
      try { localStorage.setItem('navOpen', JSON.stringify(saved)); } catch (e) {}
    });

    sidebar.insertBefore(head, anchor);
    sidebar.insertBefore(body, anchor);
  });
});
