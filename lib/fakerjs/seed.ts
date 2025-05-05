import { faker } from "@faker-js/faker/locale/de";

// Seed für konsistente zufällige Daten setzen
// Für Produktion: Kommentiere diese Zeile aus, um jedes Mal neue zufällige Daten zu generieren
faker.seed(123);

export { faker };
