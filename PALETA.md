# Paleta de colores – Feriado Cantina

La paleta se define en **`app/globals.css`** (`:root`) y se expone a Tailwind vía **`@theme inline`**. Usar siempre estas clases en lugar de colores fijos.

## Colores de la marca

| Nombre            | Hex       | Uso en la paleta     |
|-------------------|-----------|----------------------|
| **Feriado Red**   | `#E83324` | `secondary` / `surface-dark` – footer, FAQs, booking |
| **Feriado Yellow**| `#FBE451` | `accent` – botones secundarios, acentos |
| **Feriado Blue**  | `#2554A7` | `primary` – CTAs principales, botones |
| **Feriado Cream** | `#EBE7DA` | `background` – fondo general |

## Clases Tailwind (usar estas)

| Uso                    | Clase                          |
|------------------------|--------------------------------|
| Fondo de página        | `bg-background`                |
| Texto principal       | `text-foreground`              |
| Botón principal (azul)| `bg-primary` + `text-primary-foreground` |
| Acentos / bullets     | `bg-accent`                    |
| Botón secundario (rojo)| `bg-secondary` + `text-secondary-foreground` |
| Superficie oscura     | `bg-surface-dark`              |
| Texto secundario       | `text-muted-foreground`        |

## Colores con nombre (uso directo)

- `bg-feriado-red` / `text-feriado-red`
- `bg-feriado-yellow` / `text-feriado-yellow`
- `bg-feriado-blue` / `text-feriado-blue`
- `bg-feriado-cream` / `text-feriado-cream`
