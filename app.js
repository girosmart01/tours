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
// Данные туров
// ---------------------------------------------------------------

const TOURS = [
  {
    "id": "golden_ring",
    "icon": "fortress",
    "image": "images/treasure.jpg",
    "title": "Золотое кольцо Шри-Ланки",
    "subtitle": "Три дня среди древних крепостей, чайных холмов и горных пейзажей — от Пинавеллы до Эллы.",
    "duration": "3 дня / 2 ночи",
    "sections": [
      {
        "label": "День 1",
        "heading": "Пинавелла → Сигирия → Дамбулла",
        "items": [
          "Выезд из вашего отеля ориентировочно в 02:30–03:30; время зависит от курорта",
          "Посещение слоновьего питомника в Пинавелле",
          "Подъём на Пидурангалу или Сигирию — по выбранной программе",
          "Знакомство с деревней Сигирия: поездка на повозке с буйволом и прогулка на речном катамаране",
          "Посещение местного дома и демонстрация приготовления ланкийских блюд",
          "Остановка у храмового комплекса Дамбулла без подъёма в пещеры",
          "Ночёвка в отеле; ужин и завтрак включены"
        ]
      },
      {
        "label": "День 2",
        "heading": "Канди → Нувара-Элия",
        "items": [
          "Башня Амбулувава",
          "Прогулка по Королевскому ботаническому саду",
          "Посещение аюрведического сада специй",
          "Чайные плантации и знакомство с производством на фабрике",
          "Водопад Рамбода",
          "Вторая ночь в отеле; ужин и завтрак включены"
        ]
      },
      {
        "label": "День 3",
        "heading": "Нувара-Элия → Элла",
        "items": [
          "Знакомство с Нувара-Элией и посещение почтового офиса",
          "Короткая поездка на поезде",
          "Остановка в Элле со временем для обеда",
          "Девятиарочный мост",
          "Подъём на Малый пик Адама — около 25 минут",
          "Водопад Равана",
          "Возвращение в ваш отель примерно в 20:00–22:00; время зависит от курорта"
        ]
      }
    ],
    "includes": [
      "Трансфер по программе",
      "Две ночи в отеле",
      "Ужины и завтраки при ночёвках",
      "Русскоговорящее сопровождение",
      "Входные билеты по программе"
    ],
    "extra": "Обед с напитком — 10$ по желанию. Одноместное размещение — +25$ за ночь (+50$ за две ночи). Трансфер из дальних курортов, включая Коломбо, Калутару, Бентоту и Берувеллу, оплачивается отдельно.",
    "prices": [
      {
        "label": "С подъёмом на Пидурангалу, за человека",
        "value": "250$"
      },
      {
        "label": "С подъёмом на Сигирию, за человека",
        "value": "280$"
      }
    ],
    "note": "Цена рассчитана на двухместное размещение. Дети младше 5 лет — бесплатно, 6–11 лет — скидка 50%. Оплата: наличными в рупиях или долларах либо переводом на карту. Дата выезда подтверждается менеджером.",
    "dates": [],
    "category": "Многодневные",
    "featured": true,
    "days": 3,
    "badge": "Новинка сезона"
  },
  {
    "id": "treasure",
    "icon": "fortress",
    "image": "images/treasure.jpg",
    "title": "Сокровище Цейлона",
    "subtitle": "2 дня среди гор, поездов и древних крепостей",
    "duration": "2 дня / 1 ночь",
    "sections": [
      {
        "label": "День 1",
        "heading": "Элла • Нувара-Элия",
        "items": [
          "Водопад Равана",
          "Малый Пик Адама (подъём ~25 мин)",
          "Девятиарочный мост",
          "Город Элла",
          "Поездка на поезде (35–40 мин)",
          "Почтовый офис в Нувара-Элии",
          "Чайные плантации и фабрика",
          "Ночь в отеле в горах"
        ]
      },
      {
        "label": "День 2",
        "heading": "Канди • Пинавелла • Сигирия",
        "items": [
          "Водопад Рамбода",
          "Башня Амбулувава (башня 4-х религий)",
          "Кормление обезьян",
          "Кормление слонов в Пинавелле",
          "Крепость Сигирия или гора Пидурангала",
          "Храм Дамбулла (15 мин, без подъёма в пещеры)",
          "Аюрведический сад"
        ]
      }
    ],
    "includes": [
      "Трансфер",
      "Проживание в отеле",
      "Завтрак",
      "Русскоговорящее сопровождение",
      "Все входные билеты"
    ],
    "extra": "Обед + напиток (по желанию) — +10$",
    "prices": [
      {
        "label": "Гора Пидурангала",
        "value": "130$"
      },
      {
        "label": "Крепость Сигирия",
        "value": "160$"
      }
    ],
    "multiDay": true,
    "dates": [
      "2026-09-19",
      "2026-09-23",
      "2026-09-27"
    ]
  },
  {
    "id": "rafting",
    "icon": "raft",
    "image": "images/rafting.jpg",
    "title": "Рафтинг по горной реке",
    "subtitle": "Пороги, тропическая зелень и полтора–два часа сплава с инструктором. Выезды по пятницам.",
    "duration": "1 день",
    "sections": [
      {
        "heading": "Пятничное приключение",
        "items": [
          "Трансфер от вашего отеля ориентировочно в 04:00–05:00; время зависит от расположения",
          "Начало программы в 08:00",
          "Инструктаж и подготовка к выходу на воду",
          "Сплав на рафте с инструктором — около 1,5–2 часов",
          "Время для отдыха и обеда по желанию",
          "Обратный трансфер в отель; точное время не указано"
        ]
      }
    ],
    "includes": [
      "Трансфер от отеля и обратно",
      "Входные билеты",
      "Русскоговорящий гид",
      "Сплав с инструктором",
      "Рафт и необходимое снаряжение"
    ],
    "extra": "Обед с напитком — 10$ по желанию.",
    "prices": [
      {
        "label": "За человека при группе 10–12 участников",
        "value": "75$"
      },
      {
        "label": "За человека при группе 5–8 участников",
        "value": "100$"
      }
    ],
    "note": "Только для участников от 18 лет. Проведение зависит от погоды и уровня воды. Для группы из 9 человек и другого состава, не указанного в тарифах, цена уточняется у менеджера. Оплата: наличными в рупиях или долларах либо переводом на карту.",
    "dates": [],
    "category": "Активный отдых",
    "featured": true,
    "badge": "По пятницам · 18+",
    "photoCredit": {
      "author": "Rehman Abubakr",
      "source": "https://commons.wikimedia.org/wiki/File:KitulgalaRafting-March2013-01.JPG",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/"
    }
  },
  {
    "id": "safari",
    "icon": "paw",
    "image": "images/safari.jpg",
    "title": "Сафари",
    "subtitle": "Встреча с дикой природой Шри-Ланки",
    "duration": "~4 часа",
    "sections": [
      {
        "items": [
          "Выезд в 3:00–4:00 утра",
          "Старт сафари в национальном парке в 6:00",
          "Экскурсия на джипах",
          "Длительность 3,5–4 часа"
        ]
      },
      {
        "heading": "В парке можно встретить",
        "items": [
          "Слонов",
          "Леопардов",
          "Крокодилов",
          "Варанов",
          "Обезьян",
          "Мангустов",
          "Диких буйволов",
          "Пятнистых оленей",
          "Павлинов",
          "Экзотических птиц"
        ]
      }
    ],
    "includes": [
      "Трансфер",
      "Сафари на джипах",
      "Входные билеты",
      "Русскоговорящее сопровождение"
    ],
    "extra": "Обед + напиток (по желанию) — +10$",
    "prices": [
      {
        "value": "85$"
      }
    ],
    "dates": [
      "2026-09-22",
      "2026-09-26",
      "2026-09-30"
    ]
  },
  {
    "id": "ella",
    "icon": "train",
    "image": "images/ella.jpg",
    "title": "Элла",
    "subtitle": "Самые красивые виды горной Шри-Ланки за один день",
    "duration": "1 день",
    "sections": [
      {
        "items": [
          "Водопад Равана",
          "Малый Пик Адама (подъём ~25 мин)",
          "Девятиарочный мост",
          "Город Элла",
          "Поездка на поезде (одна станция, ~20 мин)",
          "Чайные плантации",
          "Аюрведический сад",
          "Слоны возле парка Удавалаве (фото)"
        ]
      }
    ],
    "includes": [
      "Трансфер",
      "Русскоговорящее сопровождение",
      "Все входные билеты",
      "Поездка на поезде"
    ],
    "extra": "Обед + напиток (по желанию) — +10$",
    "prices": [
      {
        "value": "50$"
      }
    ],
    "dates": [
      "2026-09-20",
      "2026-09-24",
      "2026-09-28"
    ]
  },
  {
    "id": "ella_safari",
    "icon": "paw",
    "image": "images/ella_safari.jpg",
    "title": "Элла + Сафари",
    "subtitle": "Горы, поезд и сафари за один день",
    "duration": "1 день",
    "sections": [
      {
        "items": [
          "Сафари по национальному парку Удавалаве или Яла (~3–4 часа)",
          "Водопад Равана",
          "Девятиарочный мост",
          "Малый Пик Адама",
          "Катание на поезде (одна станция, ~15 мин)",
          "Чайные плантации",
          "Аюрведический сад"
        ]
      }
    ],
    "includes": [
      "Трансфер",
      "Джип-сафари",
      "Входные билеты",
      "Русскоговорящий гид",
      "Поездка на поезде"
    ],
    "extra": "Обед + напиток (по желанию) — +10$",
    "prices": [
      {
        "value": "115$"
      }
    ],
    "dates": [
      "2026-09-19",
      "2026-09-23",
      "2026-09-27"
    ]
  },
  {
    "id": "whales",
    "icon": "whale",
    "image": "images/whales.jpg",
    "title": "Морская экскурсия к китам",
    "subtitle": "Киты, дельфины и черепахи в открытом океане",
    "duration": "3–4 часа",
    "sections": [
      {
        "items": [
          "Начало в 6:00 в Мириссе",
          "Выход в океан",
          "3–4 часа в открытом океане"
        ]
      },
      {
        "heading": "За время программы можно увидеть",
        "items": [
          "Китов",
          "Дельфинов",
          "Черепах"
        ]
      }
    ],
    "includes": [
      "Билет на морскую экскурсию",
      "Трансфер от отеля до Мириссы"
    ],
    "prices": [
      {
        "value": "50$",
        "label": "Билет + трансфер от отеля"
      }
    ],
    "dates": []
  },
  {
    "id": "kandy",
    "icon": "elephant",
    "image": "images/kandy.jpg",
    "title": "Канди + Питомник слонов",
    "subtitle": "Понаблюдайте за купанием слонов, поднимитесь к панорамам Амбулувавы и побывайте на чайной фабрике за один день.",
    "duration": "1 день",
    "sections": [
      {
        "heading": "Маршрут на один день",
        "items": [
          "Выезд из вашего отеля примерно в 03:00–04:00",
          "Наблюдение за купанием слонов в Пинавелле",
          "Посещение аюрведического сада",
          "Храм Неллигала или Королевский ботанический сад — на выбор",
          "Подъём на башню Амбулувава",
          "Посещение чайной фабрики",
          "Прогулка по чайным плантациям",
          "Возвращение в ваш отель ориентировочно в 17:00–18:00"
        ]
      }
    ],
    "includes": [
      "Трансфер",
      "Русскоговорящее сопровождение",
      "Входные билеты по программе",
      "Посещение чайной фабрики"
    ],
    "extra": "Обед с напитком — 10$ по желанию.",
    "prices": [
      {
        "value": "85$",
        "label": "За человека, независимо от размера группы"
      }
    ],
    "note": "Дети младше 5 лет — бесплатно, 6–11 лет — скидка 50%. Время трансфера зависит от расположения отеля. Дата выезда подтверждается менеджером.",
    "dates": [],
    "category": "Однодневные",
    "featured": true
  }
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
      <div class="tour-card-cover" style="background-image:url('${tour.image}')">
        <span class="tour-card-badge">${tour.duration}</span>
        ${tour.badge ? `<span class="tour-new-badge">${tour.badge}</span>` : ""}
      </div>
      <div class="tour-card-body">
        ${tour.category ? `<p class="tour-category">${tour.category}</p>` : ""}
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

// ---------------------------------------------------------------
// Детальная страница тура
// ---------------------------------------------------------------

function photoCredit(tour) {
  const c = tour.photoCredit;
  return c ? `<p class="photo-credit">Фото: <a href="${c.source}" target="_blank" rel="noopener noreferrer">${c.author}</a> · <a href="${c.licenseUrl}" target="_blank" rel="noopener noreferrer">${c.license}</a>. Изображение без изменений; кадрирование при отображении.</p>` : '';
}

function renderTourDetail(id) {
  const tour = findTour(id);
  if (!tour) { renderTours(); return; }
  const prices = tour.prices.length ? tour.prices.map(p => `
    <div class="detail-price"><strong>${p.value}</strong><span>${p.label || 'за человека'}</span></div>
  `).join('') : '<div class="detail-price"><strong>По запросу</strong><span>Стоимость уточнит менеджер</span></div>';
  content.innerHTML = `
    <button class="back-link" id="back-to-tours">← Все туры</button>
    <article class="tour-infographic" aria-label="Программа: ${tour.title}">
      <header class="infographic-heading">
        <p class="tour-category">${tour.category || 'Экскурсии по Шри-Ланке'}</p>
        <h1 class="section-title">${tour.title}</h1>
        <p class="lede">${tour.subtitle}</p>
      </header>
      <img class="detail-photo" src="${tour.image}" alt="${tour.title}" />
      
      <div class="detail-facts"><span>${tour.duration}</span>${tour.badge ? `<span>${tour.badge}</span>` : ''}</div>
      <div class="detail-prices">${prices}</div>
      <h2 class="program-title">Ваш маршрут</h2>
      <div class="route-timeline">${tour.sections.map((sec, index) => `
        <section class="route-section">
          <div class="route-number">${String(index + 1).padStart(2, '0')}</div>
          <div class="route-body">
            ${sec.label ? `<p class="day-label">${sec.label}</p>` : ''}
            ${sec.heading ? `<h3 class="route-heading">${sec.heading}</h3>` : ''}
            <ol class="route-stops">${sec.items.map(item=>`<li>${item}</li>`).join('')}</ol>
          </div>
        </section>`).join('')}
      </div>
      <section class="included-panel"><h2>Включено в стоимость</h2><ul>${tour.includes.map(x=>`<li>${x}</li>`).join('')}</ul></section>
      ${tour.extra ? `<section class="extras-panel"><h2>Оплачивается отдельно</h2><p>${tour.extra}</p></section>` : ''}
      ${tour.note ? `<div class="notice">${tour.note}</div>` : ''}
      <button class="btn btn-primary btn-block detail-book" id="detail-book-btn">Забронировать</button>
      <p class="booking-caption">Дату и детали поездки подтвердит менеджер</p>
      <a href="https://t.me/${MANAGER_USERNAME}" target="_blank" rel="noopener noreferrer" class="detail-contact">Связаться в Telegram · @${MANAGER_USERNAME}</a>
    </article>`;
  document.getElementById('back-to-tours').addEventListener('click', () => {renderTours();window.scrollTo(0,0);});
  document.getElementById('detail-book-btn').addEventListener('click', () => {selectedTourId=tour.id;switchTab('booking');});
  window.scrollTo(0,0);
}

// ---------------------------------------------------------------
// Вкладка "Вопросы"
// ---------------------------------------------------------------

function renderFaq() {
  content.innerHTML = `
    <h1 class="section-title">Вопросы и ответы</h1>
    <p class="lede">Если вы хотите увидеть настоящую Шри-Ланку, а не только пляж — вы по адресу.</p>

    <div class="day-block">
      <p class="day-region">🗺 Что мы организуем</p>
      <ul class="day-items">
        <li>Однодневные экскурсии</li>
        <li>Двух- и многодневные туры</li>
        <li>Индивидуальные маршруты</li>
        <li>Групповые поездки</li>
        <li>Трансферы</li>
      </ul>
    </div>

    <div class="day-block">
      <p class="day-region">🚗 Гиды и транспорт</p>
      <ul class="day-items">
        <li>Гиды — опытные ланкийцы, говорящие по-русски</li>
        <li>Комфортные автомобили с кондиционером</li>
        <li>Фото от гида — в подарок</li>
      </ul>
    </div>

    <div class="notice">
      <b>Трансфер из отдалённых курортов</b> (Коломбо, Тангалле, Бентота, Берувелла и другие) оплачивается дополнительно — уточним сумму при бронировании.
    </div>

    <div class="day-block" style="margin-top:18px;">
      <p class="day-region">👨‍👩‍👧 Скидки для детей</p>
      <ul class="day-items">
        <li>Младше 5 лет — бесплатно на экскурсиях с детским тарифом</li>
        <li>От 6 до 11 лет — скидка 50% на экскурсиях с детским тарифом</li>
        <li>Рафтинг доступен только участникам от 18 лет</li>
      </ul>
    </div>

    <div class="notice">
      💰 <b>Оплата</b> — наличными, в рупиях или долларах.
    </div>

    <details class="photo-sources">
      <summary>Источники фотографий</summary>
      <p>Иллюстрация к экскурсии «Рафтинг по горной реке»:</p>
      ${photoCredit(findTour('rafting'))}
    </details>

    <div class="upsell-note">
      <p>Не нашли ответ на свой вопрос?</p>
      <a href="https://t.me/${MANAGER_USERNAME}" target="_blank" class="upsell-link">Написать менеджеру → @${MANAGER_USERNAME}</a>
    </div>
  `;
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

const MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

function formatDateLabel(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

function formatDateLabelForTour(iso, tour) {
  const days = tour?.days || (tour?.multiDay ? 2 : 1);
  if (days === 1) return formatDateLabel(iso);
  const [y,m,d] = iso.split('-').map(Number);
  const end = new Date(Date.UTC(y,m-1,d + days-1));
  const last = `${end.getUTCFullYear()}-${String(end.getUTCMonth()+1).padStart(2,'0')}-${String(end.getUTCDate()).padStart(2,'0')}`;
  return `${formatDateLabel(iso)} — ${formatDateLabel(last)}`;
}

function sriLankaToday() {
  const parts = new Intl.DateTimeFormat('en-CA', {timeZone:'Asia/Colombo',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
  const part = kind => parts.find(x=>x.type===kind).value;
  return `${part('year')}-${part('month')}-${part('day')}`;
}

function renderBooking() {
  const initialTourId = selectedTourId || TOURS[0].id;
  const options = TOURS.map(t => `<option value="${t.id}" ${t.id === initialTourId ? 'selected' : ''}>${t.title}</option>`).join('');

  content.innerHTML = `
    <h1 class="section-title">Бронирование</h1>
    <p class="lede">Выберите тур и желаемую дату, заполните данные. Мы свяжемся с Вами для подтверждения поездки.</p>

    <form id="booking-form">
      <div class="form-group">
        <label class="form-label" for="f-tour">Тур</label>
        <select class="form-select" id="f-tour">${options}</select>
      </div>

      <div id="booking-fields">
      <div class="form-group">
        <label class="form-label" for="f-date">Желаемая дата экскурсии</label>
        <input class="form-input" type="date" id="f-date" required aria-describedby="date-empty-note" />
        <div id="date-empty-note"></div>
      </div>

      <div class="form-group">
        <label class="form-label" for="f-name">Имя</label>
        <input class="form-input" type="text" id="f-name" placeholder="Как к Вам обращаться" required />
      </div>

      <div class="form-group">
        <label class="form-label" for="f-phone">Телефон / WhatsApp</label>
        <input class="form-input" type="tel" id="f-phone" placeholder="+7 ..." required />
      </div>

      <div class="form-group">
        <label class="form-label" for="f-country">Страна</label>
        <input class="form-input" type="text" id="f-country" placeholder="Например, Казахстан" required />
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label" for="f-hotel">Отель</label>
          <input class="form-input" type="text" id="f-hotel" placeholder="Название отеля" />
        </div>
        <div class="form-group">
          <label class="form-label" for="f-room">№ комнаты</label>
          <input class="form-input" type="text" id="f-room" placeholder="Необязательно" />
        </div>
      </div>

      </div>

      <div id="booking-status"></div>

      <button type="submit" class="btn btn-primary btn-block" id="booking-submit-btn" style="padding:13px;font-size:14px;margin-top:6px;">Отправить заявку</button>
    </form>

    <div class="upsell-note">
      <p>Не готовы бронировать? Обсудим индивидуальный тур и просчитаем цену.</p>
      <a href="https://t.me/${MANAGER_USERNAME}" target="_blank" class="upsell-link">Написать менеджеру → @${MANAGER_USERNAME}</a>
    </div>
  `;

  populateDateOptions(initialTourId);
  document.getElementById('f-date').addEventListener('input', validateBookingDate);
  document.getElementById('f-tour').addEventListener('change', (e) => populateDateOptions(e.target.value));
  document.getElementById('booking-form').addEventListener('submit', handleBookingSubmit);
}

function populateDateOptions(tourId) {
  selectedTourId = tourId;
  const input = document.getElementById('f-date');
  const note = document.getElementById('date-empty-note');
  const today = sriLankaToday();
  input.min = today;
  input.step = '1';
  if (tourId === 'rafting') {
    const next = new Date(`${today}T12:00:00Z`);
    next.setUTCDate(next.getUTCDate() + (5 - next.getUTCDay() + 7) % 7);
    input.min = next.toISOString().slice(0,10);
    input.step = '7';
    note.textContent = 'Рафтинг проходит по пятницам, участие с 18 лет. Дату и наличие мест подтвердит менеджер.';
  } else {
    note.textContent = 'Укажите удобную дату. Заявка не гарантирует наличие мест — поездку подтвердит менеджер.';
  }
  if (input.value && (input.value < input.min || (tourId === 'rafting' && new Date(`${input.value}T12:00:00Z`).getUTCDay() !== 5))) input.value = '';
  validateBookingDate();
}

function validateBookingDate() {
  const input = document.getElementById('f-date');
  input.setCustomValidity('');
  if (input.value && input.value < sriLankaToday()) input.setCustomValidity('Выберите сегодняшнюю или будущую дату.');
  else if (input.value && document.getElementById('f-tour').value === 'rafting' && new Date(`${input.value}T12:00:00Z`).getUTCDay() !== 5) input.setCustomValidity('Для рафтинга выберите пятницу.');
  return input.validity.valid;
}

async function handleBookingSubmit(e) {
  e.preventDefault();
  if (!validateBookingDate() || !e.target.reportValidity()) return;
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
  statusEl.className = '';
  statusEl.innerHTML = '<p class="status-msg">Отправка…</p>';

  try {
    const res = await fetch('/api/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      statusEl.textContent = typeof data.detail === 'string' ? data.detail : 'Не удалось отправить заявку. Проверьте заполненные поля.';
      statusEl.className = 'status-msg error';
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
  faq: renderFaq,
  reviews: renderReviews,
  booking: renderBooking,
};

function switchTab(tabId) {
  tabButtons.forEach(btn => {
    btn.setAttribute('aria-selected', String(btn.dataset.tab === tabId));
  });
  TABS[tabId]();
  window.scrollTo(0,0);
}

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

switchTab('tours');
