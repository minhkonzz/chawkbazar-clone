import { memo } from "@/configs/imports-wrapper";
import { DropdownMenu } from "@/components/atoms";
import type { ProductVariation } from "@/types/entities";
import type { Color } from "@/types";
import type { OptionComponentProps } from "@/components/atoms/dropdown-menu";
import styles from "./style.module.css";

function ColorOption({ label, metadata }: OptionComponentProps) {
  return (
    <div className="d-flex at-center">
      {!!metadata && <div style={{
        width: 22,
        height: 22,
        borderRadius: "100%",
        backgroundColor: metadata.hexCode
      }} />}
      <span style={{
        display: "inline-block",
        marginLeft: 14
      }}>
        {label}
      </span>
    </div>
  )
}

interface Props {
  variations: ProductVariation[],
  changeSize: (size: string) => void;
  changeColor: (color: Color) => void;
};

function Variations({
  variations,
  changeSize,
  changeColor
}: Props) {
  const _variations = variations.reduce(
    (acc: any, cur) => {
      const size = cur.size;
      const color = cur.color;

      const ks = `s-${size}`;
      if (!acc.sizes[ks]) {
        acc.sizes[ks] = {
          id: ks,
          label: `Size ${size}`,
          value: size
        };
      }
      const kc = `color-${color.name}`;
      if (!acc.colors[kc]) {
        acc.colors[kc] = {
          id: kc,
          label: color.name,
          value: JSON.stringify(color),
          metadata: {
            hexCode: color.hex_code
          }
        };
      }

      return acc;
    },
    { sizes: {}, colors: {} }
  );

  return (
    <div className={`${styles.wrapper} d-flex at-center`}>
      <DropdownMenu
        className={styles.addon}
        title="Select size"
        options={Object.values(_variations.sizes)}
        onChange={selected => changeSize(selected.value)}
      />
      <DropdownMenu
        className={styles.addon}
        title="Select color"
        options={Object.values(_variations.colors)}
        optionComponent={ColorOption}
        onChange={selected => changeColor(JSON.parse(selected.value))}
      />
    </div>
  );
}

export default memo(Variations);