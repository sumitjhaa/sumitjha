import {
    Children,
    isValidElement,
    cloneElement,
    type ReactNode,
    type ReactElement,
    type ComponentType,
} from 'react'

export function findChild<T extends ComponentType>(
    children: ReactNode,
    type: T
): ReactElement | undefined {
    return Children.toArray(children).find(
        (child): child is ReactElement => isValidElement(child) && child.type === type
    )
}

export function findAllChildren<T extends ComponentType>(
    children: ReactNode,
    type: T
): ReactElement[] {
    return Children.toArray(children).filter(
        (child): child is ReactElement => isValidElement(child) && child.type === type
    )
}

export function withoutChildren<T extends ComponentType>(
    children: ReactNode,
    type: T
): ReactNode[] {
    return Children.toArray(children).filter(
        (child) => !(isValidElement(child) && child.type === type)
    )
}

export function cloneChild<E extends Record<string, unknown>>(
    child: ReactNode,
    extraProps: Partial<E>
): ReactNode {
    if (!isValidElement(child)) return child
    return cloneElement(child, extraProps as Record<string, unknown>)
}
