import type { Meta, StoryObj } from '@storybook/react-vite'
import { UiText } from './ui-text'

const meta = {
    component: UiText,
    title: 'base/UiText',
} satisfies Meta<typeof UiText>
export default meta

type Story = StoryObj<typeof UiText>

export const Default = {
    args: {
        children: 'UiText',
        className: '',
        isSkeleton: false,
        renderAs: 'p',
        size: 'md',
        style: {},
        variant: 'p',
    },
} satisfies Story
