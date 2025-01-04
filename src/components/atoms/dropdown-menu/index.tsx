"use client";

import { memo, useState, useRef, useEffect } from "@/configs/imports-wrapper";
import { ArrowDown } from "@/components/atoms/svgs";
import styles from "./style.module.css";

export type Option = {
  id: string;
  label: string;
  value: string;
  metadata?: Record<string, any>;
};

export type OptionComponentProps = Pick<Option, "label" | "metadata">;

interface DropdownMenuProps {
  title: string;
  options: Option[];
  onChange: (selectedOption: Option) => void;
  optionComponent?: (props: OptionComponentProps) => JSX.Element;
  className?: string;
}

function DropdownMenu({
  title,
  options,
  onChange,
  optionComponent: OptionComponent,
  className
}: DropdownMenuProps) {
  const wrapper = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option>(options[0]);

  useEffect(() => {
    const closePopover = (e: MouseEvent) => {
      if (e.target == wrapper.current) return;
      setOpen(false);
    };

    window.addEventListener("click", closePopover);
    return () => window.removeEventListener("click", closePopover);
  }, []);

  const handleSelectChange = (selectedOption: Option) => () => {
    setSelectedOption(selectedOption);
    onChange(selectedOption);
    setOpen(false);
  };

  const changeOpen = () => {
    setOpen(!open);
  };

  return (
    <button
      ref={wrapper}
      className={`${styles.btn} posrel w-100pc d-flex at-center jc-sb${className ? " " + className : ""}`}
      onClick={changeOpen}>
      {(!!OptionComponent && (
        <OptionComponent
          label={selectedOption.label}
          metadata={selectedOption.metadata}
        />
      )) ||
        selectedOption.label ||
        title}
      <ArrowDown className={styles.icon} />
      {open && (
        <ul
          onBlur={changeOpen}
          className={`${styles.list} posab z-1 w-100pc thin-bd-r bg-white`}>
          {options.map((opt: Option) => (
            <li
              className={`${styles.item} cp`}
              onClick={handleSelectChange(opt)}
              key={opt.id}
              value={opt.value}>
              {(!!OptionComponent && (
                <OptionComponent label={opt.label} metadata={opt.metadata} />
              )) ||
                opt.label}
            </li>
          ))}
        </ul>
      )}
    </button>
  );
}

export default memo(DropdownMenu);
