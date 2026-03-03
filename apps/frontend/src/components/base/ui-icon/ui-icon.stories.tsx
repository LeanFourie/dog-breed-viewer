import type { Meta, StoryObj } from '@storybook/react-vite'
import { UiIcon } from './ui-icon'

const meta = {
    component: UiIcon,
    title: 'base/UiIcon',
} satisfies Meta<typeof UiIcon>
export default meta

type Story = StoryObj<typeof UiIcon>

export const Text = {
    args: {
        type: 'text',
        value: 'home',
    },
} satisfies Story
