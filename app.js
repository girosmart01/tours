// ---------------------------------------------------------------
// Telegram WebApp init
// ---------------------------------------------------------------
const tg = window.Telegram?.WebApp;
if (tg) {
  tg.ready();
  tg.expand();
}

if (tg?.initData) {
  const source = tg.initDataUnsafe?.start_param || 'direct';
  fetch('/api/track-visit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ init_data: tg.initData, source }),
  }).catch(() => {});
}

const content = document.getElementById('content');
const tabButtons = document.querySelectorAll('.tab-btn');

const MANAGER_USERNAME = 'igiro01';

// ---------------------------------------------------------------
// Иконки для обложек карточек туров
// ---------------------------------------------------------------

const ICONS = {
  fortress: '<svg viewBox="0 0 24 24" width="32" height="32"><path fill="currentColor" d="M4 21V9l3-2V4h2v2l3-2v3l3-2v2l3 2v12H4Zm2-2h2v-4H6v4Zm4 0h2v-6h-2v6Zm4 0h2v-4h-2v4Zm4 0h2v-6h-2v6Z"/></svg>',
  paw: '<svg viewBox="0 0 24 24" width="32" height="32"><path fill="currentColor" d="M6 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm12 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM9 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm6 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm-3 6c-3 0-6 2.2-6 5.2 0 1.6 1.3 2.8 3 2.8.9 0 1.5-.3 2-.6.5-.3 1-.6 1-.6s.5.3 1 .6c.5.3 1.1.6 2 .6 1.7 0 3-1.2 3-2.8C18 14.2 15 12 12 12Z"/></svg>',
  train: '<svg viewBox="0 0 24 24" width="32" height="32"><path fill="currentColor" d="M12 2C7 2 5 3 5 9v6a4 4 0 0 0 4 4l-2 2v1h10v-1l-2-2a4 4 0 0 0 4-4V9c0-6-2-7-7-7ZM7 9h4v4H7V9Zm6 0h4v4h-4V9ZM8.5 17a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Zm7 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z"/></svg>',
  whale: '<svg viewBox="0 0 24 24" width="32" height="32"><path fill="currentColor" d="M3 13c2-4 6-6 11-6 4 0 7 2 7 5 0 2-1.5 3.5-4 4l3 3-4-1c-2 1.5-4.5 2-7 1.5L6 21l1-3c-2-.7-3.3-2.3-4-5Zm14-6.5c.6 0 1-.5 1-1s-.4-1-1-1-1 .5-1 1 .4 1 1 1Z"/></svg>',
  elephant: '<svg viewBox="0 0 24 24" width="32" height="32"><path fill="currentColor" d="M13 3c4 0 7 3 7 6.5 0 2-.9 3.5-1.5 4.3.4.4.5 1 .5 1.7v3a1.5 1.5 0 0 1-3 0v-2h-1v2a1.5 1.5 0 0 1-3 0v-2H8.6c-.3 1-.6 1.6-1.1 2a1.5 1.5 0 0 1-2.4-1.8c.3-.4.5-.8.6-1.4C4.6 14.6 4 13 4 11c0-1 .3-1.8.8-2.4C4.3 8 4 7.2 4 6.3 4 4.5 5.8 3 8 3c.9 0 1.7.3 2.3.7C11.2 3.2 12 3 13 3Z"/></svg>',
};

// ---------------------------------------------------------------
// Данные туров
// ---------------------------------------------------------------

const TOURS = [
  {
    id: 'treasure',
    icon: 'fortress',
    title: 'Сокровище Цейлона',
    subtitle: '2 дня среди гор, поездов и древних крепостей',
    duration: '2 дня / 1 ночь',
    sections: [
      {
        label: 'День 1', heading: 'Элла • Нувара-Элия',
        items: ['Водопад Равана', 'Малый Пик Адама (подъём ~25 мин)', 'Девятиарочный мост',
          'Город Элла', 'Поездка на поезде (35–40 мин)', 'Почтовый офис в Нувара-Элии',
          'Чайные плантации и фабрика', 'Ночь в отеле в горах'],
      },
      {
        label: 'День 2', heading: 'Канди • Пинавелла • Сигирия',
        items: ['Водопад Рамбода', 'Башня Амбулувава (башня 4-х религий)', 'Кормление обезьян',
          'Кормление слонов в Пинавелле', 'Крепость Сигирия или гора Пидурангала',
          'Храм Дамбулла (15 мин, без подъёма в пещеры)', 'Аюрведический сад'],
      },
    ],
    includes: ['Трансфер', 'Проживание в отеле', 'Завтрак', 'Русскоговорящее сопровождение', 'Все входные билеты'],
    extra: 'Обед + напиток (по желанию) — +10$',
    prices: [{ label: 'Гора Пидурангала', value: '130$' }, { label: 'Крепость Сигирия', value: '160$' }],
  },
  {
    id: 'safari',
    icon: 'paw',
    title: 'Сафари',
    subtitle: 'Встреча с дикой природой Шри-Ланки',
    duration: '~4 часа',
    sections: [
      { items: ['Выезд в 3:00–4:00 утра', 'Старт сафари в национальном парке в 6:00',
        'Экскурсия на джипах', 'Длительность 3,5–4 часа'] },
      {
        heading: 'В парке можно встретить',
        items: ['Слонов', 'Леопардов', 'Крокодилов', 'Варанов', 'Обезьян', 'Мангустов',
          'Диких буйволов', 'Пятнистых оленей', 'Павлинов', 'Экзотических птиц'],
      },
    ],
    includes: ['Трансфер', 'Сафари на джипах', 'Входные билеты', 'Русскоговорящее сопровождение'],
    extra: 'Обед + напиток (по желанию) — +10$',
    prices: [{ value: '85$ на человека' }],
  },
  {
    id: 'ella',
    icon: 'train',
    title: 'Элла',
    subtitle: 'Самые красивые виды горной Шри-Ланки за один день',
    duration: '1 день',
    sections: [{
      items: ['Водопад Равана', 'Малый Пик Адама (подъём ~25 мин)', 'Девятиарочный мост',
        'Город Элла', 'Поездка на поезде (одна станция, ~20 мин)', 'Чайные плантации',
        'Аюрведический сад', 'Слоны возле парка Удавалаве (фото)'],
    }],
    includes: ['Трансфер', 'Русскоговорящее сопровождение', 'Все входные билеты', 'Поездка на поезде'],
    extra: 'Обед + напиток (по желанию) — +10$',
    prices: [{ value: '50$ на человека' }],
  },
  {
    id: 'ella_safari',
    icon: 'paw',
    title: 'Элла + Сафари',
    subtitle: 'Горы, поезд и сафари за один день',
    duration: '1 день',
    sections: [{
      items: ['Сафари по национальному парку Удавалаве или Яла (~3–4 часа)', 'Водопад Равана',
        'Девятиарочный мост', 'Малый Пик Адама', 'Катание на поезде (одна станция, ~15 мин)',
        'Чайные плантации', 'Аюрведический сад'],
    }],
    includes: ['Трансфер', 'Джип-сафари', 'Входные билеты', 'Русскоговорящий гид', 'Поездка на поезде'],
    extra: 'Обед + напиток (по желанию) — +10$',
    prices: [{ value: '115$ на человека' }],
  },
  {
    id: 'whales',
    icon: 'whale',
    title: 'Морская экскурсия к китам',
    subtitle: 'Киты, дельфины и черепахи в открытом океане',
    duration: '3–4 часа',
    sections: [
      { items: ['Начало в 6:00 в Мириссе', 'Выход в океан', '3–4 часа в открытом океане'] },
      { heading: 'За время программы можно увидеть', items: ['Китов', 'Дельфинов', 'Черепах'] },
    ],
    includes: ['Билет на морскую экскурсию', 'Трансфер от отеля до Мириссы'],
    prices: [{ value: '50$', label: 'Билет + трансфер от отеля' }],
  },
  {
    id: 'kandy',
    icon: 'elephant',
    title: 'Канди + Питомник слонов',
    subtitle: 'Слоны, панорамные виды и чайные плантации за один день',
    duration: '1 день',
    sections: [{
      items: ['Купание слонов в Пинавелле', 'Аюрведический сад', 'Храм Неллигала',
        'Башня Амбулувава', 'Чайная фабрика', 'Чайные плантации'],
    }],
    includes: ['Трансфер', 'Русскоговорящее сопровождение', 'Все входные билеты', 'Посещение чайной фабрики'],
    extra: 'Обед +10$ (по желанию)',
    prices: [],
    note: 'Доступно индивидуально — цена по запросу',
  },
];

let selectedTourId = null;

function findTour(id) {
  return TOURS.find(t => t.id === id);
}

function priceDisplay(tour) {
  if (!tour.prices.length) return 'По запросу';
  if (tour.prices.length === 1) return tour.prices[0].value;
  return `от ${tour.prices[0].value}`;
}

// ---------------------------------------------------------------
// Вкладка "Туры"
// ---------------------------------------------------------------

function renderTours() {
  const cards = TOURS.map(tour => `
    <div class="tour-card">
      <div class="tour-card-cover" style="background:${coverColor(tour.id)}">
        ${ICONS[tour.icon]}
        <span class="tour-card-badge">${tour.duration}</span>
      </div>
      <div class="tour-card-body">
        <p class="tour-card-title">${tour.title}</p>
        <p class="tour-card-sub">${tour.subtitle}</p>
        <div class="tour-card-footer">
          <div>
            <span class="tour-price">${priceDisplay(tour)}</span>
            ${tour.prices.length ? '<span class="tour-price-note">за человека</span>' : ''}
          </div>
          <div class="tour-card-actions">
            <button class="btn btn-secondary" data-detail="${tour.id}">Подробнее</button>
            <button class="btn btn-primary" data-book="${tour.id}">Забронировать</button>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  content.innerHTML = `
    <div class="hero">
      <h2>Экскурсии по Шри-Ланке</h2>
      <p>Авторские маршруты с русскоговорящим сопровождением — горы, поезда, сафари, океан и древние крепости. Трансфер и входные билеты уже включены в цену.</p>
      <div class="hero-bullets">
        <div class="hero-bullet">
          <svg viewBox="0 0 24 24" width="14" height="14"><path fill="currentColor" d="M12 2 2 7v6c0 5.1 3.9 9 10 11 6.1-2 10-5.9 10-11V7L12 2Z"/></svg>
          <span>Русскоговорящее сопровождение на каждом туре</span>
        </div>
        <div class="hero-bullet">
          <svg viewBox="0 0 24 24" width="14" height="14"><path fill="currentColor" d="M12 2 2 7v6c0 5.1 3.9 9 10 11 6.1-2 10-5.9 10-11V7L12 2Z"/></svg>
          <span>Трансфер и входные билеты включены в стоимость</span>
        </div>
        <div class="hero-bullet">
          <svg viewBox="0 0 24 24" width="14" height="14"><path fill="currentColor" d="M12 2 2 7v6c0 5.1 3.9 9 10 11 6.1-2 10-5.9 10-11V7L12 2Z"/></svg>
          <span>Можно индивидуально — под ваши даты и пожелания</span>
        </div>
      </div>
    </div>

    ${cards}

    <div class="upsell-note">
      <p>Не нашли подходящий вариант? Соберём индивидуальный маршрут под ваши даты.</p>
      <a href="https://t.me/${MANAGER_USERNAME}" target="_blank" class="upsell-link">Написать менеджеру → @${MANAGER_USERNAME}</a>
    </div>
  `;

  content.querySelectorAll('[data-detail]').forEach(btn => {
    btn.addEventListener('click', () => renderTourDetail(btn.dataset.detail));
  });
  content.querySelectorAll('[data-book]').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedTourId = btn.dataset.book;
      switchTab('booking');
    });
  });
}

function coverColor(id) {
  // Лёгкое цветовое разнообразие обложек в пределах фирменной палитры
  const variants = {
    treasure: 'linear-gradient(135deg,#1F3524,#2C4A32)',
    safari: 'linear-gradient(135deg,#2C4A32,#1F3524)',
    ella: 'linear-gradient(135deg,#1F3524,#3A5A3F)',
    ella_safari: 'linear-gradient(135deg,#2C4A32,#3A5A3F)',
    whales: 'linear-gradient(135deg,#1F3524,#264438)',
    kandy: 'linear-gradient(135deg,#2C4A32,#20361F)',
  };
  return variants[id] || 'var(--color-forest)';
}

// ---------------------------------------------------------------
// Детальная страница тура
// ---------------------------------------------------------------

function renderTourDetail(id) {
  const tour = findTour(id);
  if (!tour) { renderTours(); return; }

  const sections = tour.sections.map(sec => `
    <div class="day-block">
      ${sec.label ? `<p class="day-label">${sec.label}</p>` : ''}
      ${sec.heading ? `<p class="day-region">${sec.heading}</p>` : ''}
      <ul class="day-items">
        ${sec.items.map(i => `<li>${i}</li>`).join('')}
      </ul>
    </div>
  `).join('');

  const pricesHtml = tour.prices.length
    ? tour.prices.map(p => `
        <div>
          <div class="price-big">${p.value}</div>
          ${p.label ? `<div class="price-label">${p.label}</div>` : '<div class="price-label">за человека</div>'}
        </div>
      `).join('<div class="divider" style="margin:10px 0;"></div>')
    : `<div class="price-big">По запросу</div><div class="price-label">напишите менеджеру для расчёта</div>`;

  content.innerHTML = `
    <button class="back-link" id="back-to-tours">← Все туры</button>
    <h1 class="section-title">${tour.title}</h1>
    <p class="lede">${tour.subtitle}</p>

    ${sections}

    <div class="includes-grid">
      <div class="includes-box">
        <h4>✅ В стоимость входит</h4>
        <ul>${tour.includes.map(i => `<li>${i}</li>`).join('')}</ul>
      </div>
      ${tour.extra ? `
        <div class="includes-box">
          <h4>➕ Дополнительно</h4>
          <ul><li>${tour.extra}</li></ul>
        </div>
      ` : ''}
    </div>

    <div class="price-block">${pricesHtml}</div>

    ${tour.note ? `<div class="notice">${tour.note}</div>` : ''}

    <button class="btn btn-primary btn-block" id="detail-book-btn" style="padding:13px;font-size:14px;margin-top:18px;">Забронировать этот тур</button>

    <div class="upsell-note">
      <p>Хотите под себя — другие даты, состав группы, маршрут?</p>
      <a href="https://t.me/${MANAGER_USERNAME}" target="_blank" class="upsell-link">Обсудить индивидуально → @${MANAGER_USERNAME}</a>
    </div>
  `;

  document.getElementById('back-to-tours').addEventListener('click', renderTours);
  document.getElementById('detail-book-btn').addEventListener('click', () => {
    selectedTourId = tour.id;
    switchTab('booking');
  });
}

// ---------------------------------------------------------------
// Вкладка "Отзывы"
// ---------------------------------------------------------------

function renderReviews() {
  content.innerHTML = `
    <h1 class="section-title">Отзывы</h1>
    <p class="lede">Что говорят те, кто уже был на экскурсиях.</p>
    <div class="review-placeholder">
      <svg viewBox="0 0 24 24" width="30" height="30"><path fill="currentColor" d="M4 4h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H8l-4 4V6a2 2 0 0 1 0-2Z"/></svg>
      <p>Отзывы наших туристов скоро появятся здесь — с фото прямо с маршрута.</p>
    </div>
  `;
}

// ---------------------------------------------------------------
// Вкладка "Бронирование"
// ---------------------------------------------------------------

function tomorrowISO() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

function renderBooking() {
  const options = TOURS.map(t => `<option value="${t.id}" ${t.id === selectedTourId ? 'selected' : ''}>${t.title}</option>`).join('');

  content.innerHTML = `
    <h1 class="section-title">Бронирование</h1>
    <p class="lede">Выберите тур и дату — свяжемся с Вами для подтверждения.</p>

    <form id="booking-form">
      <div class="form-group">
        <label class="form-label">Тур</label>
        <select class="form-select" id="f-tour">${options}</select>
      </div>

      <div class="form-group">
        <label class="form-label">Дата экскурсии</label>
        <input class="form-input" type="date" id="f-date" min="${tomorrowISO()}" required />
      </div>

      <div class="form-group">
        <label class="form-label">Имя</label>
        <input class="form-input" type="text" id="f-name" placeholder="Как к Вам обращаться" required />
      </div>

      <div class="form-group">
        <label class="form-label">Телефон / WhatsApp</label>
        <input class="form-input" type="tel" id="f-phone" placeholder="+7 ..." required />
      </div>

      <div class="form-group">
        <label class="form-label">Страна</label>
        <input class="form-input" type="text" id="f-country" placeholder="Например, Казахстан" required />
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Отель</label>
          <input class="form-input" type="text" id="f-hotel" placeholder="Название отеля" />
        </div>
        <div class="form-group">
          <label class="form-label">№ комнаты</label>
          <input class="form-input" type="text" id="f-room" placeholder="Необязательно" />
        </div>
      </div>

      <div id="booking-status"></div>

      <button type="submit" class="btn btn-primary btn-block" style="padding:13px;font-size:14px;margin-top:6px;">Отправить заявку</button>
    </form>

    <div class="upsell-note">
      <p>Не готовы бронировать? Обсудим индивидуальный тур и просчитаем цену.</p>
      <a href="https://t.me/${MANAGER_USERNAME}" target="_blank" class="upsell-link">Написать менеджеру → @${MANAGER_USERNAME}</a>
    </div>
  `;

  document.getElementById('booking-form').addEventListener('submit', handleBookingSubmit);
}

async function handleBookingSubmit(e) {
  e.preventDefault();
  const statusEl = document.getElementById('booking-status');
  const submitBtn = e.target.querySelector('button[type="submit"]');

  if (!tg?.initData) {
    statusEl.innerHTML = '<p class="status-msg error">Не удалось подтвердить пользователя Telegram. Откройте приложение через бота.</p>';
    return;
  }

  const tourId = document.getElementById('f-tour').value;
  const tour = findTour(tourId);

  const payload = {
    init_data: tg.initData,
    tour_id: tourId,
    tour_title: tour ? tour.title : tourId,
    tour_date: document.getElementById('f-date').value,
    name: document.getElementById('f-name').value.trim(),
    phone: document.getElementById('f-phone').value.trim(),
    country: document.getElementById('f-country').value.trim(),
    hotel: document.getElementById('f-hotel').value.trim(),
    room: document.getElementById('f-room').value.trim(),
    source: tg.initDataUnsafe?.start_param || 'direct',
  };

  submitBtn.disabled = true;
  statusEl.innerHTML = '<p class="status-msg">Отправка…</p>';

  try {
    const res = await fetch('/api/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      statusEl.innerHTML = `<p class="status-msg error">${data.detail || 'Не удалось отправить заявку.'}</p>`;
      submitBtn.disabled = false;
      return;
    }
    tg?.HapticFeedback?.notificationOccurred('success');
    content.innerHTML = `
      <h1 class="section-title">Заявка отправлена 🎉</h1>
      <p class="lede">Спасибо! Мы свяжемся с Вами в Telegram для подтверждения даты и деталей.</p>
      <button class="btn btn-primary" id="back-home-btn">К турам</button>
    `;
    document.getElementById('back-home-btn').addEventListener('click', () => { selectedTourId = null; switchTab('tours'); });
  } catch (err) {
    statusEl.innerHTML = '<p class="status-msg error">Ошибка сети. Попробуйте ещё раз.</p>';
    submitBtn.disabled = false;
  }
}

// ---------------------------------------------------------------
// Навигация
// ---------------------------------------------------------------

const TABS = {
  tours: renderTours,
  reviews: renderReviews,
  booking: renderBooking,
};

function switchTab(tabId) {
  tabButtons.forEach(btn => {
    btn.setAttribute('aria-selected', String(btn.dataset.tab === tabId));
  });
  TABS[tabId]();
}

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

switchTab('tours');
