import { type ElementType, type ReactNode } from 'react'

type AsProp<E extends ElementType> = { as?: E }

type PolymorphicProps<E extends ElementType, P = object> = AsProp<E> &
    Omit<React.ComponentPropsWithoutRef<E>, keyof AsProp<E>> &
    P

type PolymorphicComponent<P> = <E extends ElementType = 'div'>(
    props: PolymorphicProps<E, P>
) => ReactNode

export function createPolymorphic<P extends object>(
    defaultTag: ElementType,
    defaultProps?: Partial<P>
): PolymorphicComponent<P> {
    const Component = <E extends ElementType = typeof defaultTag>(
        { as: Tag = defaultTag as E, ...props }: PolymorphicProps<E, P>
    ) => {
        return <Tag {...(props as any)} />
    }
    return Component as unknown as PolymorphicComponent<P>
}