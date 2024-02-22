import { Combobox, TextInput, TextInputProps, useCombobox } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { FC } from 'react';

interface Props extends Omit<TextInputProps, 'onChange'> {
    values: string[];
    onChange: (value: string) => void;
}

export const CustomSelect: FC<Props> = ({ values, onChange, ...otherProps }) => {
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
        onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
    });

    const options = values.map((item) => (
        <Combobox.Option
            key={`field-sex-option-${item}`}
            id={`field-sex-option-${item}`}
            value={item}
        >
            <span>{item}</span>
        </Combobox.Option>
    ));

    return (
        <Combobox
            store={combobox}
            onOptionSubmit={(value) => {
                onChange?.(value);
                combobox.toggleDropdown();
            }}
        >
            <Combobox.DropdownTarget>
                <div onClick={() => combobox.toggleDropdown()}>
                    <TextInput
                        rightSection={<IconChevronDown cursor="pointer" />}
                        {...otherProps}
                    />
                </div>
            </Combobox.DropdownTarget>
            <Combobox.Dropdown>
                <Combobox.Options>{options}</Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
};
