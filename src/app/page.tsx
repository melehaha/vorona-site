"use client";

import React, { useMemo, useState } from "react";

type CaseItem = {
  id: string;
  title: string;
  short: string;
  youtube?: string;
  modalTitle: string;
  modalBody: React.ReactNode;
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
  children: React.ReactNode;
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

  const canSend = phone.trim().length >= 5 && car.trim().length >= 2;

  function buildMessage() {
    const lines: string[] = [];
    lines.push("Заявка Vorona.car");
    if (name.trim()) lines.push(`Имя: ${name.trim()}`);
    lines.push(`Телефон: ${phone.trim()}`);
    if (city.trim()) lines.push(`Город: ${city.trim()}`);
    lines.push(`Что ищем: ${car.trim()}`);
    if (budget.trim()) lines.push(`Бюджет: ${budget.trim()}`);
    if (comment.trim()) lines.push(`Комментарий: ${comment.trim()}`);
    return lines.join("\n");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSend) return;

    const message = buildMessage();
    const url = `https://t.me/${tgUsername}?text=${encodeURIComponent(message)}`;

    // Вариант А: сразу открываем Telegram с готовым текстом
    window.location.href = url;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="fieldGrid">
        <div>
          <label className="label">Имя (необязательно)</label>
          <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Илья / Андрей" />
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
          <input className="input" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Например, Казань" />
        </div>
        <div>
          <label className="label">Бюджет</label>
          <input className="input" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="Например, до 1.3 млн" />
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
        <textarea className="textarea" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Пробег, комплектация, что важно/что точно не подходит…" />
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

  const [openLead, setOpenLead] = useState(false);
  const [openSteps, setOpenSteps] = useState(false);
  const [openCost, setOpenCost] = useState(false);
  const [openFaq, setOpenFaq] = useState(false);
  const [openDocs, setOpenDocs] = useState(false);
  const [openAbout, setOpenAbout] = useState(false);
  const [activeDoc, setActiveDoc] = useState<"dogovor" | "invoice">("dogovor");

  const [caseModalId, setCaseModalId] = useState<string | null>(null);

  const cases: CaseItem[] = useMemo(
    () => [
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
              <li>Итог: уложились в изначальные границы — 4 балла, хорошее состояние, топовая комплектация.</li>
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
                Почему удачно: один из самых “бодрых” дешёвых кей-каров на рынке — ощущения от езды приятнее, чем ждёшь от
                класса, при этом остаётся в адекватных деньгах.
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
              <li>Запрос был простой: “хочу родстер” — и это была не моя хотелка 🙂</li>
              <li>Бюджет: 1.3 млн, поэтому хороший вариант не всегда находится быстро.</li>
              <li>Итог: получилось долго, но без сомнительных компромиссов — дождались нормального варианта и довели до результата.</li>
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
              <li>Итог: ни разу не пожалел — это ровно тот случай, когда ожидания совпали с реальностью.</li>
            </ul>
          </div>
        ),
      },
    ],
    []
  );

  const currentCase = cases.find((c) => c.id === caseModalId) ?? null;

  return (
    <>
      {/* Header */}
      <div className="header">
        <div className="container headerInner">
          <div className="brand" style={{ display: "flex", alignItems: "center", gap: 10 }}>
  <img src="/img/logo.png" alt="ВОРОНАКАР" style={{ width: 24, height: 24 }} />
  <span>ВОРОНАКАР</span>
</div>

          <nav className="nav" aria-label="Навигация">
            <button className="navLink" onClick={() => setOpenAbout(true)} type="button">
  Обо мне
</button>
            <a href="#steps">Как работаем</a>
            <a href="#cost">Стоимость</a>
            <a href="#cases">Кейсы</a>
            <a href="#faq">FAQ</a>
            <a href="#docs">Документы</a>
            <a href="#contacts">Контакты</a>
          </nav>

          <div className="btnRow">
            <a className="btn" href={`https://t.me/${TG}`} target="_blank" rel="noreferrer">
              Написать в Telegram
            </a>
            <button className="btn btnPrimary" onClick={() => setOpenLead(true)}>
              Оставить заявку
            </button>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="section">
        <div className="container">
          <h1 className="h1">Авто из Японии под заказ</h1>
          <p className="p">
            Подбираю, выкупаю на аукционах и веду сделку до выдачи. Общение напрямую со мной — без цепочек “менеджер → менеджер”.
          </p>

          <div className="btnRow" style={{ marginTop: 14 }}>
            <a className="btn" href={`https://t.me/${TG}`} target="_blank" rel="noreferrer">
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
          <h2 className="h2">Без сюрпризов “в конце”. Всё объясняю заранее.</h2>
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

          <div style={{ marginTop: 14 }}>
            <button className="btn btnPrimary" onClick={() => setOpenSteps(true)}>
              Посмотреть этапы подробно
            </button>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="section" id="steps">
        <div className="container">
          <h2 className="h2">Как проходит заказ</h2>
          <p className="p">Коротко: заявка → подбор → критерии → договор → торги → логистика → оформление → выдача.</p>

          <div className="grid grid2">
            {[
              "1) Фиксируем запрос",
              "2) Рассматриваем примеры из статистики",
              "3) Согласуем критерии",
              "4) Заключаем договор",
              "5) Торги (несколько попыток — нормально)",
              "6) Логистика и статусы",
              "7) Оформление документов",
              "8) Выдача и закрытие сделки",
            ].map((t) => (
              <div className="card" key={t}>
                <div className="cardText">{t}</div>
              </div>
            ))}
          </div>

          <div className="btnRow" style={{ marginTop: 14 }}>
            <button className="btn" onClick={() => setOpenSteps(true)}>
              Открыть подробно
            </button>
            <button className="btn btnPrimary" onClick={() => setOpenLead(true)}>
              Оставить заявку
            </button>
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
            {[
              "Сколько по времени занимает привоз?",
              "Почему не всегда получается с первой ставки?",
              "Можно ли уложиться в бюджет “впритык”?",
              "Какие документы вы получаете на этапах?",
              "Как вы показываете расходы по Японии?",
              "Вы работаете только с Японией?",
            ].map((q) => (
              <div className="card" key={q}>
                <div className="cardText">{q}</div>
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
          <p className="p">Здесь будут пример договора и краткое объяснение: что подписываем и когда.</p>

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
          <h2 className="h2">Связаться</h2>
          <p className="p">
            Telegram: <span className="kbd">@{TG}</span>
            <br />
            Город: Владивосток (работаю с заказами по РФ)
          </p>
<div className="card" style={{ marginTop: 12 }}>
  <div className="cardTitle">Ссылки</div>
  <div className="cardText" style={{ display: "grid", gap: 8, marginTop: 8 }}>
    <div>
      <span className="kbd">Instagram</span>{" "}
      <a href="https://instagram.com/vorona.car" target="_blank" rel="noreferrer">
        @vorona.car
      </a>
    </div>
    <div>
      <span className="kbd">YouTube</span>{" "}
      <a href="https://www.youtube.com/@VORONACAR" target="_blank" rel="noreferrer">
        Обзоры (канал)
      </a>
    </div>
    <div>
      <span className="kbd">VK</span>{" "}
      <a href="https://vk.com/meleshkoilia" target="_blank" rel="noreferrer">
        Ссылка на VK
      </a>
    </div>
    <div>
      <span className="kbd">TG-бот</span>{" "}
      <a href="https://t.me/voronacar_bot" target="_blank" rel="noreferrer">
        Ссылка на бот
      </a>
    </div>
  </div>
</div>
          <div className="btnRow">
            <a className="btn" href={`https://t.me/${TG}`} target="_blank" rel="noreferrer">
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

      <Modal title="Этапы подробно" open={openSteps} onClose={() => setOpenSteps(false)}>
        <div className="cardText">
          <ol>
            <li>Фиксируем запрос (что важно / что точно не подходит).</li>
            <li>Рассматриваем примеры из статистики (что реально покупается в бюджет).</li>
            <li>Согласуем критерии и стратегию ставок.</li>
            <li>Заключаем договор.</li>
            <li>Торги (несколько попыток — нормально).</li>
            <li>Логистика и статусы.</li>
            <li>Оформление документов.</li>
            <li>Выдача и закрытие сделки.</li>
          </ol>

          <div className="btnRow" style={{ marginTop: 12 }}>
            <a className="btn" href={`https://t.me/${TG}`} target="_blank" rel="noreferrer">
              Написать в Telegram
            </a>
            <button className="btn btnPrimary" onClick={() => setOpenLead(true)}>
              Оставить заявку
            </button>
          </div>
        </div>
      </Modal>

      <Modal title="Пример расчёта" open={openCost} onClose={() => setOpenCost(false)}>
        <div className="cardText">
          <p className="p" style={{ marginBottom: 10 }}>
            Цифры зависят от параметров авто и текущих условий. Я показываю структуру заранее и объясняю, где диапазон, а где фикс.
          </p>
          <ul>
            <li>Лот (аукцион)</li>
            <li>Расходы по Японии</li>
            <li>Логистика</li>
            <li>Таможенные платежи</li>
            <li>Утильсбор / оформление</li>
            <li>Документы (если требуется)</li>
            <li>Моя комиссия</li>
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
            <li>Сколько по времени занимает привоз? — зависит от бюджета и “плотности” рынка по вашей модели.</li>
            <li>Почему не всегда с первой ставки? — хорошие лоты быстро уходят, иногда нужно несколько попыток.</li>
            <li>Бюджет “впритык” — реально, но часто дольше и с меньшим выбором. Я говорю это сразу.</li>
            <li>Какие документы? — договор + подтверждения/статусы по этапам, финальные документы по оформлению.</li>
            <li>Только Япония? — да, фокус на одном направлении.</li>
          </ul>
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
       <div className="card" style={{ padding: 10 }}>
  {activeDoc === "dogovor" ? (
    <iframe
      title="Договор"
      src="/docs/dogovor.pdf"
      style={{ width: "100%", height: "70vh", border: "1px solid var(--line)", borderRadius: 12 }}
    />
  ) : (
    <img
      src="/docs/invoice.jpg"
      alt="Инвойс"
      style={{ width: "100%", height: "70vh", objectFit: "contain", display: "block" }}
    />
  )}
</div>
      </Modal>

      <Modal
        title={currentCase?.modalTitle ?? "Кейс"}
        open={caseModalId !== null}
        onClose={() => setCaseModalId(null)}
      >
        {currentCase?.modalBody ?? null}
        <div className="btnRow" style={{ marginTop: 12 }}>
          <a className="btn" href={`https://t.me/${TG}`} target="_blank" rel="noreferrer">
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
