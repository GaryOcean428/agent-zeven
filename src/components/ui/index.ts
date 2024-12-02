import { type ReactNode, type ChangeEvent } from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    asChild?: boolean;
    className?: string;
    children: ReactNode;
}

export interface ToastProps {
    variant?: 'default' | 'destructive';
    className?: string;
    title?: string;
    description?: string;
    action?: ReactNode;
    duration?: number;
    onOpenChange?: (open: boolean) => void;
}

export interface ToastActionElement {
    altText: string;
    action: () => void;
    element: ReactNode;
}

export interface ScrollAreaProps {
    className?: string;
    children: ReactNode;
    orientation?: 'vertical' | 'horizontal';
}

export interface TabsProps {
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    orientation?: 'horizontal' | 'vertical';
    className?: string;
    children: ReactNode;
}

export interface ToggleProps {
    defaultPressed?: boolean;
    pressed?: boolean;
    onPressedChange?: (pressed: boolean) => void;
    disabled?: boolean;
    className?: string;
    children: ReactNode;
}

export interface TooltipProps {
    content: ReactNode;
    side?: 'top' | 'right' | 'bottom' | 'left';
    align?: 'start' | 'center' | 'end';
    delayDuration?: number;
    className?: string;
    children: ReactNode;
}

export interface LoadingProps {
    size?: 'sm' | 'default' | 'lg';
    className?: string;
    variant?: 'default' | 'secondary';
}

export interface DialogProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    modal?: boolean;
    title?: string;
    description?: string;
    className?: string;
    children: ReactNode;
}

export interface DropdownMenuProps {
    trigger?: ReactNode;
    items: Array<{
        label: string;
        onClick?: () => void;
        disabled?: boolean;
        icon?: ReactNode;
    }>;
    align?: 'start' | 'center' | 'end';
    className?: string;
}

export interface AlertProps {
    variant?: 'default' | 'destructive' | 'success' | 'warning';
    title?: string;
    description?: string;
    icon?: ReactNode;
    className?: string;
    children?: ReactNode;
}

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    className?: string;
    children: ReactNode;
    required?: boolean;
}

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
    value?: string;
    onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    className?: string;
}

export interface CheckboxProps {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    label?: string;
    disabled?: boolean;
    className?: string;
}

export interface RadioGroupProps {
    value?: string;
    onValueChange?: (value: string) => void;
    options: Array<{ value: string; label: string }>;
    name?: string;
    disabled?: boolean;
    className?: string;
}

export interface ProgressProps {
    value: number;
    max?: number;
    size?: 'sm' | 'default' | 'lg';
    showValue?: boolean;
    className?: string;
}

export interface BadgeProps {
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
    children: ReactNode;
    className?: string;
}

export interface ToolbarProps {
    className?: string;
    children: ReactNode;
    orientation?: 'horizontal' | 'vertical';
}
