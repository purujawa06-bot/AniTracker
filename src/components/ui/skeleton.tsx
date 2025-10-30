"use client";

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

function ThemedSkeleton(props: React.ComponentProps<typeof Skeleton>) {
    return (
        <SkeletonTheme baseColor="hsl(var(--muted))" highlightColor="hsl(var(--secondary))">
            <Skeleton {...props} />
        </SkeletonTheme>
    )
}

export { ThemedSkeleton as Skeleton };
