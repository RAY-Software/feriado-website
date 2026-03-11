# Paleta de colores – OH México

La paleta se define en **`app/globals.css`** (`:root`) y se expone a Tailwind vía **`@theme inline`**. Usar siempre estas clases en lugar de colores fijos (hex o `gray-*`, `teal-*`, etc.).

## Colores de la marca

| Nombre            | Hex       | Uso en la paleta     |
|-------------------|-----------|----------------------|
| **Venetian Red**  | `#B33D26` | `primary` – CTAs principales |
| **Ocre**          | `#CD7925` | `accent` – acentos, bullets, hover |
| **Graphite Black**| `#27292B` | `background` – fondo general |
| **B'dazzled Blue**| `#2C5697` | `secondary` – botones secundarios, enlaces |
| **Soldier Green** | `#4E5B31` | `tertiary` – bloques alternativos |
| **Pale Chestnut** | `#E6BAA8` | `foreground` – texto principal |

## Clases Tailwind (usar estas)

| Uso                    | Clase                          | Evitar              |
|------------------------|--------------------------------|---------------------|
| Fondo de página        | `bg-background`                | `bg-black`, `#0d0d0d` |
| Texto principal       | `text-foreground`              | `text-white`, `text-gray-200` |
| Botón principal (rojo)| `bg-primary` + `text-primary-foreground` | `bg-teal-600`, hex |
| Acentos / bullets     | `bg-accent`                    | `bg-teal-500`       |
| Botón secundario (azul)| `bg-secondary` + `text-secondary-foreground` | — |
| Bloques suaves         | `bg-muted`                     | `bg-gray-900`       |
| Texto secundario       | `text-muted-foreground`        | `text-gray-300`     |
| Verde soldado          | `bg-tertiary`                  | —                   |

## Colores con nombre (uso directo)

Cuando necesites el color exacto de la paleta por nombre:

- `bg-venetian-red` / `text-venetian-red`
- `bg-occre` / `text-occre`
- `bg-graphite-black` / `text-graphite-black`
- `bg-bdazzled-blue` / `text-bdazzled-blue`
- `bg-soldier-green` / `text-soldier-green`
- `bg-pale-chestnut` / `text-pale-chestnut`

## Dónde se usa ya

- **Layout**: `bg-background text-foreground` en el contenedor principal.
- **HeroSection**: título `text-foreground`, párrafo `text-muted-foreground`, botón `bg-primary text-primary-foreground`.
- **page.tsx**: secciones con `bg-background`, card de reservas con `bg-muted` y `text-foreground`, bullets `bg-accent`, FAQ con `bg-muted/50` y `text-foreground` / `text-muted-foreground`.

En el resto de componentes (Navbar, Footer, BookingForm, FeaturedBeers, LocationsSection, CustomerReviews) conviene ir reemplazando colores fijos por estas clases para mantener una sola fuente de verdad.
