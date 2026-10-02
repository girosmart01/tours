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
    "image": "images/golden-ring-pinnawala.png",
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
    "image": "images/rafting-real.jpg",
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
      "author": "Oye Yogi",
      "source": "https://www.pexels.com/photo/exciting-river-rafting-adventure-on-rapids-31798401/",
      "license": "Pexels License",
      "licenseUrl": "https://www.pexels.com/license/"
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

function managerLink(tour) {
  return `https://t.me/${MANAGER_USERNAME}?text=${encodeURIComponent(tour ? `Здравствуйте! Помогите понять, подойдёт ли мне экскурсия «${tour.title}».` : 'Здравствуйте! Помогите подобрать экскурсию по Шри-Ланке.')}`;
}
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
            <button class="btn btn-primary" data-book="${tour.id}">Уточнить места</button>
          </div>
        </div>
        <a class="detail-contact" href="${managerLink(tour)}" target="_blank" rel="noopener noreferrer">Помогите выбрать →</a>
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

    <div class="notice"><strong>Впервые на острове и не знаете, что выбрать?</strong>
      <p>Расскажите, где отдыхаете и что любите. Поможем сравнить маршруты.</p>
      <a class="btn btn-secondary" href="${managerLink()}" target="_blank" rel="noopener noreferrer">Помогите подобрать экскурсию</a>
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
      <button class="btn btn-primary btn-block detail-book" id="detail-book-btn">Уточнить места</button>
      <p class="booking-caption">Это запрос менеджеру, не оплата и не подтверждённая бронь.</p>
      <a href="${managerLink(tour)}" target="_blank" rel="noopener noreferrer" class="detail-contact">Помогите выбрать · @${MANAGER_USERNAME}</a>
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
    <p class="lede">Вдохновение для вашего путешествия по Шри-Ланке.</p>
    <figure class="reviews-collage">
      <img src="images/reviews-collage.png" width="941" height="1672"
        alt="Коллаж путешествия по Шри-Ланке: горы, мост, чайные плантации, водопады и океан"
        decoding="async" />
    </figure>
    <a class="btn btn-primary" href="${managerLink()}" target="_blank" rel="noopener noreferrer">Задать вопрос</a>
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

const TOUR_SCHEDULE = {"weekly": {"rafting": 5, "golden_ring": 1}, "dates": {"treasure": ["2026-10-01", "2026-10-04", "2026-10-07", "2026-10-10", "2026-10-13", "2026-10-16", "2026-10-19", "2026-10-22", "2026-10-25", "2026-10-28", "2026-10-31"], "safari": ["2026-10-01", "2026-10-03", "2026-10-06", "2026-10-09", "2026-10-12", "2026-10-15", "2026-10-18", "2026-10-21", "2026-10-24", "2026-10-27", "2026-10-30"], "ella": ["2026-10-02", "2026-10-05", "2026-10-08", "2026-10-11", "2026-10-14", "2026-10-17", "2026-10-20", "2026-10-23", "2026-10-26", "2026-10-29"], "ella_safari": ["2026-10-04", "2026-10-07", "2026-10-10", "2026-10-13", "2026-10-16", "2026-10-19", "2026-10-22", "2026-10-25", "2026-10-28", "2026-10-31"]}};
let calendarMonth = "";
function renderBooking() {
  const initialTourId = selectedTourId || TOURS[0].id;
  content.innerHTML = `
    <h1 class="section-title">Уточнить места и стоимость</h1>
    <p class="lede">Сначала согласуем маршрут, дату и итоговую стоимость. Отправка запроса не подтверждает бронь и не требует оплаты.</p>
    <form id="booking-form">
      <div class="form-group"><label class="form-label" for="f-tour">Экскурсия</label>
        <select class="form-select" id="f-tour">${TOURS.map(t=>`<option value="${t.id}" ${t.id===initialTourId?'selected':''}>${t.title}</option>`).join('')}</select></div>
      <div class="form-group"><label class="form-label" for="f-date">Желаемая дата</label>
        <input type="hidden" id="f-date" />
        <div id="tour-calendar" aria-label="Календарь выездов"></div>
        <p id="selected-date-label" class="booking-caption" aria-live="polite">Выберите дату выезда</p>
        <label class="flex-date"><input type="checkbox" id="f-flexible" /> Пока не определился с датой</label>
        <div id="date-empty-note"></div></div>
      <div class="form-row">
        <div class="form-group"><label class="form-label" for="f-adults">Взрослые</label><input class="form-input" type="number" id="f-adults" min="1" max="50" value="1" required /></div>
        <div class="form-group"><label class="form-label" for="f-children">Дети</label><input class="form-input" type="number" id="f-children" min="0" max="50" value="0" required /></div>
      </div>
      <div class="form-group"><label class="form-label" for="f-resort">Откуда вас забрать?</label><input class="form-input" id="f-resort" maxlength="200" placeholder="Курорт или «Пока не знаю»" required /></div>
      <div class="form-group"><label class="form-label" for="f-phone">Контакт для ответа</label><input class="form-input" id="f-phone" maxlength="100" placeholder="@telegram или телефон / WhatsApp" /><p id="contact-note" class="booking-caption"></p></div>
      <div id="booking-status" role="status" aria-live="polite"></div>
      <button type="submit" class="btn btn-primary btn-block" id="booking-submit-btn">Отправить запрос</button>
    </form>
    <div class="upsell-note"><p>Удобнее обсудить лично?</p><a class="upsell-link" href="${managerLink()}" target="_blank" rel="noopener noreferrer">Помогите выбрать → @${MANAGER_USERNAME}</a></div>`;
  const username = tg?.initDataUnsafe?.user?.username;
  document.getElementById('f-phone').required = !username;
  document.getElementById('contact-note').textContent = username ? `Ответим в Telegram @${username}. Другой контакт можно оставить по желанию.` : 'Укажите контакт, по которому менеджер сможет вам ответить.';
  populateDateOptions(initialTourId);
  document.getElementById('f-flexible').addEventListener('change', e=>{
    const date = document.getElementById('f-date');date.disabled=e.target.checked;renderTourCalendar();
  });
  document.getElementById('f-date').addEventListener('input', validateBookingDate);
  document.getElementById('f-tour').addEventListener('change', e=>populateDateOptions(e.target.value));
  document.getElementById('booking-form').addEventListener('submit', handleBookingSubmit);
}

function isTourDateAllowed(tourId, iso) {
  if (iso < sriLankaToday()) return false;
  const day = new Date(`${iso}T12:00:00Z`);
  if (!Number.isFinite(day.getTime()) || day.toISOString().slice(0,10) !== iso) return false;
  if (Object.hasOwn(TOUR_SCHEDULE.weekly, tourId)) return day.getUTCDay() === TOUR_SCHEDULE.weekly[tourId];
  if (TOUR_SCHEDULE.dates[tourId]) return TOUR_SCHEDULE.dates[tourId].includes(iso);
  return true;
}

function populateDateOptions(tourId) {
  selectedTourId = tourId;
  const input = document.getElementById('f-date');
  if (input.value && !isTourDateAllowed(tourId, input.value)) input.value = '';
  calendarMonth = (input.value || sriLankaToday()).slice(0,7);
  const children = document.getElementById('f-children');
  children.disabled = tourId === 'rafting';
  if (children.disabled) children.value = '0';
  const notes = {
    rafting: 'Выезды каждую пятницу, участие с 18 лет.',
    golden_ring: 'Выезды каждый понедельник. Продолжительность — 3 дня.',
  };
  document.getElementById('date-empty-note').textContent = (notes[tourId] || (TOUR_SCHEDULE.dates[tourId] ? 'Опубликовано расписание на октябрь 2026. Другие даты пока недоступны.' : 'Расписание пока не опубликовано. Желаемую дату согласует менеджер.')) + ' Наличие мест подтвердит менеджер.';
  renderTourCalendar();
}

function renderTourCalendar() {
  const tourId = document.getElementById('f-tour').value;
  const input = document.getElementById('f-date');
  const flexible = document.getElementById('f-flexible').checked;
  const [year,month] = calendarMonth.split('-').map(Number);
  const first = new Date(Date.UTC(year,month-1,1));
  const count = new Date(Date.UTC(year,month,0)).getUTCDate();
  const offset = (first.getUTCDay()+6)%7;
  const title = new Intl.DateTimeFormat('ru-RU',{month:'long',year:'numeric',timeZone:'UTC'}).format(first);
  let available = 0;
  const cells = Array.from({length:count},(_,i)=>{
    const iso = `${calendarMonth}-${String(i+1).padStart(2,'0')}`;
    const allowed = isTourDateAllowed(tourId,iso);
    if (allowed) available++;
    return `<button type="button" class="calendar-day" data-date="${iso}" aria-label="${formatDateLabelForTour(iso,findTour(tourId))}" aria-pressed="${input.value===iso}" ${!allowed||flexible?'disabled':''}>${i+1}</button>`;
  }).join('');
  document.getElementById('tour-calendar').innerHTML = `
    <div class="calendar-header"><button type="button" id="calendar-prev" aria-label="Предыдущий месяц" ${calendarMonth<=sriLankaToday().slice(0,7)||flexible?'disabled':''}>‹</button><strong aria-live="polite">${title}</strong><button type="button" id="calendar-next" aria-label="Следующий месяц" ${flexible?'disabled':''}>›</button></div>
    <div class="calendar-grid">${['Пн','Вт','Ср','Чт','Пт','Сб','Вс'].map(d=>`<span class="calendar-weekday">${d}</span>`).join('')}${'<span></span>'.repeat(offset)}${cells}</div>
    ${!available?'<p class="booking-caption">В этом месяце доступных дат нет.</p>':''}`;
  const navigate = delta => {calendarMonth = new Date(Date.UTC(year,month-1+delta,1)).toISOString().slice(0,7);renderTourCalendar();};
  document.getElementById('calendar-prev').onclick=()=>navigate(-1);
  document.getElementById('calendar-next').onclick=()=>navigate(1);
  document.querySelectorAll('[data-date]').forEach(button=>button.onclick=()=>{input.value=button.dataset.date;renderTourCalendar();document.getElementById('booking-status').textContent='';});
  document.getElementById('selected-date-label').textContent = flexible ? 'Дату обсудим с менеджером' : input.value ? `Выезд: ${formatDateLabelForTour(input.value,findTour(tourId))}` : 'Выберите доступную дату выезда';
}

function validateBookingDate() {
  if (document.getElementById('f-flexible').checked) return true;
  const valid = isTourDateAllowed(document.getElementById('f-tour').value,document.getElementById('f-date').value);
  if (!valid) {
    const status = document.getElementById('booking-status');
    status.className='status-msg error';
    status.textContent='Выберите доступную дату в календаре или отметьте «Пока не определился с датой».';
  }
  return valid;
}

async function handleBookingSubmit(e) {
  e.preventDefault();
  if (!validateBookingDate() || !e.target.reportValidity()) return;
  const statusEl = document.getElementById('booking-status');
  const submitBtn = e.target.querySelector('button[type="submit"]');

  if (!tg?.initData) {
    statusEl.innerHTML = '<p class="status-msg error">Не удалось подтвердить пользователя Telegram. Можно написать менеджеру по ссылке под формой.</p>';
    return;
  }

  const tourId = document.getElementById('f-tour').value;
  const tour = findTour(tourId);

  const payload = {
    init_data: tg.initData,
    tour_id: tourId,
    tour_title: tour ? tour.title : tourId,
    tour_date: document.getElementById('f-flexible').checked ? '' : document.getElementById('f-date').value,
    adults: Number(document.getElementById('f-adults').value),
    children: Number(document.getElementById('f-children').value),
    resort: document.getElementById('f-resort').value.trim(),
    contact: document.getElementById('f-phone').value.trim(),
    source: tg.initDataUnsafe?.start_param || 'direct',
  };

  submitBtn.disabled = true;
  statusEl.className = '';
  statusEl.innerHTML = '<p class="status-msg">Отправка…</p>';

  try {
    const res = await fetch('/api/inquiry', {
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
    if (data.notification_sent === false) {
      statusEl.textContent = 'Запрос сохранён, но уведомление менеджеру не доставлено. Напишите ему по ссылке под формой; повторно отправлять запрос не нужно.';
      statusEl.className = 'status-msg error';
      return;
    }
    tg?.HapticFeedback?.notificationOccurred('success');
    content.innerHTML = `
      <h1 class="section-title">Запрос отправлен</h1>
      <p class="lede">Менеджер ответит по указанному контакту или в Telegram. Сначала согласуем стоимость и детали; бронь ещё не подтверждена.</p>
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
