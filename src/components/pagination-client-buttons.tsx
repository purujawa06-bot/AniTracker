"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMemo } from 'react';

interface PaginationClientButtonsProps {
    prevHref?: string;
    nextHref?: string;
    prevDisabled: boolean;
    nextDisabled: boolean;
    isNext?: boolean;
}

export function PaginationClientButtons({ prevHref, nextHref, prevDisabled, nextDisabled, isNext = false }: PaginationClientButtonsProps) {
    const buttons = useMemo(() => {
        if (isNext) {
            return (
                <Link href={nextHref || ''} passHref>
                    <Button variant="outline" size="icon" disabled={nextDisabled}>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </Link>
            )
        }
        return (
            <Link href={prevHref || ''} passHref>
                <Button variant="outline" size="icon" disabled={prevDisabled}>
                    <ChevronLeft className="h-4 w-4" />
                </Button>
            </Link>
        )
    }, [isNext, nextHref, nextDisabled, prevHref, prevDisabled]);

    if (isNext) {
        return (
            <Link href={nextHref || ''} passHref>
                <Button variant="outline" size="icon" disabled={nextDisabled}>
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </Link>
        );
    }

    return (
        <Link href={prevHref || ''} passHref>
            <Button variant="outline" size="icon" disabled={prevDisabled}>
                <ChevronLeft className="h-4 w-4" />
            </Button>
        </Link>
    );
}