# Form design guide

- Vertical forms are default; horizontal forms only on wide screens.
- Labels above fields; helper text below; errors use `role="alert"`.
- Required: asterisk + `aria-required` / HTML `required`.
- Control height tokens: `--control-h-sm|md|lg`.
- Group related fields; use wizards for long flows.
- Always cover: default, focus, disabled, read-only, loading, error, success.
