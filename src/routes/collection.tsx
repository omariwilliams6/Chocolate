import { createFileRoute } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";
import { Reveal } from "@/components/Reveal";
import { useLang } from "@/lib/i18n";
import pralineImg from "@/assets/praline.jpg";
import collectionImg from "@/assets/collection.jpg";
import packagingImg from "@/assets/packaging.jpg";
import hotChocImg from "@/assets/hot-chocolate.jpg";
import heroImg from "@/assets/hero-chocolate.jpg";
import craftImg from "@/assets/craftsmanship.jpg";

export const Route = createFileRoute("/collection")({
  head: () => ({
    meta: [
      { title: "Collezione · Rizzati Cioccolato" },
      {
        name: "description",
        content:
          "La collezione di praline, tartufi, tavolette e cofanetti regalo della maison Rizzati.",
      },
      { property: "og:title", content: "Collezione · Rizzati" },
      {
        property: "og:description",
        content: "The signature chocolate collection from Maison Rizzati.",
      },
      { property: "og:image", content: collectionImg },
    ],
  }),
  component: CollectionPage,
});

const PRODUCTS = [
  {
    id: 1,
    img: pralineImg,
    it: "Praline d'Oro",
    en: "Gold Pralines",
    cat: "praline",
    price: 48,
    note: "12 pezzi · cacao 72% · foglia d'oro 24k",
  },
  {
    id: 2,
    img: collectionImg,
    it: "Selezione Tartufi",
    en: "Truffle Selection",
    cat: "tartufi",
    price: 62,
    note: "Otto varietà · cofanetto firmato",
  },
  {
    id: 3,
    img: packagingImg,
    it: "Cofanetto Notturno",
    en: "Notturno Box",
    cat: "regalo",
    price: 145,
    note: "Edizione limitata · sigillo a mano",
  },
  {
    id: 4,
    img: hotChocImg,
    it: "Cioccolata in Tazza",
    en: "Cup Chocolate",
    cat: "calda",
    price: 28,
    note: "Polvere monorigine Venezuela",
  },
  {
    id: 5,
    img: heroImg,
    it: "Tavoletta Origini",
    en: "Origins Bar",
    cat: "tavolette",
    price: 18,
    note: "Madagascar 75% · 80g",
  },
  {
    id: 6,
    img: craftImg,
    it: "Esperienza Maître",
    en: "Maître Experience",
    cat: "regalo",
    price: 220,
    note: "Degustazione privata · per due",
  },
];

const FILTERS = [
  { id: "tutto", it: "Tutto", en: "All" },
  { id: "praline", it: "Praline", en: "Pralines" },
  { id: "tartufi", it: "Tartufi", en: "Truffles" },
  { id: "tavolette", it: "Tavolette", en: "Bars" },
  { id: "calda", it: "Cioccolata calda", en: "Hot chocolate" },
  { id: "regalo", it: "Regalo", en: "Gifts" },
] as const;

type Product = (typeof PRODUCTS)[number];
type CartItem = { productId: number; qty: number };
type Fulfillment = "delivery" | "collection";
type CheckoutData = {
  customerName: string;
  email: string;
  phone: string;
  fulfillment: Fulfillment;
  address: string;
  city: string;
  postcode: string;
  deliveryNote: string;
  collectionDate: string;
  collectionTime: string;
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
};

const initialCheckout: CheckoutData = {
  customerName: "",
  email: "",
  phone: "",
  fulfillment: "delivery",
  address: "",
  city: "",
  postcode: "",
  deliveryNote: "",
  collectionDate: "",
  collectionTime: "",
  cardName: "",
  cardNumber: "",
  expiry: "",
  cvc: "",
};

const formatPrice = (value: number) => `€ ${value}`;

function CollectionPage() {
  const { lang } = useLang();
  const t = (it: string, en: string) => (lang === "it" ? it : en);
  const [filter, setFilter] = useState<string>("tutto");
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkout, setCheckout] = useState<CheckoutData>(initialCheckout);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmed, setConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const items =
    filter === "tutto" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === filter);

  const cartLines = useMemo(
    () =>
      cart
        .map((item) => {
          const product = PRODUCTS.find((p) => p.id === item.productId);
          return product ? { product, qty: item.qty } : null;
        })
        .filter(Boolean) as { product: Product; qty: number }[],
    [cart],
  );

  const subtotal = cartLines.reduce(
    (sum, line) => sum + line.product.price * line.qty,
    0,
  );
  const deliveryFee =
    checkout.fulfillment === "delivery" && subtotal > 0 && subtotal < 120
      ? 12
      : 0;
  const total = subtotal + deliveryFee;
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const productName = (product: Product) =>
    lang === "it" ? product.it : product.en;

  const addToCart = (productId: number) => {
    setCart((current) => {
      const existing = current.find((item) => item.productId === productId);
      if (existing) {
        return current.map((item) =>
          item.productId === productId ? { ...item, qty: item.qty + 1 } : item,
        );
      }
      return [...current, { productId, qty: 1 }];
    });
    setCartOpen(true);
    setConfirmed(false);
  };

  const changeQty = (productId: number, delta: number) => {
    setCart((current) =>
      current
        .map((item) =>
          item.productId === productId
            ? { ...item, qty: Math.max(0, item.qty + delta) }
            : item,
        )
        .filter((item) => item.qty > 0),
    );
  };

  const removeItem = (productId: number) => {
    setCart((current) =>
      current.filter((item) => item.productId !== productId),
    );
  };

  const updateCheckout = <K extends keyof CheckoutData>(
    key: K,
    value: CheckoutData[K],
  ) => {
    setCheckout((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const validateCheckout = () => {
    const nextErrors: Record<string, string> = {};
    const digits = checkout.cardNumber.replace(/\D/g, "");
    const cvcDigits = checkout.cvc.replace(/\D/g, "");
    const expiryMatch = checkout.expiry.match(/^(\d{2})\/(\d{2})$/);

    if (cartLines.length === 0) {
      nextErrors.cart = t(
        "Aggiungi almeno un prodotto.",
        "Add at least one product.",
      );
    }
    if (!checkout.customerName.trim()) {
      nextErrors.customerName = t("Inserisci il nome.", "Enter your name.");
    }
    if (!/^\S+@\S+\.\S+$/.test(checkout.email)) {
      nextErrors.email = t(
        "Inserisci un indirizzo e-mail valido.",
        "Enter a valid e-mail address.",
      );
    }
    if (!checkout.phone.trim()) {
      nextErrors.phone = t(
        "Inserisci un recapito telefonico.",
        "Enter a phone number.",
      );
    }

    if (checkout.fulfillment === "delivery") {
      if (!checkout.address.trim()) {
        nextErrors.address = t(
          "Inserisci l'indirizzo di consegna.",
          "Enter the delivery address.",
        );
      }
      if (!checkout.city.trim()) {
        nextErrors.city = t("Inserisci la città.", "Enter the city.");
      }
      if (!checkout.postcode.trim()) {
        nextErrors.postcode = t(
          "Inserisci il codice postale.",
          "Enter the postcode.",
        );
      }
    } else {
      if (!checkout.collectionDate) {
        nextErrors.collectionDate = t(
          "Scegli una data di ritiro.",
          "Choose a collection date.",
        );
      }
      if (!checkout.collectionTime) {
        nextErrors.collectionTime = t(
          "Scegli un orario di ritiro.",
          "Choose a collection time.",
        );
      }
    }

    if (!checkout.cardName.trim()) {
      nextErrors.cardName = t(
        "Inserisci il nome sulla carta.",
        "Enter the name on the card.",
      );
    }
    if (digits.length < 12 || digits.length > 19) {
      nextErrors.cardNumber = t(
        "Inserisci un numero carta valido.",
        "Enter a valid card number.",
      );
    }
    if (!expiryMatch) {
      nextErrors.expiry = t("Usa il formato MM/AA.", "Use MM/YY format.");
    } else {
      const month = Number(expiryMatch[1]);
      const year = 2000 + Number(expiryMatch[2]);
      const now = new Date();
      const expiresAt = new Date(year, month);
      if (month < 1 || month > 12 || expiresAt <= now) {
        nextErrors.expiry = t(
          "Inserisci una scadenza valida.",
          "Enter a valid expiry date.",
        );
      }
    }
    if (cvcDigits.length < 3 || cvcDigits.length > 4) {
      nextErrors.cvc = t("CVC non valido.", "Invalid CVC.");
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const placeOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateCheckout()) return;
    setOrderNumber(`RZ-${Math.floor(10000 + Math.random() * 90000)}`);
    setConfirmed(true);
  };

  const resetOrder = () => {
    setCart([]);
    setCheckout(initialCheckout);
    setErrors({});
    setConfirmed(false);
    setOrderNumber("");
    setCartOpen(false);
  };

  return (
    <div className="bg-background pt-32">
      <section className="container-luxury py-20">
        <Reveal>
          <p className="eyebrow">{t("La Collezione", "The Collection")}</p>
          <h1 className="display-xl mt-8 max-w-4xl">
            {t("Una piccola libreria", "A small library")}
            <br />
            <span className="italic">
              {t("di emozioni edibili.", "of edible emotions.")}
            </span>
          </h1>
        </Reveal>
      </section>

      <section className="bg-noir text-cream py-8 sticky top-20 z-30 backdrop-blur-md">
        <div className="container-luxury flex items-center justify-between gap-4">
          <div className="flex gap-2 md:gap-6 overflow-x-auto">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`whitespace-nowrap text-[11px] tracking-[0.24em] uppercase py-2 px-1 transition-colors ${
                  filter === f.id
                    ? "text-accent border-b border-accent"
                    : "text-cream/60 hover:text-cream"
                }`}
              >
                {lang === "it" ? f.it : f.en}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="relative shrink-0 inline-flex h-11 w-11 items-center justify-center border border-cream/30 text-cream hover:bg-cream hover:text-noir transition-colors"
            aria-label={t("Apri carrello", "Open cart")}
          >
            <ShoppingBag className="h-4 w-4" />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center bg-accent px-1.5 text-[10px] font-medium text-noir">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </section>

      <section className="container-luxury py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
          {items.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 0.08}>
              <article className="group">
                <div className="img-frame aspect-[4/5] bg-cocoa">
                  <img
                    src={p.img}
                    alt={productName(p)}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5 translate-y-full group-hover:translate-y-0 group-focus-within:translate-y-0 transition-transform duration-700 ease-out bg-gradient-to-t from-noir to-transparent">
                    <button
                      type="button"
                      onClick={() => addToCart(p.id)}
                      className="w-full text-cream border border-cream/40 hover:bg-cream hover:text-noir py-3 text-[10px] tracking-[0.28em] uppercase transition-colors"
                    >
                      {t("Aggiungi", "Add to box")}
                    </button>
                  </div>
                </div>
                <div className="mt-6 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-serif text-2xl font-light">
                      {productName(p)}
                    </h2>
                    <p className="subtitle-en mt-1">{p.note}</p>
                  </div>
                  <span className="font-serif text-xl mt-1">
                    {formatPrice(p.price)}
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-bone py-32">
        <div className="container-luxury text-center max-w-2xl mx-auto">
          <Reveal>
            <p className="eyebrow">{t("Servizio regalo", "Gift service")}</p>
            <h2 className="display-lg mt-6">
              {t("Personalizziamo ogni cofanetto.", "We bespoke every box.")}
            </h2>
            <p className="mt-8 text-foreground/70 font-light">
              {t(
                "Dediche calligrafate a mano, sigilli in cera, consegna in tutta Europa attraverso i partner Lufthansa Cargo.",
                "Hand-calligraphed dedications, wax seals, delivery throughout Europe via Lufthansa Cargo partners.",
              )}
            </p>
          </Reveal>
        </div>
      </section>

      {cartOpen && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label={t("Chiudi carrello", "Close cart")}
            onClick={() => setCartOpen(false)}
            className="absolute inset-0 bg-noir/55"
          />
          <aside className="absolute right-0 top-0 flex h-full w-full max-w-xl flex-col bg-background text-foreground shadow-2xl">
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <div>
                <p className="eyebrow">{t("Carrello", "Cart")}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {cartCount} {t("articoli", "items")}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center border border-border hover:bg-noir hover:text-cream transition-colors"
                aria-label={t("Chiudi", "Close")}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {confirmed ? (
              <div className="flex flex-1 flex-col justify-center px-6 py-10">
                <p className="eyebrow text-accent">
                  {t("Ordine confermato", "Order confirmed")}
                </p>
                <h2 className="display-md mt-5">
                  {t("Grazie.", "Thank you.")}
                </h2>
                <p className="mt-6 text-foreground/70 font-light leading-relaxed">
                  {t(
                    "Abbiamo ricevuto il vostro ordine e invieremo la conferma via e-mail.",
                    "We have received your order and will send the confirmation by e-mail.",
                  )}
                </p>
                <p className="mt-8 border-t border-border pt-6 font-serif text-2xl">
                  {orderNumber}
                </p>
                <button
                  type="button"
                  onClick={resetOrder}
                  className="btn-luxury mt-10 w-full"
                >
                  {t("Torna alla collezione", "Back to collection")}
                </button>
              </div>
            ) : (
              <form
                onSubmit={placeOrder}
                className="flex flex-1 flex-col overflow-hidden"
              >
                <div className="flex-1 overflow-y-auto px-6 py-6">
                  {cartLines.length === 0 ? (
                    <p className="text-sm text-foreground/65 font-light">
                      {t("Il carrello è vuoto.", "Your cart is empty.")}
                    </p>
                  ) : (
                    <div className="space-y-5">
                      {cartLines.map(({ product, qty }) => (
                        <div
                          key={product.id}
                          className="grid grid-cols-[72px_1fr] gap-4 border-b border-border pb-5"
                        >
                          <img
                            src={product.img}
                            alt={productName(product)}
                            className="aspect-square h-18 w-18 object-cover"
                          />
                          <div>
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <p className="font-serif text-xl">
                                  {productName(product)}
                                </p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                  {formatPrice(product.price)}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeItem(product.id)}
                                className="text-muted-foreground hover:text-foreground"
                                aria-label={t(
                                  "Rimuovi prodotto",
                                  "Remove product",
                                )}
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                              <div className="flex items-center border border-border">
                                <button
                                  type="button"
                                  onClick={() => changeQty(product.id, -1)}
                                  className="inline-flex h-9 w-9 items-center justify-center hover:bg-bone"
                                  aria-label={t(
                                    "Diminuisci quantità",
                                    "Decrease quantity",
                                  )}
                                >
                                  <Minus className="h-3.5 w-3.5" />
                                </button>
                                <span className="w-10 text-center text-sm">
                                  {qty}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => changeQty(product.id, 1)}
                                  className="inline-flex h-9 w-9 items-center justify-center hover:bg-bone"
                                  aria-label={t(
                                    "Aumenta quantità",
                                    "Increase quantity",
                                  )}
                                >
                                  <Plus className="h-3.5 w-3.5" />
                                </button>
                              </div>
                              <span className="font-serif text-xl">
                                {formatPrice(product.price * qty)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-8 space-y-8">
                    <section>
                      <p className="eyebrow">{t("Dettagli", "Details")}</p>
                      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Field
                          label={t("Nome", "Name")}
                          value={checkout.customerName}
                          error={errors.customerName}
                          onChange={(value) =>
                            updateCheckout("customerName", value)
                          }
                        />
                        <Field
                          label={t("Telefono", "Phone")}
                          value={checkout.phone}
                          error={errors.phone}
                          onChange={(value) => updateCheckout("phone", value)}
                        />
                        <Field
                          label="E-mail"
                          type="email"
                          value={checkout.email}
                          error={errors.email}
                          onChange={(value) => updateCheckout("email", value)}
                          className="sm:col-span-2"
                        />
                      </div>
                    </section>

                    <section>
                      <p className="eyebrow">{t("Consegna", "Fulfilment")}</p>
                      <div className="mt-5 grid grid-cols-2 border border-border">
                        {(["delivery", "collection"] as Fulfillment[]).map(
                          (option) => (
                            <button
                              key={option}
                              type="button"
                              onClick={() =>
                                updateCheckout("fulfillment", option)
                              }
                              className={`px-4 py-4 text-[11px] tracking-[0.22em] uppercase transition-colors ${
                                checkout.fulfillment === option
                                  ? "bg-noir text-cream"
                                  : "hover:bg-bone"
                              }`}
                            >
                              {option === "delivery"
                                ? t("Consegna", "Delivery")
                                : t("Ritiro", "Collection")}
                            </button>
                          ),
                        )}
                      </div>

                      {checkout.fulfillment === "delivery" ? (
                        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <Field
                            label={t("Indirizzo", "Address")}
                            value={checkout.address}
                            error={errors.address}
                            onChange={(value) =>
                              updateCheckout("address", value)
                            }
                            className="sm:col-span-2"
                          />
                          <Field
                            label={t("Città", "City")}
                            value={checkout.city}
                            error={errors.city}
                            onChange={(value) => updateCheckout("city", value)}
                          />
                          <Field
                            label={t("CAP", "Postcode")}
                            value={checkout.postcode}
                            error={errors.postcode}
                            onChange={(value) =>
                              updateCheckout("postcode", value)
                            }
                          />
                          <Field
                            label={t("Note", "Notes")}
                            value={checkout.deliveryNote}
                            onChange={(value) =>
                              updateCheckout("deliveryNote", value)
                            }
                            className="sm:col-span-2"
                          />
                        </div>
                      ) : (
                        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <Field
                            label={t("Data ritiro", "Collection date")}
                            type="date"
                            value={checkout.collectionDate}
                            error={errors.collectionDate}
                            onChange={(value) =>
                              updateCheckout("collectionDate", value)
                            }
                          />
                          <div>
                            <label className="block text-[10px] tracking-[0.24em] uppercase text-muted-foreground mb-2">
                              {t("Orario", "Time")}
                            </label>
                            <select
                              value={checkout.collectionTime}
                              onChange={(event) =>
                                updateCheckout(
                                  "collectionTime",
                                  event.target.value,
                                )
                              }
                              className="w-full border border-border bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-foreground"
                            >
                              <option value="">
                                {t("Seleziona", "Select")}
                              </option>
                              <option>10:00</option>
                              <option>12:00</option>
                              <option>15:00</option>
                              <option>17:30</option>
                            </select>
                            {errors.collectionTime && (
                              <p className="mt-2 text-xs text-destructive">
                                {errors.collectionTime}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </section>

                    <section>
                      <p className="eyebrow">{t("Pagamento", "Payment")}</p>
                      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Field
                          label={t("Nome sulla carta", "Name on card")}
                          value={checkout.cardName}
                          error={errors.cardName}
                          onChange={(value) =>
                            updateCheckout("cardName", value)
                          }
                          className="sm:col-span-2"
                        />
                        <Field
                          label={t("Numero carta", "Card number")}
                          inputMode="numeric"
                          value={checkout.cardNumber}
                          error={errors.cardNumber}
                          onChange={(value) =>
                            updateCheckout("cardNumber", value)
                          }
                          className="sm:col-span-2"
                        />
                        <Field
                          label={t("Scadenza", "Expiry")}
                          placeholder="MM/YY"
                          value={checkout.expiry}
                          error={errors.expiry}
                          onChange={(value) => updateCheckout("expiry", value)}
                        />
                        <Field
                          label="CVC"
                          inputMode="numeric"
                          value={checkout.cvc}
                          error={errors.cvc}
                          onChange={(value) => updateCheckout("cvc", value)}
                        />
                      </div>
                    </section>
                  </div>
                </div>

                <div className="border-t border-border px-6 py-5">
                  {errors.cart && (
                    <p className="mb-3 text-xs text-destructive">
                      {errors.cart}
                    </p>
                  )}
                  <div className="space-y-2 text-sm">
                    <SummaryLine
                      label={t("Subtotale", "Subtotal")}
                      value={formatPrice(subtotal)}
                    />
                    <SummaryLine
                      label={t("Consegna", "Delivery")}
                      value={
                        checkout.fulfillment === "collection"
                          ? t("Ritiro in boutique", "Boutique collection")
                          : deliveryFee === 0
                            ? t("Inclusa", "Included")
                            : formatPrice(deliveryFee)
                      }
                    />
                    <div className="flex items-center justify-between border-t border-border pt-3 font-serif text-2xl">
                      <span>{t("Totale", "Total")}</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                  <button type="submit" className="btn-luxury mt-5 w-full">
                    {t("Conferma ordine", "Confirm order")}
                  </button>
                </div>
              </form>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  error,
  className = "",
  placeholder,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  error?: string;
  className?: string;
  placeholder?: string;
  inputMode?:
    | "text"
    | "numeric"
    | "decimal"
    | "tel"
    | "search"
    | "email"
    | "url";
}) {
  return (
    <div className={className}>
      <label className="block text-[10px] tracking-[0.24em] uppercase text-muted-foreground mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        className="w-full border border-border bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-foreground"
      />
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function SummaryLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-foreground/70">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
