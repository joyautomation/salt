# @joyautomation/salt

A Svelte 5 component library with theming, forms, icons, and notifications.

## Installation

```bash
pnpm add @joyautomation/salt
```

Import the styles in your root layout or app entry point:

```svelte
<script>
  import '@joyautomation/salt/styles.scss'
</script>
```

## Theming

Salt includes a light/dark theme system using CSS custom variables. Apply the default theme class to `<body>` in your `app.html`:

```html
<body class="themeLight" data-sveltekit-preload-data="hover">
  %sveltekit.body%
</body>
```

### ThemeButton

A toggle button that switches between light and dark mode via a SvelteKit form action.

```svelte
<script>
  import { ThemeButton } from '@joyautomation/salt'
</script>

<ThemeButton theme="themeLight" />
```

Wire up the server action in your `+layout.server.ts`:

```ts
import { actions as saltActions } from '@joyautomation/salt'
import type { Actions } from '@sveltejs/kit'

export const actions: Actions = {
  setTheme: saltActions.setTheme
}
```

### ThemeSwitch

A three-option selector (System / Light / Dark):

```svelte
<script>
  import { ThemeSwitch } from '@joyautomation/salt'
</script>

<ThemeSwitch />
```

### Theme State

Programmatic access to the current theme:

```ts
import { themeState, getEffectiveTheme } from '@joyautomation/salt'

// Read current theme
themeState.value // 'themeSystem' | 'themeLight' | 'themeDark'

// Get resolved theme (resolves 'themeSystem' to actual preference)
getEffectiveTheme() // 'themeLight' | 'themeDark'

// Set theme programmatically
themeState.set('themeDark')

// Initialize from server cookie
themeState.initialize(serverTheme)
```

## Toast Notifications

Drop-in toast notification system that auto-displays messages returned from SvelteKit form actions.

### Setup

Add the `Toast` component to your root layout:

```svelte
<script>
  import { Toast } from '@joyautomation/salt'
</script>

<slot />
<Toast />
```

### Triggering Toasts from Form Actions

Return an object with `message` and `type` from any form action:

```ts
// +page.server.ts
export const actions = {
  save: async () => {
    return {
      message: 'Changes saved successfully',
      type: 'success' // 'success' | 'error' | 'warning'
    }
  }
}
```

### Triggering Toasts Programmatically

```ts
import { state } from '@joyautomation/salt'

state.addNotification({
  message: 'Something happened',
  type: 'warning'
})
```

Notifications auto-dismiss after 5 seconds.

## Forms

A JSON-driven form system using a 2D array layout where each inner array represents a row of fields.

### Basic Usage

```svelte
<script>
  import { forms } from '@joyautomation/salt'
  import type { FormInputs } from '@joyautomation/salt'

  const inputs: FormInputs = $state([
    // Row 1: two fields side by side
    [
      {
        id: 'name',
        name: 'name',
        label: 'Name',
        type: 'text',
        value: '',
        validations: [[(v) => v.trim().length === 0, 'Name is required']]
      },
      {
        id: 'email',
        name: 'email',
        label: 'Email',
        type: 'email',
        value: '',
        validations: [
          [(v) => v.trim().length === 0, 'Email is required'],
          [(v) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 'Enter a valid email']
        ]
      }
    ],
    // Row 2: select dropdown
    [
      {
        id: 'role',
        name: 'role',
        label: 'Role',
        type: 'select',
        value: 'user',
        validations: [],
        options: [
          { value: 'user', label: 'User' },
          { value: 'admin', label: 'Admin' }
        ]
      }
    ],
    // Row 3: textarea
    [
      {
        id: 'notes',
        name: 'notes',
        label: 'Notes',
        type: 'textarea',
        value: '',
        validations: []
      }
    ]
  ])
</script>

<forms.Form inputs={inputs} action="?/save" buttonText="Save" />
```

### Field Types

Set `type` on an `InputProps` entry:

- **Text inputs**: `text`, `password`, `email`, `number`, `tel`, `datetime-local`, etc.
- **Textarea**: `textarea` — renders a resizable text area
- **Select**: `select` — renders a dropdown, requires `options: { value: string, label: string }[]`

### Validation

Each field has a `validations` array of `[testFn, errorMessage]` tuples. The test function returns `true` when the value is **invalid**:

```ts
validations: [
  [(value) => value.length === 0, 'Required'],
  [(value) => value.length < 3, 'Must be at least 3 characters'],
  // Cross-field validation — second param gives access to all form inputs
  [(value, inputs) => {
    const other = inputs.flat().find(i => i.name === 'password')
    return value !== other?.value
  }, 'Passwords must match']
]
```

The submit button is disabled until all validations pass.

### Form Component

```svelte
<forms.Form
  inputs={formInputs}
  action="?/submit"
  buttonText="Submit"
  onsubmitstart={() => console.log('submitting...')}
  onsubmitend={() => console.log('done')}
/>
```

Props:
- `inputs` — `FormInputs` (2D array of `InputProps`)
- `action` — SvelteKit form action path
- `buttonText` — submit button label (default: `'Submit'`)
- `onsubmitstart` / `onsubmitend` — optional callbacks

### Individual Components

You can also use form components standalone:

```svelte
<forms.Input
  id="name"
  name="name"
  label="Name"
  type="text"
  bind:value={name}
  validations={[[(v) => v.length === 0, 'Required']]}
  touched={true}
/>

<forms.Select
  id="color"
  name="color"
  label="Color"
  bind:value={color}
  validations={[]}
  options={[{ value: 'red', label: 'Red' }, { value: 'blue', label: 'Blue' }]}
/>
```

### SearchableSelect

A filterable dropdown with keyboard navigation, independent of the form system:

```svelte
<script>
  import { forms } from '@joyautomation/salt'

  let selected = $state('')
</script>

<forms.SearchableSelect
  options={[
    { value: 'svelte', label: 'Svelte', sublabel: 'Cybernetically enhanced' },
    { value: 'react', label: 'React', sublabel: 'A JavaScript library' }
  ]}
  placeholder="Choose a framework..."
  onSelect={(option) => (selected = option.value)}
  disabled={false}
/>
```

### Types

```ts
import type { InputProps, FormInputs, FormInputsPartial } from '@joyautomation/salt'

// InputProps — single field configuration
// FormInputs — InputProps[][] (2D array, each inner array is a row)
// FormInputsPartial — partial version for merging/patching field configs
```

## Icons

All 648 [Heroicons](https://heroicons.com) (324 outline + 324 solid) are available as tree-shakeable Svelte components.

### Usage

```svelte
<script>
  // Outline icons (default export)
  import { AcademicCap, ArrowPath, Trash } from '@joyautomation/salt/icons'

  // Style-specific imports
  import { AcademicCap } from '@joyautomation/salt/icons/outline'
  import { AcademicCap } from '@joyautomation/salt/icons/solid'
</script>

<!-- Default size is 1.5rem -->
<AcademicCap />

<!-- Custom size -->
<ArrowPath size="2rem" />
<Trash size="1rem" />
```

Icons inherit `currentColor` so they match the surrounding text color.

### Regenerating Icons

If you update the SVGs in `src/lib/components/icons/svg/`, regenerate with:

```bash
npm run generate:icons
```

## Toggle

A toggle switch component with hidden form input:

```svelte
<script>
  import { Toggle } from '@joyautomation/salt'
</script>

<Toggle id="notifications" name="notifications" checked={true} />
```

Props:
- `id` — input ID
- `name` — form field name
- `checked` — boolean state
- `buttonType` — `'button'` (default) or `'submit'`
- `selector` / `selectorName` — optional additional hidden input

## Development

```bash
pnpm install
pnpm dev          # starts dev server on port 3014
pnpm run check    # type check
pnpm run package  # build the library
```

## Publishing

Create a [GitHub release](https://github.com/joyautomation/salt/releases) with a tag like `v0.2.0`. The CI workflow will automatically set the version, build, and publish to npm.
