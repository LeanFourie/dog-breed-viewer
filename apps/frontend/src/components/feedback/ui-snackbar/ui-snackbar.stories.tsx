import type { Meta, StoryObj } from '@storybook/react-vite'
import { UiSnackbar } from './ui-snackbar'

const meta = {
    component: UiSnackbar,
    title: 'feedback/UiSnackbar',
} satisfies Meta<typeof UiSnackbar>
export default meta

type Story = StoryObj<typeof UiSnackbar>

export const Default = {
    args: {
        className: '',
        message: 'Lorem ipsum dolor sit amet',
        onClose: () => {},
        state: 'neutral',
        style: {},
    },
} satisfies Story
