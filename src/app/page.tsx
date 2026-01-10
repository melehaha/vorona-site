"use client";

import { useState, type FormEvent, type ReactNode } from "react";

type CaseItem = {
  id: string;
  title: string;
  short: string;
  youtube?: string;
  modalTitle: string;
  modalBody: ReactNode;
};

function Modal({
  title,
  open,
  onClose,
  children,
}: {
  title: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  if (!open) return null;

  return (
    <div
      className="modalOverlay"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal">
        <div className="modalHeader">
          <h3 className="modalTitle">{title}</h3>
          <button className="btn modalClose" onClick={onClose} aria-label="Закрыть">
            ✕
          </button>
        </div>

        <div className="modalBody">{children}</div>

        {/* На мобиле будет видна, на десктопе спрячем через CSS */}
        <div className="modalFooter">
          <button className="btn btnPrimary" type="button" onClick={onClose}>
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}

function LeadForm({ tgUsername }: { tgUsername: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [car, setCar] = useState("");
  const [budget, setBudget] = useState("");
  const [comment, setComment] = useState("");
  const [navOpen, setNavOpen] = useState(false);

  const canSend = phone.trim().length >= 5 && car.trim().length >= 2;

  function buildMessage() {
    const lines: string[] = [];
    lines.push("Заявка ВОРОНАКАР");
    if (name.trim()) lines.push(`Имя: ${name.trim()}`);
    lines.push(`Телефон: ${phone.trim()}`);
    if (city.trim()) lines.push(`Город: ${city.trim()}`);
    lines.push(`Что ищем: ${car.trim()}`);
    if (budget.trim()) lines.push(`Бюджет: ${budget.trim()}`);
    if (comment.trim()) lines.push(`Комментарий: ${comment.trim()}`);
    return lines.join("\n");
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSend) return;

    const message = buildMessage();
    const url = `https://t.me/${tgUsername}?text=${encodeURIComponent(message)}`;
    window.location.href = url;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="fieldGrid">
        <div>
          <label className="label">Имя (необязательно)</label>
          <input
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Илья / Андрей"
          />
        </div>
        <div>
          <label className="label">Телефон (обязательно)</label>
          <input
            className="input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+7..."
            inputMode="tel"
          />
        </div>
      </div>

      <div style={{ height: 12 }} />

      <div className="fieldGrid">
        <div>
          <label className="label">Город</label>
          <input
            className="input"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Например, Казань"
          />
        </div>
        <div>
          <label className="label">Бюджет</label>
          <input
            className="input"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="Например, до 1.3 млн"
          />
        </div>
      </div>

      <div style={{ height: 12 }} />

      <div>
        <label className="label">Что ищем (обязательно)</label>
        <input
          className="input"
          value={car}
          onChange={(e) => setCar(e.target.value)}
          placeholder="Марка/модель/кузов/привод/год — как угодно"
        />
      </div>

      <div style={{ height: 12 }} />

      <div>
        <label className="label">Комментарий</label>
        <textarea
          className="textarea"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Пробег, комплектация, что важно/что точно не подходит…"
        />
      </div>

      <div style={{ height: 14 }} />

      <button className={`btn ${canSend ? "btnPrimary" : ""}`} type="submit" disabled={!canSend}>
        Отправить в Telegram
      </button>

      <div style={{ height: 10 }} />
      <div className="small">
        После нажатия откроется Telegram с готовым текстом заявки.
        <br />
        Минимум: <span className="kbd">телефон</span> и <span className="kbd">что ищем</span>.
      </div>
    </form>
  );
}

export default function Page() {
  const TG = "melehaha";
  const tgLink = `https://t.me/${TG}`;
  const igLink = "https://instagram.com/vorona.car";

  const [openLead, setOpenLead] = useState(false);
  const [openCost, setOpenCost] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(false);
  const [openDocs, setOpenDocs] = useState(false);
  const [openAbout, setOpenAbout] = useState(false);

  const [activeDoc, setActiveDoc] = useState<"dogovor" | "invoice">("dogovor");
  const [caseModalId, setCaseModalId] = useState<string | null>(null);

  const cases: CaseItem[] = [
    {
      id: "eclipse",
      title: "Mitsubishi Eclipse Cross 2018",
      short: "Бюджет впритык, честно про сроки, несколько ставок — довели до результата.",
      youtube: "https://youtu.be/tR1JzCL_PZw",
      modalTitle: "Кейс: Mitsubishi Eclipse Cross 2018",
      modalBody: (
        <div className="cardText">
          <ul>
            <li>Запрос: кроссовер + чёткий бюджет.</li>
            <li>Сразу проговорили реальность: при бюджете “впритык” быстро бывает редко.</li>
            <li>Договор, торги, несколько неудачных ставок.</li>
            <li>Клиент сам предложил увеличить бюджет (без давления с моей стороны).</li>
            <li>Итог: 4 балла, хорошее состояние, топовая комплектация.</li>
            <li>Нюанс: ЭПТС затянулся из-за высокой нагрузки на этапах.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "n-wgn",
      title: "Honda N-WGN Custom Turbo 2014",
      short: "4 балла, 540 000 ₽ во Владивостоке — бодрый и доступный кей-кар.",
      modalTitle: "Кейс: Honda N-WGN Custom Turbo 2014",
      modalBody: (
        <div className="cardText">
          <ul>
            <li>Авто: Honda N-WGN Custom Turbo, 2014.</li>
            <li>Оценка: 4 балла.</li>
            <li>Итог во Владивостоке: 540 000 ₽.</li>
            <li>
              Почему удачно: один из самых “бодрых” дешёвых кей-каров на рынке — приятнее, чем ждёшь от класса, при этом
              остаётся в адекватных деньгах.
            </li>
            <li>Видео: скоро (машина пока в порту в Японии).</li>
          </ul>
        </div>
      ),
    },
    {
      id: "roadster",
      title: "Mazda Roadster (MX-5) ND",
      short: "Жена захотела. Бюджет 1.3 млн. Долго, но получилось — без покупки на эмоциях.",
      youtube: "https://youtu.be/vrXxtHL2saM",
      modalTitle: "Кейс: Mazda Roadster (MX-5) ND",
      modalBody: (
        <div className="cardText">
          <ul>
            <li>Запрос: родстер (это была не моя хотелка).</li>
            <li>Бюджет: 1.3 млн, поэтому хороший вариант не всегда находится быстро.</li>
            <li>Итог: дождались нормального варианта и довели до результата без сомнительных компромиссов.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "cx-30",
      title: "Mazda CX-30 Skyactiv-D",
      short: "Моя личная любовь: хотел поднять комфорт и попробовать дизель. 1.8 млн — ни разу не пожалел.",
      youtube: "https://youtu.be/c3aBfF2L6zE",
      modalTitle: "Кейс: Mazda CX-30 Skyactiv-D",
      modalBody: (
        <div className="cardText">
          <ul>
            <li>Цель: кардинально поднять уровень комфорта и попробовать дизельный мотор.</li>
            <li>Бюджет: 1.8 млн.</li>
            <li>Итог: ни разу не пожалел — ожидания совпали с реальностью.</li>
          </ul>
        </div>
      ),
    },
  ];

  const currentCase = cases.find((c) => c.id === caseModalId) ?? null;

  const faq: { q: string; a: string }[] = [
    {
      q: "Сколько времени занимает привезти авто из Японии под заказ?",
      a: "Обычно это диапазон: зависит от модели, бюджета и того, насколько “узкие” критерии. Если бюджет впритык — часто дольше, потому что ждём подходящий лот.",
    },
    {
      q: "Почему хорошие лоты не всегда покупаются с первой ставки?",
      a: "Хорошие варианты порождают конкуренцию. Нормально, когда нужно несколько попыток — важнее не “любой ценой”, а купить адекватный лот.",
    },
    {
      q: "Как понять реальный бюджет: “машина” vs “итог во Владивостоке/в РФ”?",
      a: "“Цена машины на аукционе” — это только часть. Итог складывается из расходов по Японии, логистики, таможенных платежей, утиля и оформления. Я заранее показываю структуру.",
    },
    {
      q: "Какие документы я получаю на каждом этапе?",
      a: "Договор, подтверждения по этапам и финальные документы по оформлению. По ходу держу в курсе статуса.",
    },
    {
      q: "Как проверяется состояние: оценка, замечания, аукционный лист?",
      a: "Смотрим аукционный лист, оценку, замечания, пробег, историю по лоту. Если есть спорные моменты — обсуждаем до ставки.",
    },
    {
      q: "Можно ли привезти авто “впритык” по бюджету — и какие риски?",
      a: "Да, но обычно это меньше выбор и больше ожидание. Я сразу честно скажу, если бюджет слишком “узкий” под вашу модель/критерии.",
    },
    {
      q: "Как проходит оплата и когда нужны платежи?",
      a: "Оплата идёт по этапам. На старте фиксируем условия и дальше двигаемся по договорённой схеме.",
    },
    {
      q: "Что с доставкой в регионы РФ после Владивостока?",
      a: "После Владивостока помогаю с понятным вариантом отправки (автовоз/ж/д и т.д.) — выбираем под сроки и стоимость.",
    },
    {
      q: "Что делать, если меняется курс или рынок “поехал”?",
      a: "Смотрим статистику и корректируем стратегию ставок/критерии. Не тяну — говорю сразу, если бюджет стал “не в рынке”.",
    },
    {
      q: "Чем “ВОРОНАКАР” отличается от компаний с менеджерами?",
      a: "Вы общаетесь напрямую со мной. Меньше “передач”, быстрее решения и прозрачнее ответственность.",
    },
  ];

  return (
    <>
      {/* Header */}
<div className="header">
  <div className="container headerInner">
    <div className="brand" style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <img
        src="/img/logo.png"
        alt="ВОРОНАКАР"
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          objectFit: "cover",
          border: "1px solid var(--line)",
        }}
      />
      <span>ВОРОНАКАР</span>
    </div>

    {/* Desktop nav */}
    <nav className="nav navDesktop" aria-label="Навигация">
      <a href="#steps">Как я работаю</a>
      <a href="#cost">Стоимость</a>
      <a href="#cases">Кейсы</a>
      <a href="#faq">FAQ</a>
      <a href="#docs">Документы</a>
      <a href="#contacts">Контакты</a>
    </nav>

    {/* Desktop buttons */}
    <div className="btnRow btnRowDesktop">
      <a className="btn" href={tgLink} target="_blank" rel="noreferrer">
        Написать в Telegram
      </a>
      <button className="btn btnPrimary" onClick={() => setOpenLead(true)} type="button">
        Оставить заявку
      </button>
    </div>

    {/* Burger (mobile) */}
    <button
      className="burger"
      type="button"
      aria-label="Открыть меню"
      aria-expanded={navOpen}
      onClick={() => setNavOpen(true)}
    >
      <span />
      <span />
      <span />
    </button>
  </div>
</div>

      {/* Drawer (mobile menu) */}
{navOpen && (
  <div
    className="drawerOverlay"
    role="dialog"
    aria-modal="true"
    onMouseDown={(e) => {
      if (e.target === e.currentTarget) setNavOpen(false);
    }}
  >
    <div className="drawer">
      <div className="drawerHeader">
        <div className="drawerTitle">Меню</div>
        <button className="btn drawerClose" onClick={() => setNavOpen(false)} aria-label="Закрыть меню" type="button">
          ✕
        </button>
      </div>

      <div className="drawerBody">
        <a className="drawerLink" href="#steps" onClick={() => setNavOpen(false)}>
          Как я работаю
        </a>
        <a className="drawerLink" href="#cost" onClick={() => setNavOpen(false)}>
          Стоимость
        </a>
        <a className="drawerLink" href="#cases" onClick={() => setNavOpen(false)}>
          Кейсы
        </a>
        <a className="drawerLink" href="#faq" onClick={() => setNavOpen(false)}>
          FAQ
        </a>
        <a className="drawerLink" href="#docs" onClick={() => setNavOpen(false)}>
          Документы
        </a>
        <a className="drawerLink" href="#contacts" onClick={() => setNavOpen(false)}>
          Контакты
        </a>

        <div style={{ height: 12 }} />

        <a className="btn" href={tgLink} target="_blank" rel="noreferrer" onClick={() => setNavOpen(false)}>
          Написать в Telegram
        </a>
        <button
          className="btn btnPrimary"
          type="button"
          onClick={() => {
            setNavOpen(false);
            setOpenLead(true);
          }}
        >
          Оставить заявку
        </button>
      </div>
    </div>
  </div>
)}

{navOpen && (
  <div
    className="drawerOverlay"
    role="dialog"
    aria-modal="true"
    onMouseDown={(e) => {
      if (e.target === e.currentTarget) setNavOpen(false);
    }}
  >
    <div className="drawer">
      <div className="drawerHeader">
        <div className="drawerTitle">Меню</div>
        <button className="btn drawerClose" onClick={() => setNavOpen(false)} aria-label="Закрыть меню">
          ✕
        </button>
      </div>

      <div className="drawerBody">
        <a className="drawerLink" href="#steps" onClick={() => setNavOpen(false)}>
          Как я работаю
        </a>
        <a className="drawerLink" href="#cost" onClick={() => setNavOpen(false)}>
          Стоимость
        </a>
        <a className="drawerLink" href="#cases" onClick={() => setNavOpen(false)}>
          Кейсы
        </a>
        <a className="drawerLink" href="#faq" onClick={() => setNavOpen(false)}>
          FAQ
        </a>
        <a className="drawerLink" href="#docs" onClick={() => setNavOpen(false)}>
          Документы
        </a>
        <a className="drawerLink" href="#contacts" onClick={() => setNavOpen(false)}>
          Контакты
        </a>

        <div style={{ height: 12 }} />

        <a className="btn" href={tgLink} target="_blank" rel="noreferrer" onClick={() => setNavOpen(false)}>
          Написать в Telegram
        </a>
        <button
          className="btn btnPrimary"
          onClick={() => {
            setNavOpen(false);
            setOpenLead(true);
          }}
        >
          Оставить заявку
        </button>
      </div>
    </div>
  </div>
)}
    
      {/* Hero */}
      <section className="section">
        <div className="container">
          <h1 className="h1">Авто из Японии под заказ</h1>

          <p className="p" style={{ marginTop: 14 }}>
            Подбираю, выкупаю на аукционах и веду сделку до выдачи. Общение напрямую со мной — без цепочек “менеджер →
            менеджер”.
            <br />
            Помогаю привезти авто из Японии под заказ: от подбора и торгов до выдачи и документов.
          </p>

          <div className="card" style={{ marginTop: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <img
                src="/img/ilya.jpg"
                alt="Илья Мелешко"
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "1px solid var(--line)",
                  flex: "0 0 auto",
                }}
              />

              <div style={{ flex: 1 }}>
                <div className="cardTitle" style={{ marginBottom: 4 }}>
                  Илья, Владивосток — отвечаю лично
                </div>
                <div className="cardText">Прозрачные расходы • документы на этапах • без менеджеров</div>
              </div>

              <button className="btn" onClick={() => setOpenAbout(true)} type="button">
                Обо мне
              </button>
            </div>
          </div>

          <div className="btnRow" style={{ marginTop: 14 }}>
            <a className="btn" href={tgLink} target="_blank" rel="noreferrer">
              Написать в Telegram
            </a>
            <button className="btn btnPrimary" onClick={() => setOpenLead(true)}>
              Оставить заявку
            </button>
          </div>

          <div className="pills">
            <div className="pill">Прозрачные расходы по Японии</div>
            <div className="pill">Минимальная комиссия</div>
            <div className="pill">Документы и статусы на этапах</div>
            <div className="pill">Никаких менеджеров</div>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="section">
        <div className="container">
          <h2 className="h2">Почему со мной спокойнее</h2>
          <div className="grid grid2">
            <div className="card">
              <div className="cardTitle">Прозрачные расходы по Японии</div>
              <div className="cardText">Показываю структуру расходов и что за что платится — без “магии в смете”.</div>
            </div>
            <div className="card">
              <div className="cardTitle">Минимальная комиссия</div>
              <div className="cardText">Условия фиксируем заранее, без “допов по ходу”.</div>
            </div>
            <div className="card">
              <div className="cardTitle">Документы и статусы на этапах</div>
              <div className="cardText">Подтверждения и контрольные точки — вы понимаете, что происходит.</div>
            </div>
            <div className="card">
              <div className="cardTitle">Один контакт — одна ответственность</div>
              <div className="cardText">Вы общаетесь со мной напрямую. Быстрее и понятнее.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="section" id="steps">
        <div className="container">
          <h2 className="h2">Этапы заказа</h2>
          <p className="p">Заявка → подбор → критерии → договор → торги → логистика → оформление → выдача.</p>

          <div className="timeline">
            <div className="timelineItem">
              <div className="timelineDot" />
              <div>
                <div className="timelineTitle">1. Фиксируем запрос</div>
                <div className="timelineText">Модель, бюджет, критерии, город получения.</div>
              </div>
            </div>

            <div className="timelineItem">
              <div className="timelineDot" />
              <div>
                <div className="timelineTitle">2. Рассматриваем примеры из статистики</div>
                <div className="timelineText">Показываю реальные продажи, чтобы ожидания были в рынке.</div>
              </div>
            </div>

            <div className="timelineItem">
              <div className="timelineDot" />
              <div>
                <div className="timelineTitle">3. Согласуем критерии</div>
                <div className="timelineText">Оценка, пробег, комплектация, что критично, а что нет.</div>
              </div>
            </div>

            <div className="timelineItem">
              <div className="timelineDot" />
              <div>
                <div className="timelineTitle">4. Заключаем договор</div>
                <div className="timelineText">Фиксируем условия и двигаемся по этапам.</div>
              </div>
            </div>

            <div className="timelineItem">
              <div className="timelineDot" />
              <div>
                <div className="timelineTitle">5. Торги и покупка</div>
                <div className="timelineText">Ставим только на согласованные варианты.</div>
              </div>
            </div>

            <div className="timelineItem">
              <div className="timelineDot" />
              <div>
                <div className="timelineTitle">6. Логистика и оформление</div>
                <div className="timelineText">Доставка, таможня, документы. Держу в курсе статуса.</div>
              </div>
            </div>

            <div className="timelineItem">
              <div className="timelineDot" />
              <div>
                <div className="timelineTitle">7. Выдача и отправка по РФ</div>
                <div className="timelineText">Во Владивостоке или отправка в ваш регион.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cost */}
      <section className="section" id="cost">
        <div className="container">
          <h2 className="h2">Итоговая цена — это не “цена машины”. Это сумма этапов.</h2>
          <p className="p">
            Я не рисую “сладкие цифры”. Вместо этого показываю из чего складывается итог: лот, расходы по Японии, логистика,
            таможенные платежи, утильсбор и оформление. Так вы понимаете картину до сделки.
          </p>

          <div className="grid grid3">
            {[
              "Стоимость лота на аукционе",
              "Расходы по Японии (аукцион/внутренние)",
              "Логистика/доставка",
              "Таможенные платежи (по параметрам авто)",
              "Утильсбор и оформление",
              "Моя комиссия (фиксируем заранее)",
            ].map((t) => (
              <div className="card" key={t}>
                <div className="cardText">{t}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 14 }}>
            <button className="btn btnPrimary" onClick={() => setOpenCost(true)}>
              Показать пример расчёта
            </button>
          </div>
        </div>
      </section>

      {/* Cases */}
      <section className="section" id="cases">
        <div className="container">
          <h2 className="h2">Кейсы: как это бывает в реальности</h2>
          <div className="grid grid2">
            {cases.map((c) => (
              <div className="card" key={c.id}>
                <div className="cardTitle">{c.title}</div>
                <div className="cardText">{c.short}</div>

                <div className="btnRow" style={{ marginTop: 12 }}>
                  <button className="btn btnPrimary" onClick={() => setCaseModalId(c.id)}>
                    Читать историю
                  </button>

                  {c.youtube ? (
                    <a className="btn" href={c.youtube} target="_blank" rel="noreferrer">
                      Смотреть обзор на YouTube
                    </a>
                  ) : (
                    <button className="btn" disabled title="Видео появится позже">
                      Видео скоро
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq">
        <div className="container">
          <h2 className="h2">FAQ</h2>

          <div className="grid grid2">
            {faq.map((item, idx) => (
              <div className="card" key={item.q}>
                <div className="cardText">
                  {idx + 1}. {item.q}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 14 }}>
            <button className="btn btnPrimary" onClick={() => setOpenFaq(true)}>
              Открыть все вопросы
            </button>
          </div>
        </div>
      </section>

      {/* Docs */}
      <section className="section" id="docs">
        <div className="container">
          <h2 className="h2">Документы</h2>
          <p className="p">Примеры</p>

          <div className="btnRow">
            <button
              className="btn btnPrimary"
              onClick={() => {
                setActiveDoc("dogovor");
                setOpenDocs(true);
              }}
            >
              Открыть документы
            </button>
          </div>
        </div>
      </section>

      {/* Contacts */}
      <section className="section" id="contacts">
        <div className="container">
          <h2 className="h2">Контакты</h2>
          <p className="p">
            Telegram: <span className="kbd">@{TG}</span>
            <br />
            Город: Владивосток (работаю с заказами по РФ)
          </p>

          <div className="card" style={{ marginTop: 12 }}>
            <div className="cardTitle">Ссылки</div>
            <div className="cardText" style={{ display: "grid", gap: 8, marginTop: 8 }}>
              <div>
                <span className="kbd">YouTube</span>{" "}
                <a href="https://www.youtube.com/@VORONACAR" target="_blank" rel="noreferrer">
                  Обзоры (канал)
                </a>
              </div>
              <div>
                <span className="kbd">VK</span>{" "}
                <a href="https://vk.com/meleshkoilia" target="_blank" rel="noreferrer">
                  Профиль
                </a>
              </div>
              <div>
                <span className="kbd">TG-бот</span>{" "}
                <a href="https://t.me/voronacar_bot" target="_blank" rel="noreferrer">
                  Открыть бота
                </a>
              </div>
            </div>
          </div>

          <div className="btnRow" style={{ marginTop: 14 }}>
            <a className="btn" href={tgLink} target="_blank" rel="noreferrer">
              Написать в Telegram
            </a>
            <button className="btn btnPrimary" onClick={() => setOpenLead(true)}>
              Оставить заявку
            </button>
          </div>
        </div>
      </section>

      <div className="container footer">© {new Date().getFullYear()} ВОРОНАКАР | ИП Мелешко Илья Андреевич</div>

      {/* Modals */}
      <Modal title="Оставить заявку" open={openLead} onClose={() => setOpenLead(false)}>
        <LeadForm tgUsername={TG} />
      </Modal>

      <Modal title="Пример расчёта" open={openCost} onClose={() => setOpenCost(false)}>
        <div className="cardText">
          <p className="p" style={{ marginBottom: 10 }}>
            Цифры зависят от параметров авто и текущих условий. Я показываю структуру заранее и объясняю, где диапазон, а
            где фикс.
          </p>
          <ul>
            <li>Лот (аукцион) — сумма выигрышной ставки. Mazda Roadster (1.175.000 JPY)</li>
            <li>
              Расходы по Японии — обычно 105.000 JPY + 5% от суммы ставки свыше 1 млн иен. В случае с Roadster = 113.750 JPY
            </li>
            <li>
              Логистика — комплекс услуг ТК около 60.000 ₽ (брокер, лаборатория, ПРР, ЭПТС, СБКТС). Фрахт — в среднем 400$
            </li>
            <li>
              Таможенные платежи — зависят от параметров авто, можно проверить на tks.ru. Пример: 1500 * 3,2 * курс евро = 442.050 ₽ (Roadster)
            </li>
            <li>Утильсбор/оформление — Утильсбор (до 160 л.с.) - 3400/5200 ₽, оформление 4924 ₽. Roadster = 10.124 ₽ (согласно tks.ru)</li>
            <li>Документы — ЭПТС и СБКТС включены в комплекс ТК. Доп. услуги (резина, ОСАГО, техосмотр) — по договорённости</li>
            <li>Моя комиссия: 30.000 ₽</li>
          </ul>

          <div style={{ marginTop: 12 }}>
            <button className="btn btnPrimary" onClick={() => setOpenLead(true)}>
              Попросить расчёт
            </button>
          </div>
        </div>
      </Modal>

      <Modal title="FAQ" open={openFaq} onClose={() => setOpenFaq(false)}>
        <div className="cardText">
          <ul>
            {faq.map((item) => (
              <li key={item.q}>
                <b>{item.q}</b> — {item.a}
              </li>
            ))}
          </ul>
        </div>
      </Modal>

      <Modal title="Обо мне" open={openAbout} onClose={() => setOpenAbout(false)}>
        <div className="grid grid2">
          <div className="card">
            <img
              src="/img/ilya.jpg"
              alt="Илья Мелешко"
              style={{ width: "100%", borderRadius: 14, display: "block" }}
            />
            <div className="small" style={{ marginTop: 10 }}>
              Владивосток • авто из Японии под заказ
            </div>
          </div>

          <div className="card">
            <div className="cardText">
              <p style={{ marginTop: 0 }}>
                Меня зовут <b>Илья</b>. Я живу во Владивостоке и занимаюсь привозом авто из Японии под заказ.
              </p>

              <p>
                Это мой проект: без анонимности и “передач по менеджерам”. Вы общаетесь напрямую со мной — и я отвечаю за
                процесс и результат.
              </p>

              <p style={{ marginBottom: 10 }}>
                Я показываю структуру расходов, статусы по этапам и документы — чтобы у вас не оставалось ощущения “что-то
                скрывают”.
              </p>

              <div style={{ display: "grid", gap: 8, marginTop: 12 }}>
                <div>
                  <span className="kbd">Telegram</span>{" "}
                  <a href={tgLink} target="_blank" rel="noreferrer">
                    @{TG}
                  </a>
                </div>
                <div>
                  <span className="kbd">Instagram</span>{" "}
                  <a href={igLink} target="_blank" rel="noreferrer">
                    @vorona.car
                  </a>
                </div>
              </div>

              <div className="btnRow" style={{ marginTop: 14 }}>
                <a className="btn" href={tgLink} target="_blank" rel="noreferrer">
                  Написать в Telegram
                </a>
                <button className="btn btnPrimary" onClick={() => setOpenLead(true)}>
                  Оставить заявку
                </button>
              </div>

              <div className="small" style={{ marginTop: 10 }}>
                Я рядом, если нужно подсказать и честно оценить, что реально купить в ваш бюджет.
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal title="Документы" open={openDocs} onClose={() => setOpenDocs(false)}>
        <div className="btnRow" style={{ marginBottom: 12 }}>
          <button
            className={`btn ${activeDoc === "dogovor" ? "btnPrimary" : ""}`}
            onClick={() => setActiveDoc("dogovor")}
            type="button"
          >
            Договор (PDF)
          </button>

          <button
            className={`btn ${activeDoc === "invoice" ? "btnPrimary" : ""}`}
            onClick={() => setActiveDoc("invoice")}
            type="button"
          >
            Инвойс (JPG)
          </button>

          <a
            className="btn"
            href={activeDoc === "dogovor" ? "/docs/dogovor.pdf" : "/docs/invoice.jpg"}
            target="_blank"
            rel="noreferrer"
          >
            Открыть в новой вкладке
          </a>
        </div>

        <div className="card docCard">
  {activeDoc === "dogovor" ? (
    <iframe title="Договор" src="/docs/dogovor.pdf" className="docFrame" />
  ) : (
    <img src="/docs/invoice.jpg" alt="Инвойс" className="docImage" />
  )}
</div>
          
      </Modal>

      <Modal title={currentCase?.modalTitle ?? "Кейс"} open={caseModalId !== null} onClose={() => setCaseModalId(null)}>
        {currentCase?.modalBody ?? null}
        <div className="btnRow" style={{ marginTop: 12 }}>
          <a className="btn" href={tgLink} target="_blank" rel="noreferrer">
            Написать в Telegram
          </a>
          <button className="btn btnPrimary" onClick={() => setOpenLead(true)}>
            Оставить заявку
          </button>
        </div>
      </Modal>
    </>
  );
}
