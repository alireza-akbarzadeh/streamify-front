import type { Row } from "@tanstack/react-table";

interface StatusOption {
	label: string;
	value?: string;
	icon: React.ComponentType<{ className?: string }>;
	color: string;
}

interface SearchProps {
	columnId: string;
	placeholder: string;
}

interface FilterTabsProps {
	columnId: string;
	options: string[];
}

interface StatusFiltersProps {
	columnId: string;
	options: StatusOption[];
	title?: string;
}

interface BodyProps<TData> {
	columnsCount: number;
	onRowDoubleClick?: (row: Row<TData>) => void;
	onClick?: (row: Row<TData>) => void;
}
interface BulkActionsProps<TData> {
	onDelete?: (rows: Row<TData>[]) => void;
	onDownload?: (rows: Row<TData>[]) => void;
	deleteTitle?: string;
	deleteDescription?: string;
}

export type {
	BodyProps,
	FilterTabsProps,
	SearchProps,
	StatusOption,
	StatusFiltersProps,
	BulkActionsProps,
};
