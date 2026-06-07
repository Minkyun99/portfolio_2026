
function toggleSection(header) {
  const wrap = header.closest('.toggle-wrap');
  if (!wrap) return;

  let body = null;
  for (const child of wrap.children) {
    if (child.classList && child.classList.contains('toggle-body')) {
      body = child;
      break;
    }
  }
  if (!body) return;

  const arrow = header.querySelector('.toggle-arrow');
  const willOpen = !body.classList.contains('open') && body.style.display !== 'block';

  body.classList.toggle('open', willOpen);
  body.style.display = willOpen ? 'block' : 'none';

  if (arrow) {
    arrow.classList.toggle('open', willOpen);
    arrow.textContent = willOpen ? '▲' : '▼';
  }
}

function initToggleSections() {
  document.querySelectorAll('.toggle-wrap').forEach((wrap) => {
    const header = wrap.querySelector('.toggle-header');
    const body = wrap.querySelector('.toggle-body');
    const arrow = wrap.querySelector('.toggle-arrow');
    if (!header || !body) return;

    header.setAttribute('role', 'button');
    header.setAttribute('tabindex', '0');

    const isOpen = body.classList.contains('open');
    body.style.display = isOpen ? 'block' : 'none';
    if (arrow) {
      arrow.classList.toggle('open', isOpen);
      arrow.textContent = isOpen ? '▲' : '▼';
    }

    header.onclick = function () { toggleSection(this); };
    header.onkeydown = function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleSection(this);
      }
    };
  });
}

