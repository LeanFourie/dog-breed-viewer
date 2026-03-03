import type { Meta, StoryObj } from '@storybook/react-vite'
import { UiHelperText } from './ui-helper-text'

const meta = {
    component: UiHelperText,
    title: 'forms/UiHelperText',
} satisfies Meta<typeof UiHelperText>
export default meta

type Story = StoryObj<typeof UiHelperText>

export const Default = {
    args: {
        className: '',
        icon: { type: 'text', value: 'check' },
        isSkeleton: false,
        state: 'neutral',
        style: {},
        value: 'Helper text value',
    },
} satisfies Story
