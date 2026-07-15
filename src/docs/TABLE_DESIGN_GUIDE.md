# Table design guide

- Use `DataTable` from `@/components/data-display` for product tables.
- Toolbar: search + filters + primary action + column visibility.
- Sticky header on long lists; paginate beyond ~10–25 rows.
- Bulk actions appear only when selection is non-empty.
- Mobile: provide `mobileCardRender` — do not force horizontal scroll alone.
- Empty, loading, and error states are mandatory.
