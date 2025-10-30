"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationComponentProps {
    currentPage: number;
    hasNextPage: boolean;
    buildLink: (page: number) => string;
}

export function PaginationComponent({ currentPage, hasNextPage, buildLink }: PaginationComponentProps) {
    return (
        <div className="flex items-center justify-center space-x-2">
            <Link href={buildLink(currentPage - 1)} passHref>
                <Button variant="outline" size="icon" disabled={currentPage <= 1}>
                    <ChevronLeft className="h-4 w-4" />
                </Button>
            </Link>

            <span className="text-sm font-medium">
                Page {currentPage}
            </span>

            <Link href={buildLink(currentPage + 1)} passHref>
                <Button variant="outline" size="icon" disabled={!hasNextPage}>
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </Link>
        </div>
    );
}
