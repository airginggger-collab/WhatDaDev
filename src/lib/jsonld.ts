// Безопасная сериализация JSON-LD для вставки в <script type="application/ld+json"> через set:html.
// JSON.stringify не экранирует '<', '>', '&', поэтому значение вида "</script><script>…"
// разрывает тег и даёт XSS. Экранируем эти символы в \uXXXX — валидность JSON и schema.org сохраняется.
export function jsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}
