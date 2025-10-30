import Link from 'next/link';
import { PaginationClientButtons } from './pagination-client-buttons';

interface PaginationComponentProps {
    currentPage: number;
    hasNextPage: boolean;
    buildLink: (page: number) => string;
}

export function PaginationComponent({ currentPage, hasNextPage, buildLink }: PaginationComponentProps) {
    return (
        <div className="flex items-center justify-center space-x-2">
            <PaginationClientButtons
                prevHref={currentPage > 1 ? buildLink(currentPage - 1) : undefined}
                nextHref={hasNextPage ? buildLink(currentPage + 1) : undefined}
                prevDisabled={currentPage <= 1}
                nextDisabled={!hasNextPage}
            />
            <span className="text-sm font-medium px-2">
                Page {currentPage}
            </span>
            <PaginationClientButtons
                isNext
                nextHref={hasNextPage ? buildLink(currentPage + 1) : undefined}
                prevHref={currentPage > 1 ? buildLink(currentPage - 1) : undefined}
                nextDisabled={!hasNextPage}
                prevDisabled={currentPage <= 1}
            />
        </div>
    );
}
