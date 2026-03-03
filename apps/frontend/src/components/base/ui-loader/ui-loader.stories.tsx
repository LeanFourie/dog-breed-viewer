import type { Meta, StoryObj } from '@storybook/react-vite'
import { UiLoader } from './ui-loader'

const meta = {
    component: UiLoader,
    title: 'base/UiLoader',
} satisfies Meta<typeof UiLoader>
export default meta

type Story = StoryObj<typeof UiLoader>

export const Dots = {
    args: {
        type: 'dots',
        size: 'md',
    },
} satisfies Story

export const Shape = {
    args: {
        type: 'shape',
        size: 'md',
    },
} satisfies Story

export const Circular = {
    args: {
        type: 'circular',
        size: 'md',
    },
} satisfies Story
