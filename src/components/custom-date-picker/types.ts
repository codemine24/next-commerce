import type { Dayjs } from 'dayjs';

export type IDatePickerControl = Dayjs | null;

export type UseDatePickerReturn = {
    date: IDatePickerControl | null;
    onChangeDate: (newValue: IDatePickerControl) => void;
    //
    open: boolean;
    onOpen?: () => void;
    onClose: () => void;
    onReset?: () => void;
    //
    selected?: boolean;
    error?: string;
    //
    label?: string;
    shortLabel?: string;
    //
    title?: string;
    //
    setStartDate?: React.Dispatch<React.SetStateAction<IDatePickerControl>>;
    setEndDate?: React.Dispatch<React.SetStateAction<IDatePickerControl>>;
};