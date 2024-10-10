import tailwindFroms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

export default {
  darkMode: 'class',
  content: ['./app/**/*.{tsx,ts}'],
  theme: {
    extend: {
      fontSize: {
        'xs': ['0.8125rem', { lineHeight: '1.5rem' }],
        'sm': ['0.875rem', { lineHeight: '1.5rem' }],
        'base': ['1rem', { lineHeight: '1.75rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '2rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '3.5rem' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      fontFamily: {
        'sans': ['Inter var', ...fontFamily.sans],
        'mono': ['Fira Code VF', ...fontFamily.mono],
        'source': ['Source Sans Pro', ...fontFamily.sans],
        'ubuntu-mono': ['Ubuntu Mono', ...fontFamily.mono],
      },
      maxWidth: {
        '8xl': '90rem',
      },
      colors: {
        primary: '#2AB673',
        light: '#55D799',
        dark: '#117866',
        ultraLight: '#CCEFE9',
        ultraDark: '#0D5E4F',
      },
      typography: (theme: any) => ({
        invert: {
          css: {
            '--tw-prose-body': 'var(--tw-prose-invert-body)',
            '--tw-prose-headings': 'var(--tw-prose-invert-headings)',
            '--tw-prose-links': 'var(--tw-prose-invert-links)',
            '--tw-prose-links-hover': 'var(--tw-prose-invert-links-hover)',
            '--tw-prose-underline': 'var(--tw-prose-invert-underline)',
            '--tw-prose-underline-hover':
              'var(--tw-prose-invert-underline-hover)',
            '--tw-prose-bold': 'var(--tw-prose-invert-bold)',
            '--tw-prose-counters': 'var(--tw-prose-invert-counters)',
            '--tw-prose-bullets': 'var(--tw-prose-invert-bullets)',
            '--tw-prose-hr': 'var(--tw-prose-invert-hr)',
            '--tw-prose-quote-borders': 'var(--tw-prose-invert-quote-borders)',
            '--tw-prose-captions': 'var(--tw-prose-invert-captions)',
            '--tw-prose-code': 'var(--tw-prose-invert-code)',
            '--tw-prose-code-bg': 'var(--tw-prose-invert-code-bg)',
            '--tw-prose-pre-code': 'var(--tw-prose-invert-pre-code)',
            '--tw-prose-pre-bg': 'var(--tw-prose-invert-pre-bg)',
            '--tw-prose-pre-border': 'var(--tw-prose-invert-pre-border)',
            '--tw-prose-th-borders': 'var(--tw-prose-invert-th-borders)',
            '--tw-prose-td-borders': 'var(--tw-prose-invert-td-borders)',
          },
        },
        DEFAULT: {
          'css': {
            '--tw-prose-body': theme('colors.zinc.600'),
            '--tw-prose-headings': theme('colors.zinc.900'),
            '--tw-prose-links': theme('colors.primary'),
            '--tw-prose-links-hover': theme('colors.dark'),
            '--tw-prose-underline': theme('colors.primary'),
            '--tw-prose-underline-hover': theme('colors.primary'),
            '--tw-prose-bold': theme('colors.zinc.900'),
            '--tw-prose-counters': theme('colors.zinc.900'),
            '--tw-prose-bullets': theme('colors.zinc.900'),
            '--tw-prose-hr': theme('colors.zinc.100'),
          },
          'figcaption': {
            color: 'var(--tw-prose-captions)',
            fontSize: theme('fontSize.sm')[0],
            lineHeight: theme('lineHeight.6'),
            marginTop: theme('spacing.3'),
          },
          'figcaption > p': {
            margin: 0,
          },
          'ul': {
            listStyleType: 'disc',
          },
          'ol': {
            listStyleType: 'decimal',
          },
          'ul, ol': {
            paddingLeft: theme('spacing.6'),
          },
          'li': {
            marginTop: theme('spacing.6'),
            marginBottom: theme('spacing.6'),
            paddingLeft: theme('spacing[3.5]'),
          },
          'li::marker': {
            fontSize: theme('fontSize.sm')[0],
            fontWeight: theme('fontWeight.semibold'),
          },
          'ol > li::marker': {
            color: 'var(--tw-prose-counters)',
          },
          'ul > li::marker': {
            color: 'var(--tw-prose-bullets)',
          },
          'li :is(ol, ul)': {
            marginTop: theme('spacing.4'),
            marginBottom: theme('spacing.4'),
          },
          'li :is(li, p)': {
            marginTop: theme('spacing.3'),
            marginBottom: theme('spacing.3'),
          },
          'pre': {
            color: 'var(--tw-prose-pre-code)',
            fontSize: theme('fontSize.sm')[0],
            fontWeight: theme('fontWeight.medium'),
            backgroundColor: 'var(--tw-prose-pre-bg)',
            borderRadius: theme('borderRadius.3xl'),
            padding: theme('spacing.8'),
            overflowX: 'auto',
            border: '1px solid',
            borderColor: 'var(--tw-prose-pre-border)',
          },
          'pre code': {
            display: 'inline',
            color: 'inherit',
            fontSize: 'inherit',
            fontWeight: 'inherit',
            backgroundColor: 'transparent',
            borderRadius: 0,
            padding: 0,
          },
          'hr': {
            'marginTop': theme('spacing.20'),
            'marginBottom': theme('spacing.20'),
            'borderTopWidth': '1px',
            'borderColor': 'var(--tw-prose-hr)',
            '@screen lg': {
              marginLeft: `calc(${theme('spacing.12')} * -1)`,
              marginRight: `calc(${theme('spacing.12')} * -1)`,
            },
          },
          'table': {
            width: '100%',
            tableLayout: 'auto',
            textAlign: 'left',
            fontSize: theme('fontSize.sm')[0],
          },
          'thead': {
            borderBottomWidth: '1px',
            borderBottomColor: 'var(--tw-prose-th-borders)',
          },
          'thead th': {
            color: 'var(--tw-prose-headings)',
            fontWeight: theme('fontWeight.semibold'),
            verticalAlign: 'bottom',
            paddingBottom: theme('spacing.2'),
          },
          'thead th:not(:first-child)': {
            paddingLeft: theme('spacing.2'),
          },
          'thead th:not(:last-child)': {
            paddingRight: theme('spacing.2'),
          },
          'tbody tr': {
            borderBottomWidth: '1px',
            borderBottomColor: 'var(--tw-prose-td-borders)',
          },
          'tbody tr:last-child': {
            borderBottomWidth: 0,
          },
          'tbody td': {
            verticalAlign: 'baseline',
          },
          'tfoot': {
            borderTopWidth: '1px',
            borderTopColor: 'var(--tw-prose-th-borders)',
          },
          'tfoot td': {
            verticalAlign: 'top',
          },
          ':is(tbody, tfoot) td': {
            paddingTop: theme('spacing.2'),
            paddingBottom: theme('spacing.2'),
          },
          ':is(tbody, tfoot) td:not(:first-child)': {
            paddingLeft: theme('spacing.2'),
          },
          ':is(tbody, tfoot) td:not(:last-child)': {
            paddingRight: theme('spacing.2'),
          },
        },
      }),
    },
  },
  plugins: [
    typography,
    tailwindFroms,
  ],
} satisfies Config
